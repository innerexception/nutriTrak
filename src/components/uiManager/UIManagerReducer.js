import ReactDOM from 'react-dom';
import { getInitialViewState, getFlankedNeighborPositions, flipFlankedNeighbors, doesValidMoveExist } from './UIManagerReducerHelper.js'
import Constants from '../Constants.js';

const appReducer = (state = {}, action) => {
    let viewState = state.viewState;
    switch (action.type) {
        case 'LOAD_MONTH_VIEW':
            return { viewState: {...viewState, activeView: 'month', nutritionMonth: action.nutritionMonth }};
        case 'LOAD_DAY_VIEW':
            return { viewState: {...viewState, nutritionDay: action.nutritionDay }};
        case 'LOAD_MEAL_VIEW':
            return { viewState: {...viewState, activeView: 'meal', activeMealStep: Constants.mealSteps[0].type}};
        case 'ADD_MEAL_OPTION':
            let activeMeal = viewState.activeMeal ? viewState.activeMeal : [];
            activeMeal.push({name: action.name, type: action.foodType});
            return { viewState: {...viewState, activeMeal}};
        case 'ADD_MEAL':
            return { viewState: {...viewState, nutritionMonth: updateNutritionMonthAddMealToday(viewState.activeMeal, viewState.nutritionMonth)}};
        default:
            return state
    }
};

const updateNutritionMonthAddMealToday = (meal, nutritionMonth) => {
    let newMonth = {...nutritionMonth};
    let now = Date.now();
    newMonth.forEach((day) => {
        if(day.day === now.day){
            //TODO: also update day food type totals here
            day.meals.push(meal);
        }
    });
    return newMonth;
};

export default appReducer;