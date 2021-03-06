import {
    AppAlerts,
    AppPage,
    AppDashboard,
    AppDashboardCourseOverview,
    AppDashboardOverview,
    AppDashboardPostView,
    AppDashboardSideBar,
    AppFooter,
    AppForgot,
    AppHome,
    AppHeader,
    AppLogin,
    AppManageCourses,
    AppRegister,
    AppUserSettings,
    AppVerify,
    TEST_CREDENTIALS,
    TEST_CHANGE_PASSWORD_CREDENTIALS,
    TEST_DELETE_ACCOUNT_CREDENTIALS,
    TEST_REGISTER_CREDENTIALS
} from './app.po';

import { Inbox } from './inbox';

import { ApiDirectAccess } from './api';

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
    beforeEach(async () => {
        // clear inbox
        await Inbox.cleanInbox();
    });

    afterEach(async () => {
        // logout
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

        // check for confirmation message
        await expect(AppRegister.messages.success()).toContain('Registration success');

        // resend email
        await AppRegister.reset.open();

        await AppRegister.reset.fields.email.edit(TEST_REGISTER_CREDENTIALS.email);

        await AppRegister.reset.submit();

        await expect(AppRegister.reset.messages.success()).toContain('Verification email sent');

        // then verify the account
        const token = (await Inbox.getLatest()).token;

        await AppVerify.navigateTo(token);
        await expect(AppVerify.messages.success()).toContain('Verification success');

        // logout
        await AppHeader.logout.do();

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
    beforeEach(async () => {
        await AppPage.navigateTo();

        if (await AppHeader.currentUser.isLoggedIn()) {
            await AppHeader.logout.do();
        }
    });

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

describe('change password', () => {
    it('should change the user password', async () => {
        // login with special credentials so as not to mess up other tests
        await AppLogin.doTestCredentialsLogin(TEST_CHANGE_PASSWORD_CREDENTIALS);

        // navigate to the user settings page
        await AppHeader.currentUser.go();

        // change the password through the form
        const newPass = 'example valid';

        await AppUserSettings.changePassword.fields.old.edit(TEST_CHANGE_PASSWORD_CREDENTIALS.password);
        await AppUserSettings.changePassword.fields.pass.edit(newPass);
        await AppUserSettings.changePassword.fields.passRepeat.edit(newPass);

        await AppUserSettings.changePassword.submit();

        // check for the confirmation message
        await expect(AppUserSettings.changePassword.message.get())
            .toContain('Password successfully changed', 'Did not change user password');

        // logout and then login with the new crendeitals
        await AppHeader.logout.do();

        await AppLogin.navigateTo();
        await AppLogin.fields.email.edit(TEST_CHANGE_PASSWORD_CREDENTIALS.email);
        await AppLogin.fields.password.edit(newPass);
        await AppLogin.doLogin();

        // confirm that new credentials are valid
        await expect(AppHeader.currentUser.get())
            .toEqual(TEST_CHANGE_PASSWORD_CREDENTIALS.email, 'User password change invalid');

        // cleanup by logging out
        await AppHeader.logout.do();
    });
});

describe('forgot password', () => {
    beforeEach(async () => {
        // clear inbox
        await Inbox.cleanInbox();
    });

    afterEach(async () => {
        // logout
        await AppHeader.logout.do();
    });

    it('should help the user out a little bit', async () => {
        // navigate to the login page
        await AppLogin.navigateTo();

        // open the reset panel
        await AppLogin.forgot.open();

        // add the user email
        await AppLogin.forgot.fields.email.edit(TEST_CREDENTIALS.email);

        // submit
        await AppLogin.forgot.submit();

        // wait for the email to be sent
        await AppPage.delay(1000);

        // grab key from email
        const token = (await Inbox.getLatest()).token;

        // navigate to the forgot link that will handle the token
        await AppForgot.navigateTo(token);

        // expect the user to be logged in
        await expect(AppHeader.currentUser.get())
            .toEqual(TEST_CREDENTIALS.email, 'User is not logged in after password bypass');

        // expect the url to be the user settings page
        await expect(AppPage.currentUrl()).toContain('settings');
    });
});

describe('user delete account', () => {
    beforeEach(async () => {
        // clear inbox
        await Inbox.cleanInbox();
    });

    it('should delete the users account', async () => {
        // login with test account ready for deletion
        await AppLogin.doTestCredentialsLogin(TEST_DELETE_ACCOUNT_CREDENTIALS);

        // navigate to user settings
        await AppHeader.currentUser.go();

        // enter user password
        await AppUserSettings.deleteAccount.fields.password.edit(TEST_DELETE_ACCOUNT_CREDENTIALS.password);

        // submit
        await AppUserSettings.deleteAccount.submit();

        // confirm logged out
        await expect(AppPage.currentUrl())
            .not.toContain('dashboard', 'User did not get logged out after deletion');

        // confirm delete account message
        await expect(AppAlerts.latest())
            .toContain('Account deleted', 'Did not receive correct alert after deletion');

        // confirm user cannot login again
        await AppLogin.navigateTo();
        await AppLogin.fields.email.edit(TEST_DELETE_ACCOUNT_CREDENTIALS.email);
        await AppLogin.fields.password.edit(TEST_DELETE_ACCOUNT_CREDENTIALS.password);
        await AppLogin.doLogin();

        await expect(AppPage.currentUrl())
            .not.toContain('dashboard', 'User account not deleted');

        // wait for email
        await AppPage.delay(1000);

        // check for latest email
        const mail = await Inbox.getLatest();

        expect(mail.body)
            .toContain('account has been deleted', 'Email did not have correct data');
    });
});

describe('manage courses', () => {
    beforeEach(async () => {
        await AppLogin.doTestCredentialsLogin(TEST_CREDENTIALS);
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
        await AppLogin.doTestCredentialsLogin(TEST_CREDENTIALS);
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
        await AppLogin.doTestCredentialsLogin(TEST_CREDENTIALS);
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

        // navigate to dashboard
        await AppHeader.dashboard.go();

        // check for posts from multiple courses
        // (as defined in e2e test data)
        const posts = await AppDashboardOverview.posts.get.all();
        const postCourseNames = posts.map(post => post.course);

        for (const courseName of courseNames) {
            expect(postCourseNames)
                .toContain(courseName, `course ${courseName} has no posts in dashboard`);
        }

        // switch to calendar view
        await AppDashboardOverview.view.toCalendar();

        // check for posts in calendar
        // (as defined in e2e test data)
        await expect(AppDashboardOverview.calendar.posts.count()).toBeGreaterThan(0);
    });
});

describe('dashboard course overview', () => {
    it('should interact', async () => {
        await AppLogin.doTestCredentialsLogin(TEST_CREDENTIALS);
        await AppDashboardSideBar.navigateToManageCourses();
        await AppManageCourses.courses.schedule.remove.all();

        // add course and remember name
        await AppManageCourses.courses.available.add.byIndex(0);
        const courseName = await AppManageCourses.courses.schedule.get.byIndex(0);

        // return to dashboard
        await AppHeader.dashboard.go();

        // navigate to the course overview
        await AppDashboardSideBar.navigateToCourse.byName(courseName);

        // should only display posts from the selected course
        const posts = await AppDashboardCourseOverview.posts.get.all();
        const postCourseNames = posts.map(p => p.course);

        expect(posts.length).toBeGreaterThan(0, 'no posts displayed for course');

        for (const postCourseName of postCourseNames) {
            expect(postCourseName)
                .toContain(courseName, 'posts from another course displayed');
        }

        // should display posts in the calendar
        await AppDashboardCourseOverview.view.toCalendar();

        await expect(AppDashboardCourseOverview.calendar.posts.count()).toBeGreaterThan(0);

        // return to list
        await AppDashboardCourseOverview.view.toList();

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

        // should erase the comment
        await AppDashboardPostView.comments.erase.byIndex(0);
        const erased_comment = await AppDashboardPostView.comments.get.byIndex(0);
        await expect(erased_comment.content)
            .toEqual('[deleted]', 'comment content not erased');

        // should erase the post
        await AppDashboardPostView.post.erase();
        const erased_post = await AppDashboardPostView.post.get();
        expect(erased_post.content).toEqual('[deleted]', 'post content not erased');
    });

    it('should paginate', async () => {
        await AppLogin.doTestCredentialsLogin(TEST_CREDENTIALS);
        await AppDashboardSideBar.navigateToManageCourses();
        await AppManageCourses.courses.schedule.remove.all();

        // add course and remember name
        await AppManageCourses.courses.available.add.byIndex(5);
        const courseName = await AppManageCourses.courses.schedule.get.byIndex(0);

        await AppHeader.dashboard.go();

        // navigate to that course overview
        await AppDashboardSideBar.navigateToCourse.byName(courseName);

        // grab login token for use with api
        const token = await ApiDirectAccess.login(TEST_CREDENTIALS);

        const addPost = async () => {
            // should add a post with randomized data to prevent duplication in subsequent tests
            // use direct api access to speed up test
            const post = {
                title: `I am an e2e title ${Math.random()}`,
                content: `I am an e2e content ${Math.random()}`,
                category: { id: 1 }, // random example category
                author: TEST_CREDENTIALS.email,
                course: { id: 2 } // id for linear algebra
            };

            await ApiDirectAccess.post.add(token, post);
        };

        const default_count = 20;

        for (let i = 0; i < 50; i++) {
            await addPost();
        }

        // refresh to view new posts
        await AppPage.refresh();

        const page_one_posts = await AppDashboardCourseOverview.posts.get.all();

        // default count is 20
        await expect(page_one_posts.length).toEqual(default_count);

        // navigate to next page
        await AppDashboardCourseOverview.posts.paginate.next();

        const page_two_posts = await AppDashboardCourseOverview.posts.get.all();

        // should remain same default count, but different posts
        await expect(page_two_posts.length).toEqual(default_count);
        await expect(page_two_posts).not.toEqual(page_one_posts);
    });
});

