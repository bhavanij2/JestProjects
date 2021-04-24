// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       toBeWithinRange(a: number, b: number): R;
//     }
//   }
// }

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
