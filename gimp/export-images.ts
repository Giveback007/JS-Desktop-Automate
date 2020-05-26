import { readSync as clipboardRead } from 'clipboardy';
import { runKeySequence, pasteString } from '../auto-keyboard/keyboard-funct';
import { CUT_ALL } from '../auto-keyboard/keyboard-actions';
import { export_pdf } from './gimp-commands';

/**
 * @example midExt = "wm" -> "name.wm.jpg" && "name.wm.pdf"
*/
export const exportImages = (midExt: string = '') => {

    const logoJpg: KeyB_SeqItem[] = export_pdf(midExt);
    const logoPdf: KeyB_SeqItem[] = export_pdf(midExt);
    // const jpg: KeyB_SeqItem[] = jpgSequence();
    // const pdf: KeyB_SeqItem[] = pdfSequence();

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
