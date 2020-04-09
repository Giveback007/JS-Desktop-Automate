"use strict";

// http://robotjs.io/docs/syntax
// https://devstore.io/js/iohook

import ioHook from 'iohook';
import { runKeySequence } from '../auto-keyboard/keyboard-funct';
import { log } from 'console';
import { exportImages } from './export-images';


// CLICK ON TAB when tabbing
ioHook.registerShortcut([56, 41], () => { // alt + `
    log('START SEQUENCE');
    const tabs = 1; // number of tabs
    // const tabs = 22 - 6; // full 360* -> n of files
    runKeySequence(['m']);
    for (let i = 0; i < tabs; i++) {
        exportImages('listing');
        runKeySequence([['control', 'alt', 'pagedown']]);
        // runKeySequence(['m']);
        // addBorder();
        // runKeySequence(zoom(66));
        // runKeySequence([['control', 's'], 500]);
        // posterize();
        // resizeLayer();
    }
    // runKeySequence(['t']);
});

ioHook.start();

