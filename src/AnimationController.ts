import { AnimationAction, AnimationClip, AnimationMixer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import DeltaTimer from "./DeltaTimer";

export default class AnimationController {
	private animations: AnimationClip[];
	private animationMixer: AnimationMixer;
	private currentAction: AnimationAction | null = null;
	private animationHandler: (() => void) | null = null;

	constructor(private gltf: GLTF, private deltaTimer: DeltaTimer) {
		this.animationMixer = new AnimationMixer(gltf.scene);
		this.animations = gltf.animations;

		deltaTimer.addRequestAnimationFrameHandler(this.update);
	}

	private getAnimationClipByName(actionName: string) {
		const animationClip = this.animations.find(
			(animation) => animation.name === actionName
		);
		if (!animationClip) {
			console.error(this.animations);
			throw new Error(`Require action (name: ${actionName})`);
		}
		return animationClip;
	}

	private getAnimationClipByIndex(actionIndex: number) {
		const animation = this.animations[actionIndex];
		if (!animation) {
			console.error(this.animations);
			throw new Error(`Require action (index: ${actionIndex})`);
		}

		return animation;
	}

	private getAnimationClip(actionNameOrIndex: string | number) {
		if (typeof actionNameOrIndex === "number") {
			return this.getAnimationClipByIndex(actionNameOrIndex);
		}
		return this.getAnimationClipByName(actionNameOrIndex);
	}

	private stopCurrentAction() {
		if (this.currentAction) {
			this.currentAction.stop();
		}
	}

	private update = (deltaTime: number) => {
		if (this.animationMixer) {
			this.animationMixer.update(deltaTime);
		}
	};

	destroy() {
		this.deltaTimer.removeRequestAnimationFrameHandler(this.update);
	}

	playAction(actionNameOrIndex: string | number) {
		this.stopCurrentAction();

		const animationClip = this.getAnimationClip(actionNameOrIndex);
		const action = this.animationMixer.clipAction(animationClip);
		action.play();
		this.currentAction = action;
	}
}
