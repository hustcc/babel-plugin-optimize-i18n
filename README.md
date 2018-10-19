# babel-plugin-optimize-i18n

A babel plugin for optimizing i18n locales file which can reduce 40% ~ 50% bundle size.

[![npm](https://img.shields.io/npm/v/babel-plugin-optimize-i18n.svg)](https://www.npmjs.com/package/babel-plugin-optimize-i18n)
[![npm download](https://img.shields.io/npm/dm/babel-plugin-optimize-i18n.svg)](https://www.npmjs.com/package/babel-plugin-optimize-i18n)


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



## Result


The source i18n text file below:

```json
{
  "module.left.title": "左侧标题",
  "module.right.title": "右侧标题"
}
```

will be transformed to:

```js
{
  $1: "左侧标题",
  $2: "右侧标题"
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



## Test


```
npm i

npm t
```

Then see the files in `lib` dir.



## Constraint


For example, when you use the function below to format i18n text.

```js
intl.get('key', params);
```

You should be sure the 1st parameter of `intl.get` is string constant, or will be build error.



## License

MIT@[hustcc](https://github.com/hustcc).
