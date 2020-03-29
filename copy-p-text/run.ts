import ioHook from 'iohook';
import { runKeySequence } from '../auto-keyboard/keyboard-funct';

ioHook.on('keyup', e => {
    if (e.keycode === 41) {
        runKeySequence([
            'F12'
        ])
    }
});
