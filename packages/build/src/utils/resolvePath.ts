/*
 * @Author: liaokt
 * @Description: 路径解析相关方法
 * @Date: 2023-10-16 14:40:03
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-16 14:55:48
 */
import { relative, resolve, sep } from 'node:path';

/** 抹平 Win 与 Linux 系统路径分隔符之间的差异 */
export function normalizePath(path: string) {
  if (sep === '/') {
    return path;
  }
  return path.replace(new RegExp(`\\${sep}`, 'g'), '/');
}

/** 给予一个基础路径,获取到一个以此为基准计算绝对路径的方法 */
export function usePathAbs(basePath: string) {
  // 返回一个函数，该函数接受一个字符串数组，并返回一个绝对路径
  return (...paths: string[]) => normalizePath(resolve(basePath, ...paths));
}

/** 给予一个基础路径,获取到一个以此为基准计算相对路径的方法 */
export function usePathRel(basePath: string) {
  // 返回一个函数，用于计算路径的相对路径
  return (path: string, ignoreLocationSignal: boolean = true) => {
    // 获取路径的相对路径
    const result = normalizePath(relative(basePath, path));
    // 如果相对路径以..开头，则返回相对路径
    if (result.slice(0, 2) === '..') {
      return result;
    }
    // 如果ignoreLocationSignal为true，则返回相对路径，否则返回以.开头的相对路径
    return ignoreLocationSignal ? result : `./${result}`;
  };
}

/** 获取相对于当前脚本执行位置的绝对路径 */
export const absCwd = usePathAbs(process.cwd());

/** 获取相对于当前脚本执行位置的相对路径 */
export const relCwd = usePathRel(process.cwd());
