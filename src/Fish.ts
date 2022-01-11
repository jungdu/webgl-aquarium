import { Scene, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import AnimationController from "./AnimationController";
import DeltaTimer from "./DeltaTimer";
import { XYZ } from "./types";
import { getGltf } from "./utils";

const FISH_FILE_ROOT_PATH = "./glb/fish/";

export const FISH_NAMES = ["BlueGoldfish" ,"Piranha" ,"CoralGrouper" ,"Sunfish"] as const;
export type FishName = typeof FISH_NAMES[number];

export default class Fish {
	private deltaTimer = new DeltaTimer();
	animationController: AnimationController;

  private velocity:XYZ|null = null;


	static async create(fishName: FishName, scene: Scene) {
		const gltf = await getFishGltf(fishName);
		return new Fish(gltf, scene);
	}

	get group() {
		return this.gltf.scene;
	}

	private constructor(private gltf: GLTF, private scene: Scene) {
		this.animationController = new AnimationController(gltf, this.deltaTimer);
    this.animationController.playAction(0);

    this.deltaTimer.addRequestAnimationFrameHandler(this.move);

		scene.add(gltf.scene);
	}

	destroy() {
		this.animationController.destroy();
    this.deltaTimer.removeRequestAnimationFrameHandler(this.move);
	}


  move = (deltaTime: number) => {
    if(this.velocity){
      const [x, y, z] = this.velocity.map(scale => (deltaTime) * scale);
      this.group.position.x += x;
      this.group.position.y += y;
      this.group.position.z += z;
    }
  }

  setPosition(xyz: XYZ){
    const [x, y, z] = xyz;
    this.group.position.x = x;
    this.group.position.y = y;
    this.group.position.z = z;
  }

  setVelocity(xyz:XYZ){
    this.velocity =  xyz;
    const [x, y, z] = xyz;
    this.group.lookAt(this.group.position.clone().add(new Vector3(x, y ,z)));
  }
}

export async function getFishGltf(fishName: FishName) {
	return await getGltf(getFishGlbPath(fishName));
}

function getFishGlbPath(fishName: FishName) {
	return `${FISH_FILE_ROOT_PATH}${fishName}.glb`;
}
