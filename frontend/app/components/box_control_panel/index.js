import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ButtonClick} from '../buttons/click';
import {addBox, deleteAllBoxes} from './actions';
import {apiAddBox} from '../../config/urls';
import {Post, Delete} from '../../config/functions/fetch';

class BoxControlPanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    async addNewBox() {
        let {dispatch} = this.props;
        let newBox = {
            x: 0,
            y: 0,
            statusActive: false,
            width: 100,
            height: 100
        };
        let response = await Post(apiAddBox, newBox);
        if (response.status >= 200 && response.status <= 300) {
            dispatch(addBox(response.data));
        }
    }

    async dellAllBoxes() {
        let {dispatch} = this.props;
        let response = await Delete(apiAddBox);
        if (response.status >= 200 && response.status <= 300) {
            dispatch(deleteAllBoxes(response.data));
        }
    }

    render() {
        let {countBoxes} = this.props;
        let AddBoxButton = ButtonClick(::this.addNewBox, 'add box', false, 'plus', 'btn-primary');
        let DellBoxButton = ButtonClick(::this.dellAllBoxes, 'delete all boxes', false, 'trash', 'btn-danger');
        return (
            <div
                className='box-control-panel animated fadeIn'
            >
                <h3>Box control panel</h3>
                <hr/>
                {AddBoxButton}
                {DellBoxButton}
                <hr/>
                <div>
                    <h3>all count boxes</h3>
                    <span
                        className="count-box-monitor"
                    >
                        {countBoxes}
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        countBoxes: state.boxInfo.countBoxes
    };
}

export default connect(mapStateToProps)(BoxControlPanel);
