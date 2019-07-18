import React, {PureComponent} from 'react';
import Row from '../../columns/row';
import Column from '../../columns/column';
import {GLOBAL} from '../../../config';
import BoxControlPanel from '../../box_control_panel';
import BoxPanel from '../../box_panel';
import Preloader from '../../preloader';
import {apiGetAllDataBoxes} from "../../../config/urls";
import {updateAllDataBox} from "../../../components/box/actions";

let {FULL_SCREEN_COUNT_ROW, FULL_SCREEN_COUNT_COLUMN} = GLOBAL;

class BoxPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let headerHeight = 3;
        let leftColumnHeight = FULL_SCREEN_COUNT_ROW - headerHeight;
        let leftColumnWidth = 3;
        let centerColumnHeight = FULL_SCREEN_COUNT_ROW - headerHeight;
        let centerColumnWidth = FULL_SCREEN_COUNT_COLUMN - leftColumnWidth;
        return (

            <Preloader
                url={apiGetAllDataBoxes}
                method='get'
                dispatchStatus={true}
                action={updateAllDataBox}
            >
                <div
                    className='page-container animated fadeIn'
                >
                    <Row
                        name='header'
                        className='header animated slideInDown'
                        heightRow={headerHeight}
                    >
                        <h2>Boxes</h2>
                    </Row>
                    <Column
                        name='left-column'
                        className='animated slideInLeft left-column'
                        heightColumn={leftColumnHeight}
                        widthColumn={leftColumnWidth}
                        float={'left'}

                    >
                        <BoxControlPanel/>
                    </Column>
                    <Column
                        className='animated slideInRight center-column'
                        name='center-column'
                        heightColumn={centerColumnHeight}
                        widthColumn={centerColumnWidth}
                        float={'right'}
                    >
                        <BoxPanel/>
                    </Column>
                </div>
            </Preloader>
        );
    }
}

export {BoxPage};
