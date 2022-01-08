import { AmbientLight, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { addOrbitControls, startAnimation } from "./utils";

function initCameraPosition(camera: PerspectiveCamera){
  camera.position.x = 10;
  camera.position.y = 10;
  camera.position.z = 10;
  
  camera.lookAt(0, 0, 0);
}

function main(){
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


  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({color: 0x00ff00});
  const cube = new Mesh(geometry, material);
  scene.add(cube);
}

main();