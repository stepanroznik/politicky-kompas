export interface IUrlParams {
    url: string;
    query?: any;
}

export interface IGetParams extends IUrlParams {
    headers?: any;
}

export interface IPostParams extends IUrlParams {
    method?: 'POST' | 'PUT'
    body?: any;
    headers?: any;
}
