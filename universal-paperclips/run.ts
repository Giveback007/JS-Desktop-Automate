import { interval, wait } from '@giveback007/util-lib';
import puppeteer from 'puppeteer';
import { apiInit } from './api';
import { main } from './main';
import { readJSON } from '../util';

const { log, clear } = console;

clear();
run().then(() => log('Done')).catch(error => log(error));

async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        // executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    });
    const page = await browser.newPage();
    await page.goto('https://www.decisionproblem.com/paperclips/');

    const session = await page.target().createCDPSession();
    await session.send('Emulation.setPageScaleFactor', {
      pageScaleFactor: 0.9, // 90%
    });

    const ls = await readJSON('universal-paperclips/localStorage.json');
    await page.evaluate((ls: Dict<string>) => {
        Object.keys(ls).map((k) => localStorage[k] = ls[k])
    }, ls) // copy(localStorage)
    
    await page.click('#wrapper > a');

    const api = apiInit(page);
    const intv = await main(api);

    await wait(200);
    interval(api.makeClip, 0, 150);
    
    (global as any).stop = () => intv.stop();
}
