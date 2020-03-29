"use strict";

// http://robotjs.io/docs/syntax
// https://devstore.io/js/iohook

import ioHook from 'iohook';
import { runKeySequence } from '../auto-keyboard/keyboard-funct';
import { zoom } from './util';
import { addBorder } from './add-border';
import { exportImages } from './export-images';

ioHook.registerShortcut([56, 41], () => {
    // const tabs = 1; // number of tabs
    const tabs = 24;
    runKeySequence(['m']);
    for (let i = 0; i < tabs; i++) {
        runKeySequence([['control', 'alt', 'pagedown']])  
        // exportImages();
        // runKeySequence(['m']);
        // addBorder();
        // runKeySequence(zoom(66));
        runKeySequence([['control', 's'], 500]);
        // posterize();
    }
    // runKeySequence(['t']);
});

ioHook.start();
