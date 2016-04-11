import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import {Title} from './title';
import {XLarge} from './x-large';

var CLIENT_ID = "682de12e3fdd423ee49ccd8e407db26dcb24e1f02cd282d8b0b8958da4aa6ebb"
var BASE_URL = "https://api.unsplash.com/photos/search"

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'search',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./search.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./search.html')
})

//@Injectable()
export class Search {
  // Set our default values
  localState = { 
    page:1,
    value: '' , 
    images: [], 
    imagesFound: "initial",
    selectedImg:false, 
    numberOfSearches:0,
    loading:false
  };

  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, public http: Http) {

  }

  ngOnInit() {
    console.log('hello `Search` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  clicked(e) {
    console.log(e)
    console.log(e.target.currentSrc)
    // Add Overlay
    this.localState.selectedImg = e.target.currentSrc
  }

  closeModal(e) {
    this.localState.selectedImg = false
  } 

  submitState(value) {
    //TODO Empty Result
    //TODO Tests

    //TODO Detail
    //TODO Add Loading

    this.localState.loading = true
    
    var url = `${BASE_URL}?page=${this.localState.page}&query=${value}&client_id=${CLIENT_ID}`
    console.log(url)
    var _this = this;
    this.http.get(url)
      .map( (responseData) => {
        console.log('request')
        console.log(responseData.json())
        return responseData.json();
      })
      .subscribe(
        data => { 
          _this.localState.numberOfSearches = _this.localState.numberOfSearches + 1
          _this.localState.images  = data;
          _this.localState.imagesFound  = data.length;
          _this.localState.loading = false
        },
        err => { console.log(err); },
        () => {  }
      )
  }
}
