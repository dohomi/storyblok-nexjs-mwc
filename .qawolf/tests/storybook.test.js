const { launch } = require("qawolf");
const selectors = require("../selectors/storybook");

describe('storybook', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: "https://play.lumen.media/" });
  });

  afterAll(() => browser.close());

  it('can click "Button List" link', async () => {
    await browser.click(selectors[0]);
  });

  it('can click "Icon List" link', async () => {
    await browser.click(selectors[1]);
  });

  it('can click "Fab List" link', async () => {
    await browser.click(selectors[2]);
  });

  it('can click "Images List" link', async () => {
    await browser.click(selectors[3]);
  });

  it('can click "Images List FAB" link', async () => {
    await browser.click(selectors[4]);
  });

  it('can click "Playground" link', async () => {
    await browser.click(selectors[5]);
  });

  it('can click "Button" link', async () => {
    await browser.click(selectors[6]);
  });

  it('can click "Mui Button with image" link', async () => {
    await browser.click(selectors[7]);
  });

  it('can click "Mui special addons" link', async () => {
    await browser.click(selectors[8]);
  });

  it('can click "Playground" link', async () => {
    await browser.click(selectors[9]);
  });

  it('can click "Cards" link', async () => {
    await browser.click(selectors[10]);
  });

  it('can click "Card List Over Image" link', async () => {
    await browser.click(selectors[11]);
  });

  it("can scroll", async () => {
    await browser.scroll(selectors[12], { x: 0, y: 200 });
  });

  it('can click "Card List Responsive" link', async () => {
    await browser.click(selectors[13]);
  });

  it('can click "Card List Crop Description" link', async () => {
    await browser.click(selectors[14]);
  });

  it('can click "Card Icons" link', async () => {
    await browser.click(selectors[15]);
  });

  it('can click "Card with actions" link', async () => {
    await browser.click(selectors[16]);
  });

  it('can click "Playground" link', async () => {
    await browser.click(selectors[17]);
  });

  it("can scroll", async () => {
    await browser.scroll(selectors[18], { x: 0, y: 471 });
  });

  it('can click "Divider" link', async () => {
    await browser.click(selectors[19]);
  });

  it('can click "Flex Row" link', async () => {
    await browser.click(selectors[20]);
  });

  it('can click "Playground" link', async () => {
    await browser.click(selectors[21]);
  });

  it('can click "Headline" link', async () => {
    await browser.click(selectors[22]);
  });

  it('can click "Headline alternative font" link', async () => {
    await browser.click(selectors[23]);
  });

  it('can click "Headline customization" link', async () => {
    await browser.click(selectors[24]);
  });

  it('can click "Headline with date field" link', async () => {
    await browser.click(selectors[25]);
  });

  it('can click "Playground" link', async () => {
    await browser.click(selectors[26]);
  });

  it('can click "HTML" link', async () => {
    await browser.click(selectors[27]);
  });

  it('can click "IFrame Example Mixcloud" link', async () => {
    await browser.click(selectors[28]);
  });

});
