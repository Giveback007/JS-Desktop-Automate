import { Page } from 'puppeteer';

/** @example idsMap = { [key]: elmId } */
const evaluate = (page: Page) => async <
    ID extends string, T extends {}
>(ids: ID[], idsMap: T) => page.evaluate((ids, idsMap) => {
    const nId = (id: string) => {
        const elm = document.getElementById(id);
        if (!elm) throw Error(`can't find: #${id}`);
    
        return Number(elm.innerHTML.replace(/,/g,''));
    }

    const obj = {} as { [K in (ID | keyof T)]: number };
    (ids as ID[]).forEach((id) => obj[id] = nId(id));
    Object.keys(idsMap as T).forEach((key) => (obj as any)[key] = nId(idsMap[key]));

    const addObj = { spareTrust: false } as { spareTrust: boolean };

    const addMem = document.getElementById('btnAddMem');
    // const = document.getElementById('megaClipperDiv');
    if (addMem) addObj.spareTrust = !(addMem as HTMLButtonElement).disabled;
    
    
    return Object.assign({}, obj, addObj);
}, ids, idsMap);

export const apiInit = (page: Page) => ({
    evaluate: evaluate(page),
    makeClip: () => page.click('#btnMakePaperclip'),
    lowerPrice: () => page.click('#btnLowerPrice'),
    raisePrice: () => page.click('#btnRaisePrice'),
    buyClipper: () => page.click('#btnMakeClipper'),
    buyWire: () => page.click('#btnBuyWire'),
    buyMarketing: () => page.click('#btnExpandMarketing'),
    addMemory: () => page.click('#btnAddMem'),
    addProc: () => page.click('#btnAddProc'),
});

export type Api = ReturnType<typeof apiInit>;
