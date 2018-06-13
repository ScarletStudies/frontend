import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    public frontendDependencies = [
        {
            name: '@angular',
            license: 'MIT',
            link: 'https://angular.io/'
        },
        {
            name: '@auth0/angular-jwt',
            license: 'MIT',
            link: 'https://github.com/auth0/angular2-jwt'
        },
        {
            name: '@ng-bootstrap/ng-bootstrap',
            license: 'MIT',
            link: 'https://ng-bootstrap.github.io/#/home'
        },
        {
            name: '@ngrx',
            license: 'MIT',
            link: 'https://github.com/ngrx'
        },
        {
            name: '@ngx-loading-bar',
            license: 'MIT',
            link: 'https://github.com/aitboudad/ngx-loading-bar'
        },
        {
            name: 'angular-calendar',
            license: 'MIT',
            link: 'https://github.com/mattlewis92/angular-calendar',
        },
        {
            name: 'bootstrap',
            license: 'MIT',
            link: 'https://github.com/twbs/bootstrap',
        },
        {
            name: 'font-awesome 4.7',
            license: 'MIT, OFL-1.1',
            link: 'https://fontawesome.com/v4.7.0/',
        },
        {
            name: 'holderjs',
            license: 'MIT',
            link: 'http://holderjs.com/',
        },
        {
            name: 'moment.js',
            license: 'MIT',
            link: 'https://momentjs.com/',
        },
        {
            name: 'ngrx-store-localstorage',
            license: 'MIT',
            link: 'https://github.com/btroncone/ngrx-store-localstorage',
        },
        {
            name: 'ngx-quill',
            license: 'MIT',
            link: 'https://github.com/KillerCodeMonkey/ngx-quill',
        },
        {
            name: 'ngx-toastr',
            license: 'MIT',
            link: 'https://github.com/scttcper/ngx-toastr',
        },
        {
            name: 'quill',
            license: 'BSD-3-Clause',
            link: 'https://quilljs.com/',
        },
    ];

    public backendDependencies = [
        {
            name: 'Flask-Migrate',
            license: 'MIT',
            link: 'https://github.com/miguelgrinberg/Flask-Migrate',
        },
        {
            name: 'bleach',
            license: 'Apache-2.0',
            link: 'https://github.com/mozilla/bleach',
        },
        {
            name: 'Flask',
            license: 'BSD-3-Clause',
            link: 'https://github.com/pallets/flask',
        },
        {
            name: 'Flask-Cors',
            license: 'MIT',
            link: 'https://github.com/corydolphin/flask-cors',
        },
        {
            name: 'Flask-Mail',
            license: 'BSD-3-Clause',
            link: 'https://github.com/mattupstate/flask-mail',
        },
        {
            name: 'flask-praetorian',
            license: 'MIT',
            link: 'https://github.com/dusktreader/flask-praetorian',
        },
        {
            name: 'flask-restplus',
            license: 'BSD-3-Clause',
            link: 'https://github.com/noirbizarre/flask-restplus',
        },
        {
            name: 'Flask-RQ2',
            license: 'MIT',
            link: 'https://github.com/rq/Flask-RQ2',
        },
        {
            name: 'Flask-SQLAlchemy',
            license: 'BSD-3-Clause',
            link: 'https://github.com/mitsuhiko/flask-sqlalchemy',
        },
        {
            name: 'PyMySQL',
            license: 'MIT',
            link: 'https://github.com/PyMySQL/PyMySQL',
        },
        {
            name: 'pytest',
            license: 'MIT',
            link: 'https://docs.pytest.org/en/latest/',
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
