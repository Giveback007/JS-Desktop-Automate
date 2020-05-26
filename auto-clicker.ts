import ioHook from 'iohook';
import robot from "robotjs";
import { interval } from '@giveback007/util-lib';

let doClick = false;
interval(() => doClick ? robot.mouseClick() : null, 20);
ioHook.registerShortcut([56, 41], () => doClick = !doClick); // alt + `

ioHook.start();
