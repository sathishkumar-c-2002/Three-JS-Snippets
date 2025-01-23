import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// renderer.render(scene,camera); 

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);


//Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const sphere = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  sphere.position.set(x, y, z);
  scene.add(sphere);
}

//Calling Stars
Array(200).fill().forEach(addStar)

//Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


//Avatar
const faceTexture = new THREE.TextureLoader().load('face.jpg');
const face = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: faceTexture }));

  scene.add(face);

//Moon
  const moonTexture = new THREE.TextureLoader().load('moon.jpg');

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshBasicMaterial({ map: moonTexture}));
  
    scene.add(moon);
  
  
    function moveCamera(){
      const t = document.body.getBoundingClientRect().top;
      moon.rotation.x +=0.1;
      moon.rotation.y +=0.1;
      moon.rotation.z +=0.1;

      face.rotation.y +=0.1;
      face.rotation.z +=0.1;

      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.position.y = t * -0.0002;

    }

    document.body.onscroll = moveCamera


    moon.position.z = 30;
    moon.position.setX(-10);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera)
}



animate();