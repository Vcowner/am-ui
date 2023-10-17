/*
 * @Author: liaokt
 * @Description: 插件管理
 * @Date: 2023-10-16 15:19:51
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-17 16:44:31
 */
import vue, { Options as VueOptions } from '@vitejs/plugin-vue';
import inspect, { Options as InspectOptions } from 'vite-plugin-inspect';
import { PluginVisualizerOptions, visualizer } from 'rollup-plugin-visualizer';
import replace, { RollupReplaceOptions } from '@rollup/plugin-replace';
import { PluginOption } from 'vite';
import { PackageJson } from 'type-fest';
import type { GenerateConfigOptions } from './options';
import { isObjectLike } from '../utils';
import { pluginSetPackageJson } from './pluginSetPackageJson';
import { pluginMoveDts } from './pluginMoveDts';

/** 预设插件相关配置选项 */
export interface GenerateConfigPluginsOptions {
  /**
   * 是否启用 @vitejs/plugin-vue 进行 vue 模板解析,配置规则如下,对于其他插件也适用
   * - false / undefined 不启用该插件
   * - true 启用该插件, 采用默认配置
   * - Options 启用该插件, 应用具体配置
   * @default false
   */
  pluginVue?: boolean | VueOptions;

  /**
   * 是否启用 vite-plugin-inspect 进行产物分析
   * @default false
   */
  pluginInspect?: boolean | InspectOptions;

  /**
   * 是否启用 rollup-plugin-visualizer 进行产物分析
   * @default false
   */
  pluginVisualizer?: boolean | PluginVisualizerOptions;

  /**
   * 是否启用 @rollup/plugin-replace 进行产物内容替换
   * @default false
   */
  pluginReplace?: boolean | RollupReplaceOptions;
}

/**
 * 处理单个预设插件
 * @param options 预设插件相关配置选项
 * @param key 目标选项名称
 * @param plugin 对应的插件函数
 * @param defaultOptions 插件默认选项
 */
export function getPresetPlugin<K extends keyof GenerateConfigPluginsOptions>(
  // 传入一个配置插件的选项
  options: GenerateConfigPluginsOptions,
  // 传入一个配置插件的键
  key: K,
  // 传入一个配置插件的函数
  plugin: (...args: any[]) => PluginOption,
  // 传入一个默认配置插件的选项
  defaultOptions?: GenerateConfigPluginsOptions[K],
) {
  // 获取当前配置插件的值
  const value = options[key];
  // 如果没有值，则返回null
  if (!value) {
    return null;
  }

  // 如果当前配置插件的值是一个对象，则返回plugin函数的执行结果
  // 否则，返回plugin函数的执行结果，并传入默认配置插件的选项
  return plugin(isObjectLike(value) ? value : defaultOptions);
}

/**
 * 获取预设插件配置
 * @param options 预设插件配置选项
 */
export function getPresetPlugins(options: GenerateConfigPluginsOptions = {}) {
  // 定义一个空数组，用于存放插件
  const result: PluginOption[] = [];

  // 将插件添加到数组中
  result.push(
    getPresetPlugin(options, 'pluginVue', vue),
    getPresetPlugin(options, 'pluginInspect', inspect),
    getPresetPlugin(options, 'pluginVisualizer', visualizer),
    getPresetPlugin(options, 'pluginReplace', replace),
  );

  // 返回插件数组
  return result;
}

export function getPlugins(packageJson: PackageJson = {}, options: GenerateConfigOptions = {}) {
  const { mode, dts } = options;
  const result = getPresetPlugins(options);

  if (mode === 'package') {
    // 常规构建的情况下,集成自定义插件,回到 package.json 的入口字段
    result.push(pluginSetPackageJson(packageJson, options));

    if (dts) {
      // 常规构建的情况下,集成自定义插件,移动 d.ts 产物
      result.push(pluginMoveDts(options));
    }
  }
  return result;
}
