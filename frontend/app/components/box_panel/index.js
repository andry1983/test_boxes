import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Box from "../box";

class BoxPanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    createBox(boxData, index) {
        let {dispatch} = this.props;
        return (<Box key={index} {...{...boxData, dispatch}}/>);
    }

    render() {
        let {boxes} = this.props;

        return (
            <div
                className="box-container"
                draggable={false}
            >
                {boxes.map(::this.createBox)}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        boxes: state.boxInfo.boxes
    };
}

export default connect(mapStateToProps)(BoxPanel);
