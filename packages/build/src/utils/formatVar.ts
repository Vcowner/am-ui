/*
 * @Author: liaokt
 * @Description: 变量名转换工具方法
 * @Date: 2023-10-16 14:57:39
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-16 15:03:36
 */

// 功能：根据变量名拆分出单词
// 参数：varName：变量名
// 返回值：单词数组
function splitVar(varName: string) {
  // 正则表达式，用于拆分变量名
  const reg = /[A-Z]{2,}(?=[A-Z][a-z]+|[0-9]|[^a-zA-Z0-9])|[A-Z]?[a-z]+|[A-Z]|[0-9]/g;
  // 返回拆分后的单词数组
  return varName.match(reg) || <string[]>[];
}

/**
 * 将变量名转换为肉串形式: @am-ui/build -> am-ui-build
 * @param varName 变量名
 * @returns
 */
export function kebabCase(varName: string) {
  // 将变量名拆分成数组
  const nameArr = splitVar(varName);
  // 将数组中的每一项都转换为小写，并用'-'连接
  return nameArr.map((name: string) => name.toLowerCase()).join('-');
}

// 导出一个函数，用于将变量名转换为驼峰式写法
export function camelCase(varName: string, isFirstWordUpperCase = false) {
  // 将变量名按照小写字母和数字进行分割
  const nameArr = splitVar(varName);
  // 遍历分割后的数组，并将其转换为驼峰式写法
  return (
    nameArr
      .map((item, index) => {
        // 如果是第一个单词，并且不是以大写开头，则将其转换为小写
        if (index === 0 && !isFirstWordUpperCase) {
          return item.toLowerCase();
        }
        // 否则，将其转换为大写，并且将后面的字母转换为小写
        return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      })
      // 将转换后的数组用空格拼接起来
      .join('')
  );
}
