import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FISH_FILE_ROOT_PATH = "./glb/fish/"

type FishName =
	| "BlueGoldfish"
	| "Piranha"
	| "CoralGrouper"
	| "Sunfish";

export function getFishGltf(fishName: FishName) {
  return new Promise<GLTF>((resolve) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(getFishGlbPath(fishName), function(gltf) {
      resolve(gltf)
    })
  })
}

function getFishGlbPath(fishName: FishName){
  return `${FISH_FILE_ROOT_PATH}${fishName}.glb`;
}
