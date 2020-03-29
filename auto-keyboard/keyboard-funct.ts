import robot from "robotjs";
// import { arrGen, getType, isType } from '@giveback007/util-lib';
import { PASTE } from './keyboard-actions';
import { writeSync as writeToClipboard } from 'clipboardy';
import { isType, type, arrGen } from '@giveback007/util-lib';

const hotKey = (keyArr: string[]) => {
    console.log('HOTKEY:', keyArr.join(' + '));

    keyArr.forEach((key: string) => {
        robot.keyToggle(key, 'down');
        robot.setKeyboardDelay(5);
    });

    keyArr.forEach((key: string) => robot.keyToggle(key, 'up'));    
}

const keyTap = (key: string) => {
    console.log('KEYTAP:', key);

    robot.keyTap(key)
    robot.setKeyboardDelay(5);
}

const typeString = (str: string) => {
    console.log('STRING:', str);

    robot.typeString(str);
    robot.setKeyboardDelay(5);
}

const keyboardWait = (ms: number) => {
    console.log('WAIT-T:', ms);

    robot.setKeyboardDelay(ms);
}

export const runKeySequence = (seq: string | (string | number | string[])[]) => {
    seq = isType(seq, 'array') ? seq : [seq];

    seq.forEach(async (x) => {
        switch (type(x)) {
            // number -> wait(ms)
            case 'number':
                keyboardWait(x as number);
                robot.keyTap('audio_vol_down');
                robot.setKeyboardDelay(5);
                robot.keyTap('audio_vol_up');
                robot.setKeyboardDelay(5);
                return;
            // string -> keyTap
            case 'string':
                return keyTap(x as string);
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

export const pasteString = (str: string) => () => {
    console.log('CLIP-W:', str);

    writeToClipboard(str); 
    return [PASTE];
}
