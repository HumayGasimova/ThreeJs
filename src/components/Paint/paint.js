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

import { 
    SketchPicker  
} from 'react-color';

import { 
    FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import { 
    faEraser, 
    faRedoAlt, 
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons'

/**
* Components
*/

import Backdrop from '../../library/Backdrop/backdrop';

/**
* Styles
*/

import './paint.scss';

/**
* Selectors
*/

import * as Selectors from '../../reducers/selectors';

/**
* Actions
*/

import * as Actions from '../../actions';

/**
* Utility
*/

import * as Utility from '../../utility';
import Button from '../../library/Button/button';

/**
 * Paint component definition and export
 */


export class Paint extends Component {

    
    /**
    * Methods
    */

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas = () => {
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext("2d");
        canvas.addEventListener('mousedown', (e) => {
            this.props.mouseDown(true);
            this.props.captureLastXY(e.x - 190, e.y - 10);
        })
        canvas.addEventListener('mousemove', (e) => {
            if(this.props.mousePressed){
                this.props.captureXY(e.x - 190, e.y - 10);
                if(this.props.activeToolButton === "pencil"){
                    this.onPaint();
                }
                if(this.props.activeToolButton === "eraser"){
                    this.onErase();
                }
                
                
            }
            
        })
        canvas.addEventListener('mouseup', (e) => {
            this.props.mouseDown(false);
        })

        // canvas.addEventListener('mouseleave', (e) => {
        //     this.props.mouseDown(false);
        // })
        
    }
 
    onPaint = () => {
        this.ctx.strokeStyle = this.props.color;
        this.ctx.lineWidth = this.props.sizePencil;
        this.ctx.lineJoin = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.props.lastX, this.props.lastY);
        
        this.ctx.lineTo(this.props.x, this.props.y);
        this.ctx.closePath();
        this.ctx.stroke();
        this.props.captureLastXY(this.props.x, this.props.y)
    }

    onErase = () => {
        this.ctx.strokeStyle = this.props.bgColor;
        this.ctx.lineWidth = this.props.sizeEraser;
        this.ctx.lineJoin = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.props.lastX, this.props.lastY);
        
        this.ctx.lineTo(this.props.x, this.props.y);
        this.ctx.closePath();
        this.ctx.stroke();
        this.props.captureLastXY(this.props.x, this.props.y)
    }


    clearCanvas = () => {
        this.ctx.clearRect(0, 0, (innerWidth - 35), innerHeight);
    }

    handleChangeComplete  = (e) => {
        let color = `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`;
        switch(this.props.buttonsName){
            case "color":
                this.props.getColor(color);
                break;
            case "bgColor":
                    this.clearCanvas();
                this.props.getBgColor(color);
                break;
        }
    }
    
    colorHandler = () => {
        this.props.toggleColorPicker(true);
        this.props.whichButton("color");
    }

    bgColorHandler = () => {
        this.props.toggleColorPicker(true);
        this.props.whichButton("bgColor");
       
    }

    pencilHandler = () => {
        this.props.chooseTool("pencil");
    }

    eraseHandler = () => {
        this.props.chooseTool("eraser");
    }

    onPencilSizeChange = (e) => {
        this.props.getSize("pencil", e.target.value);
    }

    onEraserSizeChange = (e) => {
        this.props.getSize("eraser", e.target.value);
    }

    handleMouseLeave = () => {
        this.props.toggleColorPicker(false)
    }
    

    /**
    * Markup
    */

    render(){
        return(
            <div className="paint">
                <div className="paint-tool-box">
                    <div className="paint-text">Color</div>
                    <div className="paint-button">
                        <div 
                            className="paint-color" 
                            style={{background: `${this.props.color}`}}
                            onClick={this.colorHandler}    
                        />
                    </div>

                    <div className="paint-text">Bg Color</div>
                    <div className="paint-button">
                        <div 
                            className="paint-bg-color"
                            style={{background: `${this.props.bgColor}`}}
                            onClick={this.bgColorHandler} 
                        />
                    </div>

                    <div className="paint-text">Tools</div>
                    <div className="paint-tools-button">

                        <div 
                            className={this.props.activeToolButton === "pencil" ? "paint-tools-button-pensil-active" : "paint-tools-button-pensil" }
                            onClick={this.pencilHandler}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                        </div>

                        <div 
                            className={this.props.activeToolButton === "eraser" ? "paint-tools-button-erase-active" : "paint-tools-button-erase" } 
                            onClick={this.eraseHandler}
                        >
                            <FontAwesomeIcon icon={faEraser} size="lg"/>
                        </div>
                        <div 
                            className="paint-tools-button-refresh" 
                            onClick={this.clearCanvas}
                        >
                            <FontAwesomeIcon icon={faRedoAlt} color="white" size="lg"/>
                        </div>
                    </div>

                   
                    <div className="paint-size-wrapper">
                        <div className="paint-size-icon">
                            <FontAwesomeIcon icon={faPencilAlt} size="lg"/>
                        </div>
                        <div className="paint-text-size">Size ({this.props.sizePencil})</div>
                    </div>
                    <input type="range" value={this.props.sizePencil} min="1" max ="50" className="paint-size-reange" onChange={()=>this.onPencilSizeChange(event)}/>

                    <div className="paint-size-wrapper">
                        <div className="paint-size-icon">
                            <FontAwesomeIcon icon={faEraser} size="lg"/>
                        </div>
                        <div className="paint-text-size">Size ({this.props.sizeEraser})</div>
                    </div>
                    <input type="range" value={this.props.sizeEraser} min="1" max ="50" onChange={()=>this.onEraserSizeChange(event)}/>


                    <div className="paint-text">Canvas</div>
                    <div className="paint-canvas-wrapper">
                        <div className="paint-button"/>
                        <div className="paint-button"/>
                        <div className="paint-button"/>
                    </div>
                    {this.props.colorPickerIsShown ? 
                        <div className="paint-sketchPicker" onMouseLeave={this.handleMouseLeave} >
                            <SketchPicker
                                color={ this.props.color }
                                onChangeComplete={this.handleChangeComplete }
                                // onChange={ this.handleChangeComplete }
                                // onSwatchHover={this.handleChangeComplete}
                            /> 
                         
                        </div> : null}
                    
                </div>
                <canvas width={window.innerWidth - 200} height={window.innerHeight-30} style={{border: "2px solid rgb(116, 67, 19)", background: `${this.props.bgColor}`}} ref="canvas" ></canvas>
                {/* <Button
                    onClick={this.clearCanvas}
                    text={"Press"}
                    // disabled={isNaN(this.props.numberOfBalls)}
                /> */}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            mousePressed: Selectors.getMousePressedState(state),
            color: Selectors.getColorState(state),
            bgColor: Selectors.getBgColorState(state),
            lastX: Selectors.getLastXState(state),
            lastY: Selectors.getLastYState(state),
            x: Selectors.getXState(state),
            y: Selectors.getYState(state),
            colorPickerIsShown: Selectors.getColorPickerIsShownState(state),
            buttonsName: Selectors.getButtonsNameState(state),
            activeToolButton: Selectors.getActiveToolButtonState(state),
            sizePencil: Selectors.getSizePencilState(state),
            sizeEraser: Selectors.getSizeEraserState(state),
        };
    },
    (dispatch) => {
        return {
            mouseDown: bindActionCreators(Actions.mouseDown, dispatch),
            getColor: bindActionCreators(Actions.getColor, dispatch),
            captureLastXY: bindActionCreators(Actions.captureLastXY, dispatch),
            captureXY: bindActionCreators(Actions.captureXY, dispatch),
            toggleColorPicker: bindActionCreators(Actions.toggleColorPicker, dispatch),
            getBgColor: bindActionCreators(Actions.getBgColor, dispatch),
            whichButton: bindActionCreators(Actions.whichButton, dispatch),
            chooseTool: bindActionCreators(Actions.chooseTool, dispatch),
            getSize: bindActionCreators(Actions.getSize, dispatch),
        };
    }
)(Paint);
 