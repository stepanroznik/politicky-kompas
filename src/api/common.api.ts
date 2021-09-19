import { IGetParams, IPostParams, IUrlParams } from "./api.interfaces";
import { HttpErrorFactory } from "./api.errors";

export const backendApiHost = process.env.VUE_APP_BACKEND_API_HOST + ":" + process.env.VUE_APP_BACKEND_API_PORT;

export function generateUrl({ url, query }: IUrlParams): string {
    let fetchUrl = `${backendApiHost}/${url}`;
    if (query) {
        const q = Object.keys(query)
            .map(key => `${key}=${query[key]}`)
            .join("&");
        fetchUrl += "?" + q;
    }
    return fetchUrl;
}

async function jsonBodyOrThrow(r: Response) {
    const body = await r.json();
    if (!r.ok) {
        throw HttpErrorFactory(r.status, body.message);
    }
    return body;
}

export function apiPost({ url, body, headers, query }: IPostParams) {
    const postHeaders = new Headers({
        "Content-Type": "application/json"
    });
    const fetchUrl = generateUrl({ url, query });
    const result = fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers || postHeaders,
        credentials: "include"
    })
        .then(jsonBodyOrThrow)
        .catch(e => {
            console.error(e.toString());
        });
    return result;
}

export function apiGet({ url, headers, query }: IGetParams) {
    const fetchUrl = generateUrl({ url, query });
    const result = fetch(fetchUrl, {
        method: "GET",
        headers: headers,
        credentials: "include"
    })
        .then(jsonBodyOrThrow)
        .catch(e => {
            console.error(e.toString());
        });
    return result;
}
