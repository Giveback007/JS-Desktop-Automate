import { pasteString } from '../auto-keyboard/keyboard-funct';

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
    'f'
];

export const grayscale = (): KeyB_SeqItem[] => [
    ['alt', 'i'],
    'm',
    'down',
    'enter',
];

export const colorLevels = (): KeyB_SeqItem[] => [
    ['alt', 'c'],
    'l',
    { type: 'keytap', val: 'tab', times: 8 },
    pasteString('50'),
    { type: 'keytap', val: 'tab', times: 17 },
    'enter'
]

export const mergeLayer = (): KeyB_SeqItem[] => [
    ['alt', 'l'],
    'w'
]
