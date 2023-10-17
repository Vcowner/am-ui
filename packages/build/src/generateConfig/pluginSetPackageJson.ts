/*
 * @Author: liaokt
 * @Description: 插件实现
 * @Date: 2023-10-17 14:46:06
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-17 15:09:58
 */
import { PluginOption } from 'vite';
import { PackageJson } from 'type-fest';
import { basename } from 'node:path';
import {
  isFunction, isObjectLike, absCwd, relCwd, kebabCase, writeJson,
} from '../utils';
import { GenerateConfigOptions, getOptions } from './options';
import { getOutFileName, resolveEntry } from './lib';

/** 根据源码入口和产物目录,计算出 d.ts 类型声明的入口的相对地址 */
function getDtsPath(options: GenerateConfigOptions = {}) {
  const { entry, outDir } = getOptions(options);

  const { rel, isFile } = resolveEntry(entry);

  /** 入口文件 d.ts 产物名称 */
  const entryFileName = isFile ? basename(entry).replace(/\..*$/, '.d.ts') : 'index.d.ts';

  return relCwd(absCwd(outDir, rel, entryFileName), false);
}

/**
 * 自定义插件,实现对 package.json 内容的修改与回写
 * @param packageJson package.json 文件内容
 * @param options 构建选项
 */
export function pluginSetPackageJson(
  packageJson: PackageJson = {},
  options: GenerateConfigOptions = {},
): PluginOption {
  // eslint-disable-next-line object-curly-newline
  const { onSetPkg, mode, fileName, outDir, dts } = getOptions(options);

  if (mode !== 'package') {
    return null;
  }

  const finalName = fileName || kebabCase(packageJson.name || '');

  return {
    name: 'set-package-json',
    // 只在构建模式下执行
    apply: 'build',
    async closeBundle() {
      const packageJsonObj = packageJson || {};

      // 将 types main module exports 产物路径写入 package.json
      const exportsData: Record<string, any> = {};

      // 获取并设置 umd 产物的路径
      const umd = relCwd(absCwd(outDir, getOutFileName(finalName, 'umd', mode)), false);

      packageJsonObj.main = umd;
      exportsData.require = umd;

      // 获取并设置 d.ts 产物的路径
      if (dts) {
        const dtsEntry = getDtsPath(options);
        packageJsonObj.types = dtsEntry;
        exportsData.types = dtsEntry;
      }

      if (!isObjectLike(packageJsonObj.exports)) {
        packageJsonObj.exports = {};
      }
      Object.assign(packageJsonObj.exports, { '.': exportsData });

      // 支持在构建选项中的 onSetPkg 中钩子中队 package.json 进行进一步修改
      if (isFunction(onSetPkg)) {
        await onSetPkg(packageJsonObj);
      }

      // 回写入 package.json 文件
      await writeJson(absCwd('package.json'), packageJsonObj, null, 2);
    },
  };
}
