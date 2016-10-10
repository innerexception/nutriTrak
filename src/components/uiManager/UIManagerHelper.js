import React from 'react';
import { onDayClicked } from './UIManagerActions.js';
import { getMealCounts, getColorFromRating } from '../Util.js';
import Constants from '../Constants.js';







//TODO, showing meal bonus/penalties and info;;;;;;; change day detail show to be on click, when in day view only
//TODO Scores needs rounding and to be accurate 1-10



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
