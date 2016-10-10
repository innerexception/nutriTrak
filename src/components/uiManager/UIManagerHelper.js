import React from 'react';
import { onDayClicked } from './UIManagerActions.js';
import { getMealCounts, getColorFromRating } from '../Util.js';
import Constants from '../Constants.js';

export const getNutritionCalendarView = (nutritionMonth, nutritionSelectedDay, activeMeal, showDayDetails, activeView, onDayClicked, onAddMealClicked,
                                         onGotoCalendarClicked, onShowMealDetails, onHideMealDetails, onShowDayDetails, onHideDayDetails) =>
    <div className='calendar-view'>
        { Constants.days.map((day) => {
            return <div className={'nutrition-day label '+(nutritionSelectedDay ? 'minimized' : '')}>{day}</div>
        }) }
        { nutritionMonth.map((nutritionDay) => {
            return <div className={getDayClassName(nutritionDay, nutritionSelectedDay)}>
                        {nutritionDay.day === (nutritionSelectedDay && nutritionSelectedDay.day) ? getNutritionDayView(nutritionDay, activeView, onAddMealClicked, onGotoCalendarClicked) : null }
                        {nutritionDay.day <= new Date().getDate() ?
                            <div className='nutrition-day-bar' onClick={()=>onDayClicked(nutritionDay)} onMouseEnter={()=>onShowDayDetails(nutritionDay)} onMouseLeave={()=>onHideDayDetails(nutritionDay)}>
                                <div className='nutrition-day-bar-bar' style={{width: (nutritionDay.rating*10)+'%', background: 'rgba('+getColorFromRating(nutritionDay.rating)+')'}}></div>
                                <div className='nutrition-day-bar-rating'>{nutritionDay.rating}</div>
                            </div> :
                            <div className='nutrition-day-bar'>
                                <div className='nutrition-day-bar-bar' style={{width: (nutritionDay.rating*10)+'%', background: 'rgba('+getColorFromRating(nutritionDay.rating)+')'}}></div>
                                <div className='nutrition-day-bar-rating'>-.-</div>
                            </div>
                        }
                        <div className={'nutrition-day-detail '+(showDayDetails && showDayDetails.day === nutritionDay.day ? 'in' : 'out')}>
                            { getDayDetails(nutritionDay) }
                        </div>
                   </div>
        }) }
    </div>;

const getDayClassName = (day, selectedDay) => {
    let className = 'nutrition-day ';
    if(selectedDay) className += (day.day === (selectedDay && selectedDay.day) ? 'maximized' : 'minimized');
    let today = new Date().getDate();
    if(day.day !== today) className += ' past';
    return className;
};

export const getNutritionDayView = (nutritionDay, activeView, onAddMealClicked, onGotoCalendarClicked, onShowMealDetails, onHideMealDetails) => {
    let previousMealValues = 0;
    return (
        <div className='nutrition-day-view'>
            <div className='nutrition-day-left'>
                { nutritionDay.meals.map((meal) => {
                    let leftPadding = previousMealValues;
                    previousMealValues+=getMealRating(meal);
                    return <div className='nutrition-meal' onMouseEnter={()=>onShowMealDetails(meal)} onMouseLeave={()=>onHideMealDetails(meal)}
                                style={{width: getMealRating(meal)+'%', marginLeft: (leftPadding)+'%', marginTop: ((meal[0].hours/24)*8)+'%'}}></div>
                }) }
            </div>
            <div className='nutrition-day-right'>
                <div className='nutrition-day-time-bar'>
                    <div className='nutrition-day-icon icon'><span className='morning-span'>6 am</span></div>
                    { new Date().getDate() === nutritionDay.day ?
                        <div className={'nutrition-meal-btn icon '+(activeView==='meal' ? 'cancel' : '')} style={{top: getPercentFromTimeOfDay(new Date())+'%'}} onClick={()=>onAddMealClicked()}></div> : null }
                    <div className='nutrition-night-icon icon'><span className='morning-span'>10 pm</span></div>
                    <div className='nutrition-day-back-btn icon' onClick={onGotoCalendarClicked}></div>
                </div>
            </div>
        </div>
    )
};

const getPercentFromTimeOfDay = (date) => {
    return ((date.getHours()/24)*100)*0.65;
};

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

const getMealRating = (meal) => {
    let mealCounts = getMealCounts(meal);
    let mealRating = 0;
    Object.keys(Constants.dailyTargets).forEach((type) => {
        mealRating += mealCounts[type];
    });
    return (mealRating/19)*100;
};

//TODO, showing meal bonus/penalties and info;;;;;;; change day detail show to be on click, when in day view only
//TODO Scores needs rounding and to be accurate 1-10
export const getDayDetails = (day) =>
    <div>The Day Stats
        { Object.keys(Constants.dailyTargets).map((type) => {
            return <div>{type}: {day[type]} / {Constants.dailyTargets[type]}</div>
        })}
    </div>;

export const getMonthReport = (month) =>
    <div style={{fontSize:'0.6em', padding:'1em'}}>Your drive score is an average of your daily scores. To raise this, get better daily scores. Click on a day to see a score breakdown.</div>;

export const getMealReport = (meal) =>
    <div></div>;

//TODO add meal details click showing bonus/penalties, do meal styles
//TODO add a bunch of test foods

//TODO MealBuilder rules: -----------
//TODO add water tracking to meal builder
//TODO add free (recharge meal) checkbox to meal builder, (gray out when appropriate)
//TODO Protein is required
//TODO Protein requires min 1 carb or veg
//TODO add extra advice text with an info button hover
//TODO penalty for eating 1st meal too late
//TODO add veg 3 minimum back
//TODO bonus for 5 or 6 meals
//TODO add meal button is disabled if you have eaten too recently, with click tooltip to explain
//TODO show bonuses/penalties during meal builder
//TODO ------------------
