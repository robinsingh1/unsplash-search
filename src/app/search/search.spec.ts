import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

// Load the implementations that should be tested
import {Search} from './search.component';
import {Title} from './title';
import {AppState} from '../app.service';

describe('Search', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    AppState,
    Title,
    Search
  ]);

  it('should have a title', inject([ Search ], (search) => {
    expect(!!search.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Search ], (search) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    search.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
