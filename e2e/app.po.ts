import { browser, element, by } from 'protractor';

export class TaskerWebNewCLIPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
