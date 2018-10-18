/**
 * 变化 key 的时候，存储的 map
 * key: 实际的 key
 * value: 变换之后的 key
 */
function KeyCache() {
  this.map = {};
}

KeyCache.prototype.has = function (key) {
  return this.map[key] !== undefined;
};

KeyCache.prototype.get = function (key) {
  return this.map[key];
};

KeyCache.prototype.set = function (key, value) {
  this.map[key] = value;
};

KeyCache.prototype.getKey = function (value) {
  const keys = Object.keys(this.map);

  for (let i = 0; i < keys.length; i ++) {
    const key = keys[i];
    if (this.map[key] === value) return key;
  }
};

KeyCache.prototype.size = function () {
  return Object.keys(this.map).length;
};

module.exports = KeyCache;
