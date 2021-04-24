export const sampleFunc = () => {
  throw new Error("Sample Error");
};

export const sampleFunc2 = () => {
  throw new TypeError("Wrong Type");
};

export class DisgustingFlavorError extends Error {}

export function drinkFlavor(flavor: string) {
  if (flavor == "octopus") {
    throw new DisgustingFlavorError("yuck, octopus flavor");
  }
  // Do some other stuff
}
