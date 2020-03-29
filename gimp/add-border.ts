import { pasteString, runKeySequence } from "../auto-keyboard/keyboard-funct";

const boarder: KeyB_SeqItem[] = [
    ['alt', 'r'],
    { type: 'keytap', val: 'd', times: 2 },
    'right',
    'b',
    1000,
    pasteString('250'),
    'tab',
    pasteString('250'),
    'tab',
    'enter',
    { type: 'keytap', val: 'tab', times: 18 },
    pasteString('ffffff'),
    { type: 'keytap', val: 'tab', times: 3 },
    'enter',
    'tab',
    pasteString('1'),
    'enter',
    3000,
]

export const addBorder = () => {
    runKeySequence([
        ...boarder
    ]);
}
