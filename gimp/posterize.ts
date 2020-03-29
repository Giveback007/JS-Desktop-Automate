import { runKeySequence, pasteString } from '../auto-keyboard/keyboard-funct';
import { zoom } from './util';

const zoomOut: KeyB_SeqItem[] = zoom(20);

const scaleImage: KeyB_SeqItem[] = [
    ['alt', 'i'],
    's',
    pasteString('5100'),
    'enter',
    { type: 'hotkey', val: ['shift', 'tab'], times: 2 },
    'enter'
];

const canvasSize: KeyB_SeqItem[] = [
    5000,
    ['alt', 'i'],
    'v',
    { type: 'keytap', val: 'tab', times: 2 },
    pasteString('6600'),
    'enter',
    { type: 'keytap', val: 'tab', times: 5 },
    'enter',
    { type: 'keytap', val: 'tab', times: 6 },
    'enter',
];

const flattenImage: KeyB_SeqItem[] = [
    ['alt', 'i'],
    'f'
];

const grayscale: KeyB_SeqItem[] = [
    500,
    ['alt', 'i'],
    'm',
    'down',
    'enter',
];

const colorLevels: KeyB_SeqItem[] = [
    500,
    ['alt', 'c'],
    'l',
    { type: 'keytap', val: 'tab', times: 8 },
    pasteString('50'),
    { type: 'keytap', val: 'tab', times: 17 },
    'enter'
]

const _posterize: KeyB_SeqItem[] = [
    500,
    ['alt', 'c'],
    'p',
    'down',
    { type: 'keytap', val: 'tab', times: 6 },
    'enter'
]

export const posterize = () => {
    runKeySequence([
        ...zoomOut,
        ...scaleImage,
        ...canvasSize,
        ...flattenImage,
        ...grayscale,
        ...colorLevels,
        ..._posterize
    ]);
}
