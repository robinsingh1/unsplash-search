/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

import {Home} from './home';
import {Search} from './search';
import {AppState} from './app.service';
import {RouterActive} from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    body {
      margin: 0;
    }
    md-toolbar ul {
      display: inline;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 60px;
    }
    md-toolbar li {
      display: inline;
    }
    md-toolbar li.active {
      background-color: lightgray;
    }
  `],
  template: `
    <md-toolbar color="primary">
      <span>{{ name }}</span>
      <nav>
        <ul style="display:none">
          <li router-active>
            <a [routerLink]=" ['Index'] ">Index</a>
          </li>
          |
          <li router-active>
            <a [routerLink]=" ['Home'] ">Home</a>
          </li>
          |
          <li router-active>
            <a [routerLink]=" ['About'] ">About</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['Search'] ">Search</a>
          </li>
        </ul>
      </nav>
    </md-toolbar>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre style="display:none">
      this.appState.state = {{ appState.state | json }}</pre>

    <tr ng-repeat="(key, value) in this.appState.state">
      <td> {{key}} </td> <td> {{ value }} </td>
    </tr>

    <footer>
    </footer>
  `
})

@RouteConfig([
  { path: '/', name: 'Index', component: Search, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/search',  name: 'Search',  component: Search },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Unsplash Search';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
