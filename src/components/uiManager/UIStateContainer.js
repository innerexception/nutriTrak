import { connect } from 'react-redux'
import { dayClicked, addMealClicked, mealOptionAdded, gotoCalendar, showDayDetails, hideDayDetails,
         showMealDetails, hideMealDetails, mealNextStep, mealPreviousStep, mealStepSelected } from './UIManagerActions.js'
import { getInitialViewState } from './UIManagerReducerHelper.js';
import UIManager from './UIManager.jsx'

const mapStateToProps = (state) => {
    return {
        viewState: state.viewState ? state.viewState : {}
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDayClicked: (day) => {
            dispatch(dayClicked(day))
        },
        onAddMealClicked: (activeMeal) => {
            dispatch(addMealClicked(activeMeal))
        },
        onMealOptionAdded: (mealOption, type) => {
            dispatch(mealOptionAdded(mealOption.name, type))
        },
        onGotoCalendarClicked: () => {
            dispatch(gotoCalendar())
        },
        onShowMealDetails: (meal) => {
            dispatch(showMealDetails(meal))
        },
        onHideMealDetails: () => {
            dispatch(hideMealDetails());
        },
        onShowDayDetails: (day) => {
            dispatch(showDayDetails(day))
        },
        onHideDayDetails: () => {
            dispatch(hideDayDetails());
        },
        onNextMealStepClicked: (activeStep) => {
            dispatch(mealNextStep(activeStep));
        },
        onPrevMealStepClicked: (activeStep) => {
            dispatch(mealPreviousStep(activeStep));
        },
        onMealStepSelected: (step) => {
            dispatch(mealStepSelected(step));
        }
    }
};

const UIStateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UIManager);

export default UIStateContainer;