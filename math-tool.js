function normalize(num, min, max) {
  return (num - min) / (max - min);
}

module.exports = {
  normalize: normalize
};
