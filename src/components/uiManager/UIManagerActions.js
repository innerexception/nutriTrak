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

export const addMealClicked = () => {
    return {
        type: 'LOAD_MEAL_VIEW'
    }
};

export const mealOptionAdded = (name, foodType) => {
    return {
        type: 'ADD_MEAL_OPTION',
        name,
        foodType
    }
};
