/*
 * @Author: liaokt
 * @Description: 构建选项定义
 * @Date: 2023-10-16 15:08:09
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-17 10:11:29
 */
import { PackageJson } from 'type-fest';
import type { GenerateConfigPluginsOptions } from './plugins';

/** 自定义构建选项 */
export interface GenerateConfigOptions extends GenerateConfigPluginsOptions {
  /**
   * 代码入口
   * @default 'src/index.ts'
   */
  entry?: string;

  /**
   * 产物输出路径, 同: https://cn.vitejs.dev/config/build-options.html#build-outdir
   * @default 'dist'
   */
  outDir?: string;

  /**
   * 生成的文件名称
   *
   * 默认情况下取 package 包名,转换为 kebab-case, 如 @am-ui/request -> am-ui-request
   *
   * 当产物为 umd 格式时,驼峰化后的 fileName 会作为全局变量名,如: @am-ui/request -> amUiRequest
   */
  fileName?: string;

  /**
   * 打包模式
   * - package - 常规构建. 会将所有依赖外部化处理,打包出适用与构建场景的 `es` | `umd` 格式产物.并在构建结束后将产品路径回写入 package.json 的入口字段中
   * - full - 全量构建.大部分依赖都不做外部化处理,打包出适用于非构建场景的 `umd` 格式产物.不参与 d.ts 的移动;不参与构建完成后的产物路径回写
   * - full-min - 在全量构建的基础上,将产物代码混淆压缩,并生成 sourceMap 文件
   * @default 'package'
   */
  mode?: 'package' | 'full' | 'full-min';

  /**
   * 是否将 d.ts 类型声明文件的产物从集中目录移动到产物目录,并将类型入口回写到 package.json 的types 字段中
   *
   * 必须在 mode 为 packages 时生效
   *
   * 输入 tsc 编译成 d.ts 问件事所读取的 tsconfig 文件的路径
   * @default ''
   *
   */
  dts?: string;

  /**
   * 完成构建后,准备回写 package.json 文件前对其对象进行更改的钩子
   * @param pkg
   * @returns
   */
  onSetPkg?: (pkg: PackageJson) => void | Promise<void>;
}

/** 构建选项的默认值 */
export function defaultOptions(): Required<GenerateConfigOptions> {
  return {
    entry: 'src/index.ts',
    outDir: 'dist',
    fileName: '',
    mode: 'package',
    dts: '',
    onSetPkg: () => {},
    pluginVue: false,
    pluginInspect: false,
    pluginVisualizer: false,
    pluginReplace: false,
  };
}

/** 解析构建选项 */
export function getOptions(options?: GenerateConfigOptions): Required<GenerateConfigOptions> {
  return {
    ...defaultOptions(),
    ...options,
  };
}
