import robot from "robotjs";
// import { arrGen, getType, isType } from '@giveback007/util-lib';
import { PASTE } from './keyboard-actions';
import { writeSync as writeToClipboard } from 'clipboardy';
import { isType, type, arrGen } from '@giveback007/util-lib';
import { error } from 'console';

const hotKey = (keyArr: string[]) => {
    console.log('HOTKEY:', keyArr.join(' + '));

    keyArr.forEach((key: string) => {
        robot.keyToggle(key, 'down');
        robot.setKeyboardDelay(3);
    });

    keyArr.forEach((key: string) => robot.keyToggle(key, 'up'));    
}

const keyTap = (key: string) => {
    console.log('KEYTAP:', key);

    robot.keyTap(key)
    robot.setKeyboardDelay(3);
}

const typeString = (str: string) => {
    console.log('STRING:', str);

    robot.typeString(str);
    robot.setKeyboardDelay(3);
}

const keyboardWait = (ms: number) => {
    console.log('WAIT-T:', ms);

    robot.setKeyboardDelay(ms);
}

export const runKeySequence = (seq: KeyB_Fct | KeyB_SeqItem[]) => {
    seq = isType(seq, 'array') ? seq : [seq];

    seq.forEach(async (x) => {

        // number -> wait(ms)
        if (isType(x, 'number')) {
            keyboardWait(x);
            // these actions are done to over-ride a bug:
            robot.keyTap('audio_vol_down');
            robot.setKeyboardDelay(5);
            robot.keyTap('audio_vol_up');
            robot.setKeyboardDelay(5);
            return;
        }

        // string -> keyTap
        if (isType(x, 'string')) {
            keyTap(x as string);
            return;
        }

        // array -> hotkey
        if (isType(x, 'array')) {
            hotKey(x);
            return;
        }

        // function -> ' "f" that returns a sequence'
        if (isType(x, 'function')) {
            runKeySequence(x());
            return;
        }

        // object -> 'allows for extra options'
        if (isType(x, 'object')) {
            switch (x.type) {
                case 'write':
                    typeString(x.val);
                    return;
                case 'keytap':
                    arrGen(x.times || 1).forEach(() => keyTap(x.val));
                    return;
                case 'hotkey':
                    arrGen(x.times || 1).forEach(() => hotKey(x.val));
                    return;
                case 'sequence':
                    runKeySequence(x.val);
                    return;
                default: throw 'invalid type';
            }
        }

        error(x, type(x));
        throw 'something went wrong';
    });
}

export const pasteString = (str: string): KeyB_Fct => () => {
    console.log('CLIP-W:', str);

    writeToClipboard(str); 
    // seq[][] -> 'hotkey' ||| if string[] -> 'keytap'
    return [PASTE];
}
