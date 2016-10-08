import ReactDOM from 'react-dom';
import Constants from '../Constants.js'
import { getInitialViewState, getFlankedNeighborPositions, flipFlankedNeighbors, doesValidMoveExist } from './UIManagerReducerHelper.js'

const appReducer = (state = {}, action) => {
    let viewState = state.viewState;
    let activePlayer = viewState && viewState.activePlayer;
    switch (action.type) {
        case 'NEW_GAME':
            return { viewState: getInitialViewState()};
        case 'SPACE_OVER':
            let validMove = false;
            viewState.spaces.forEach((row) => {
                row.forEach((space) => {
                    space.highlight = false;
                    space.valid = false;
                    if(space === action.space) space.highlight = true;
                });
            });
            let flankedNeighbors = getFlankedNeighborPositions(action.space, viewState.spaces, viewState.activePlayer);
            flankedNeighbors.forEach((position) => {
                viewState.spaces[position.row][position.col].valid = true;
            });
            //Move is valid if there is at least 1 flanked neighbor
            if(flankedNeighbors.length > 0){ validMove = true; action.space.valid = true; }
            //Move is never valid for owned spaces
            if(action.space.owner) validMove = false;
            return { viewState: {...viewState, spaces: Array.from(viewState.spaces), validMove }};
        case 'SPACE_CLICK':
            if(viewState.validMove) {
                viewState = flipFlankedNeighbors(viewState, action.space);
                activePlayer = viewState.activePlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;
            }
            return { viewState: {...viewState, activePlayer, legalMoveExists: doesValidMoveExist(viewState.spaces, activePlayer)}};
        case 'PASS_CLICK':
            activePlayer = viewState.activePlayer === Constants.PLAYER_ONE ? Constants.PLAYER_TWO : Constants.PLAYER_ONE;
            let currentLegalMove = doesValidMoveExist(viewState.spaces, activePlayer);
            let winner;
            if(!viewState.legalMoveExists && !currentLegalMove) winner = viewState.playerOneScore > viewState.playerTwoScore ? Constants.PLAYER_ONE : Constants.PLAYER_TWO;
            return { viewState: {...viewState, activePlayer, legalMoveExists: currentLegalMove, winner}};
        default:
            return state
    }
};

export default appReducer;