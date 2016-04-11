'use strict';

describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    //browser.get('/#/search');
    browser.get('/')
  });

  it('show images on successful search', () => {
    let searchQry = element(by.css('input#search')).sendKeys("office")
    element(by.css('#search-btn')).click()
    browser.driver.sleep(4000);
    var img = element.all(by.css('img'))
    expect(img.count()).toEqual(10);
  })

  it('show empty view on null search', () => {
    let searchQry = element(by.css('input#search')).sendKeys("asdf")
    element(by.css('#search-btn')).click()
    browser.driver.sleep(4000);
    expect(element(by.css('#empty-span')).isDisplayed()).toBeTruthy()
  })

  it('show lightbox on image click', () => {
    let searchQry = element(by.css('input#search')).sendKeys("office")
    element(by.css('#search-btn')).click()
    browser.driver.sleep(4000);
    element.all(by.css('img')).get(0).click()
    expect(element(by.css('#lightbox')).isDisplayed()).toBeTruthy()
  })

  it('hide modal on close button click', () => {
    let searchQry = element(by.css('input#search')).sendKeys("office")
    element(by.css('#search-btn')).click()
    browser.driver.sleep(4000);
    element.all(by.css('img')).get(0).click()
    browser.driver.sleep(2000);
    element(by.css('#close-button')).click()
    expect(element(by.css('#lightbox')).isDisplayed()).toBeFalsy()
  })

  /*
  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Webpack Starter by @gdi2990 from @AngularClass';
    expect(subject).toEqual(result);
  });

  it('should have `your content here` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'Your Content Here';
    expect(subject).toEqual(result);
  });
  */
});
