import {combineReducers} from 'redux';
import {ADD_BOX, DELETE_ALL_BOXES, ACTIVATE_BOX, UPDATE_DATA_BOX, UPDATE_ALL_DATA_BOX} from '../../const';
import {GLOBAL} from '../../config';

let {addNewBox, activeBox, updateBox} = GLOBAL;

let initialStateBoxesInfo = {
    countBoxes: 0,
    boxes: [],
    flagDeleteBoxes: false
};

function boxInfo(state = initialStateBoxesInfo, action) {
    switch (action.type) {
        case ADD_BOX : {
            let {countBoxes, boxes} = state;
            return {
                ...state,
                countBoxes: countBoxes + 1,
                boxes: addNewBox(action.data, boxes),
                flagDeleteBoxes: false
            };
        }
        case DELETE_ALL_BOXES: {
            return {...state, countBoxes: 0, boxes: [], flagDeleteBoxes: true};
        }
        case ACTIVATE_BOX: {
            let {id} = action;
            let {boxes} = state;
            return {...state, boxes: activeBox(id, boxes), flagDeleteBoxes: true};
        }
        case UPDATE_DATA_BOX: {
            let {boxes} = state;
            return {...state, boxes: updateBox(action.data, boxes), flagDeleteBoxes: true};
        }
        case UPDATE_ALL_DATA_BOX: {
            return {
                ...state,
                boxes: action.data,
                flagDeleteBoxes: false,
                countBoxes: action.data.length
            };
        }
        default:
            return state;
    }
}


export default combineReducers({
    boxInfo
});
