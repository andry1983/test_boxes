import {ADD_BOX, DELETE_ALL_BOXES} from '../../../const';

export let addBox = (data) => {
    return {type: ADD_BOX, data};
};

export let deleteAllBoxes = () => {
    return {type: DELETE_ALL_BOXES};
};
