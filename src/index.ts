import { AmbientLight, DirectionalLight, Group, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"
import Fish, { FishName, FISH_NAMES } from "./Fish";
import { XYZ } from "./types";
import { addOrbitControls, getRandomNumber, mapXYZ, resizeFullScreen, startAnimation } from "./utils";

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
  createRandomFish(15, scene)
}

function createRandomFish(count: number, scene:Scene){
  for(let i = 0; i < count; i ++){
    const fishName = FISH_NAMES[Math.floor(Math.random() * FISH_NAMES.length)];
    createFish(fishName, scene);
  }
}

function createFish(fishName:FishName, scene:Scene){
  Fish.create(fishName, scene).then((fish) => {
    fish.setPosition([getRandomNumber(-40, 40), getRandomNumber(-20, 20), getRandomNumber(-80, 0)]);
    startMovingFish(fish)
  });
}

function startMovingFish(fish: Fish){
  updateFishVelocity(fish);

  // Fish change direction and velocity
  setInterval(() => {
    if(Math.random() > 0.96){
      updateFishVelocity(fish);
    }
  }, 500)
}

function updateFishVelocity(fish:Fish){
  const {x,y,z} = fish.group.position;
  const destPosition:XYZ = [getRandomNumber(-20, 20), getRandomNumber(-20, 20), getRandomNumber(-80, 0)]
  const velocity = getVelocity(destPosition, [x, y, z]);
  fish.setVelocity([ velocity.x,velocity.y,velocity.z ]);
}

function getVelocity(destPosition:XYZ, initPosition:XYZ){
  const [x,y,z] = mapXYZ(destPosition, initPosition, (a, b) => a - b);
  return (new Vector3(x, y, z)).normalize().multiplyScalar((Math.random() * 5) + 1);
}

main();