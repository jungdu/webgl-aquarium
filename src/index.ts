import { AmbientLight, AnimationAction, Color, DirectionalLight, Group, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"
import AnimationController from "./AnimationController";
import DeltaTimer from "./DeltaTimer";
import Fish, { getFishGltf } from "./Fish";
import { XYZ } from "./types";
import { addOrbitControls, mapXYZ, resizeFullScreen, startAnimation } from "./utils";

const CENTER_POSITION:XYZ= [0, 0, -40];


function initCameraPosition(camera: PerspectiveCamera){
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;
  
  camera.lookAt(0, 0, 0);
}

function addRights(scene: Scene){
  const ambientLight = new AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-1, 10, 0)
  scene.add(directionalLight)
}

function translateGroup(group: Group, xyz: [number, number, number]){
  const [x, y, z] = xyz;
  group.translateX(x);
  group.translateY(y);
  group.translateZ(z);
}

async function main(){
  const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
  const {
    innerHeight: height,
    innerWidth: width
  } = window;

  const scene = new Scene();
  const renderer = new WebGLRenderer({
    canvas: mainCanvas,
    alpha: true
  }) 
  

  const camera = new PerspectiveCamera(45, width/height, 0.1, 500);
  renderer.setSize(width, height);

  initCameraPosition(camera)
  addOrbitControls(camera, mainCanvas);
  startAnimation(renderer, camera, scene);
  addRights(scene);
  resizeFullScreen(renderer, camera);
  renderer.setClearColor( 0x000000, 0 );

  // Add Fish objects
  Fish.create("BlueGoldfish", scene).then((fish) => {
    const initPosition:XYZ = [10, -10, -35];
    fish.setPosition(initPosition);
    startMovingFish(fish);
  });

  Fish.create("BlueGoldfish", scene).then((fish) => {
    const initPosition:XYZ = [14, -2, -35];
    fish.setPosition(initPosition);
    startMovingFish(fish);
  });

  Fish.create("CoralGrouper", scene).then((fish) => {
    fish.setPosition([-10, 10, -43]);
    startMovingFish(fish);
  });

  Fish.create("CoralGrouper", scene).then((fish) => {
    fish.setPosition([-10, 10, -70]);
    startMovingFish(fish);
  });

  Fish.create("Sunfish", scene).then((fish) => {
    fish.setPosition([-20, -10, -45]);
    startMovingFish(fish);
  });

  Fish.create("Sunfish", scene).then((fish) => {
    fish.setPosition([-30, -10, -45]);
    startMovingFish(fish);
  });

  Fish.create("Piranha", scene).then((fish) => {
    fish.setPosition([10, 10, -37]);
    startMovingFish(fish)
  });


  Fish.create("Piranha", scene).then((fish) => {
    fish.setPosition([12, 15, -40]);
    startMovingFish(fish)
  });
}

function startMovingFish(fish: Fish){
  updateFishVelocity(fish);
  setInterval(() => {
    if(Math.random() > 0.65){
      updateFishVelocity(fish);
    }
  }, 3000)
}

function updateFishVelocity(fish:Fish){
  const {x,y,z} = fish.group.position;
  const velocity = getVelocity(CENTER_POSITION, [x, y, z]);
  fish.setVelocity([ velocity.x,velocity.y,velocity.z ]);
}

function getVelocity(centerPosition:XYZ, initPosition:XYZ){
  const [x,y,z] = mapXYZ(centerPosition, initPosition, (a, b, i) => {
    const randomScale = i === 1 ? 2 : 5
    return ((a + (Math.random() * randomScale) ) - b)
  });
  return (new Vector3(x, y, z)).normalize().multiplyScalar((Math.random() * 3) + 1);
}

main();