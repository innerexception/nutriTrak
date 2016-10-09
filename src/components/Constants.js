export default {
    testUser: {
        nutritionHistory: [
            { day: 1, month: 3, year: 2016, rating: 8.8, protein: 3, veg: 7, drink: 6, fats: 2, carbs: 5,
                meals: [
                    //Food Ids
                    [2,4,5,3,8,6],
                    [2,4,5,3,8,6],
                    [3,8,6]
                ]
            },
            { day: 2, month: 3, year: 2016, rating: 6.8, protein: 3, veg: 7, drink: 6, fats: 2, carbs: 5,
                meals: [
                    [2,4,5,3,8,6],
                    [2,4,5,3,8,6],
                    [3,8,6]
                ]
            },
            { day: 3, month: 3, year: 2016, rating: 7.8, protein: 3, veg: 7, drink: 6, fats: 2, carbs: 5,
                meals: [
                    [2,4,5,3,8,6],
                    [2,4,5,3,8,6],
                    [3,8,6]
                ]
            }
        ]
    },
    mealSteps: [
        { title: 'Pick a Protein', type: 'protein', options: [{name: 'Ground Beef'}], isStart: true },
        { title: 'Pick your Veg', type: 'veg', options: [] },
        { title: 'To Drink?', type: 'drink', options: [] },
        { title: 'Choose a Fat', type: 'fats', options: [] },
        { title: 'Finally, Carbs', type: 'carbs', options: [], isEnd: true }
    ],
    dailyTargets: {
        protein: 6,
        veg: null,
        drink: 8,
        fats: 2,
        carbs: 3
    }
}