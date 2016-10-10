import React from 'react';
import './Month.css'
import { getDayDetails, getNutritionDayView, getDayRating } from '../nutritionDay/Day.jsx';
import Constants from '../Constants.js';
import { getColorFromRating } from '../Util.js';

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
                        <div className='nutrition-day-bar-rating'>{nutritionDay.rating.toFixed(1)}</div>
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

export const getMonthReport = (month) =>
    <div style={{fontSize:'0.6em', padding:'1em'}}>Your drive score is an average of your daily scores. To raise this, get better daily scores. Click on a day to see a score breakdown.</div>;

export const getMonthScore = (month) => {
    let monthRating=0;
    let activeDays=0;
    month.forEach((day) => {
        let dayRateing = getDayRating(day);
        if(dayRateing){
            activeDays++;
            monthRating+=dayRateing;
        }
    });
    return (monthRating/month.length).toFixed(1);
};

