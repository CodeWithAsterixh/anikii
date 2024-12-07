import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

export const browser = await puppeteer.launch({
  args: isLocal ? puppeteer.defaultArgs() : chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath:
    process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath()),
  headless: chromium.headless,
});
