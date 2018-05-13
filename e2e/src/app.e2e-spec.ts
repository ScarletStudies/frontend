import {
    AppPage,
    AppFooter,
    AppHome,
    AppHeader,
    AppLogin,
    AppManageCourses,
    AppRegister
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
    it('should navigate to manage courses', async () => {
        await AppManageCourses.navigateTo();
        await expect(AppPage.currentUrl()).toContain('manage');
    });

    it('should display a list of courses to add', async () => {
        await AppManageCourses.navigateTo();
        const courses_count = await AppManageCourses.courses.available.count();
        await expect(courses_count).toBeGreaterThan(0);
    });

    it('should search for a course to add', async () => {
        await AppManageCourses.navigateTo();
        await AppManageCourses.fields.search.edit('example search');
        await AppManageCourses.fields.subject.select('Computer Science');
    });
});
