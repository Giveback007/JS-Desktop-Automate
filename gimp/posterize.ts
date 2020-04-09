import { runKeySequence } from '../auto-keyboard/keyboard-funct';
import { zoom } from './util';
import { scaleImage, canvasSize, flattenImage, grayscale, colorLevels } from './gimp-commands';

const _posterize: KeyB_SeqItem[] = [
    ['alt', 'c'],
    'p',
    'down',
    { type: 'keytap', val: 'tab', times: 6 },
    'enter'
]

export const posterize = (): void => runKeySequence([
    ...zoom(20),
    ...scaleImage(5100),
    5000,
    ...canvasSize(5100, 6600),
    ...flattenImage(),
    500,
    ...grayscale(),
    500,
    ...colorLevels(),
    500,
    ..._posterize
]);
