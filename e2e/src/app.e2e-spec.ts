import {
    AppPage,
    AppDashboard,
    AppDashboardCourseOverview,
    AppDashboardOverview,
    AppDashboardPostView,
    AppDashboardSideBar,
    AppFooter,
    AppHome,
    AppHeader,
    AppLogin,
    AppManageCourses,
    AppRegister,
    AppVerify,
    TEST_CREDENTIALS,
    TEST_REGISTER_CREDENTIALS
} from './app.po';

describe('app sanity', () => {
    it('should load the home page and display a welcome message and signup button', async () => {
        await AppPage.navigateTo();
        await expect(AppHome.getJumbotronHeader())
            .toEqual('Scarlet Studies', 'app probably does not load');

        // attempt to navigate using home page signup link
        await AppHome.navigateToRegister();
        await expect(AppPage.currentUrl())
            .toContain('register', 'register link does not work');
    });
});

describe('login', () => {
    it('should login', async () => {
        await AppLogin.navigateTo();

        // check header before login
        await expect(AppHeader.login.isPresent())
            .toBeTruthy('login link not displayed in header when not logged in');
        await expect(AppHeader.currentUser.isLoggedIn())
            .toBeFalsy('user logged in when not logged in, according to header');
        await expect(AppHeader.logout.isPresent())
            .toBeFalsy('logout link displayed in header when not logged in');

        // test credentials
        await AppLogin.fields.email.edit(TEST_CREDENTIALS.email);
        await AppLogin.fields.password.edit(TEST_CREDENTIALS.password);
        await AppLogin.doLogin();

        // should contain user email in header after successful login
        await expect(AppHeader.currentUser.get())
            .toContain(TEST_CREDENTIALS.email, 'user email not displayed in header');

        // check header after login
        await expect(AppHeader.login.isPresent())
            .toBeFalsy('login link in header displayed after successful login');
        await expect(AppHeader.logout.isPresent())
            .toBeTruthy('logout link not displayed in header after successful login');

        // should navigate to the dashboard after successful login
        await expect(AppPage.currentUrl())
            .toContain('dashboard', 'login did not redirect to dashboard');

        // should persist login state through page refresh
        await AppPage.refresh();

        // confirm still logged in
        await expect(AppHeader.currentUser.get())
            .toContain(TEST_CREDENTIALS.email, 'login state not persisted after page refresh');

        // should logout
        await AppHeader.logout.do();

        // confirm logged out
        await expect(AppHeader.currentUser.isLoggedIn())
            .toBeFalsy('user did not get logged out');

        // should persist logged out state through page refresh
        await AppPage.refresh();

        await expect(AppHeader.currentUser.isLoggedIn())
            .toBeFalsy('user did not stay logged out through page refresh');
    });
});

describe('register', () => {
    afterEach(async () => {
        await AppHeader.logout.do();
    });

    it('should register', async () => {
        await AppRegister.navigateTo();

        // first register
        await AppRegister.fields.email.edit(TEST_REGISTER_CREDENTIALS.email);
        await expect(AppRegister.fields.email.get())
            .toEqual(TEST_REGISTER_CREDENTIALS.email, 'email field not receiving input');

        await AppRegister.fields.password.edit(TEST_REGISTER_CREDENTIALS.password);
        await expect(AppRegister.fields.password.get())
            .toEqual(TEST_REGISTER_CREDENTIALS.password, 'password field not receiving input');

        await AppRegister.fields.passwordConfirmation.edit(TEST_REGISTER_CREDENTIALS.password);
        await expect(AppRegister.fields.passwordConfirmation.get())
            .toEqual(TEST_REGISTER_CREDENTIALS.password, 'password confirmation field not receiving input');

        await AppRegister.doRegister();

        await expect(AppRegister.messages.success()).toContain('Registration success');

        // resend email
        await AppRegister.reset.open();

        await AppRegister.reset.fields.email.edit(TEST_REGISTER_CREDENTIALS.email);

        await AppRegister.reset.submit();

        await expect(AppRegister.reset.messages.success()).toContain('Verification email sent');

        // then verify the account
        const verification_code = TEST_REGISTER_CREDENTIALS.verification;

        await AppVerify.navigateTo(verification_code);

        await expect(AppVerify.messages.success()).toContain('Verification success');

        // confirm that user can now login
        await AppLogin.navigateTo();

        // test credentials
        await AppLogin.fields.email.edit(TEST_REGISTER_CREDENTIALS.email);
        await AppLogin.fields.password.edit(TEST_REGISTER_CREDENTIALS.password);
        await AppLogin.doLogin();

        // should contain user email in header after successful login
        await expect(AppHeader.currentUser.get())
            .toContain(TEST_REGISTER_CREDENTIALS.email, 'user email not displayed in header');
    });
});

