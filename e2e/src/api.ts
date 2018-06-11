const request = require('request');

export class ApiDirectAccess {
    static post = {
        add(token, post) {
            return new Promise<{}>(
                (resolve, reject) => {
                    const options = {
                        method: 'POST',
                        url: 'http://localhost:5000/posts/',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        json: post
                    };

                    request(
                        options,
                        (error, response, body) => {
                            if (error) {
                                return reject(error);
                            }

                            if (response.statusCode >= 400) {
                                return reject(response.statusMessage);
                            }

                            return resolve();
                        }
                    );
                }
            );
        }
    };

    static login(credentials) {
        return new Promise<string>(
            (resolve, reject) => {
                const options = {
                    method: 'POST',
                    url: 'http://localhost:5000/users/login',
                    json: credentials
                };

                request(
                    options,
                    (error, response, body) => {
                        if (error) {
                            return reject(error);
                        }

                        if (response.statusCode >= 400) {
                            return reject(response.statusMessage);
                        }

                        return resolve(body.jwt);
                    }
                );
            }
        );
    }
}

