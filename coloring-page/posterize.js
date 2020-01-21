const { runKeySequence, pasteString } = require('./keyboard-funct');

const zoomOut = [
    'f10',
    'v',
    'z',
    'up',
    'enter',
    { type: 'keytap', val: 'tab', times: 2 },
    pasteString('20'),
    'enter',
    ['shift', 'j']
];

const scaleImage = [
    'f10',
    'i',
    's',
    pasteString('5100'),
    'enter',
    { type: 'hotkey', val: ['shift', 'tab'], times: 2 },
    'enter'
];

const canvasSize = [
    5000,
    'f10',
    'i',
    'v',
    { type: 'keytap', val: 'tab', times: 2 },
    pasteString('6600'),
    'enter',
    { type: 'keytap', val: 'tab', times: 5 },
    'enter',
    { type: 'keytap', val: 'tab', times: 6 },
    'enter',
];

const flattenImage = [
    'f10',
    'i',
    'f'
];

const grayscale = [
    500,
    'f10',
    'i',
    'm',
    'down',
    'enter',
];

const colorLevels = [
    500,
    'f10',
    'c',
    'l',
    { type: 'keytap', val: 'tab', times: 8 },
    pasteString('50'),
    { type: 'keytap', val: 'tab', times: 17 },
    'enter'
]

const posterize = [
    500,
    'f10',
    'c',
    'p',
    'down',
    { type: 'keytap', val: 'tab', times: 6 },
    'enter'
]

exports.posterize = () => {
    runKeySequence([
        ...zoomOut,
        ...scaleImage,
        ...canvasSize,
        ...flattenImage,
        ...grayscale,
        ...colorLevels,
        ...posterize
    ]);
}
