"use strict";

// http://robotjs.io/docs/syntax
// https://devstore.io/js/iohook

import ioHook from 'iohook';
import { runKeySequence } from '../auto-keyboard/keyboard-funct';
import { log } from 'console';
import { _5_17_2020 } from './combos';
import { export_jpg, zoom, scaleImage, export_pdf, addBorder } from './gimp-commands';
import { PASTE, COPY, UNDO, SAVE } from '../auto-keyboard/keyboard-actions';
import { seconds } from '@giveback007/util-lib';


// CLICK ON TAB when tabbing
ioHook.registerShortcut([56, 41], () => { // alt + `
    log('START OF SEQUENCE');
    const tabs = 34; // number of tabs
    // const tabs = 1;
    runKeySequence(['m']);
    for (let i = 0; i < tabs; i++) {
        console.log(`\nTAB: ${i + 1}/${tabs}`);

        // _5_17_2020();
        runKeySequence([
            // PASTE,
            // ['shift', 'control', 'n'],
            // ...addBorder(),
            // ...zoom(11),
            ...export_jpg('border'),
            // SAVE,
            ['control', 'alt', 'pagedown']
        ]);
    }

    log('\nEND OF SEQUENCE');
    // runKeySequence(['t']);
});

ioHook.start();

