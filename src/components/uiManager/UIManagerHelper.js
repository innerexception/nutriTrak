import React from 'react';

export const getOthelloBoard = (viewState, onSpaceMouseOver, onSpaceClick) =>
    <div className='board'>
        {viewState.spaces.map((row) => row.map((space) => {
            return <div className={'space ' + (space.highlight ? 'highlight ' : '') + (space.valid ? 'valid' : '')} onMouseEnter={()=>onSpaceMouseOver(space)} onClick={()=>onSpaceClick(space)}>
                        <div className={space.owner + ' piece'}></div>
                   </div>
        }))}
    </div>;

export const getIndicatorClassName = (viewState) => {
    return 'turn-indicator piece '+
        (viewState.winner ? viewState.winner : viewState.activePlayer) +
        (viewState.legalMoveExists || viewState.winner ? '' : ' pulse ');
};