import { getGltf } from "./utils";

const FISH_FILE_ROOT_PATH = "./glb/fish/";

type FishName = "BlueGoldfish" | "Piranha" | "CoralGrouper" | "Sunfish";

export async function getFishGltf(fishName: FishName) {
	return await getGltf(getFishGlbPath(fishName));
}

function getFishGlbPath(fishName: FishName) {
	return `${FISH_FILE_ROOT_PATH}${fishName}.glb`;
}
