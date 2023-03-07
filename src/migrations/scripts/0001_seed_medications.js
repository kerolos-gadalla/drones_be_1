import MedicationModel from "../../medications/model.js";

function pad(_n, width, _z) {
  const z = _z || "0";
  const n = `${_n}`;
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const generateDummyItems = () =>
  [...new Array(10).keys()].map((index) => ({
    name: `Med-${pad(index, 4, "0")}`,
    weight: 100,
    code: `MED${pad(index, 4, "0")}`,
    image: "BASE4",
  }));

export default {
  async up() {
    // Write migration here
    await MedicationModel.insertMany(generateDummyItems());
  },
};
