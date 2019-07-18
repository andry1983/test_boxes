import is from 'is_js';
import axios from 'axios';


export function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}

export function defaultParams(method = 'post') {
    try {
        let options = {
            method: method,
            // crossDomain: true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        let csrftoken = readCookie('csrftoken');
        if (typeof csrftoken !== 'undefined' && is.not.empty(csrftoken)) {
            options.headers['X-CSRFToken'] = csrftoken;
        }
        return options;
    } catch (error) {
        console.log('defaultParams ERROR', error);
        return {};
    }
}

export async function Post(url, params = {}) {
    try {
        let options = defaultParams('post', url);
        if (is.not.empty(params)) {
            options.data = params;
        }
        const res = await axios(url, options);
        let result = await res;
        let {data, status} = result;
        return {data, status};
    } catch (error) {
        if (is.not.undefined(error.response)) {
            let {data = {}, status = 400} = error.response;
            return {data, status};
        }
        return {data: {'Post ERROR': error}, status: 400};
    }
}

export async function Get(url, params = {}) {
    try {
        let options = defaultParams('get', url);
        if (is.not.empty(params)) {
            options.params = params;
        }
        const res = await axios(url, options);
        let result = await res;
        let {data, status} = result;
        return {data, status};
    } catch (error) {
        if (is.not.undefined(error.response)) {
            let {data = {}, status = 400} = error.response;
            return {data, status};
        }

        return {data: {'Get ERROR': error}, status: 400};
    }
}

export async function Delete(url, params = {}) {
    try {
        let options = defaultParams('delete', url);
        if (is.not.empty(params)) {
            options.params = params;
        }
        const res = await axios(url, options);
        let result = await res;
        let {data, status} = result;
        return {data, status};
    } catch (error) {
        if (is.not.undefined(error.response)) {
            let {data = {}, status = 400} = error.response;
            return {data, status};
        }

        return {data: {'Delete ERROR': error}, status: 400};
    }
}

export async function Update(url, params = {}) {
    try {
        let options = defaultParams('put', url);
        if (is.not.empty(params)) {
            options.data = params;
        }
        const res = await axios(url, options);
        let result = await res;
        let {data, status} = result;
        return {data, status};
    } catch (error) {
        if (is.not.undefined(error.response)) {
            let {data = {}, status = 400} = error.response;
            return {data, status};
        }

        return {data: {'Update ERROR': error}, status: 400};
    }
}
