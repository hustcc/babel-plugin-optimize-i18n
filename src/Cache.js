
/**
 * 变化 key 的时候，存储的 map
 * key: 实际的 key
 * value: 变换之后的 key
 */
function Cache() {
  this.map = {};
}

Cache.prototype.has = function (key) {
  return this.map[key] !== undefined;
};

Cache.prototype.get = function (key) {
  return this.map[key];
};

Cache.prototype.set = function (key, value) {
  this.map[key] = value;
};

Cache.prototype.getKey = function (value) {
  const keys = Object.keys(this.map);

  for (let i = 0; i < keys.length; i ++) {
    const key = keys[i];
    if (this.map[key] === value) return key;
  }
};

Cache.prototype.size = function () {
  return Object.keys(this.map).length;
};

module.exports = Cache;
