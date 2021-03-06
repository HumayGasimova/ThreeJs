/**
* Libraries
*/

import React,{
   Component
} from 'react';

import {
   Route
} from 'react-router-dom';

/**
* Components
*/

import Tutorial from './components/Tutorial/tutorial';
import Cube from './components/Cube/cube';
import EquirectangularMap from './components/EquirectangularMap/equirectangularMap';
import TransparentCubes from './components/Transparency/transparentCubes';
import TransparentPlanes from './components/Transparency/transparentPlanes';
import TransparentTrees from './components/Transparency/transparentTrees';
import MultipleCanvases from './components/MultipleCanvases/multipleCanvases';
import MultipleCanvases2D from './components/MultipleCanvases/multipleCanvases2D';
import Dots from './components/Dots/dots';
import Picking from './components/Picking/picking';
import PickingBoxesWithTransparentCenter from './components/Picking/pickingBoxesWithTransparentCenter';
import MovingBubbles from './components/Dots/movingBubbles';

/**
* Styles
*/

import './app.scss';


/**
* App component definition and export
*/

export class App extends Component {

   /**
   * Markup
   */

   render(){
      return(
         <div className="app">
            <Route 
               exact
               path="/"
               component={ MovingBubbles }
            />
         </div>
      );
   }
}

export default App;
