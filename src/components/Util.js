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