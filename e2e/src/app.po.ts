import { browser, by, element } from 'protractor';

export const TEST_CREDENTIALS = {
    email: 'test@example.com',
    password: 'password123'
};

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
        return element(by.css('app-root app-home h1')).getText();
    }

    static navigateToRegister() {
        return element(by.css('app-root app-home a.register')).click();
    }
}

export class AppHeader {
    static navigateToLogin() {
        return element(by.css('app-root app-header a.login')).click();
    }

    static navigateToRegister() {
        return element(by.css('app-root app-header a.register')).click();
    }

    static navigateToLogout() {
        return element(by.css('app-root app-header a.logout')).click();
    }

    static isPresent() {
        return element(by.css('app-root app-header')).isPresent();
    }
}

export class AppFooter {
    static isPresent() {
        return element(by.css('app-root app-footer')).isPresent();
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
        return element(by.css('app-root app-login a.register')).click();
    }

    static doLogin() {
        return element(by.css('app-root app-login button[type=submit]')).click();
    }

    static async doTestCredentialsLogin() {
        await AppLogin.navigateTo();
        await AppLogin.fields.email.edit(TEST_CREDENTIALS.email);
        await AppLogin.fields.password.edit(TEST_CREDENTIALS.password);
        await AppLogin.doLogin();
    }

    static doLogout() {
        // TODO right now this simply refreshes the page, which erases the redux state
        // it should hit a button that causes the redux state to be flushed
        return browser.refresh();
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

export class AppManageCourses {
    static fields = {
        search: {
            edit(text: string) {
                return element(by.css('app-root app-manage-courses input.search')).sendKeys(text);
            }
        },
        subject: {
            select(optionPartial: string) {
                return element(by.cssContainingText('option', optionPartial)).click();
            }
        }
    };

    static courses = {
        available: {
            count() {
                return element.all(by.css('app-root app-manage-courses .course.available')).count();
            },
            get: {
                byIndex(index: number) {
                    return element.all(by.css('app-root app-manage-courses .course.available .course-name'))
                        .get(index)
                        .getText();
                },
                all() {
                    return element.all(by.css('app-root app-manage-courses .course.available .course-name'))
                        .map(ef => ef.getText());
                }
            },
            add: {
                byIndex(index: number) {
                    return element.all(by.css('app-root app-manage-courses .course.available button.add'))
                        .get(index)
                        .click();
                }
            }
        },
        schedule: {
            count() {
                return element.all(by.css('app-root app-manage-courses .course.schedule')).count();
            },
            get: {
                byIndex(index: number) {
                    return element.all(by.css('app-root app-manage-courses .course.schedule .course-name'))
                        .get(index)
                        .getText();
                },
                all() {
                    return element.all(by.css('app-root app-manage-courses .course.schedule .course-name'))
                        .map(ef => ef.getText());
                }
            },
            remove: {
                byIndex(index: number) {
                    return element.all(by.css('app-root app-manage-courses .course.schedule button.remove'))
                        .get(index)
                        .click();
                },
                all() {
                    return element.all(by.css('app-root app-manage-courses .course.schedule button.remove'))
                        .each(ef => ef.click());
                }
            }
        }
    };

    static navigateTo() {
        return browser.get('/dashboard/manage');
    }
}

export class AppDashboard {
    static courses = {
        count() {
            return element.all(by.css('app-root app-dashboard-home a.course')).count();
        }
    };

    static navigateTo() {
        return browser.get('/dashboard/');
    }
}

export class AppDashboardSideBar {
    static courses = {
        count() {
            return element.all(by.css('app-root nav.sidebar a.course')).count();
        }
    };

    static navigateToManageCourses() {
        return element(by.css('app-root app-dashboard-home a.manage')).click();
    }
}
