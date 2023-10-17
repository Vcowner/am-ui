import { PackageJson } from 'type-fest';
import { getOptions, GenerateConfigOptions } from './options';

export function getExternal(packageJson: PackageJson = {}, options: GenerateConfigOptions = {}) {
  const { dependencies = {}, peerDependencies = {} } = packageJson;

  const { mode } = getOptions(options);

  const defaultExternal: (string | RegExp)[] = [
    // 将所有 node 原声模块都进行外部化处理
    /^node:.*/,
  ];

  const toReg = (item: string) => new RegExp(`^${item}`);

  return defaultExternal.concat(
    Object.keys(peerDependencies).map(toReg),

    // 全量构建时,依赖不尽兴外部化,一并打包进来
    mode === 'package' ? Object.keys(dependencies).map(toReg) : [],
  );
}
