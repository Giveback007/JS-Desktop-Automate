import { readSync as clipboardRead } from 'clipboardy';
import { runKeySequence, pasteString } from '../auto-keyboard/keyboard-funct';
import { CUT_ALL } from '../auto-keyboard/keyboard-actions';

export const exportImages = () => {

    const EXPORT = ['shift', 'control', 'e'];
    const changeName = (ext: string): KeyB_Fct => () => {
        const name = clipboardRead().split('.')[0];
        return pasteString(name + ext);
    };

    const jpgSequence = (ext = ''): KeyB_SeqItem[] => [
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

    const pdfSequence = (ext = ''): KeyB_SeqItem[] => [
        EXPORT,
        CUT_ALL,
        changeName(ext + '.pdf'),
        'enter',
        2000,
        'enter',
    ];

    const logoJpg: KeyB_SeqItem[] = jpgSequence('.wm');
    const logoPdf: KeyB_SeqItem[] = pdfSequence('.wm');
    const jpg: KeyB_SeqItem[] = jpgSequence();
    const pdf: KeyB_SeqItem[] = pdfSequence();

    runKeySequence([
        ...logoJpg,
        3000,
        ...logoPdf,
        3000,
        // 'delete',
        // ...jpg,
        // 3000,
        // ...pdf,
        // 2000,
        // ['control', 'z']
    ]);
}
