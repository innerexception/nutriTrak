import React from 'react';
import './UIManager.css';
import { getNutritionCalendarView, getNutritionMealView } from './UIManagerHelper.js';
import { loadNutritionCalendar } from './UIManagerActions.js';
import Constants from '../Constants.js';

class UIManager extends React.Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        this.props.store.dispatch(loadNutritionCalendar(Constants.testUser));
    };

    render(){
        return (
            <div className='ui-frame'>
                <div className={'nutri-trak-calendar '+(this.props.viewState.activeView === 'month' ? 'in' : 'out')}>
                    { getNutritionCalendarView(this.props.viewState.nutritionMonth, this.props.viewState.nutritionDay, this.props.viewState.activeDayDetails,
                                               this.props.onDayClicked, this.props.onAddMealClicked, this.props.onGotoCalendarClicked, this.props.onShowMealDetails,
                                               this.props.onHideMealDetails, this.props.onShowDayDetails, this.props.onHideDayDetails) }
                </div>
                <div className={'nutri-trak-meal '+(this.props.viewState.activeView === 'meal' ? 'in' : 'out')}>
                    { getNutritionMealView(this.props.viewState.nutritionDay, this.props.viewState.activeMealStep, this.props.onMealOptionAdded,
                                           this.props.onNextMealStepClicked, this.props.onPrevMealStepClicked) }
                </div>
            </div>
        )
    }
}

export default UIManager