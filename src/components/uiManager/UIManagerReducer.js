import ReactDOM from 'react-dom';
import { getInitialViewState, getFlankedNeighborPositions, flipFlankedNeighbors, doesValidMoveExist } from './UIManagerReducerHelper.js'
import { getMealCounts } from '../nutritionMeal/Meal.jsx';
import { getDayRating } from '../nutritionDay/Day.jsx';
import Constants from '../Constants.js';

const appReducer = (state = {}, action) => {
    let viewState = state.viewState;
    switch (action.type) {
        case 'LOAD_MONTH_VIEW':
            return { viewState: {...viewState, activeView: 'month', nutritionMonth: action.nutritionMonth ? action.nutritionMonth : viewState.nutritionMonth, nutritionDay: false, activeDayDetails: null, activeMeal:[]}};
        case 'LOAD_DAY_VIEW':
            return { viewState: {...viewState, nutritionDay: action.nutritionDay }};
        case 'LOAD_MEAL_VIEW':
            if(viewState.activeView==='meal') return { viewState: {...viewState, activeView: 'month', activeMeal: []}};
            return { viewState: {...viewState, activeView: 'meal', activeMealStep: Constants.mealSteps[0].type, activeMeal: []}};
        case 'ADD_MEAL_OPTION':
            viewState.activeMeal.push({name: action.name, type: action.foodType, count: 1, hours: new Date().getHours()});
            return { viewState: {...viewState, activeMeal: viewState.activeMeal}};
        case 'LOAD_MEAL_DETAILS':
            return { viewState: {...viewState, activeMealDetails: action.meal}};
        case 'HIDE_MEAL_DETAILS':
            return { viewState: {...viewState, activeMealDetails: null}};
        case 'LOAD_DAY_DETAILS':
            return { viewState: {...viewState, activeDayDetails: action.day}};
        case 'HIDE_DAY_DETAILS':
            return { viewState: {...viewState, activeDayDetails: null}};
        case 'MEAL_NEXT_STEP':
            return { viewState: updateViewStateActiveMealStep(viewState, action.activeStep)};
        case 'MEAL_SELECT_STEP':
            return { viewState: updateViewStateActiveMealStep(viewState, action.step, true)};
        case 'MONTH_DETAILS_SHOW':
            return { viewState: {...viewState, showMonthDetails: !viewState.showMonthDetails}};
        default:
            return state
    }
};

const updateNutritionMonthAddMealToday = (meal, nutritionDay, nutritionMonth) => {
    let newMonth = Array.from(nutritionMonth);
    newMonth.forEach((day) => {
        if(day.day === nutritionDay.day){
            let mealCounts = getMealCounts(meal);
            day.protein+= mealCounts.protein;
            day.fats+= mealCounts.fats;
            day.drink += mealCounts.drink;
            day.carbs += mealCounts.carbs;
            day.veg += mealCounts.veg;
            meal[0].hours = new Date().getHours();
            day.meals.push(meal);
            day.rating = getDayRating(day);
        }
    });
    return newMonth;
};

const updateViewStateActiveMealStep = (viewState, activeStep, setStep) => {
    let newState = {...viewState};
    let stepIndex=0;
    Constants.mealSteps.forEach((step, i) => { if(step.type === activeStep) stepIndex = i; });

    if(!setStep){
        if(stepIndex < Constants.mealSteps.length-1) stepIndex++;
        else{
            newState.nutritionMonth = updateNutritionMonthAddMealToday(newState.activeMeal, newState.nutritionDay, newState.nutritionMonth);
            newState.activeView = 'month';
        }
    }

    newState.activeMealStep = Constants.mealSteps[stepIndex].type;
    return newState;
};

export default appReducer;