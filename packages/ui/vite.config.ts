/*
 * @Author: liaokt
 * @Description: vite.config.ts
 * @Date: 2023-10-10 09:44:34
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-17 16:54:21
 */
import { defineConfig } from 'vite';
import { generateVueConfig } from '../build/build.config';

export default defineConfig(({ mode }) => generateVueConfig({ mode }));
