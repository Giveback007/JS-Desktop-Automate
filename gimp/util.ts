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