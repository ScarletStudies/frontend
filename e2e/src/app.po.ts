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

    static refresh() {
        return browser.refresh();
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
    static currentUser = {
        get() {
            return element(by.css('app-root app-header .current-user')).getText();
        },
        isLoggedIn() {
            return element(by.css('app-root app-header .current-user')).isPresent();
        }
    };

    static logout = {
        do() {
            return element(by.css('app-root app-header .logout')).click();
        },
        isPresent() {
            return element(by.css('app-root app-header .logout')).isPresent();
        }
    };

    static login = {
        go() {
            return element(by.css('app-root app-header a.login')).click();
        },
        isPresent() {
            return element(by.css('app-root app-header a.login')).isPresent();
        }
    };

    static register = {
        go() {
            return element(by.css('app-root app-header a.register')).click();
        },
        isPresent() {
            return element(by.css('app-root app-header a.register')).isPresent();
        }
    };

    static dashboard = {
        isPresent() {
            return element(by.css('app-root app-header a.dashboard')).isPresent();
        }
    };

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

    static doTestCredentialsLogin() {
        return AppLogin.navigateTo()
            .then(
                () => AppLogin.fields.email.edit(TEST_CREDENTIALS.email)
            )
            .then(
                () => AppLogin.fields.password.edit(TEST_CREDENTIALS.password)
            )
            .then(
                () => AppLogin.doLogin()
            );
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
                    return new Promise(
                        async resolve => {
                            const selector = 'app-root app-manage-courses .course.schedule button.remove';
                            while (0 < await element.all(by.css(selector)).count()) {
                                await element.all(by.css('app-root app-manage-courses .course.schedule button.remove'))
                                    .first()
                                    .click();
                            }

                            resolve();
                        }
                    );

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

    static navigateToCourse = {
        byName(name: string) {
            return element(by.cssContainingText('app-root nav.sidebar a.course', name)).click();
        }
    };

    static navigateToManageCourses() {
        return element(by.css('app-root nav.sidebar a.manage')).click();
    }

    static navigateToDashboardOverview() {
        return element(by.css('app-root nav.sidebar a.dashboard')).click();
    }
}

export class AppDashboardOverview {
    static posts = {
        get: {
            count() {
                return element.all(by.css('app-root app-dashboard-overview app-post-list-item')).count();
            },
            async all() {
                const postRefs = await element.all(by.css('app-root app-dashboard-overview app-post-list-item'));

                const posts = [];

                for (const postRef of postRefs) {
                    posts.push({
                        course: await postRef.element(by.css('.post-course')).getText()
                    });
                }

                return posts;
            }
        }
    };

    static message = {
        get() {
            return element(by.css('app-root app-dashboard-overview .empty-message')).getText();
        }
    };
}

export class AppDashboardCourseOverview {
    static posts = {
        get: {
            count() {
                return element.all(by.css('app-root app-course app-post-list-item')).count();
            },
            async all() {
                const postRefs = await element.all(by.css('app-root app-course app-post-list-item'));

                const posts = [];

                for (const postRef of postRefs) {
                    posts.push({
                        course: await postRef.element(by.css('.post-course')).getText(),
                        title: await postRef.element(by.css('.post-title')).getText(),
                        content: await postRef.element(by.css('.post-content')).getText(),
                    });
                }

                return posts;
            }
        },
        async add({ title, content, category }) {
            await element(by.css('app-root app-course .open-new-post-modal')).click();

            // input data
            await element(by.css('.new-post-modal-body textarea#newPostContent')).sendKeys(content);
            await element(by.css('.new-post-modal-body input#newPostTitle')).sendKeys(title);

            await element(by.cssContainingText('.new-post-modal-body #newPostCategory option', category)).click();

            await element(by.css('.new-post-modal-body button[type=submit]')).click();
        }
    };
}
