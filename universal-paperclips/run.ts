import { interval, wait, sec } from '@giveback007/util-lib';
// import ioHook from 'iohook';
// import robot  from "robotjs";
import puppeteer from 'puppeteer';
import { apiInit, Api } from './api';
import { main } from './main';

const { log, clear } = console;

clear();
run().then(() => log('Done')).catch(error => log(error));

async function run() {
    // SETUP
    
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    });;
    const page = await browser.newPage();
    
    await page.click('#wrapper > a');
    await wait(sec(1));

    let api: Api;
    let intv: ReturnType<typeof main>;

    (global as any).reset = () => {
        if (intv) intv.stop()

        api = apiInit(page);
        intv = main(api);

        interval(api.makeClip, 0, 850);
    }

    (global as any).reset();
    (global as any).stop = () => intv.stop();
}
