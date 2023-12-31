const fakeFetch = (time = 2500, cb = undefined, mockedData = ['apple', 'banana', 'cherry']) => {
  return new Promise((resolve, reject) => setTimeout(() => {
    const stashedFruits = mockedData;

    if (cb) {
      cb(stashedFruits);
    }

    resolve(stashedFruits);
  }, time));
};

export { fakeFetch };