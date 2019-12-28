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
import AutumnHockey from '../../images/Backgrounds/autumn_hockey_8k.jpg';
import BethnalGreenEntrance from '../../images/Backgrounds/bethnal_green_entrance_4k.jpg';
import DresdenMoat from '../../images/Backgrounds/dresden_moat_8k.jpg';
import GrayPier from '../../images/Backgrounds/gray_pier_8k.jpg';
import Lebombo from '../../images/Backgrounds/lebombo_8k.jpg';
import MistyPines from '../../images/Backgrounds/misty_pines_4k.jpg';
import MusicHall from '../../images/Backgrounds/music_hall_01_8k.jpg';
import SkukuzaGolf from '../../images/Backgrounds/skukuza_golf_4k.jpg';
import SnowyPark from '../../images/Backgrounds/snowy_park_01_8k.jpg';
import SpruitSunrise from '../../images/Backgrounds/spruit_sunrise_8k.jpg';
import SunnyVondelpark from '../../images/Backgrounds/sunny_vondelpark_8k.jpg';
import UmhlangaSunrise from '../../images/Backgrounds/umhlanga_sunrise_8k.jpg';
import UrbanStreet from '../../images/Backgrounds/urban_street_01_8k.jpg';

import AnniversaryLoungeCapture from '../../images/Backgrounds/capture/anniversary_lounge_capture.png';
import AutumnHockeyCapture from '../../images/Backgrounds/capture/autumn_hockey_capture.png';
import BethnalGreenEntranceCapture from '../../images/Backgrounds/capture/bethnal_green_entrance_capture.png';
import DresdenMoatCapture from '../../images/Backgrounds/capture/dresden_moat_capture.png';
import GrayPierCapture from '../../images/Backgrounds/capture/gray_pier_capture.png';
import LebomboCapture from '../../images/Backgrounds/capture/lebombo_capture.png';
import MistyPinesCapture from '../../images/Backgrounds/capture/misty_pines_capture.png';
import MusicHallCapture from '../../images/Backgrounds/capture/music_hall_01_capture.png';
import SkukuzaGolfCapture from '../../images/Backgrounds/capture/skukuza_golf_capture.png';
import SnowyParkCapture from '../../images/Backgrounds/capture/snowy_park_01_capture.png';
import SpruitSunriseCapture from '../../images/Backgrounds/capture/spruit_sunrise_capture.png';
import SunnyVondelparkCapture from '../../images/Backgrounds/capture/sunny_vondelpark_capture.png';
import UmhlangaSunriseCapture from '../../images/Backgrounds/capture/umhlanga_sunrise_capture.png';
import UrbanStreetCapture from '../../images/Backgrounds/capture/urban_street_01_capture.png';

/**
* MultipleCanvases component definition and export
*/

export const MultipleCanvases = (props) => {

    const [backgroundTexture, setBackgroundTexture] = useState(AnniversaryLounge);

    /**
    * Methods
    */

    useEffect(() => {
        // Get the DOM element to attach to
        const canvas  = document.getElementById('#container');

        // Create a WebGL renderer, camera
        // and a scene
        const renderer = new THREE.WebGLRenderer({
            canvas,
            // alpha: true,
        });
        // renderer.autoClearColor = false;

        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.z = 7;

        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 0, 0);
        controls.update();

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("white");

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;

        //Add Box Geometry
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

        // material which is affected by lights.
        // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

        // const cube = new THREE.Mesh(geometry, material);

        // scene.add(cube);


        // {
        //     const sphereRadius = 1;
        //     const sphereWidthDivisions = 32;
        //     const sphereHeightDivisions = 16;
        //     const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
            // const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
        //     const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        //     mesh.position.set(0, 0, -2);
        //     scene.add(mesh);
        // }

        const cubes = [
            makeInstance(geometry, 0x44aa88,  0, scene),
            makeInstance(geometry, 0x8844aa, -2, scene),
            makeInstance(geometry, 0xaa8844,  2, scene),
        ];

        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(-1, 2, 4);
            scene.add(light);
        }

        // renderer.render(scene, camera);

        const render = (time) => {
            time *= 0.001;  // convert time to seconds

            // if the canvas was resized, update camera aspect
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            // Set the repeat and offset properties of the background texture
            // to keep the image's aspect correct.
            // Note the image may not have loaded yet.

            // const canvasAspect = canvas.clientWidth / canvas.clientHeight;
            // const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
            // const aspect = imageAspect / canvasAspect;
            
            // bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
            // bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
            
            // bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
            // bgTexture.repeat.y = aspect > 1 ? 1 : aspect;
           
            cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * .1;
                const rot = time * speed;
                cube.rotation.x = rot;
                cube.rotation.y = rot;
            });

            // cube.rotation.x = time;
            // cube.rotation.y = time;
            // cube.rotation.z = time;
           
            renderer.render(scene, camera);
           
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
        
    }, [backgroundTexture]);

    const makeInstance = (geometry, color, x, scene) => {
        const material = new THREE.MeshPhongMaterial({color});
       
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
       
        cube.position.x = x;
       
        return cube;
    }

    const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        //Handling HD-DPI displays
        const pixelRatio = window.devicePixelRatio;

        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        
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
                <div className="diagram left">
                    I love boxes. Presents come in boxes. When I find a new box I'm always excited to find out what's inside.
                </div>
                <div className="diagram right">
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
)(MultipleCanvases);
 