describe('dashboard authorization protection', () => {
    it('should prevent unauthorized access and remember the page you were attempting to visit', async () => {
        await AppManageCourses.navigateTo();

        await expect(AppPage.currentUrl()).not.toContain('manage', 'routed when not logged in');

        // at login, perform login
        AppLogin.fields.email.edit(TEST_CREDENTIALS.email);
        AppLogin.fields.password.edit(TEST_CREDENTIALS.password);
        AppLogin.doLogin();

        await expect(AppPage.currentUrl()).toContain('manage', 'did not remember route after login');
    });
});

describe('manage courses', () => {
    beforeEach(async () => {
        await AppLogin.doTestCredentialsLogin();
        await AppDashboardSideBar.navigateToManageCourses();

        // start tests with a blank slate of zero courses in user schedule
        await AppManageCourses.courses.schedule.remove.all();
    });

    afterEach(async () => {
        await AppDashboard.navigateTo();
        await AppDashboardSideBar.navigateToManageCourses();

        // end tests with a blank slate of zero courses in user schedule
        await AppManageCourses.courses.schedule.remove.all();
    });

    it('should add and remove a course', async () => {
        const courseName = await AppManageCourses.courses.available.get.byIndex(0);

        // should add a course
        await AppManageCourses.courses.available.add.byIndex(0);
        await expect(AppManageCourses.courses.schedule.get.byIndex(0))
            .toContain(courseName, 'incorrect or no course added');

        // should persist after page refresh
        await AppPage.refresh();
        await expect(AppManageCourses.courses.schedule.get.byIndex(0))
            .toContain(courseName, 'user schedule not persisted after page refresh');

        // should remove a course
        await AppManageCourses.courses.schedule.remove.byIndex(0);
        await expect(AppManageCourses.courses.schedule.count())
            .toEqual(0, 'course not removed');
    });

    it('should search for a course to add', async () => {
        // search by name
        const courseName = 'Numerical Analysis';

        await AppManageCourses.fields.search.edit(courseName);
        await expect(AppManageCourses.courses.available.get.all())
            .toContain(courseName, 'course not found during search');
    });
});

describe('dashboard side bar', () => {
    beforeEach(async () => {
        await AppLogin.doTestCredentialsLogin();
        await AppDashboardSideBar.navigateToManageCourses();
        await AppManageCourses.courses.schedule.remove.all();

        // add test courses for view in side bar
        await AppManageCourses.courses.available.add.byIndex(0);
        await AppManageCourses.courses.available.add.byIndex(0);
        await AppManageCourses.courses.available.add.byIndex(0);

        await AppDashboard.navigateTo();
    });

    it('should display a list of the user\'s courses', async () => {
        await expect(AppDashboardSideBar.courses.count())
            .toEqual(3, 'did not display the correct amount of courses');
    });
});

describe('dashboard semester overview', () => {
    it('should display posts from multiple courses', async () => {
        // start with a blank slate
        await AppLogin.doTestCredentialsLogin();
        await AppDashboardSideBar.navigateToManageCourses();
        await AppManageCourses.courses.schedule.remove.all();

        // should display a message and no posts when the user has no courses in semester
        await AppHeader.dashboard.go();
        await expect(AppDashboardOverview.posts.get.count())
            .toEqual(0, 'posts displayed when user semester empty');
        await expect(AppDashboardOverview.message.get())
            .toContain('Your semester is empty', 'message not displayed when user semester empty');

        // should display posts from multiple courses
        await AppDashboardSideBar.navigateToManageCourses();

        // add courses
        await AppManageCourses.courses.available.add.byIndex(0);
        await AppManageCourses.courses.available.add.byIndex(1);
        await AppManageCourses.courses.available.add.byIndex(2);

        // remember course names
        const courseNames = await AppManageCourses.courses.schedule.get.all();
        await AppHeader.dashboard.go();

        const posts = await AppDashboardOverview.posts.get.all();
        const postCourseNames = posts.map(post => post.course);

        for (const courseName of courseNames) {
            expect(postCourseNames)
                .toContain(courseName, `course ${courseName} has no posts in dashboard`);
        }
    });
});

