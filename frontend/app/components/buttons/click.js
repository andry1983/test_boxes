import React from 'react';
import is from 'is_js';
import {GLOBAL} from '../../config';
import IconFoundation from '../icons/foundation';

let {isNotEmpty} = GLOBAL;

export let ButtonClick = (action, text = '', disabled, icon = 'fi-target-two', className = '') => {
    let params = {
        type: 'button',
        className: `btn${isNotEmpty(className) ? ` ${className}` : ''}`
    };
    params = is.function(action) ? {...params, onClick: action} : params;
    params = disabled ? {...params, disabled: true} : params;
    return (
        <button
            {...params}
        >
            <IconFoundation icon={icon}/>
            <span>{text}</span>
        </button>
    );
};
