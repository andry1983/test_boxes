import React, {PureComponent} from 'react';
import {activateBox, updateDataBox} from './actions';
import {GLOBAL} from '../../config';
import {updateDataBoxUrl} from "../../config/urls";

let {matchDataBox, Update} = GLOBAL;

class Box extends PureComponent {
    pointStartX = 0;
    pointStartY = 0;

    constructor(props) {
        super(props);
        let {x, y, width, height, id, statusActive} = this.props;
        this.state = {
            id,
            statusActive,
            x,
            y,
            width,
            height,
            dragStatus: false,
            resizeStatus: false,
            transformOrigin: ''
        };
        this.stopResize = this.stopResize.bind(this);
        this.resizeBox = this.resizeBox.bind(this);
    }

    activateDrag(e) {
        ::this.activateBox();
        let {x, y} = this.state;
        this.pointStartX = !x ? e.clientX : e.clientX - x;
        this.pointStartY = !y ? e.clientY : e.clientY - y;
        this.setState({dragStatus: true});
    }

    activateResize(origin, e) {
        let {x, y} = this.state;
        this.pointStartX = !x ? e.clientX : e.clientX - x;
        this.pointStartY = !y ? e.clientY : e.clientY - y;
        this.setState({
            dragStatus: false,
            resizeStatus: true,
            transformOrigin: origin
        });
        this.box.parentNode.addEventListener('mouseup', this.stopResize, false);
    }

    resizeBox(e) {
        let {resizeStatus, width, height, x, y, transformOrigin} = this.state;
        if (resizeStatus && this.mounted) {
            let newWidth = width;
            let newHeight = height;
            let newY = y;
            let newX = x;
            let deltaX = ((e.clientX - this.pointStartX) - x) / 2;
            let deltaY = ((e.clientY - this.pointStartY) - y) / 2;
            if (transformOrigin == 'br') {
                newWidth += deltaX;
                newHeight += deltaY;
            }
            if (transformOrigin == 'bl') {
                newWidth -= deltaX;
                newHeight += deltaY;
                newX += deltaX;
            }
            if (transformOrigin == 'tr') {
                newWidth += deltaX;
                newHeight -= deltaY;
                newY += deltaY;
            }
            if (transformOrigin == 'tl') {
                newWidth -= deltaX;
                newHeight -= deltaY;
                newY += deltaY;
                newX += deltaX;
            }
            this.setState({
                width: newWidth,
                height: newHeight,
                y: newY,
                x: newX
            });
            this.pointStartX = !x ? e.clientX : e.clientX - x;
            this.pointStartY = !y ? e.clientY : e.clientY - y;
        }
    }

    stopResize() {
        this.setState({dragStatus: false, resizeStatus: false});
        ::this.updatePosition();
    }

    stopDrag(e) {
        this.setState({dragStatus: false});
        ::this.updatePosition();
    }

    async updatePosition() {
        this.box.parentNode.removeEventListener('mouseup', this.stopResize, false);
        if (matchDataBox(this.state, this.props)) {
            let {dispatch} = this.props;
            let {x, y, width, height, id} = this.state;
            let url = updateDataBoxUrl(id);
            let response = await Update(url, {x, y, width, height, id, statusActive: false});

            if (response.status >= 200 && response.status <= 300) {
                dispatch(updateDataBox(this.state));
            }
        }
    }

    dragBox(e) {
        let {dragStatus, resizeStatus} = this.state;
        if (dragStatus && !resizeStatus) {
            this.setState({
                x: e.clientX - this.pointStartX,
                y: e.clientY - this.pointStartY
            });
        }
    }

    activateBox() {
        let {dispatch, id, statusActive} = this.props;
        if (!statusActive) {
            dispatch(activateBox(id));
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.box.parentNode.addEventListener('mousemove', this.resizeBox, false);
    }

    componentWillUnmount() {
        this.mounted = false;
        this.box.parentNode.removeEventListener('mousemove', this.resizeBox, false);
    }

    render() {
        let {id, statusActive} = this.props;
        let {x, y, width, height, transformOrigin} = this.state;
        return (
            <div
                id={`box-${id}`}
                onMouseDown={::this.activateDrag}
                onMouseUp={::this.stopDrag}
                onClick={this.activateBox.bind(this, id)}
                onMouseMove={::this.dragBox}
                style={
                    {
                        top: `${y}px`,
                        left: `${x}px`,
                        width: `${width}px`,
                        height: `${height}px`,
                        zIndex: statusActive ? 1 : 0,
                        transformOrigin: transformOrigin
                    }
                }
                ref={(elem) => {
                    this.box = elem;
                }}
                className='box'
            >
                {
                    statusActive
                    &&
                    <div
                        onMouseDown={this.activateResize.bind(this, 'tl')}
                        onMouseUp={::this.stopResize}
                        className="drag-point top-left"
                    />
                }
                {
                    statusActive
                    &&
                    <div
                        onMouseDown={this.activateResize.bind(this, 'tr')}
                        onMouseUp={::this.stopResize}
                        className="drag-point top-right"/>
                }
                {
                    statusActive
                    &&
                    <div
                        onMouseDown={this.activateResize.bind(this, 'bl')}
                        onMouseUp={::this.stopResize}
                        className="drag-point bottom-left"
                    />
                }
                {
                    statusActive
                    &&
                    <div
                        onMouseDown={this.activateResize.bind(this, 'br')}
                        onMouseUp={::this.stopResize}
                        className="drag-point bottom-right"
                    />
                }
                <p>box id={id}</p>
            </div>
        );
    }
}


export default Box;
