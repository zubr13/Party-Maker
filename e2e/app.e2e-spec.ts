import { PartyMakerPage } from './app.po';

describe('party-maker App', () => {
  let page: PartyMakerPage;

  beforeEach(() => {
    page = new PartyMakerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
