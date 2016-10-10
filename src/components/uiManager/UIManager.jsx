import React from 'react';
import './UIManager.css';
import { getNutritionCalendarView, getNutritionMealView } from './UIManagerHelper.js';
import { loadNutritionCalendar } from './UIManagerActions.js';
import { getMonthScore, getColorFromRating } from  '../Util.js';
import Constants from '../Constants.js';

class UIManager extends React.Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        this.props.store.dispatch(loadNutritionCalendar(Constants.testUser));
    };

    //TODO Month score on avatar click
    render() {
        return (
            <div className='ui-frame'>
                <div className='nutri-trak-score'>
                    <div className='logo icon'><div className='logo-text'>NutriTrak</div></div>
                    <div className='score' onClick={null}>
                        <div className='avatar icon'></div>
                        <span>Drive Rating: </span>
                        { this.props.viewState.nutritionMonth ?
                            <span style={{color: 'rgba('+getColorFromRating(getMonthScore(this.props.viewState.nutritionMonth))+')'}}>{getMonthScore(this.props.viewState.nutritionMonth)}</span> : null}
                    </div>
                </div>
                <div className={'nutri-trak-calendar '+(this.props.viewState.activeView === 'month' ? 'in' : 'out')}>
                    { this.props.viewState.nutritionMonth ? getNutritionCalendarView(this.props.viewState.nutritionMonth, this.props.viewState.nutritionDay, this.props.viewState.activeMeal,
                        this.props.viewState.activeDayDetails, this.props.viewState.activeView,
                        this.props.onDayClicked, this.props.onAddMealClicked, this.props.onGotoCalendarClicked, this.props.onShowMealDetails,
                        this.props.onHideMealDetails, this.props.onShowDayDetails, this.props.onHideDayDetails) : null }
                </div>
                <div className={'nutri-trak-meal '+(this.props.viewState.activeView === 'meal' ? 'in' : 'out')}>
                    { this.props.viewState.nutritionDay ? getNutritionMealView(this.props.viewState.nutritionDay, this.props.viewState.activeMealStep, this.props.viewState.activeMeal,
                        this.props.onMealOptionAdded, this.props.onNextMealStepClicked, this.props.onMealStepSelected) : null }
                </div>
            </div>
        )
    }
}

export default UIManager