describe('dashboard course overview', () => {
    it('should interact', async () => {
        await AppLogin.doTestCredentialsLogin();
        await AppDashboardSideBar.navigateToManageCourses();
        await AppManageCourses.courses.schedule.remove.all();

        // add course and remember name
        await AppManageCourses.courses.available.add.byIndex(0);
        const courseName = await AppManageCourses.courses.schedule.get.byIndex(0);

        await AppHeader.dashboard.go();

        // navigate to that course overview
        await AppDashboardSideBar.navigateToCourse.byName(courseName);

        // should only display posts from the selected course
        const posts = await AppDashboardCourseOverview.posts.get.all();
        const postCourseNames = posts.map(p => p.course);

        expect(posts.length).toBeGreaterThan(0, 'no posts displayed for course');

        for (const postCourseName of postCourseNames) {
            expect(postCourseName)
                .toContain(courseName, 'posts from another course displayed');
        }

        // should add a post with randomized data to prevent duplication in subsequent tests
        const post = {
            title: `I am an e2e title ${Math.random()}`,
            category: 'Exam',
            author: TEST_CREDENTIALS.email,
            course: courseName
        };

        const postWithContent = {
            ...post,
            content: `I am an e2e content ${Math.random()}`
        };

        await AppDashboardCourseOverview.posts.add(postWithContent);

        // after post is created, app navigates to post view
        const found = await AppDashboardPostView.post.get();

        for (const field of ['title', 'category', 'author', 'course']) {
            await expect(found[field])
                .toContain(postWithContent[field], `viewed post does not equal expected post, key: ${field}`);
        }

        // should cheer the post
        await AppDashboardPostView.cheers.do();
        await expect(AppDashboardPostView.cheers.get())
            .toEqual('1 cheer(s)', 'post did not get cheered');

        // should add a comment
        const comment = {
            content: 'I am a comment',
            author: TEST_CREDENTIALS.email
        };

        await AppDashboardPostView.comments.add(comment);

        // should display the new comment
        await expect(AppDashboardPostView.comments.get.byIndex(0))
            .toEqual(comment, 'comment content not displayed');
    });

    it('should load more', async () => {
        await AppLogin.doTestCredentialsLogin();
        await AppDashboardSideBar.navigateToManageCourses();
        await AppManageCourses.courses.schedule.remove.all();

        // add course and remember name
        await AppManageCourses.courses.available.add.byIndex(5);
        const courseName = await AppManageCourses.courses.schedule.get.byIndex(0);

        await AppHeader.dashboard.go();

        // navigate to that course overview
        await AppDashboardSideBar.navigateToCourse.byName(courseName);

        const addPost = async () => {
            // should add a post with randomized data to prevent duplication in subsequent tests
            const post = {
                title: `I am an e2e title ${Math.random()}`,
                content: `I am an e2e content ${Math.random()}`,
                category: 'Exam',
                author: TEST_CREDENTIALS.email,
                course: courseName
            };

            await AppDashboardCourseOverview.posts.add(post);
            await AppDashboardSideBar.navigateToCourse.byName(courseName);
        };

        // count courses beforehand to avoid issues
        const existing_count = await AppDashboardCourseOverview.posts.get.count();
        const default_count = 10;
        const full_count = 15;

        for (let i = 0; i < full_count; i++) {
            await addPost();
        }

        // refresh to get back to default count
        await AppPage.refresh();

        // default count is 10
        await expect(AppDashboardCourseOverview.posts.get.count()).toEqual(default_count);

        // load more
        await AppDashboardCourseOverview.posts.loadMore.do();

        // expect full 15+ now
        await expect(AppDashboardCourseOverview.posts.get.count()).toEqual(existing_count + full_count);
        // load more should now be hidden
        await expect(AppDashboardCourseOverview.posts.loadMore.isPresent()).toBeFalsy();
    });
});

