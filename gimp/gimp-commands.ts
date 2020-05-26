import { pasteString } from '../auto-keyboard/keyboard-funct';
import { readSync as clipboardRead } from 'clipboardy';
import { CUT_ALL } from '../auto-keyboard/keyboard-actions';

export const zoom = (n: number): KeyB_SeqItem[] => [
    ['alt', 'v'],
    'z',
    'up',
    'enter',
    { type: 'keytap', val: 'tab', times: 2 },
    pasteString(n + ''),
    'enter',
    ['shift', 'j']
]

export const resizeLayer = (width: number): KeyB_SeqItem[] => [
    ['alt', 'l'],
    's',
    pasteString(width),
    { type: 'hotkey', val: ['shift', 'tab'], times: 2 },
    'enter'
];

export const canvasSize = (width: number, height: number): KeyB_SeqItem[] => [
    ['alt', 'i'],
    'v',
    pasteString(width),
    { type: 'keytap', val: 'tab', times: 2 },
    pasteString(height),
    'enter',
    { type: 'keytap', val: 'tab', times: 5 },
    'enter',
    { type: 'keytap', val: 'tab', times: 6 },
    'enter',
    500
];

export const scaleImage = (width: number): KeyB_SeqItem[] => [
    ['alt', 'i'],
    's',
    pasteString(width),
    'enter',
    { type: 'hotkey', val: ['shift', 'tab'], times: 2 },
    'enter'
];

export const flattenImage = (): KeyB_SeqItem[] => [
    ['alt', 'i'],
    'f',
    2500
];

export const grayscale = (): KeyB_SeqItem[] => [
    ['alt', 'i'],
    'm',
    'down',
    'enter',
    4500
];

export const colorLevels_lowOutput = (n = 50): KeyB_SeqItem[] => [
    ['alt', 'c'],
    'l',
    { type: 'keytap', val: 'tab', times: 8 },
    pasteString(n),
    { type: 'keytap', val: 'tab', times: 17 },
    'enter'
]

export const colorLevels_gamma = (n = 1.3): KeyB_SeqItem[] => [
    ['alt', 'c'],
    'l',
    { type: 'keytap', val: 'tab', times: 10 },
    pasteString(n),
    { type: 'keytap', val: 'tab', times: 15 },
    'enter',
    500
]

export const mergeLayer = (): KeyB_SeqItem[] => [
    ['alt', 'l'],
    'w'
]

export const posterize = (): KeyB_SeqItem[] => [
    ['alt', 'c'],
    'p',
    'down',
    { type: 'keytap', val: 'tab', times: 6 },
    'enter',
    500

]

const changeName = (type: string): KeyB_Fct => () => {
    const name = clipboardRead().split('.')[0];
    return pasteString(name + type);
};

const EXPORT = ['shift', 'control', 'e'];

export const export_jpg = (type = ''): KeyB_SeqItem[] => [
    EXPORT,
    CUT_ALL,
    changeName((type ? '.' + type : '') + '.jpg'),
    'enter',
    2000,
    'tab',
    pasteString('90'),
    ['shift', 'tab'],
    'enter',
    4000
]

export const export_pdf = (type = ''): KeyB_SeqItem[] => [
    EXPORT,
    CUT_ALL,
    changeName((type ? '.' + type : '') + '.pdf'),
    'enter',
    2000,
    'enter',
    4000
]

export const addBorder = (): KeyB_SeqItem[] => [
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
