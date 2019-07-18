import {ACTIVATE_BOX, UPDATE_DATA_BOX, UPDATE_ALL_DATA_BOX} from '../../../const';

export let activateBox = (id) => {
    return {type: ACTIVATE_BOX, id};
};
export let updateDataBox = (data) => {
    let {id, width, height, x, y, statusActive} = data;
    return {type: UPDATE_DATA_BOX, data: {id, width, height, x, y, statusActive}};
};
export let updateAllDataBox = (data) => {
    return {type: UPDATE_ALL_DATA_BOX, data};
};

