import { sec, interval, arrGen, msToTime } from "@giveback007/util-lib";
import { Api } from './api';
import { log } from 'console';
import c = require('colors/safe');

const state = {
    megaClippers: false
}

type T = {
    funds: number;
    unsoldClips: number;
    margin: number;
    demand: number;
    wire: number;
    wireCost: number;
    avgRev: number;
    totalClipsMade: number;
    autoClippers: number;
    autoClipperCost: number;
    marketingCost: number;
    marketingLvl: number;
    avgSales: number;
    processors: number;
    memory: number;
    trust: number;
    spareTrust: boolean;
}

const fx = (n: number, x: number) => n.toFixed(x);

const findFutureFund = (p: number, o: T) => (o.wire + o.unsoldClips) * 0.95 * p + o.funds

const average = (nArr: number[]) =>
    nArr.reduce((a = 0, b = 0) => a + b, 0) / nArr.length;

const decPlace = (n: number, places: number) =>
    Math.round(n * (10 * places)) / (10 * places);

const arw = (a: string, adj: number) => a.repeat(adj);

function trustManager(api: Api, o: T) {
    if (!o.spareTrust) return;

    if (o.memory < o.processors * 3) {
        api.addMemory();
        log(`🐏 (+1 Ram) New Total: ${o.memory + 1}`);
    } else {
        api.addProc();
        log(`🤖 (+1 Proc) New Total: ${o.processors + 1}`)
    }
}

function marginManager(api: Api, o: T, md: MetaData) {
    const product = (o.unsoldClips + md.futureClips);
    const need$ = (o.funds - md.targetCost);

    const t = ((need$ * -1) / product) + 0.001; // target price
    const m = o.margin; // current price
    
    const tX = Math.ceil(t * 100);
    const mX = Math.round(m * 100);

    const tSt = fx(t, 3);
    const mSt = fx(m, 2);

    let adj = tX - mX;
    adj = adj < 0 ? adj * -1 : adj;

    // if      (adj > 30)  adj = 5;
    // if      (adj > 50)  adj = 3;
    if      (adj > 30)  adj = 2;
    else                adj = 1;
    adj = 1

    const str = () => `${tSt} ${t < m ? '< ' + c.green(mSt) : '> ' + c.red(mSt)}`;
    const newM = (n: 1 | -1) => fx(Math.round((Number(mSt) * 100 + adj * n)) / 100, 2);

    const logAdj = (t: '+' | '-') => log(`${t === '+' ? '➕' : '➖'} (T:${str()} | ${('000' + md.secondsTill0).slice(-3)}s @ ${newM(t === '-' ? -1 : 1)}) => ${arw(t === '-' ? '🡇' : '🡅', adj)}`)
    if (tX > mX) {

        arrGen(adj).map(() => api.raisePrice());
        logAdj('+');
    } else if (tX < mX && o.margin > 0.01 && md.secondsTill0 > 2) {

        arrGen(adj).map(() => api.lowerPrice());
        logAdj('-');
    }
}

function findTargetPurchase(o: T): TargetPurchase {
    const minWire = (o.autoClippers || 1) * 20;

    // wire
    if (o.wire < minWire) return 'wire';

    // marketing
    if (
        o.autoClippers > 15
        &&
        findFutureFund(0.03, o)
        > 
        (o.wireCost + o.marketingCost)
    ) return 'marketing';
        
    // auto
    return 'auto';
}

function findTargetCost(o: T, sts: Stats, targetPurchase: TargetPurchase) {
    const targetCost =
        sts.topWirePrice + (targetPurchase === 'auto' ? o.autoClipperCost : o.marketingCost);
    if (targetPurchase === 'wire') return sts.topWirePrice;

    return targetCost;
}

function metaData(o: T, sts: Stats): MetaData {
    //  -- Future Calculations -- //
    let secondsTill0 = Math.floor(o.unsoldClips / (o.avgSales * 1.2));
    secondsTill0 = secondsTill0 > 0 ? secondsTill0 : 0;
    secondsTill0 = Math.floor(secondsTill0);

    const futureProd = o.autoClippers * secondsTill0; // the next secondsTill0 of production
    const futureClips = o.wire > futureProd ? futureProd : o.wire;

    const targetPurchase = findTargetPurchase(o);
    const targetCost = findTargetCost(o, sts, targetPurchase);

    return { futureClips, targetCost, targetPurchase, secondsTill0 }
}

