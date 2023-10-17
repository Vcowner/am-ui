/*
 * @Author: liaokt
 * @Description: 类型检查工具类
 * @Date: 2023-10-16 14:36:50
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-16 14:56:45
 */

// 导出一个函数，用于判断传入的参数是否为对象
export function isObjectLike(val: unknown): val is Record<any, any> {
  // 判断传入的参数是否不为null且类型为object
  return val !== null && typeof val === 'object';
}

// 导出一个函数，用于判断传入的参数是否为函数
export function isFunction(val: unknown): val is Function {
  // typeof 运算符用于返回变量的数据类型
  // 如果传入参数的数据类型为函数，则返回true，否则返回false
  return typeof val === 'function';
}
