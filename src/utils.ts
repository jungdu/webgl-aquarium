import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { XYZ } from "./types";

export function addOrbitControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement){
  new OrbitControls(camera, canvas);
}

export function startAnimation(renderer: WebGLRenderer, camera: PerspectiveCamera, scene: Scene){
  tick(renderer, camera, scene);
}

function tick(renderer: WebGLRenderer, camera: PerspectiveCamera, scene: Scene){
  renderer.render(scene, camera);
  window.requestAnimationFrame(() => {
    tick(renderer, camera, scene);
  })
}

export function resizeFullScreen(renderer: WebGLRenderer ,camera: PerspectiveCamera){
  window.addEventListener("resize", function(){
    const {
      innerWidth: width,
      innerHeight: height
    } = window;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  })
}

export function getGltf(filePath: string){
  return new Promise<GLTF>((resolve) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(filePath, function(gltf) {
      resolve(gltf)
    })
  })
}

export function mapXYZ(xyzA: XYZ, xyzB:XYZ, func: (a:number, b:number, idx: number) => number):XYZ{
  const [xA, yA, zA] = xyzA;
  const [xB, yB, zB] = xyzB;
  return [func(xA, xB, 0), func(yA, yB, 1), func(zA, zB, 2)];
}

export function getRandomNumber(min: number, max: number){
  const distance = max - min;
  return (distance * Math.random()) + min;
}