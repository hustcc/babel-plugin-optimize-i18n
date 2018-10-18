# babel-plugin-optimize-i18n

A babel plugin for optimizing i18n locales file which can reduce 40% ~ 50% bundle size.



## Install


> npm i --save-dev babel-plugin-optimize-i18n



## Usage


Add it into `.babelrc`.

```json
{
  "plugins": [
    "optimize-i18n"
  ]
}
```



## Configure


You can customize the configure of the plugin.

```js
{
  localeFiles: ['zh_CN', 'en_US'],
  i18nFunction: {
    object: 'intl',
    property: 'get'
  },
  uniquePrefix: '$',
}
```



## License

MIT@[hustcc](https://github.com/hustcc).
