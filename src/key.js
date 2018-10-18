const shortUniqueId = require('short-unique-string');
const Cache = require('./Cache.js');

// 新建一个 cache
const cache = new Cache();

const getUniqueId = shortUniqueId({
  number: true,
});
/**
 * 生成新的短文案
 * @param key
 * @param prefix
 * @returns {*}
 */
exports.getShortKey = function (key, prefix) {
  if (key.indexOf(prefix) === 0) return key;
  if (!cache.has(key)) cache.set(key, prefix + getUniqueId());

  return cache.get(key);
};
