/*
 * @Author: liaokt
 * @Description: vite.config.ts
 * @Date: 2023-10-10 09:44:34
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-10 15:06:46
 */
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // 构建的入口文件
      entry: './src/index.ts',

      // 产物的生成格式，默认为 ['es', 'umd']。我们使用默认值，注释掉此字段。
      // formats: ['es', 'umd'],

      // 当产物为 umd、iife 格式时，该模块暴露的全局变量名称
      name: 'AmUi',
      // 产物文件名称
      fileName: 'am-ui',
    },

    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [/vue.*/],
      output: {
        // 在 UMD 构建模式下，为这些外部化的依赖提供一个全局变量.即使不设置，构建工具也会添加。
        globals: {
          vue: 'vue',
        },
      },
    },

    // 为了方便学习，查看构建产物，将此置为 false，不要混淆产物代码
    minify: false,
  },
});
