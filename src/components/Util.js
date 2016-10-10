import Constants from './Constants.js';
import chroma from 'chroma-js';

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

export const getDayRating = (day) => {
    let dayRating = 0;
    Object.keys(Constants.dailyTargets).forEach((type) => {
        dayRating += day[type]/Constants.dailyTargets[type];
    });
    return dayRating;
};

export const getColorFromRating = (rating) => {
    return chroma.mix('#ff0000', '#00ff00', rating/10, 'lab').rgba()
};