import React, {PureComponent} from 'react';
import '../../../sass/fonts/_foundation.scss';
import is from 'is_js';

class IconFoundation extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {icon = '', size = 'small', onClick = null, style = {}, animate} = this.props;
        return (
            <i
                style={style}
                onClick={is.function(onClick) && onClick}
                className={`fi-${icon} ${size}${is.not.empty(animate) ? ` animated ${animate}` : ''}`}
            />
        );
    }
}

export default IconFoundation;
