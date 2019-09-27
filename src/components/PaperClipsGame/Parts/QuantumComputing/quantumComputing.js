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

import Button from '../../../../library/Button/button';

/**
* Styles
*/

import './quantumComputing.scss';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* QuantumComputing component definition and export
*/

class QuantumComputing extends Component {

    /**
    * Constructor
    */

    constructor (props){
        super(props);
        this.state={
            show: false
        }
    }
    
    /**
    * Markup
    */

    render(){
        return(
            <div className="quantumComputing">
                <div className="quantumComputing-label">Quantum Computing</div>
                {this.props.showChip ? <div className="quantumComputing-chip"/> : null}
                <div className="quantumComputing-wrapper1">
                    <Button
                        className="quantumComputing-button"
                        onClick={() => this.props.showQuantCompMessage()}
                        text={"Compute"}
                        // disabled={this.props.marketingButtonDisabled}
                    />
                    {this.props.changedToQOps ? 
                    <div>qOps: </div> : 
                    <div className={this.props.showQCompMessage === 0 ? 'quantumComputing-text-with-effect0' : (this.props.showQCompMessage % 2 === 0 ? 'quantumComputing-text-with-effect1' :'quantumComputing-text-with-effect2' )}>
                        Need Photonic Chips
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            showQCompMessage: state.business.showQCompMessage,
            showChip: state.business.showChip,
            changedToQOps: state.business.changedToQOps,

        };
    },
    (dispatch) => {
        return {
            showQuantCompMessage: bindActionCreators(Actions.showQuantCompMessage, dispatch),
            // increaseProcessors: bindActionCreators(Actions.increaseProcessors, dispatch),
            // increaseProcessorsMemory: bindActionCreators(Actions.increaseProcessorsMemory, dispatch),

        };
    }
)(QuantumComputing);
