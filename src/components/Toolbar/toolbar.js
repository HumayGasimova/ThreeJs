/**
 * Libraries
 */

import React,{
    Component
} from 'react';

import {
connect
} from 'react-redux';

import {
bindActionCreators
} from 'redux';

/**
 * Components
 */

import MenuButton from '../MenuButton/menuButton';
import NavigationItems from '../NavigationItems/navigationItems';

/**
 * Styles
 */

import './toolbar.scss';

/**
 * Actions
 */

import * as Actions from '../../actions';

/**
 * MainBox component definition and export
 */

class Toolbar extends Component {

    /**
    * Constructor
    */

    constructor (){
        super();
    }
    
    /**
    * Markup
    */

    render(){
        return(
            <div className="toolbar">
                <NavigationItems/>
                <MenuButton
                    menuButtonHandler={() => this.props.sideDrawerIsOpen("Yes")}
                />
            </div>
        );
    }
}

export default connect(
    (state) => {
       return {
  
       };
    },
    (dispatch) => {
       return {
          sideDrawerIsOpen: bindActionCreators(Actions.sideDrawerOpen, dispatch),
       };
    }
 )(Toolbar);
