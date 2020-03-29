import puppeteer, { Page } from 'puppeteer';
import { fetchJson } from './utils';

async function chromeWSData(port: number) 
{
    type ChromeObj = {
        "Browser": string;
        "Protocol-Version": string;
        "User-Agent": string;
        "V8-Version": string;
        "WebKit-Version": string;
        "webSocketDebuggerUrl": string;
    }

    const chromeData: ChromeObj =
        await fetchJson(`http://127.0.0.1:${port}/json/version`);

    if (!chromeData || !chromeData.webSocketDebuggerUrl) throw Error('Couldn\'t get "webSocketDebuggerUrl"');

    return chromeData;
}

export const launchChrome = () => puppeteer.launch({
    headless: false,
    executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
});

export const attachToChrome = async (port = 9222) =>
    puppeteer.connect({ browserWSEndpoint: (await chromeWSData(port)).webSocketDebuggerUrl });