const ioHook = require('iohook');
const { runKeySequence, pasteString } = require('../keyboard-funct');

ioHook.on('keyup', e => {
    if (e.keycode === 41) {
        runKeySequence([
            'F12'
        ])
    }
})