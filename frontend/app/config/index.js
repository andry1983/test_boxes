import * as GLOBAL_FUNCTION_HELPERS from './functions/helpers';
import * as GLOBAL_FUNCTION_API from './functions/fetch';
import * as GLOBAL_VARS from './vars';

export const GLOBAL = {
    ...GLOBAL_VARS,
    ...GLOBAL_FUNCTION_HELPERS,
    ...GLOBAL_FUNCTION_API
};
