import is from 'is_js';


function isNotEmpty(content) {
    return content && is.not.empty(content) && is.not.undefined(content);
}


function addNewBox(newBoxData, boxes) {
    let newBoxList = [];
    for (let i = 0, len = boxes.length; i < len; i++) {
        let box = boxes[i];
        box.statusActive = false;
        newBoxList.push(box);
    }
    newBoxData.statusActive = true;
    newBoxList.push(newBoxData);
    return newBoxList;
}

function activeBox(id, data) {
    let newBoxList = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let box = data[i];
        let {id: boxId} = box;
        if (id !== boxId) {
            box.statusActive = false;
        } else {
            box.statusActive = true;
        }

        newBoxList.push(box);
    }
    return newBoxList;
}

function updateBox(data, boxes) {
    let newBoxList = [];
    let {id} = data;
    for (let i = 0, len = boxes.length; i < len; i++) {
        let box = boxes[i];
        let {id: boxId} = box;
        if (id !== boxId) {
            newBoxList.push(box);
        } else {
            newBoxList.push(data);
        }
    }
    return newBoxList;
}


function matchDataBox(newState, oldState) {
    let {width, height, x, y} = newState;
    let {width: oldWidth, height: oldHeight, x: oldX, y: oldY} = oldState;
    return width !== oldWidth || height !== oldHeight || x !== oldX || y !== oldY;
}

export {
    isNotEmpty,
    addNewBox,
    activeBox,
    matchDataBox,
    updateBox
};
