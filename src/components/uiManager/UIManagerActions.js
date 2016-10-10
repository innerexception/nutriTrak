export const loadNutritionCalendar = (user) => {
    return {
        type: 'LOAD_MONTH_VIEW',
        nutritionMonth: user.nutritionHistory
    }
};

export const dayClicked = (day) => {
    return {
        type: 'LOAD_DAY_VIEW',
        nutritionDay: day
    }
};

export const addMealClicked = (meal) => {
    return {
        type: 'LOAD_MEAL_VIEW',
        meal
    }
};

export const mealOptionAdded = (name, foodType) => {
    return {
        type: 'ADD_MEAL_OPTION',
        name,
        foodType
    }
};

export const gotoCalendar = () => {
    return {
        type: 'LOAD_MONTH_VIEW'
    }
};

export const showMealDetails = (meal) => {
    return {
        type: 'LOAD_MEAL_DETAILS',
        meal
    }
};

export const hideMealDetails = () => {
    return {
        type: 'HIDE_MEAL_DETAILS'
    }
};

export const showDayDetails = (day) => {
    return {
        type: 'LOAD_DAY_DETAILS',
        day
    }
};

export const hideDayDetails = () => {
    return {
        type: 'HIDE_DAY_DETAILS'
    }
};

export const mealNextStep = (activeStep) => {
    return {
        type: 'MEAL_NEXT_STEP',
        activeStep
    }
};

export const mealStepSelected = (step) => {
    return {
        type: 'MEAL_SELECT_STEP',
        step
    }
};