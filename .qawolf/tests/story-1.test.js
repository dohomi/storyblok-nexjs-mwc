const qawolf = require("qawolf");
const selectors = require("../selectors/story-1.json");

let browser;
let page;

beforeAll(async () => {
  browser = await qawolf.launch();
  const context = await browser.newContext();
  await qawolf.register(context);
  page = await context.newPage();
});

afterAll(() => browser.close());

test('story-1', async () => {
  await page.goto("https://play.lumen.media/");
  await page.click(selectors[0]);
  await page.click(selectors[1]);
  await qawolf.scroll(page, selectors[2], { x: 0, y: 94 });
  await page.click(selectors[3]);
});