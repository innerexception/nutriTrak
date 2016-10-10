import React from 'react';
import './Day.css'
import { getMealRating, getMealDetails } from '../nutritionMeal/Meal.jsx';
import Constants from '../Constants.js';

export const getNutritionDayView = (nutritionDay, activeView, showMealDetails, onAddMealClicked, onGotoCalendarClicked, onShowMealDetails) => {
    let previousMealValues = 0;
    return (
        <div className='nutrition-day-view'>
            <div className='nutrition-day-left'>
                { nutritionDay.meals.map((meal) => {
                    let leftPadding = previousMealValues;
                    previousMealValues+=getMealRating(meal);
                    return <div className='nutrition-meal' onClick={()=>onShowMealDetails(meal)}
                                style={{width: getMealRating(meal)+'%', marginLeft: (leftPadding)+'%', marginTop: ((meal[0].hours/24)*8)+'%'}}>
                                <div className={'nutrition-meal-detail '+(showMealDetails && showMealDetails === meal ? 'in' : 'out')}>
                                    { getMealDetails(meal) }
                                    <div className='down-arrow'></div>
                                </div>
                            </div>
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

export const getDayRating = (day) => {
    let dayRating = 0;
    Object.keys(Constants.dailyTargets).forEach((type) => {
        dayRating += day[type]/Constants.dailyTargets[type];
    });
    return dayRating;
};

//TODO, showing meal bonus/penalties and info
export const getDayDetails = (day) =>
    <div>
        Today so far:
        { Object.keys(Constants.dailyTargets).map((type) => {
            let difference = day[type] - Constants.dailyTargets[type];
            if(difference > 0 && (type === 'veg' || type === 'drink')) difference = '+'+difference;
            if(difference < 0 && (type !== 'veg' || type!=='drink')) difference = ''+difference;
            return <div>{type}: {day[type]} / {Constants.dailyTargets[type]} {difference !== 0 ?
                        <span style={{color: difference > 0 ? 'green':'red'}}>({difference})</span> :
                        <span className='checkmark'></span>}
                   </div>
        })}
        <div>Meals: {day.meals.length} / 5-6</div>
        <div className='checkmark'>Ate within an hour of waking</div>
        <div className='checkmark'>Recharge meals used</div>
    </div>;