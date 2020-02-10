const SELECT_ALL =  ['control', 'a'];
const COPY =        ['control', 'c'];
const CUT =         ['control', 'x'];
const PASTE =       ['control', 'v'];

module.exports = {
    SELECT_ALL, COPY, CUT, PASTE,
    COPY_ALL:   { type: 'sequence', val: [ SELECT_ALL, COPY ] },
    CUT_ALL:    { type: 'sequence', val: [ SELECT_ALL, CUT ] },
}
