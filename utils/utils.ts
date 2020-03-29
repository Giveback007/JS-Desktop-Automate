import fetch from "node-fetch";

export const fetchJson = async (url: string) => (await fetch(url)).json();
