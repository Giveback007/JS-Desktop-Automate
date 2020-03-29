// https://robotjs.io/docs/syntax#keys
type Key = // for reference
    | 'f1' | 'f2' // etc...
    | 'enter' | 'shift' | 'tab' | 'control'
    | 'down' | 'up' | 'right' | 'left'
    | 'space' | 'backspace'
    | 'a' | 'b' | 'c' // etc...
    | string

type KeyB_Act_Type = 'write' | 'keytap' | 'hotkey' | 'sequence';

type KeyB_Act_Hotkey = { type: 'hotkey', val: KeyB_HotKey, times?: number };
type KeyB_Act_KeyTap = { type: 'keytap', val: KeyB_Tap, times?: number };
type KeyB_Act_Seq =    { type: 'sequence', val: KeyB_SeqItem[] };
type KeyB_Act_Write =  { type: 'write', val: Key };

type KeyB_Fct = () => KeyB_SeqItem[] | KeyB_Fct;
type KeyB_HotKey = Key[];
type KeyB_Tap = Key;
type KeyB_Wait = number;
type KeyB_Action = 
    | KeyB_Act_Hotkey
    | KeyB_Act_KeyTap
    | KeyB_Act_Seq
    | KeyB_Act_Write;

type KeyB_SeqItem = 
    // | KeyB_SeqItem[]
    | KeyB_Action
    | KeyB_Fct
    | KeyB_HotKey
    | KeyB_Tap
    | KeyB_Wait;
