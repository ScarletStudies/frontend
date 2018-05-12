import { browser, by, element } from 'protractor';

export class AppPage {
    static navigateTo() {
        return browser.get('/');
    }

    static currentUrl() {
        return browser.getCurrentUrl();
    }
}

export class AppHome {
    static getJumbotronHeader() {
        return element(by.css('app-root h1')).getText();
    }
}

export class AppHeader {
    static navigateToLogin() {
        return element(by.css('app-root a.login')).click();
    }
}

export class AppLogin {
    static fields = {
        email: {
            edit(text: string) {
                return element(by.css('app-root app-login input#email')).sendKeys(text);
            }
        },
        password: {
            edit(text: string) {
                return element(by.css('app-root app-login input#password')).sendKeys(text);
            }
        },
    };

    static navigateTo() {
        return browser.get('/login');
    }

    static navigateToRegister() {
        return element(by.css('app-root a.register')).click();
    }
}

export class AppRegister {
    static fields = {
        email: {
            edit(text: string) {
                return element(by.css('app-root app-register input#email')).sendKeys(text);
            }
        },
        password: {
            edit(text: string) {
                return element(by.css('app-root app-register input#password')).sendKeys(text);
            }
        },
        passwordConfirmation: {
            edit(text: string) {
                return element(by.css('app-root app-register input#passwordConfirmation')).sendKeys(text);
            }
        },
    };

    static navigateTo() {
        return browser.get('/register');
    }
}
