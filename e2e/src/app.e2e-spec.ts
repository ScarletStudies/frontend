import {
    AppPage,
    AppDashboard,
    AppDashboardSideBar,
    AppFooter,
    AppHome,
    AppHeader,
    AppLogin,
    AppManageCourses,
    AppRegister,
    TEST_CREDENTIALS
} from './app.po';

describe('home page', () => {
    it('should display welcome message', async () => {
        await AppPage.navigateTo();
        await expect(AppHome.getJumbotronHeader()).toEqual('Scarlet Studies');
    });

    it('should link to the register page in the jumbotron', async () => {
        await AppPage.navigateTo();
        await AppHome.navigateToRegister();
        await expect(AppPage.currentUrl()).toContain('register');
    });
});

describe('app header', () => {
    it('should update the header when user is logged in', async () => {
        // login
        await AppLogin.doTestCredentialsLogin();

        // user info, logout link, dashboard link should be displayed
        await expect(AppHeader.currentUser.isLoggedIn()).toBeTruthy();
        await expect(AppHeader.currentUser.get()).toContain(TEST_CREDENTIALS.email);
        await expect(AppHeader.logout.isPresent()).toBeTruthy();
        await expect(AppHeader.dashboard.isPresent()).toBeTruthy();

        // login and register should be hidden
        await expect(AppHeader.login.isPresent()).toBeFalsy();
        await expect(AppHeader.register.isPresent()).toBeFalsy();
    });

    it('should update the header when user is not logged in', async () => {
        // login and then logout to be sure state is logged out
        await AppLogin.doTestCredentialsLogin();
        await AppHeader.logout.do();

        // login and register should be displayed
        await expect(AppHeader.login.isPresent()).toBeTruthy();
        await expect(AppHeader.register.isPresent()).toBeTruthy();

        // user info and logout link should be hidden
        await expect(AppHeader.currentUser.isLoggedIn()).toBeFalsy();
        await expect(AppHeader.logout.isPresent()).toBeFalsy();
        await expect(AppHeader.dashboard.isPresent()).toBeFalsy();
    });
});

describe('app footer', () => {
    it('should display on all pages', async () => {
        await AppPage.navigateTo();

        await expect(AppFooter.isPresent()).toBeTruthy();

        await AppLogin.navigateTo();

        await expect(AppFooter.isPresent()).toBeTruthy();

        await AppRegister.navigateTo();

        await expect(AppFooter.isPresent()).toBeTruthy();
    });
});

describe('sign up', () => {
    afterEach(async () => {
        try {
            await AppHeader.logout.do();
        } catch (e) { }
    });

    it('should accept an email and password', async () => {
        await AppLogin.navigateTo();
        await AppLogin.fields.email.edit('example@example.com');
        await AppLogin.fields.password.edit('password123'); // don't make this your password
    });

    it('should login', async () => {
        await AppLogin.navigateTo();

        // test credentials
        await AppLogin.fields.email.edit(TEST_CREDENTIALS.email);
        await AppLogin.fields.password.edit(TEST_CREDENTIALS.password);
        await AppLogin.doLogin();

        // should contain user email in header after successful login
        await expect(AppHeader.currentUser.get()).toContain(TEST_CREDENTIALS.email);

        // should navigate to the dashboard after successful login
        await expect(AppPage.currentUrl()).toContain('dashboard');
    });

    it('should persist login through page refresh', async () => {
        await AppLogin.navigateTo();

        // test credentials
        await AppLogin.fields.email.edit(TEST_CREDENTIALS.email);
        await AppLogin.fields.password.edit(TEST_CREDENTIALS.password);
        await AppLogin.doLogin();

        // should contain user email in header after successful login
        await expect(AppHeader.currentUser.get()).toContain(TEST_CREDENTIALS.email);

        await AppPage.refresh();

        // confirm still logged in
        await expect(AppHeader.currentUser.get()).toContain(TEST_CREDENTIALS.email);
    });

    it('should logout', async () => {
        await AppLogin.navigateTo();

        // test credentials
        await AppLogin.fields.email.edit(TEST_CREDENTIALS.email);
        await AppLogin.fields.password.edit(TEST_CREDENTIALS.password);
        await AppLogin.doLogin();

        // should contain user email in header after successful login
        await expect(AppHeader.currentUser.get()).toContain(TEST_CREDENTIALS.email);

        // perform logout
        await AppHeader.logout.do();

        // confirm logged out
        await expect(AppHeader.currentUser.isLoggedIn()).toBeFalsy();
    });

    it('should navigate to the register page', async () => {
        await AppLogin.navigateTo();
        await AppLogin.navigateToRegister();
        await expect(AppPage.currentUrl()).toContain('register');
    });
});

describe('register', () => {
    it('should accept an email, password and password verification', async () => {
        await AppRegister.navigateTo();
        await AppRegister.fields.email.edit('example@example.com');
        await AppRegister.fields.password.edit('password123');
        await AppRegister.fields.passwordConfirmation.edit('password123');
    });
});

describe('manage courses', () => {
    beforeEach(async () => {
        await AppLogin.doTestCredentialsLogin();
        await AppDashboardSideBar.navigateToManageCourses();
        await AppManageCourses.courses.schedule.remove.all();
    });

    it('should navigate to manage courses', async () => {
        await expect(AppPage.currentUrl()).toContain('manage');
    });

    it('should add a course', async () => {
        const courseName = await AppManageCourses.courses.available.get.byIndex(0);

        // before add
        await expect(AppManageCourses.courses.schedule.get.all()).not.toContain(courseName);

        await AppManageCourses.courses.available.add.byIndex(0);

        // after add
        await expect(AppManageCourses.courses.schedule.get.all()).toContain(courseName);
    });

    it('should remove a course', async () => {
        const courseName = await AppManageCourses.courses.available.get.byIndex(0);

        // before add
        await expect(AppManageCourses.courses.schedule.get.all()).not.toContain(courseName);

        await AppManageCourses.courses.available.add.byIndex(0);

        await AppManageCourses.courses.schedule.remove.byIndex(0);

        // after remove
        await expect(AppManageCourses.courses.schedule.get.all()).not.toContain(courseName);
    });

    it('should display a list of courses to add', async () => {
        const courses_count = await AppManageCourses.courses.available.count();

        // default 10 results
        await expect(courses_count).toEqual(10);
    });

    it('should search for a course to add', async () => {
        // search by name
        const courseName = 'Numerical Analysis';

        await AppManageCourses.fields.search.edit(courseName);

        await expect(AppManageCourses.courses.available.get.all()).toContain(courseName);
    });

    it('should list the user\'s courses', async () => {
        // add a course if semester is empty
        const courseCount = await AppManageCourses.courses.schedule.count();

        if (courseCount === 0) {
            await AppManageCourses.courses.available.add.byIndex(0);
        }

        // course to look for
        const courseName = await AppManageCourses.courses.available.get.byIndex(0);

        // logout and login
        await AppHeader.logout.do();
        await AppLogin.doTestCredentialsLogin();
        await AppDashboardSideBar.navigateToManageCourses();

        // confirm presence of course in user list
        await expect(AppManageCourses.courses.schedule.count()).toEqual(1);
        await expect(AppManageCourses.courses.schedule.get.all()).toContain(courseName);
    });
});

describe('dashboard', () => {
    it('should navigate to the dashboard', async () => {
        await AppDashboard.navigateTo();
        await expect(AppPage.currentUrl()).toContain('dashboard');
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
        await expect(AppDashboardSideBar.courses.count()).toEqual(3);
    });
});

