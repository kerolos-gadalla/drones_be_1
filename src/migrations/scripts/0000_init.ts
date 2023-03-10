import DroneModel, { DRONE_MODELS, DRONE_STATES } from "../../drones/model";

function pad(_n, width, _z) {
  const z = _z || "0";
  const n = `${_n}`;
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const weights = {
  [DRONE_MODELS.Lightweight]: 100,
  [DRONE_MODELS.Middleweight]: 200,
  [DRONE_MODELS.Cruiserweight]: 300,
  [DRONE_MODELS.Heavyweight]: 500,
};
const generateDummyItems = () => {
  const models = Object.values(DRONE_MODELS);
  const states = Object.values(DRONE_STATES);
  return [...new Array(10).keys()].map((index) => {
    const model = models[index % models.length];
    const weightLimit = weights[model];
    return {
      model,
      weightLimit,
      serialNumber: `SN${pad(index, 4, "0")}`,
      state: states[index % models.length],
    };
  });
};

export default {
  async up() {
    // Write migration here
    await DroneModel.insertMany(generateDummyItems());
  },
};
