import { connect } from 'react-redux'
import { dayClicked, addMealClicked, mealOptionAdded } from './UIManagerActions.js'
import { getInitialViewState } from './UIManagerReducerHelper.js';
import UIManager from './UIManager.jsx'

const mapStateToProps = (state) => {
    return {
        viewState: state.viewState ? state.viewState : getInitialViewState()
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDayClicked: (day) => {
            dispatch(dayClicked(day));
        },
        onAddMealClicked: () => {
            dispatch(addMealClicked());
        },
        onMealOptionAdded: (mealOption, type) => {
            dispatch(mealOptionAdded(mealOption.name, type));
        }
    }
};

const UIStateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UIManager);

export default UIStateContainer;