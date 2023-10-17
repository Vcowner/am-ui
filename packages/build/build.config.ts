/*
 * @Author: liaokt
 * @Description:
 * @Date: 2023-10-17 16:32:33
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-17 16:50:51
 */
import { UserConfig } from 'vite';
import { GenerateConfigOptions, generateConfig as baseGenerateConfig } from './src';
import { absCwd } from './src/utils';

/** 构建普通的纯 ts/js 模块的预设 */
export function generateConfig(customOptions?: GenerateConfigOptions, viteConfig?: UserConfig) {
  return baseGenerateConfig(
    {
      // 指定 d.ts 文件相关 tsconfig 的位置
      dts: absCwd('../../tsconfig.src.json'),
      ...customOptions,
    },
    viteConfig,
  );
}

/** 构建 Vue 组件模块的预设 */
export function generateVueConfig(customOptions?: GenerateConfigOptions, viteConfig?: UserConfig) {
  return generateConfig(
    {
      pluginVue: true,
      ...customOptions,
    },
    viteConfig,
  );
}
