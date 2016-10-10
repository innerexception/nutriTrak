import React from 'react';
import './Day.css'
import { getMealRating, getMealDetails } from '../nutritionMeal/Meal.jsx';
import Constants from '../Constants.js';

export const getNutritionDayView = (nutritionDay, activeView, showMealDetails, onAddMealClicked, onGotoCalendarClicked) => {
    let previousMealValues = 0, previousMealTimePercent=5;
    let totalWidth = (getDayRating(nutritionDay)/10)-0.17;
    return (
        <div className='nutrition-day-view'>
            <div className='nutrition-day-left'>
                { nutritionDay.meals.map((meal) => {
                    let topPadding = previousMealTimePercent;
                    previousMealTimePercent = ((meal[0].hours-5)/15)*100;
                    let currentTimePercent = ((meal[0].hours-5)/15)*100;
                    let leftPadding = previousMealValues;
                    previousMealValues+=getMealRating(meal)*totalWidth;
                    return <div className='nutrition-meal' title={'This meal represents '+getMealRating(meal).toFixed(0)+ '% of your daily goal'} style={{width: (getMealRating(meal)*totalWidth)+'%', marginLeft: (Math.min(80,leftPadding))+'%', marginTop: (( currentTimePercent- topPadding)/5)+'%'}}>
                                <div className='nutrition-meal-detail'>
                                    { getMealDetails(meal) }
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
        dayRating += day[type];
    });
    return dayRating/22*10;
};

//TODO, convert to table layout
export const getDayDetails = (day) =>
    <div>
        Today so far:
        <table>
            { Object.keys(Constants.dailyTargets).map((type) => {
                let difference = day[type] - Constants.dailyTargets[type];
                let color = 'green';
                if(difference > 0 && (type !== 'veg' && type !== 'drink')) color = 'red';
                if(difference < 0){
                    color = 'red'; difference = 'Need '+(-difference)+' more';
                }
                if(difference > 0) difference = (type==='carbs' || type === 'fats' ? 'too many, -' : 'more is better, +')+(difference/10);
                return <tr>
                            <td>{type}:</td>
                            <td>
                                <span>{day[type]} / {Constants.dailyTargets[type]} {difference !== 0 ?
                                    <span style={{color: color}}>({difference})</span> :
                                    <span className='checkmark inline'></span>}
                                </span>
                            </td>
                       </tr>
            })}
            <tr><td>Meals:</td><td>{day.meals.length} / 5-6</td></tr>
            <tr><td>Ate within an hour of waking</td><td><span className='checkmark inline'></span></td></tr>
            <tr><td>Recharge meals used</td><td>(Only during season and postseason)</td></tr>
        </table>
    </div>;