/*
 * @Author: liaokt
 * @Description:
 * @Date: 2023-10-10 14:12:06
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-17 17:08:05
 */
import unocss from 'unocss/vite';
import { generateVueConfig } from '../build/build.config';

export default generateVueConfig(
  {},
  {
    plugins: [unocss()],
  },
);
