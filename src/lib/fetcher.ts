export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const fetcherArray = (url: string) => fetch(url).then((res) => res.ok ? res.json() : []);
