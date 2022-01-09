import { Clock } from "three";

type RequestAnimationFrameHandler = (deltaTime: number) => void;

export default class DeltaTimer {
  // DeltaTimer is singleton class
  private static instance: DeltaTimer;

	clock = new Clock();
	previousTime: number = 0;
	callbacks: RequestAnimationFrameHandler[] = [];

	constructor() {
		this.tick();
	}

  static getInstance(): DeltaTimer{
    if(!DeltaTimer.instance){
      DeltaTimer.instance = new DeltaTimer();
    }

    return DeltaTimer.instance;
  }

	private executeCallbacks(deltaTime: number) {
		this.callbacks.forEach((cb) => cb(deltaTime));
	}

	private tick = () => {
		const elapsedTime = this.clock.getElapsedTime();
		const deltaTime = elapsedTime - this.previousTime;
		this.previousTime = elapsedTime;
		this.executeCallbacks(deltaTime);

		window.requestAnimationFrame(this.tick);
	};

	private hasCallback(callback: RequestAnimationFrameHandler) {
		return !!this.callbacks.find((cb) => cb === callback);
	}

	addRequestAnimationFrameHandler(callback: RequestAnimationFrameHandler) {
		this.callbacks.push(callback);
	}

	removeRequestAnimationFrameHandler(callback: RequestAnimationFrameHandler) {
		if (!this.hasCallback(callback)) {
			throw new Error("Callback doesn't exist to remove");
		}
		this.callbacks.filter((cb) => cb !== callback);
	}
}
