/*
 * @Author: liaokt
 * @Description:
 * @Date: 2023-10-12 14:42:21
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-17 16:50:17
 */

const { defineConfig } = require('eslint-define-config');
const path = require('path');

module.exports = defineConfig({
  // 指定此配置为根级配置， eslint 不会继续向上层寻找
  root: true,

  // 将浏览器 API、ES API 和 Node API 看作全局变量，不会被特殊定的规则限制
  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  // 设置自定义全局变量，不会被特定的规则限制
  globals: {},

  // 集成 Airbnb 规则集以及 vue 相关规则
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:vue/vue3-recommended'],

  // 指定 vue 解析器
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 配置 TypeScript 解析器
    parser: '@typescript-eslint/parser',

    // 通过 tsconfig.json 文件确定解析范围，这里需要绝对路径，否则子模块中的 eslint 会出现异常
    project: path.resolve(__dirname, './tsconfig.eslint.json'),

    // 支持的 ecmaVersion
    ecmaVersion: 13,

    // 支持的 sourceType esm
    sourceType: 'module',

    // TypeScript 解析器也要负责 vue 文件的 <script>
    extraFileExtensions: ['.vue'],
  },

  // 在已有规则及基础上微调修改
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    // vue 允许单单词组件名
    'vue/multi-word-component-names': 'off',

    'operator-linebreak': ['error', 'after'],
    'class-methods-use-this': 'off',

    // 允许使用 ++
    'no-plusplus': 'off',

    'no-spaced-func': 'off',

    // 换行符不作约束
    'linebreak-style': 'off',
  },

  // 文件级别的重写
  overrides: [
    // 对于 vite 和 vitest 的配置文件，不对 config.log 进行错误提示
    {
      files: ['**/vite.config.*', '**/vitest.config.*'],
      rules: {
        'import/no-relative-packages': 'off',
        'no-console': 'off',
      },
    },
  ],
});
