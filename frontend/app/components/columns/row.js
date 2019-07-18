import React, {PureComponent} from 'react';
import {GLOBAL} from '../../config';

let {isNotEmpty} = GLOBAL;

class Row extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {children, heightRow = 0, widthRow = 12, float = '', className = ''} = this.props;
        return (
            <div
                className={`row-container
                ${isNotEmpty(heightRow) ? ` row-h-${heightRow}` : 0}
                ${isNotEmpty(widthRow) ? ` row-w-${widthRow}` : ''}
                ${isNotEmpty(float) ? ` row-float-${float}` : ''}
                ${isNotEmpty(className) ? ` ${className}` : ''}`}
            >
                {children}
            </div>
        );
    }
}

export default Row;
