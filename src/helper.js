const path = require('path');

/**
 * 只要有一个配置文件复合，则复合
 * @param localeFiles
 * @param file
 * @returns {boolean}
 */
exports.isLocaleFile = function (localeFiles, file) {
  const fo = path.parse(file);
  return localeFiles.some(lf => fo.name === lf);
};

/**
 * 是否为 locale content
 * @param path
 * @returns {boolean}
 */
exports.isLocaleFileContent = function (path) {
  const properties = path.get('properties');
  return properties.every(property => {
    const propertyPath = property.get('key');

    return propertyPath.isStringLiteral() || propertyPath.isIdentifier();
  });
};
