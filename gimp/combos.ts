import { runKeySequence } from "../auto-keyboard/keyboard-funct";
import { canvasSize, flattenImage, grayscale, colorLevels_gamma, posterize, zoom } from './gimp-commands';

// 5-17-2020
export const _5_17_2020 = () => runKeySequence([
    ...zoom(12),
    // ...canvasSize(5100, 6600),
    ...flattenImage(),
    ...grayscale(),
    ...colorLevels_gamma(1.3),
    ...posterize()
]);