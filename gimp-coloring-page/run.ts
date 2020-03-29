"use strict";

// http://robotjs.io/docs/syntax
// https://devstore.io/js/iohook

import ioHook from 'iohook'
import { posterize } from './posterize'
import { exportImages } from './export-images'
import { runKeySequence } from '../auto-keyboard/keyboard-funct'
 
ioHook.on('keyup', e => {
    // control + ` // TOGGLE
    if (e.keycode === 41) {
        const tabs = 25; // number of tabs
        // const tabs = 1;
        for (let i = 0; i < tabs; i++) {
            // posterize();
            exportImages();
            runKeySequence([['control', 'alt', 'pageup']])
        }
    }
});
  
ioHook.start();
