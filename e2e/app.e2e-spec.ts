import { TaskerWebNewCLIPage } from './app.po';

describe('tasker-web-new-cli App', function() {
  let page: TaskerWebNewCLIPage;

  beforeEach(() => {
    page = new TaskerWebNewCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
