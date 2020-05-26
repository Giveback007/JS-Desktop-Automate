import { runKeySequence } from '../auto-keyboard/keyboard-funct';
import { scaleImage, canvasSize, flattenImage, grayscale, colorLevels_lowOutput, zoom } from './gimp-commands';

const posterize: KeyB_SeqItem[] = [
    ['alt', 'c'],
    'p',
    'down',
    { type: 'keytap', val: 'tab', times: 6 },
    'enter'
]

// export const posterize = (): void => runKeySequence([
//     ...zoom(20),
//     ...scaleImage(5100),
//     5000,
//     ...canvasSize(5100, 6600),
//     ...flattenImage(),
//     500,
//     ...grayscale(),
//     500,
//     ...colorLevels_lowOutput(),
//     500,
//     ..._posterize
// ]);
