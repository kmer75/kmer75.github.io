import { TutoAngularPage } from './app.po';

describe('tuto-angular App', function() {
  let page: TutoAngularPage;

  beforeEach(() => {
    page = new TutoAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
