import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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