export const SELECT_ALL:    KeyB_HotKey = ['control', 'a'];
export const COPY:          KeyB_HotKey = ['control', 'c'];
export const CUT:           KeyB_HotKey = ['control', 'x'];
export const PASTE:         KeyB_HotKey = ['control', 'v'];
export const UNDO:          KeyB_HotKey = ['control', 'z'];
export const SAVE:          KeyB_HotKey = ['control', 's'];
export const COPY_ALL:  KeyB_Act_Seq = { type: 'sequence', val: [ SELECT_ALL, COPY ] };
export const CUT_ALL:   KeyB_Act_Seq = { type: 'sequence', val: [ SELECT_ALL, CUT ] };
