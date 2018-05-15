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
    it('should navigate to the login page', async () => {
        await AppPage.navigateTo();
        await AppHeader.navigateToLogin();
        await expect(AppPage.currentUrl()).toContain('login');
    });

    it('should navigate to the register page', async () => {
        await AppPage.navigateTo();
        await AppHeader.navigateToRegister();
        await expect(AppPage.currentUrl()).toContain('register');
    });

    it('should display on all pages', async () => {
        await AppPage.navigateTo();

        await expect(AppHeader.isPresent()).toBeTruthy();

        await AppLogin.navigateTo();

        await expect(AppHeader.isPresent()).toBeTruthy();

        await AppRegister.navigateTo();

        await expect(AppHeader.isPresent()).toBeTruthy();
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
        // should navigate to the dashboard after successful login
        await expect(AppPage.currentUrl()).toContain('dashboard');
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
});

describe('dashboard', () => {
    it('should navigate to the dashboard', async () => {
        await AppDashboard.navigateTo();
        await expect(AppPage.currentUrl()).toContain('dashboard');
    });

    it('should display a list of links to user courses', async () => {
        await AppDashboard.navigateTo();
        const courses_count = await AppDashboard.courses.count();
        await expect(courses_count).toBeGreaterThan(0);
    });
});
