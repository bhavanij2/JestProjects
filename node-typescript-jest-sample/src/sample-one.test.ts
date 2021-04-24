import {
  sampleFunc,
  sampleFunc2,
  drinkFlavor,
  DisgustingFlavorError,
} from "./sample-one";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
}

expect.extend({
  toBeWithinRange: (value, floor, ceiling) => {
    const pass = value >= floor && value <= ceiling;
    if (pass) {
      return {
        message: () => `${value} is in range of ${floor} and ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `${value} not in range of ${floor} and ${ceiling}`,
        pass: false,
      };
    }
  },
});

describe("sample", () => {
  it("test number range", () => {
    expect(100).toBeWithinRange(1, 100);
    expect(100).not.toBeWithinRange(1, 10);
  });

  //   toThrowError() is an alias of toThrow()
  it("test toThrow() and toThrowError()", () => {
    expect(sampleFunc).toThrow("Sample Error");
    expect(sampleFunc).toThrow(/Sample/);
    expect(sampleFunc).toThrow(Error);
    expect(sampleFunc).toThrow(new Error("Sample Error"));

    expect(sampleFunc).toThrowError("Sample Error");
    expect(sampleFunc).toThrowError(/Sample/);
    expect(sampleFunc).toThrowError(Error);
    expect(sampleFunc).toThrowError(new Error("Sample Error"));
  });

  //   CHECK THIS???
  it("test sample Func 2", () => {
    expect(sampleFunc2).toThrow("Wrong Type");
    expect(sampleFunc2).toThrow(TypeError);
    expect(sampleFunc).toThrow(new TypeError("Sample Error"));

    // expect(sampleFunc).toThrowError('Sample Error');
    // expect(sampleFunc).toThrow(Error);
    expect(sampleFunc).toThrowError(new TypeError("Sample Error"));
  });

  it("test Object comparison", () => {
    const expected = { a: 1, b: 2 };
    const result = { a: 1, b: 2 };

    expect(result).toBe(result);
    expect(result).not.toBe(expected);
    expect(result).toStrictEqual(expected);
    expect(result).toEqual(expected);
    expect(result === expected).toBe(false);
    expect(result == expected).toBe(false);
    expect(Object.is(result, expected)).toBe(false);
  });

  it(".toMatchObject is called for each elements, so extra object properties are okay", () => {
    expect([{ foo: "bar" }, { baz: 1, extra: "quux" }]).toMatchObject([
      { foo: "bar" },
      { baz: 1 },
    ]);

    expect({ foo: "bar", baz: 1 }).toMatchObject({ baz: 1 });

    expect([
      { foo: "bar", baz: 1 },
      { baz: 1, extra: "quux" },
    ]).toMatchObject([{ baz: 1 }, { baz: 1 }]);
  });

  test("throws on octopus", () => {
    function drinkOctopus() {
      drinkFlavor("octopus");
    }

    // Test that the error message says "yuck" somewhere: these are equivalent
    expect(drinkOctopus).toThrowError(/yuck/);
    expect(drinkOctopus).toThrowError("yuck");

    // Test the exact error message
    expect(drinkOctopus).toThrowError(/^yuck, octopus flavor$/);
    expect(drinkOctopus).toThrowError(new Error("yuck, octopus flavor"));

    // Test that we get a DisgustingFlavorError
    expect(drinkOctopus).toThrowError(DisgustingFlavorError);
  });

  test("test matcher toBeInstanceOf()", () => {
    class A {}

    expect(new A()).toBeInstanceOf(A);
    expect(new A()).toBeInstanceOf(Object);

    expect(() => {}).toBeInstanceOf(Function);
    expect(A).toBeInstanceOf(Function);
    expect(A).toBeInstanceOf(Object);
  });

  test("test toMatchObject() with nested objects comparison", () => {
    const houseForSale = {
      bath: true,
      bedrooms: 4,
      kitchen: {
        amenities: ["oven", "stove", "washer"],
        area: 20,
        wallColor: "white",
      },
    };
    const desiredHouse = {
      bath: true,
      kitchen: {
        amenities: ["oven", "stove", "washer"],
        wallColor: expect.stringMatching(/white|yellow/),
      },
    };

    expect(houseForSale).toMatchObject(desiredHouse);
  });

  test("test objectContaining() with no nested objects comparison", () => {
    const houseForSale = {
      bath: true,
      bedrooms: 4,
      amenities: ["oven", "stove", "washer"],
      area: 20,
      wallColor: "white",
      kitchen: {},
    };
    const desiredHouse = {
      bath: true,
      amenities: ["oven", "stove", "washer"],
      wallColor: expect.stringMatching(/white|yellow/),
    };

    expect(houseForSale).toEqual(expect.objectContaining(desiredHouse));
  });

  test("test objectContaining() with nested objects comparison", () => {
    const houseForSale = {
      bath: true,
      bedrooms: 4,
      kitchen: {
        amenities: ["oven", "stove", "washer"],
        area: 20,
        wallColor: "white",
      },
    };
    const desiredHouse = {
      bath: true,
      kitchen: expect.objectContaining({
        amenities: ["oven", "stove", "washer"],
        wallColor: expect.stringMatching(/white|yellow/),
      }),
    };

    expect(houseForSale).toEqual(expect.objectContaining(desiredHouse));
  });
});
