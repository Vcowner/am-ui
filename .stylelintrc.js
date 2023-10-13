/*
 * @Author: liaokt
 * @Description:
 * @Date: 2023-10-13 09:11:12
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-13 09:30:57
 */
module.exports = {
  // 继承的预设
  extends: [
    // 代码风格规则
    'stylelint-stylistic/config',
    // 基本 less 规则
    'stylelint-config-standard-less',
    // less vue 规则
    'stylelint-config-recommended-vue',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
  ],
  rules: {
    // 自定义规则 any 不同的规则要求不同的值， null 关闭
    'stylistic/max-line-length': 100,
  },
};
