/**
* Libraries
*/

import React, {
    useEffect,
    useState
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import * as THREE from 'three';

import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";

import {
    TrackballControls
} from "three/examples/jsm/controls/TrackballControls";

/**
* Components
*/

import Button from '../../library/Button/button';

/**
* Styles
*/

import './multipleCanvases.scss';

/**
* Actions
*/

import * as Actions from '../../actions';

/**
* Selectors
*/

import * as Selectors from '../../reducers/selectors';

/**
* Constants
*/

import * as Background from '../../constants/backgrounds';

/**
* Images
*/

import AnniversaryLounge from '../../images/Backgrounds/anniversary_lounge_8k.jpg';

/**
* MultipleCanvases2D component definition and export
*/

export const MultipleCanvases2D = (props) => {

    const [backgroundTexture, setBackgroundTexture] = useState(AnniversaryLounge);

    /**
    * Methods
    */

    useEffect(() => {
        // Get the DOM element to attach to
        // const canvas  = document.getElementById('#container');
        const canvas = document.createElement('canvas');
        // Create a WebGL renderer, camera
        // and a scene
        const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
        renderer.setScissorTest(true);
        // const sceneInfo1 = setupScene1();
        // const sceneInfo2 = setupScene2();
        const sceneElements = [];
      
        {
            const elem = document.getElementById('#box');
            const {scene, camera, controls} = makeScene(elem);
            const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({color: 'red'});
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            scene.background = new THREE.Color("green")
            addScene(sceneElements, elem, (time, rect) => {
              camera.aspect = rect.width / rect.height;
              camera.updateProjectionMatrix();
              controls.handleResize();
              controls.update();
              mesh.rotation.y = time * .1;
              renderer.render(scene, camera);
            });
        }
        
        {
            const elem = document.getElementById('#pyramid');
            const {scene, camera, controls} = makeScene(elem);
            const radius = .8;
            const widthSegments = 4;
            const heightSegments = 2;
            const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
            const material = new THREE.MeshPhongMaterial({
              color: 'blue',
              flatShading: true,
            });
            const mesh = new THREE.Mesh(geometry, material);
            scene.background = new THREE.Color("red")
            scene.add(mesh);
            addScene(sceneElements, elem, (time, rect) => {
              camera.aspect = rect.width / rect.height;
              camera.updateProjectionMatrix();
              controls.handleResize();
              controls.update();
              mesh.rotation.y = time * .1;
              renderer.render(scene, camera);
            });
        }
        
        const clearColor = new THREE.Color('#000');

        const render = (time) => {
            time *= 0.001;

            resizeRendererToDisplaySize(renderer);

            renderer.setScissorTest(false);
            renderer.setClearColor(clearColor, 0);
            renderer.clear(true, true);
            renderer.setScissorTest(true);

            const transform = `translateY(${window.scrollY}px)`;
            renderer.domElement.style.transform = transform;

            for (const {elem, fn, ctx} of sceneElements) {
                // get the viewport relative position opf this element
                const rect = elem.getBoundingClientRect();
                const {left, right, top, bottom, width, height} = rect;
                const rendererCanvas = renderer.domElement;
                
                const isOffscreen =
                    bottom < 0 ||
                    top > window.innerHeight ||
                    right < 0 ||
                    left > window.innerWidth;

                if (!isOffscreen) {
                    // make sure the renderer's canvas is big enough
                    if (rendererCanvas.width < width || rendererCanvas.height < height) {
                        renderer.setSize(width, height, false);
                    }
                
                    // make sure the canvas for this area is the same size as the area
                    if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
                        ctx.canvas.width = width;
                        ctx.canvas.height = height;
                    }
                
                    renderer.setScissor(0, 0, width, height);
                    renderer.setViewport(0, 0, width, height);

                    fn(time, rect);

                    
                    // copy the rendered scene to this element's canvas
                    ctx.globalCompositeOperation = 'copy';
                    ctx.drawImage(
                        rendererCanvas,
                        0, rendererCanvas.height - height, width, height,  // src rect
                        0, 0, width, height); 
                }
            }

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
        
    }, [backgroundTexture]);

    const addScene = (sceneElements, elem, fn) => {
        const ctx = document.createElement('canvas').getContext('2d');
        elem.appendChild(ctx.canvas);
        sceneElements.push({elem, ctx, fn});
    }

    const renderSceneInfo = (sceneInfo, renderer) => {
        const {scene, camera, elem} = sceneInfo;
    
        // get the viewport relative position opf this element
        const {left, right, top, bottom, width, height} = elem.getBoundingClientRect();
    
        const isOffscreen =
            bottom < 0 ||
            top > renderer.domElement.clientHeight ||
            right < 0 ||
            left > renderer.domElement.clientWidth;
    
        if (isOffscreen) {
          return;
        }
    
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    
        const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);
    
        renderer.render(scene, camera);
      }

    const setupScene1 = () => {
        const sceneInfo = makeScene(document.getElementById('#box'));
        const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({color: 'red'});
        const mesh = new THREE.Mesh(geometry, material);
        sceneInfo.scene.background = new THREE.Color("green")
        sceneInfo.scene.add(mesh);
        sceneInfo.mesh = mesh;
        return sceneInfo;
    }

    const setupScene2 = () => {
        const sceneInfo = makeScene(document.getElementById('#pyramid'));
        const radius = .8;
        const widthSegments = 4;
        const heightSegments = 2;
        const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
        const material = new THREE.MeshPhongMaterial({
          color: 'blue',
          flatShading: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        sceneInfo.scene.add(mesh);
        sceneInfo.mesh = mesh;
        return sceneInfo;
    }

    const makeScene = (elem) => {
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color("white");

        const fov = 45;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 1, 2);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        const controls = new TrackballControls(camera, elem);
        controls.noZoom = true;
        controls.noPan = true;

        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(-1, 2, 4);
            // scene.add(light);
            camera.add(light);
        }

        // return {scene, camera};
        return {scene, camera, controls};
    }

    const makeInstance = (geometry, color, x, scene) => {
        const material = new THREE.MeshPhongMaterial({color});
       
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
       
        cube.position.x = x;
       
        return cube;
    }

    const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        //Handling HD-DPI displays
        // const pixelRatio = window.devicePixelRatio;

        // const width  = canvas.clientWidth  * pixelRatio | 0;
        // const height = canvas.clientHeight * pixelRatio | 0;
        
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }

    /**
    * Markup
    */

    return(
        <>
            <canvas className="canvas" id="#container"/>
            <div className="text">
                <span id="#box" className="diagram left"></span>
                I love boxes. Presents come in boxes. When I find a new box I'm always excited to find out what's inside.
            </div>
            <div className="text">
                <span id="#pyramid" className="diagram right"></span>
                When I was a kid I dreamed of going on an expedition inside a pyramid and finding a undiscovered tomb full of mummies and treasure.
            </div>
        </>
    );
}

export default connect(
    (state) => {
        return {
            // menuButtonIsPressed: Selectors.getMenuButtonIsPressedState(state),
            // sidebarOnInit: Selectors.getSidebarOnInitState(state)
        };
    },
    (dispatch) => {
        return {
            // menuButtonIsToggled: bindActionCreators(Actions.menuButtonIsToggled, dispatch),
            // activateIcon: bindActionCreators(Actions.activateIcon, dispatch)
        };
    }
)(MultipleCanvases2D);
 