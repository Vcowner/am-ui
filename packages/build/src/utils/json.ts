/*
 * @Author: liaokt
 * @Description: json 读写工具类
 * @Date: 2023-10-16 14:25:16
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-16 14:57:23
 */
import { readFile, writeFile } from 'node:fs/promises';

/**
 * 从文件中读出 JSON 对象
 * @param path filePath 文件路径
 * @returns JSON 对象
 */
export async function readJson<T extends Record<string, any> = Record<string, any>>(
  // 传入文件路径
  path: string,
): Promise<T> {
  // 读取文件内容
  const content = await readFile(path, 'utf-8');
  // 返回解析后的JSON对象
  return JSON.parse(content);
}

/**
 * 将 JSON 对象写入文件
 * @param filePath filePath 文件路径
 * @param rests {@link JSON.stringify} 的参数
 */
export async function writeJson(filePath: string, ...rests: Parameters<typeof JSON.stringify>) {
  // 使用JSON.stringify函数将参数转换为JSON字符串
  await writeFile(filePath, JSON.stringify(...rests), 'utf-8');
}
