import React, {PureComponent} from 'react';
import {GLOBAL} from '../../config';

let {isNotEmpty, FULL_SCREEN_COUNT_COLUMN} = GLOBAL;

class Column extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {children, heightColumn = 0, widthColumn = FULL_SCREEN_COUNT_COLUMN, float = '', className = ''} = this.props;
        return (
            <div
                className={`column-container
                ${isNotEmpty(heightColumn) ? ` column-h-${heightColumn}` : 0}
                ${isNotEmpty(widthColumn) ? ` column-w-${widthColumn}` : ''}
                ${isNotEmpty(float) ? ` column-float-${float}` : ''}
                ${isNotEmpty(className) ? ` ${className}` : ''}`}
            >
                {children}
            </div>
        );
    }
}

export default Column;
