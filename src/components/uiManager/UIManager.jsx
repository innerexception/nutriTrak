import React from 'react';
import './UIManager.css';
import { getNutritionCalendarDays, getNutritionDay, getNutritionMealView } from './UIManagerHelper.js';
import { loadNutritionCalendar } from './UIManagerActions.js';
import { testUser } from '../Constants.js';

class UIManager extends React.Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        this.props.store.dispatch(loadNutritionCalendar(testUser));
    };

    render(){
        return (
            <div className='ui-frame'>
                <div className={'nutri-trak-calendar '+(this.props.viewState.monthView ? 'in' : 'out')}>
                    { getNutritionCalendarDays(this.props.viewState.nutritionMonth) }
                </div>
                <div className={'nutri-trak-day'+(this.props.viewState.dayView ? 'in' : 'out')}>
                    { getNutritionDay(this.props.viewState.nutritionSelectedDay) }
                </div>
                <div className={'nutri-trak-meal'+(this.props.viewState.mealView ? 'in' : 'out')}>
                    { getNutritionMealView(this.props.viewState.nutritionSelectedDay) }
                </div>
            </div>
        )
    }
}

export default UIManager