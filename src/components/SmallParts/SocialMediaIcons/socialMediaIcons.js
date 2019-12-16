/**
* Libraries
*/

import React, {
    useState,
    useEffect
} from 'react';

import {
    Route
} from 'react-router-dom';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import { 
    FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

/**
* Icons
*/

import { 
    faFacebookF,
    faLinkedinIn,
    faInstagram,
    faTwitter
} from '@fortawesome/fontawesome-free-brands'

/**
* Components
*/


/**
* Styles
*/

import './socialMediaIcons.scss';


/**
* Images
*/

import Img1 from '../../../images/Portrait_Placeholder.png';

/**
* Actions
*/

import * as Actions from '../../../actions';

/**
* SocialMediaIcons component definition and export
*/

export const SocialMediaIcons = (props) => {

    const [isHovering, setIsHovering] = useState(false);

    /**
    * Methods
    */

    const loadImage = () => {
        switch(props.image){
            case 'Name1':
            return Img1;
        }
    }

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    /**
    * Markup
    */

    return(
        <div className="socialMediaIcons" style={{width: `${props.width}`}}>
            <FontAwesomeIcon icon={faFacebookF} size={props.size} color={props.color} className="icon-social-media-facebook"/>
            <FontAwesomeIcon icon={faLinkedinIn} size={props.size} color={props.color} className="icon-social-media-linkedIn"/>
            <FontAwesomeIcon icon={faInstagram} size={props.size} color={props.color} className="icon-social-media-instagram"/>
            <FontAwesomeIcon icon={faTwitter} size={props.size} color={props.color} className="icon-social-media-twitter"/>
        </div>
    );
}
 export default connect(
    (state) => {
        return {
            // zoom: Selectors.getZoomState(state),
        };
    },
    (dispatch) => {
        return {
            // showCard: bindActionCreators(Actions.showCard, dispatch),
        };
    }
)(SocialMediaIcons);
 