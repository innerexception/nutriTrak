import React from 'react';
import { onDayClicked } from './UIManagerActions.js';
import Constants from '../Constants.js';

export const getNutritionCalendarView = (nutritionMonth, nutritionSelectedDay, showDayDetails, onDayClicked, onAddMealClicked,
                                         onGotoCalendarClicked, onShowMealDetails, onHideMealDetails, onShowDayDetails, onHideDayDetails) =>
    <div className='calendar-view'>
        { nutritionMonth.map((nutritionDay) => {
            return <div className={'nutrition-day '+(nutritionDay.isSelected ? 'maximized' : 'minimized')} onClick={()=>onDayClicked(nutritionDay)}>
                        {nutritionDay.day === (nutritionSelectedDay && nutritionSelectedDay.day) ? getNutritionDayView(nutritionDay, onAddMealClicked, onGotoCalendarClicked) : null }
                        <div className='nutrition-day-bar' onMouseEnter={()=>onShowDayDetails(nutritionDay)} onMouseLeave={()=>onHideDayDetails(nutritionDay)}>
                            <div className='nutrition-day-bar-bar' style={{width: (nutritionDay.rating*10)+'%'}}></div>
                            <div className='nutrition-day-bar-rating'>{nutritionDay.rating}</div>
                        </div>
                        <div className={'nutrition-day-detail '+(showDayDetails ? 'in' : 'out')}>
                            { getDayDetails(nutritionDay) }
                        </div>
                   </div>
        }) }
    </div>;

export const getNutritionDayView = (nutritionDay, onAddMealClicked, onGotoCalendarClicked, onShowMealDetails, onHideMealDetails) => {
    let previousMealValues = 0;
    return (
        <div className='nutrition-day'>
            <div className='nutrition-day-left'>
                { nutritionDay.meals.map((meal) => {
                    let leftPadding = previousMealValues;
                    previousMealValues+=getMealRating(meal);
                    return <div className='nutrition-meal' onMouseEnter={()=>onShowMealDetails(meal)} onMouseLeave={()=>onHideMealDetails(meal)} style={{width: (meal.rating*10)+'px', paddingLeft: (leftPadding*10)+'px'}}></div>
                }) }
            </div>
            <div className='nutrition-day-right'>
                <div className='nutrition-day-time-bar'>
                    <div className='nutrition-day-icon'></div>
                    <div className='nutrition-meal-btn' style={{top: getPercentFromTimeOfDay(new Date())+'%'}} onClick={onAddMealClicked}></div>
                    <div className='nutrition-night-icon'></div>
                    <div className='nutrition-day-back-btn' onClick={onGotoCalendarClicked}></div>
                </div>
            </div>
        </div>
    )
};

const getPercentFromTimeOfDay = (date) => {
    return (date.getHours()/24)*100;
};

export const getNutritionMealView = (day, activeStep, activeMeal, onMealOptionAdded, onNextMealStepClicked, onPrevMealStepClicked) =>
    <div className='nutrition-meal-wizard'>
        {Constants.mealSteps.map((step) => {
            return <div className={'nutrition-meal-step '+step.type === activeStep ? 'in' : 'out'}>
                        <div className='nutrition-step-title'>{step.title + '('+day[step.type]+' / '+Constants.dailyTargets[step.type]+' so far today)'}</div>
                        {step.options.map((mealOption) => {
                            return <div className={'nutrition-meal-option '+(isMealOptionSelected(activeMeal, mealOption) ? 'selected' : '')} onClick={()=>onMealOptionAdded(mealOption, step.type)}>{mealOption.name}</div>
                        })}
                        <div className={'nutrition-step-next-btn '+(step.isEnd ? 'add-meal' : '')} onClick={()=>onNextMealStepClicked(activeStep)}></div>
                        <div className={'nutrition-step-back-btn '+(step.isStart ? 'cancel-meal' : '')} onClick={()=>onPrevMealStepClicked(activeStep)}></div>
                   </div>
        })};
    </div>;

const isMealOptionSelected = (activeMeal, mealOption) => {
    return activeMeal.filter((amealOption) => amealOption.name === mealOption.name).length > 0;
};

const getMealRating = (meal) => {
    let mealCounts = getMealCounts(meal);
    let mealRating = 0;
    Object.keys(Constants.dailyTargets).forEach((type) => {
        mealRating += mealCounts[type]/Constants.dailyTargets[type];
    });
    return mealRating;
};

const getMealCounts = (meal) => {
    let counts  = {
        protein:0,
        fats:0,
        veg:0,
        drink:0,
        carbs:0
    };
    meal.forEach((mealOption) => {
        counts[mealOption.type]++;
    });
    return counts;
};

export const getDayDetails = (day) =>
    <div>The Day Stats
        { Object.keys(Constants.dailyTargets).map((type) => {
            return <div>{type}: {day[type]} / {Constants.dailyTargets[type]}</div>
        })}
    </div>;