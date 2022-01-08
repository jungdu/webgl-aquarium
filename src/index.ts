import { AmbientLight, DirectionalLight, Group, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"
import { getFishGltf } from "./Fish";
import { addOrbitControls, startAnimation } from "./utils";


function initCameraPosition(camera: PerspectiveCamera){
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 30;
  
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
    canvas: mainCanvas
  }) 

  const camera = new PerspectiveCamera(45, width/height, 0.1, 100);
  renderer.setSize(width, height);

  initCameraPosition(camera)
  addOrbitControls(camera, mainCanvas);
  startAnimation(renderer, camera, scene);
  addRights(scene);


  // Add Fish objects
  getFishGltf("BlueGoldfish").then((gltf) => {
    scene.add(gltf.scene);
    translateGroup(gltf.scene, [5, 5, 0])
  });

  getFishGltf("CoralGrouper").then((gltf) => {
    scene.add(gltf.scene);
    translateGroup(gltf.scene, [5, -5, 0])
  });

  getFishGltf("Piranha").then((gltf) => {
    scene.add(gltf.scene);
    translateGroup(gltf.scene, [-5, -5, 0])
  });

  getFishGltf("Sunfish").then((gltf) => {
    scene.add(gltf.scene);
    translateGroup(gltf.scene, [-5, 5, 0])
  });
}

main();