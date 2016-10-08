import Constants from '../Constants.js';

export const getInitialViewState = () => {
    let spaces = [];
    for(let i=0; i<8; i++){
        spaces.push([]);
        for(let j=0; j<8; j++){
            spaces[i].push({owner: null, row:i, col:j});
            if(i===3){
                if(j===3) spaces[i][j].owner= Constants.PLAYER_ONE;
                if(j===4) spaces[i][j].owner= Constants.PLAYER_TWO;
            }
            if(i==4){
                if(j===3) spaces[i][j].owner= Constants.PLAYER_TWO;
                if(j===4) spaces[i][j].owner= Constants.PLAYER_ONE;
            }
        }
    }
    return {
        spaces,
        playerOneScore: 2,
        playerTwoScore: 2,
        activePlayer: Constants.PLAYER_ONE,
        legalMoveExists: true
    }
};

export const flipFlankedNeighbors = (viewState, centerSpace) => {
    let newOwner = viewState.activePlayer;
    let newSpaces = Array.from(viewState.spaces);

    if(!centerSpace.owner){

        getFlankedNeighborPositions(centerSpace, newSpaces, viewState.activePlayer)
            .forEach((position) => {
                newSpaces[position.row][position.col].owner = newOwner;
            });
        centerSpace.owner = newOwner;
        viewState = _updateScores(viewState);
    }

    return  {...viewState, spaces: newSpaces};
};

export const getFlankedNeighborPositions = (space, spaces, activePlayer) => {
    let positions = [];
    if(!space.owner) {
        _neighborArray.forEach((offset) => {
            let row = space.row + offset[0];
            let col = space.col + offset[1];
            if (row >= 0 && row < 8 && col >= 0 && col < 8) {
                //It is a neighbor, now see if it is flanked
                positions = positions.concat(_getFlankedPieces(offset, row, col, space, spaces, activePlayer));
            }
        });
    }
    return positions;
};


export const doesValidMoveExist = (spaces, activePlayer) => {
    let legalMoveExists = false;
    spaces.forEach((row) => {
        row.forEach((space) => {
            if(getFlankedNeighborPositions(space, spaces, activePlayer).length > 0) legalMoveExists = true;
        });
    });
    return legalMoveExists;
};

const _updateScores = (viewState) => {
    let playerOneScore = 0, playerTwoScore = 0;
    viewState.spaces.forEach((row) => {
        row.forEach((space) => {
            if(space.owner) {
                if (space.owner === Constants.PLAYER_ONE) playerOneScore++;
                else playerTwoScore++;
            }
        });
    });
    return {...viewState, playerOneScore, playerTwoScore};
};

const _getFlankedPieces = (offset, row, col, space, spaces, activePlayer) => {
    let positions = [], offsetIncrement = Array.from(offset);
    let validScan=false, continueScan=true, firstRun=true;

    if (spaces[row][col].owner && spaces[row][col].owner !== activePlayer) {
        //It is an enemy neighbor piece
        while (continueScan) {
            offset = firstRun ? offset : [offset[0] + offsetIncrement[0], offset[1] + offsetIncrement[1]];
            firstRun =false;
            if (row + offset[0] >= 0 && row + offset[0] < 8 && col + offset[1] >= 0 && col + offset[1] < 8) {
                //It is a flanking piece
                let flankingSpace = spaces[row + offset[0]][col + offset[1]];
                if (flankingSpace.owner && flankingSpace.owner === activePlayer) {
                    positions.push({row, col});
                    validScan = true;
                    continueScan = false;
                }
                else if(flankingSpace.owner && flankingSpace.owner !== activePlayer){
                    positions.push({row:row + offset[0], col:col + offset[1]});
                }
                else continueScan = false;
            }
            else continueScan = false;
        }
    }
    return validScan ? positions : [];
};

const _neighborArray = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];