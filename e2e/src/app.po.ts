import { browser, by, element } from 'protractor';

export const TEST_CREDENTIALS = {
    email: 'test@example.com',
    password: 'password123'
};

export const TEST_REGISTER_CREDENTIALS = {
    email: `${Math.random()}@fakerutgers.edu`,
    password: 'stringstring',
    verification: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.QzXsVYhb03aYF0BmRyl_yKl8GVpNlz5OFzpAshUit1w'
};

export const TEST_CHANGE_PASSWORD_CREDENTIALS = {
    email: 'passwordchange@fakerutgers.edu',
    password: 'strongstrong'
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

    static delay(ms: number) {
        return browser.sleep(ms);
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
        },
        go() {
            return element(by.css('app-root app-header .current-user')).click();
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
        },
        go() {
            return element(by.css('app-root app-header a.dashboard')).click();
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

    static forgot = {
        open() {
            return element(by.css('app-root app-login .forgot-open')).click();
        },
        fields: {
            email: {
                edit(text: string) {
                    return element(by.css('app-root app-login input#forgotPasswordEmail')).sendKeys(text);
                }
            }
        },
        submit() {
            return element(by.css('app-root app-login button.forgot-submit')).click();
        }
    };

    static navigateTo() {
        return browser.get('/login');
    }

    static navigateToRegister() {
        return element(by.css('app-root app-login a.register')).click();
    }

    static doLogin() {
        return element(by.css('app-root app-login button.login')).click();
    }

    static doTestCredentialsLogin(credentials: { email: string, password: string }) {
        return AppLogin.navigateTo()
            .then(
                () => AppLogin.fields.email.edit(credentials.email)
            )
            .then(
                () => AppLogin.fields.password.edit(credentials.password)
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
                return element(by.css('app-root app-register input#email'))
                    .sendKeys(text);
            },
            get() {
                return element(by.css('app-root app-register input#email'))
                    .getAttribute('value');
            }
        },
        password: {
            edit(text: string) {
                return element(by.css('app-root app-register input#password'))
                    .sendKeys(text);
            },
            get() {
                return element(by.css('app-root app-register input#password'))
                    .getAttribute('value');
            }
        },
        passwordConfirmation: {
            edit(text: string) {
                return element(by.css('app-root app-register input#passwordConfirmation'))
                    .sendKeys(text);
            },
            get() {
                return element(by.css('app-root app-register input#passwordConfirmation'))
                    .getAttribute('value');
            }
        },
    };

    static messages = {
        success() {
            return element(by.css('app-root app-register .registration-success')).getText();
        }
    };

    static reset = {
        fields: {
            email: {
                edit(text: string) {
                    return element(by.css('app-root app-register input#resendEmail'))
                        .sendKeys(text);
                }
            }
        },

        messages: {
            success() {
                return element(by.css('app-root app-register .resend-success')).getText();
            }
        },

        open() {
            return element(by.css('app-root app-register .resend-open')).click();
        },

        submit() {
            return element(by.css('app-root app-register .resend-submit')).click();
        }
    };

    static navigateTo() {
        return browser.get('/register');
    }

    static doRegister() {
        return element(by.css('app-root app-register button.register-submit')).click();
    }
}

export class AppVerify {
    static messages = {
        success() {
            return element(by.css('app-root app-verify .verification-success')).getText();
        }
    };

    static navigateTo(code: string) {
        return browser.get(`/verify/${code}`);
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
            return element.all(by.css('app-root app-semester-courses a.course')).count();
        }
    };

    static navigateToCourse = {
        byName(name: string) {
            return element(by.cssContainingText('app-root app-semester-courses a.course', name)).click();
        }
    };

    static navigateToManageCourses() {
        return element(by.css('app-root app-semester-courses a.manage')).click();
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
                        author: await postRef.element(by.css('.post-author')).getText(),
                        category: await postRef.element(by.css('.post-category')).getText(),
                    });
                }

                return posts;
            },
            async byIndex(index: number) {
                const postRef = await element.all(by.css('app-root app-course app-post-list-item'))
                    .get(index);

                return {
                    course: await postRef.element(by.css('.post-course')).getText(),
                    title: await postRef.element(by.css('.post-title')).getText(),
                    author: await postRef.element(by.css('.post-author')).getText(),
                    category: await postRef.element(by.css('.post-category')).getText(),
                };
            }
        },
        async add({ title, content, category }) {
            await element(by.css('app-root app-course .open-new-post-modal')).click();

            // input data
            await element(by.css('.new-post-modal-body #newPostContent div.ql-editor[contenteditable]')).sendKeys(content);
            await element(by.css('.new-post-modal-body input#newPostTitle')).sendKeys(title);

            await element(by.cssContainingText('.new-post-modal-body #newPostCategory option', category)).click();

            await element(by.css('.new-post-modal-body button[type=submit]')).click();
        },
        open: {
            byIndex(index: number) {
                return element.all(by.css('app-root app-course app-post-list-item .open-view-post-modal'))
                    .get(index)
                    .click();
            }
        },
        loadMore: {
            do() {
                return element(by.css('app-root app-course app-post-list .load-more')).click();
            },
            isPresent() {
                return element(by.css('app-root app-course app-post-list .load-more')).isPresent();
            }
        }
    };
}

export class AppDashboardPostView {
    static post = {
        async get() {
            return {
                course: await element(by.css('app-root app-view-post .post-course')).getText(),
                title: await element(by.css('app-root app-view-post .post-title')).getText(),
                content: await element(by.css('app-root app-view-post .post-content')).getText(),
                author: await element(by.css('app-root app-view-post .post-author')).getText(),
                category: await element(by.css('app-root app-view-post .post-category')).getText()
            };
        }
    };

    static comments = {
        get: {
            async byIndex(index: number) {
                const commentRef = await element.all(by.css('app-root app-view-post .post-comment'))
                    .get(index);

                return {
                    content: await commentRef.element(by.css('.comment-content')).getText(),
                    author: await commentRef.element(by.css('.comment-author')).getText()
                };
            }
        },
        add({ content }) {
            return element(by.css('app-root app-view-post #comment-content div.ql-editor[contenteditable]'))
                .sendKeys(content)
                .then(
                    () => element(by.css('app-root app-view-post button#comment-submit')).click()
                );
        }
    };

    static cheers = {
        do() {
            return element(by.css('app-root app-view-post app-cheer-image')).click();
        },
        get() {
            return element(by.css('app-root app-view-post .cheer-count')).getText();
        }
    };
}

export class AppUserSettings {
    static changePassword = {
        fields: {
            old: {
                edit(text: string) {
                    return element(by.css('app-root app-user-settings form.change-password #currentPassword')).sendKeys(text);
                }
            },
            pass: {
                edit(text: string) {
                    return element(by.css('app-root app-user-settings form.change-password #newPassword')).sendKeys(text);
                }
            },
            passRepeat: {
                edit(text: string) {
                    return element(by.css('app-root app-user-settings form.change-password #newPasswordConfirmation')).sendKeys(text);
                }
            }
        },
        message: {
            get() {
                return element(by.css('app-root app-user-settings form.change-password .alert')).getText();
            }
        },
        submit() {
            return element(by.css('app-root app-user-settings form.change-password button[type=submit]')).click();
        }
    };
}

export class AppForgot {
    static navigateTo(token: string) {
        return browser.get(`/user/forgot/${token}`);
    }
}
