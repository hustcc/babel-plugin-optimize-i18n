/**
 * 主要是为了压缩 locale 文案大小，减少文案包大小 40% ~ 50%。
 *
 * 约定：按照最佳实践来安排文案目录。
 *  - 每个语言一个文件，文件格式：[A-Za-z]{2}_[A-Za-z]{2}.js|ts
 *  - 约定文案格式化方法为 intl.get(key, obj) 其中 intl 可以自定义
 *
 * 处理：
 *  - 将 文案 js 对象中的 key 使用 short key 转换，并且映射关系缓存起来
 *  - 然后将 intl.get(key, obj) 中的 key 使用 short key 转换，并且映射关系缓存起来
 *  - 如果 short key 已经存在，就直接使用，否则就重新创建
 */
const helper = require('./helper.js');
const log = require('./log.js');
const config = require('./config.js');
const shortKey = require('./key.js');


module.exports = function({ types: babelTypes }) {
  return {
    name: 'babel-plugin-optimize-i18n',
    pre(state) {},
    visitor: {
      /**
       * 将 object 中的 key 变成短地址
       */
      ObjectExpression(path, state) {
        const filenameRelative = state.file.opts.filenameRelative;
        const pluginConfig = config(state.opts);
        // 如果是目标文件
        if (
          helper.isLocaleFile(pluginConfig.localeFiles, filenameRelative) &&
          helper.isLocaleFileContent(path)
        ) {
          const properties = path.get('properties');
          // 遍历处理
          properties.forEach(property => {
            const propertyPath = property.get('key');

            const key = propertyPath.isStringLiteral() ? propertyPath.node.value : propertyPath.node.name;
            const k = shortKey.getShortKey(key, pluginConfig.uniquePrefix);
            // 如果不相等，则替换
            if (k !== key) {
              propertyPath.replaceWith(
                babelTypes.identifier(k)
              );
            }
          })
        }
      },
      /**
       * 将 intl.get(key, opt) 中的 key 替换成短文案
       * @param path
       * @param state
       * @constructor
       */
      CallExpression(path, state) {
        const object = path.get('callee').get('object');
        const property = path.get('callee').get('property');

        if (object.isIdentifier() && property.isIdentifier()) {
          const pluginConfig = config(state.opts);
          // 匹配到 intl.get 方法
          // 1. 校验第一个参数是不是字符串
          // 2. 如果是，则替换，不是则 throw
          if (object.node.name === pluginConfig.i18nFunction.object &&
            property.node.name === pluginConfig.i18nFunction.property) {
            const argument = path.get('arguments.0');
            if (argument.isStringLiteral()) {
              const key = argument.node.value;
              const k = shortKey.getShortKey(key, pluginConfig.uniquePrefix);
              // 如果不相等，则替换
              if (k !== key) {
                path.node.arguments[0].value = k;
              }
            } else {
              throw path.buildCodeFrameError(`The first parameter of ${pluginConfig.i18nFunction.object}.${pluginConfig.i18nFunction.property} should be a string constant!`);
            }
          }
        }
      },
    },
    post(state) {
    }
  };
};