export function main(api: Api): {
    stop: () => void;
} {
    const util = (o: T) => ({
        buyWire: () => {
            api.buyWire();
            log('🛒 (🏮 "WIRE") @ ' + '$' + fx(o.wireCost, 2) + ' wire@:' + o.wire);
            // interval(api.makeClip, 0 , 800);
            return o.wireCost;
        },
        buyMarketing: () => {
            api.buyMarketing();
            log('🛒 (🏬 "MARKETING") @ ' + '$' + fx(o.marketingCost, 2) + ' Total:' + o.marketingLvl);
            return o.marketingCost;
        },
        buyAuto: () => {
            api.buyClipper();
            log('🛒 (🔗 "AUTO CLIPPER") @ ' + '$' + fx(o.autoClipperCost, 2) + ' Total:' + (o.autoClippers + 1));
            return o.autoClipperCost;
        }
    });

    const sts: Stats = {
        prevAvgRev: 0,
        prev$made: 0,
        $made: 0,
        prevAction: 'raise',
        topWirePrice: 26,
        startTime: new Date().getTime(),
        $spent: 0
    };
    let i = -1;

    const f = () => interval(() => api.evaluate([
        'funds', 'unsoldClips', 'margin', 'wire',
        'demand', 'wireCost', 'avgRev', 'avgSales',
        'marketingLvl', 'adCost', 'processors',
        'memory', 'trust', 'btnAddMem'
    ], {
        totalClipsMade: 'clips',
        autoClippers: 'clipmakerLevel2',
        autoClipperCost: 'clipperCost',
        marketingCost: 'adCost',
    }).then((o: T) => {
        trustManager(api, o);
        
        const u = util(o);
        const md = metaData(o, sts);

        sts.$made = sts.$spent + o.funds;
        sts.topWirePrice = o.wireCost + 1 > sts.topWirePrice ? o.wireCost + 1 : sts.topWirePrice;

        // - 60 second log
        i++; if (i >= 60) i = 0;
        if (i === 0) {
            const avgPerMin = decPlace(sts.$made - sts.prev$made, 2);

            log(`\n⏱️ :${msToTime(new Date().getTime() - sts.startTime)}`
            +   `\n 💲 $${fx(sts.$spent + o.funds, 2)}`
            +   `\n💵 ${c[sts.prevAvgRev >= avgPerMin ? 'red' : 'green']('$' + fx(avgPerMin, 2) + '/min')}`
            );

            sts.prevAvgRev = avgPerMin;
            sts.prev$made = sts.$made;
        }

        // -- PURCHASES -- //
        
        // - Wire Buy
        if (o.wire === 0) console.error('OMG NEED WIRE!');
        if (md.targetPurchase === 'wire'
            && o.wireCost < o.funds) {
            sts.$spent += u.buyWire(); return;
        }
    
        // - Marketing Buy
        if (md.targetPurchase === 'marketing'
            && o.marketingCost < o.funds) {
            // const futures = findFutureFund(0.10);

            // if (sts.topWirePrice + o.marketingCost < futures) {
                // log('    FUTURES @', 'T:' + fx(0.10, 3), 'C:' + fx(sts.topWirePrice + o.marketingCost, 2), 'F:' + fx(futures, 2))
                // log('FUTURES: @ ' + p.toFixed(3), (sts.topWirePrice + o.autoClipperCost).toFixed(2), (futures).toFixed(2));
                sts.$spent += u.buyMarketing(); return;
            // }
        } 
        
        // - Clipper Buy
        if (md.targetPurchase === 'auto'
            && o.autoClipperCost < o.funds) {
            const adj = o.autoClippers * 0.01;
            const p = 0.30 - (adj < 0.29 ? adj : 0.29); // anticipated paperclip cost
            const futures = findFutureFund(p, o);
            
            if (o.wire > (20 * o.autoClippers) && sts.topWirePrice + o.autoClipperCost < futures) {
                log('    FUTURES @', 'T:' + fx(p, 3), 'C:' + fx(sts.topWirePrice + o.autoClipperCost, 2), 'F:' + fx(futures, 2))
                // log('FUTURES: @ ' + p.toFixed(3), (sts.topWirePrice + o.autoClipperCost).toFixed(2), (futures).toFixed(2));
                sts.$spent += u.buyAuto(); return;
            }
        }

        // -- ADJUSTMENT -- //
        marginManager(api, o, md);
    }), sec(1));

    // the idea is, if  there is a malfunction to re-initiate the interval;
    return f();
}
