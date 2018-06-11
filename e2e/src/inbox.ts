/*
 * thanks to https://gist.github.com/icebob/d90d6022bc73cd1bfe86d24ebdbb8314#file-mailtrap-helper-js
 */

const request = require('request');

const MAILTRAP_API = process.env.MAILTRAP_API_KEY;
const MAILTRAP_INBOX = process.env.MAILTRAP_INBOX;

const baseURL = 'https://mailtrap.io/api/v1/';
const headers = {
    'Content-Type': 'application/json',
    'Api-Token': MAILTRAP_API
};

export class Inbox {
    static getLatest() {
        return new Promise<{ token: string, body: string }>(
            (resolve, reject) => {
                const options = {
                    method: 'GET',
                    url: `${baseURL}/inboxes/${MAILTRAP_INBOX}/messages`,
                    headers
                };

                request(options,
                    (error, response, body) => {
                        if (error) {
                            return reject(error);
                        }

                        if (response.statusCode >= 400) {
                            return reject(response.statusMessage);
                        }

                        const messages = JSON.parse(body);

                        if (messages.length === 0) {
                            return reject('No emails received');
                        }

                        // Get the last email body
                        const html = messages[0].text_body;

                        // tslint:disable:max-line-length
                        const re = /https:\/\/www\.scarletstudies\.org\/(?:forgot|verify)\/([a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+)/g;
                        // tslint:enable:max-line-length

                        const match = re.exec(body);

                        if (match) {
                            return resolve({ token: match[1], body: html });
                        }

                        return resolve({ token: null, body: html });
                    });
            }
        );
    }

    static cleanInbox() {
        return new Promise(
            (resolve, reject) => {
                const options = {
                    method: 'PATCH',
                    url: `${baseURL}/inboxes/${MAILTRAP_INBOX}/clean`,
                    headers
                };

                request(options,
                    (error, response, body) => {
                        resolve();
                    });
            }
        );
    }

    static deleteMessage(messageId) {
        return new Promise(
            (resolve, reject) => {
                const options = {
                    method: 'DELETE',
                    url: `${baseURL}/inboxes/${MAILTRAP_INBOX}/clean`,
                    headers
                };

                request(options,
                    (error, response, body) => {
                        resolve();
                    });
            }
        );
    }
}

