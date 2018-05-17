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
    TEST_CREDENTIALS
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
    it('should accept an email, password and password verification', async () => {
        await AppRegister.navigateTo();

        const email = 'example@example.com';
        await AppRegister.fields.email.edit(email);
        await expect(AppRegister.fields.email.get())
            .toEqual(email, 'email field not receiving input');

        const pass = 'password123';
        await AppRegister.fields.password.edit(pass);
        await expect(AppRegister.fields.password.get())
            .toEqual(pass, 'password field not receiving input');

        await AppRegister.fields.passwordConfirmation.edit(pass);
        await expect(AppRegister.fields.passwordConfirmation.get())
            .toEqual(pass, 'password confirmation field not receiving input');
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
        await AppManageCourses.courses.available.add.byIndex(1);
        await AppManageCourses.courses.available.add.byIndex(2);
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
        await AppDashboardSideBar.navigateToDashboardOverview();
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
        await AppDashboardSideBar.navigateToDashboardOverview();

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

        // navigate to that course overview
        await AppDashboardSideBar.navigateToCourse.byName(courseName);

        // should only display posts from the selected course
        let posts = await AppDashboardCourseOverview.posts.get.all();
        const postCourseNames = posts.map(p => p.course);

        for (const postCourseName of postCourseNames) {
            expect(postCourseName)
                .toContain(courseName, 'posts from another course displayed');
        }

        // should add a post with randomized data to prevent duplication in subsequent tests
        const post = {
            title: `I am an e2e title ${Math.random()}`,
            content: `I am an e2e content ${Math.random()}`,
            category: 'Exam',
            author: TEST_CREDENTIALS.email,
            course: courseName
        };

        await AppDashboardCourseOverview.posts.add(post);
        posts = await AppDashboardCourseOverview.posts.get.all();

        await expect(posts)
            .toContain(post, 'did not find newly created post');

        // should view a post
        await AppDashboardCourseOverview.posts.open.byIndex(0);

        await expect(AppDashboardPostView.post.get())
            .toEqual(post, 'viewed post does not equal expected post');

        const comment = {
            content: 'I am a comment',
            author: TEST_CREDENTIALS.email
        };

        await AppDashboardPostView.comments.add(comment);

        await expect(AppDashboardPostView.comments.get.byIndex(0))
            .toEqual(comment, 'comment content not displayed');
    });
});

