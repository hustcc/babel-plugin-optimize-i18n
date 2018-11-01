module.exports = function(config) {
  return Object.assign({}, {
    localeFiles: ['zh_CN', 'en_US'],
    i18nFunction: {
      object: 'intl',
      property: 'get'
    },
    uniquePrefix: '$',
  }, config);
};
