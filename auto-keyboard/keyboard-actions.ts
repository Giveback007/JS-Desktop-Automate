export const SELECT_ALL:    ['control', 'a'] = ['control', 'a'];
export const COPY:          ['control', 'c'] = ['control', 'c'];
export const CUT:           ['control', 'x'] = ['control', 'x'];
export const PASTE:         ['control', 'v'] = ['control', 'v'];
export const COPY_ALL =     { type: 'sequence', val: [ SELECT_ALL, COPY ] };
export const CUT_ALL =      { type: 'sequence', val: [ SELECT_ALL, CUT ] };

