import React from 'react';
import './Meal.css'
import Constants from '../Constants.js';

export const getNutritionMealView = (day, activeStep, activeMeal, onMealOptionAdded, onNextMealStepClicked, onMealStepSelected) =>
    <div className='nutrition-meal-wizard'>
        {Constants.mealSteps.map((step) => {
            return <div className={'nutrition-meal-step '+(step.type === activeStep ? 'in' : 'out')}>
                <div className='nutrition-step-title' onClick={()=>onMealStepSelected(step.type)}>{step.title + (Constants.dailyTargets[step.type] ? ' ('+day[step.type]+' / '+Constants.dailyTargets[step.type]+' so far today)' : ' ('+day[step.type]+' so far today)')}</div>
                {step.options.map((mealOption) => {
                    return <div className={'nutrition-meal-option '+(isMealOptionSelected(activeMeal, mealOption) ? 'selected' : '')} onClick={()=>onMealOptionAdded(mealOption, step.type)}>{mealOption.name}</div>
                })}
                <div className={'nutrition-step-next-btn icon '+(step.isEnd ? 'add-meal' : '')} onClick={()=>onNextMealStepClicked(activeStep)}></div>
            </div>
        })}
    </div>;

const isMealOptionSelected = (activeMeal, mealOption) => {
    return activeMeal.filter((amealOption) => amealOption.name === mealOption.name).length > 0;
};

export const getMealCounts = (meal) => {
    let counts  = {
        protein:0,
        fats:0,
        veg:0,
        drink:0,
        carbs:0
    };
    meal.forEach((mealOption) => {
        counts[mealOption.type]+=mealOption.count;
    });
    return counts;
};

export const getMealRating = (meal) => {
    let mealCounts = getMealCounts(meal);
    let mealRating = 0;
    Object.keys(Constants.dailyTargets).forEach((type) => {
        mealRating += mealCounts[type];
    });
    return ((mealRating/19)*100);
};

export const getMealReport = (meal) =>
    <div></div>;