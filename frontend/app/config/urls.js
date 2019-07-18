let {PORT, HOST, ENV, SSL, SERVER_NAME} = process.env;
const isSsl = SSL === 'ok';
const isProd = ENV === 'production';

export function prefixUrl() {
    let port = isProd ? false : (+PORT);
    let protocol = isSsl ? 'https://' : 'http://';
    let fullDomain = (PORT && !isProd) ? `${isProd ? SERVER_NAME : HOST}:${port}` : (isProd ? SERVER_NAME : HOST);
    return `${protocol}${fullDomain}`;
}

const prefix = prefixUrl();
let urlApi = 'api';


export let apiGetAllDataBoxes = `${prefix}/${urlApi}/boxes/`; // get method
export let apiAddBox = `${prefix}/${urlApi}/boxes/`; // post method
export let updateDataBoxUrl = (id) => `${prefix}/${urlApi}/boxes/${id}/`; // put method
