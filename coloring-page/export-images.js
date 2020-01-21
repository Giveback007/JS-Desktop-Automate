const { readSync: clipRead, writeSync: clipWrite } = require('clipboardy');
const { runKeySequence, pasteString } = require('./keyboard-funct');
const { CUT_ALL, SELECT_ALL } = require('./keyboard-actions');

exports.exportImages = () => {
    const EXPORT = ['shift', 'control', 'e'];
    const changeName = (ext) => () => {
        const name = clipRead().split('.')[0];
        return pasteString(name + ext);
    };

    const jpgSequence = (ext = '') => [
        EXPORT,
        CUT_ALL,
        changeName(ext + '.jpg'),
        'enter',
        2000,
        'tab',
        pasteString('90'),
        ['shift', 'tab'],
        'enter',
    ];

    const pdfSequence = (ext = '') => [
        EXPORT,
        CUT_ALL,
        changeName(ext + '.pdf'),
        'enter',
        2000,
        'enter',
    ];

    const logoJpg = jpgSequence('.logo');
    const logoPdf = pdfSequence('.logo');
    const jpg = jpgSequence();
    const pdf = pdfSequence();

    runKeySequence([
        ...logoJpg,
        3000,
        ...logoPdf,
        3000,
        'delete',
        ...jpg,
        3000,
        ...pdf,
        2000,
        ['control', 'z']
    ]);
}
