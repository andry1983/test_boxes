import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {GLOBAL} from '../../config';
import spiner from '../../../static/img/index.wave-ball-preloader.svg';

let {FULL_SCREEN_COUNT_COLUMN, FULL_SCREEN_COUNT_ROW, Post, Get} = GLOBAL;

const methods = {get: Get, post: Post};

class Preloader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    async getData() {
        let {url, method = 'get', dispatchStatus = false, dispatch, action} = this.props;
        if (this.mounted) {
            let minTimeAnimate = 1000;
            let TimeAnimate = 0;
            let respons = null;
            let result = null;
            let methodApi = methods[method];
            if (methodApi) {
                let startTime = Math.floor(Date.now());
                respons = await methodApi(url);
                if (respons.status >= 200 && respons.status < 300) {
                    if (dispatchStatus) {
                        result = () => dispatch(action(respons.data));
                    } else {
                        result = () => action(respons.data);
                    }
                }
                let endTime = Math.floor(Date.now());
                let deltaTime = endTime - startTime;
                if (deltaTime < minTimeAnimate) {
                    TimeAnimate = Math.floor(minTimeAnimate - deltaTime);
                }
                let _this = this;
                setTimeout(() => result() && _this.setState({open: true}), TimeAnimate);
            }
        }
    }

    componentDidMount() {
        this.mounted = true;
        ::this.getData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        let {children} = this.props;
        let {open} = this.state;
        return (
            !open ?
                <div
                    className={`preloader-box column-w-${FULL_SCREEN_COUNT_COLUMN} row-h-${FULL_SCREEN_COUNT_ROW}`}
                >
                    <img
                        src={spiner}
                    />
                </div>
                :
                children
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Preloader);
