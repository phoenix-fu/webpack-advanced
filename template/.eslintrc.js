module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //vue模板默认缩进是两个空格，在打包JS文件时会检查，0代表关闭这个检查
    "indent": 0,
    //关闭原型扩展检查
    "no-extend-native": 0,
    //关闭未定义检查，因为会使用一些插件包的全局变量
    "no-undef": 0,
    // 关闭未使用变量检查，因为会使用一些插件包的全局变量
    "no-unused-vars": 0,
    // 某些情况会使用到不是三个等于号
    "eqeqeq": 0,
    // 不同区域可以有相同变量名
    "no-redeclare": 0
  }
}
