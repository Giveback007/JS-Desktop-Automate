const robot = require("robotjs");
const { arrGen, getType, isType } = require('@giveback007/util-lib');
const { PASTE } = require('./keyboard-actions');
const { writeSync: clipWrite } = require('clipboardy');

const hotKey = (keyArr) => {
    console.log('HOTKEY:', keyArr.join(' + '));

    keyArr.forEach(key => {
        robot.keyToggle(key, 'down');
        robot.setKeyboardDelay(5);
    });

    keyArr.forEach(key => robot.keyToggle(key, 'up'));    
}

const keyTap = (key) => {
    console.log('KEYTAP:', key);

    robot.keyTap(key)
    robot.setKeyboardDelay(5);
}

const typeString = (str) => {
    console.log('STRING:', str);

    robot.typeString(str);
    robot.setKeyboardDelay(5);
}

const keyboardWait = (ms) => {
    console.log('WAIT-T:', ms);

    robot.setKeyboardDelay(ms);
}

const runKeySequence = (seq) => {
    seq = isType(seq, 'array') ? seq : [seq];

    seq.forEach(async (x) => {
        switch (getType(x)) {
            // number -> wait(ms)
            case 'number':
                keyboardWait(x);
                robot.keyTap('audio_vol_down');
                robot.setKeyboardDelay(5);
                robot.keyTap('audio_vol_up');
                robot.setKeyboardDelay(5);
                return;
            // string -> keyTap
            case 'string':
                return keyTap(x);
            // array -> hotkey
            case 'array':
                return hotKey(x);
            // function -> ' "f" that returns a sequence'
            case 'function':
                return runKeySequence(x());
            // object -> 'allows for extra options'
            // { times: number }
            case 'object':
                switch (x.type) {
                    case 'string':
                        return typeString(x.val);
                    case 'keytap':
                        return arrGen(x.times || 1).forEach(() => keyTap(x.val));
                    case 'hotkey':
                        return arrGen(x.times || 1).forEach(() => hotKey(x.val));
                    case 'sequence':
                        return runKeySequence(x.val);
                    default: throw 'invalid type';
                }
            default:
                throw 'something went wrong';
        }

    });
}

const pasteString = (str) => () => {
    console.log('CLIP-W:', str);

    clipWrite(str); 
    return [PASTE];
}

module.exports = {
    runKeySequence,
    pasteString,
}
