export const newGame = () => {
    return {
        type: 'NEW_GAME'
    }
};

export const spaceMouseOver = (space) => {
    return {
        type: 'SPACE_OVER',
        space
    }
};

export const spaceClick = (space) => {
    return {
        type: 'SPACE_CLICK',
        space
    }
};

export const passClicked = () => {
    return {
        type: 'PASS_CLICK'
    }
};