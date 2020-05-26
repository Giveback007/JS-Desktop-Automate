import { promises as fsPromises } from 'fs';
const { writeFile, readFile } = fsPromises;

export const readJSON = async (pth: string) => JSON.parse(await readFile(pth, 'utf8'));
export const writeJSON = (pth: string, data: any) => writeFile(pth, JSON.stringify(data), 'utf8');