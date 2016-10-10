import { connect } from 'react-redux'
import { dayClicked, addMealClicked, mealOptionAdded, gotoCalendar, showDayDetails, hideDayDetails,
         showMealDetails, hideMealDetails, mealNextStep, mealPreviousStep, mealStepSelected, monthScoreDetails } from './UIManagerActions.js'
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
        onShowDayDetails: (day) => {
            dispatch(showDayDetails(day))
        },
        onHideDayDetails: () => {
            dispatch(hideDayDetails());
        },
        onNextMealStepClicked: (activeStep) => {
            dispatch(mealNextStep(activeStep));
        },
        onMealStepSelected: (step) => {
            dispatch(mealStepSelected(step));
        },
        onShowMonthDetails: (month) => {
            dispatch(monthScoreDetails(month))
        }
    }
};

const UIStateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UIManager);

export default UIStateContainer;