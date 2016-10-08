import { connect } from 'react-redux'
import {  } from './UIManagerActions.js'
import { getInitialViewState } from './UIManagerReducerHelper.js';
import UIManager from './UIManager.jsx'

const mapStateToProps = (state) => {
    return {
        viewState: state.viewState ? state.viewState : getInitialViewState()
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSpaceMouseOver: (space) => {
            dispatch(spaceMouseOver(space));
        }
    }
};

const UIStateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UIManager);

export default UIStateContainer;