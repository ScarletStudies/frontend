import {
    AppPage,
    AppHome,
    AppHeader,
    AppLogin,
    AppRegister
} from './app.po';

describe('home page', () => {
    it('should display welcome message', async () => {
        await AppPage.navigateTo();
        await expect(AppHome.getJumbotronHeader()).toEqual('Scarlet Studies');
    });
});

describe('sign up', () => {
    it('should navigate to the login page from the home page', async () => {
        await AppPage.navigateTo();
        await AppHeader.navigateToLogin();
        await expect(AppPage.currentUrl()).toContain('login');
    });

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
