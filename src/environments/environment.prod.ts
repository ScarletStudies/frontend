export const environment = {
    production: true,
    api: 'http://localhost:5000',
    whitelistedDomains: ['localhost:5000'],
    blacklistedRoutes: ['http://localhost:5000/users/login', 'http://localhost:5000/users/refresh']
};
