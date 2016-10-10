import Constants from './Constants.js';
import chroma from 'chroma-js';

export const getColorFromRating = (rating) => {
    return chroma.mix('#ff0000', '#00ff00', rating/10, 'lab').rgba()
};