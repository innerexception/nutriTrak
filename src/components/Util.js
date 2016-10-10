import Constants from './Constants.js';
import chroma from 'chroma-js';

export const getColorFromRating = (rating) => {
    return rating ? chroma.mix('#ff0000','#00ff00', parseInt(rating.toFixed(1))/10, 'lab').rgba() : null;
};