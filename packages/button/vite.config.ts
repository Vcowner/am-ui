/*
 * @Author: liaokt
 * @Description:
 * @Date: 2023-10-10 14:12:06
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-10 14:13:34
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // 添加插件的使用
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'AmUiButton',
      fileName: 'am-ui-button',
    },
    minify: false,
    rollupOptions: {
      external: [
        // 除了 @am-ui/shared，未来可能还会依赖其他内部模块，不如用正则表达式将 @am-ui 开头的依赖项一起处理掉
        /@am-ui.*/,
        'vue',
      ],
    },
  },
});
