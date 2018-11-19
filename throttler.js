module.exports = ({ maxJps = 1000 } = {}) => {
  let jps = 0;
  let waitResolve = () => {};

  const waitFragment = () => new Promise((resolve, reject) => {
    waitResolve = resolve;
  });

  setInterval(() => {
    jps = 0;
    waitResolve();
  }, 1000);

  return async (callback) => {
    if (jps >= maxJps) {
      await waitFragment();
    }

    jps++;
    callback();
  }
}
