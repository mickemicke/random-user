// såg nån som använde en naming convention med IName för InterfaceName
// vet inte hur vanligt det är men verkade väl lite rimligt
interface IHeaders {
  [header: string]: string;
}

interface IOptions {
  method?: string;
  headers?: IHeaders;
  body?: string;
}

async function callApi<T>(
  url: string,
  options?: IOptions | {}
): Promise<T | Error> {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (e) {
    return new Error(e);
  }
}

export default callApi;
