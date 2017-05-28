import { ImgureaderPage } from './app.po';

describe('imgureader App', () => {
    let page: ImgureaderPage;

    beforeEach(() => {
        page = new ImgureaderPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
