import './style.css'

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import {gsap} from 'https://cdn.skypack.dev/gsap';


const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 15;
// camera.position.x = -50;

const scene = new THREE.Scene();
let bee;
let mixer;

const loader = new GLTFLoader();
loader.load('/demon_bee_full_texture.glb',
     function(gltf){
        bee = gltf.scene;   
        // bee.position.x = 0;
        // bee.position.y = -1;
        // bee.position.z = 15; 


        // bee.rotation.x = 0.5;
        // bee.rotation.y = 0.5;
        scene.add(bee); 

        mixer = new THREE.AnimationMixer(bee);  
        mixer.clipAction(gltf.animations[0]).play();
        // console.log(gltf.animations);
        modelMove()
    },
    function(xhr){},
    function(error){} 
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

//light
const ambientlight = new THREE.AmbientLight( 0xffffff,1.3 ); 
scene.add(ambientlight);
const topLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
topLight.position.set( 500, 500, 500 );
scene.add( topLight );

const  reRender3D = () => {
    requestAnimationFrame(reRender3D);
    if(mixer){
        mixer.update(0.01);
    }
    
    renderer.render(scene, camera);

}
reRender3D();

let arrPositionModel = [
    {
        id:'banner',
        position: {
            x: 0,
            y: -1,
            z: 0
        },
        rotation :{
            x: 0,
            y: 1.5,
            z: 0
        }
    },
    {
        id:'intro',
        position: {
            x: 2.5,
            y: -1,
            z:-5
        },
        rotation :{
            x: -1,
            y: -1,
            z: 0
        }
    },
    {
        id:'description',
        position: {
            x: -1,
            y: -1,
            z: -1
        },
        rotation :{
            x: 0,
            y: 0.5,
            z: 0
        }
    },
    {
        id:'contact',
        position: {
            x: 1,
            y: -1,
            z: 0
        },
        rotation :{
            x: 0.3,
            y: -0.5,
            z: 0
        }
    },
];

//Scroll Event
const modelMove = ()=>{
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <=window.innerHeight/3){
            currentSection = section.id;
        }
    });
    // console.log(currentSection)
    let position_active = arrPositionModel.findIndex(val => val.id === currentSection);

    if (position_active >=0){
        let new_coordinates = arrPositionModel[position_active];
        // bee.position.x = new_coordinates.position.x;
        // bee.position.y = new_coordinates.position.y;
        // bee.position.z = new_coordinates.position.z;
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z, 
            duration: 3,
            ease:"power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z, 
            duration: 3,
            ease:"power1.out"
    });
}
}
window.addEventListener('scroll', () => {
    if(bee){
        modelMove();
    }
})

//Resize Event
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();  
});