import { ChatFirebasePage } from './app.po';

describe('chat-firebase App', () => {
  let page: ChatFirebasePage;

  beforeEach(() => {
    page = new ChatFirebasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
