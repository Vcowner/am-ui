<!--
 * @Author: liaokt
 * @Description:
 * @Date: 2023-10-09 17:03:46
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-17 17:11:20
-->
<template>
  <button
    class="am-button text-blue ml-2px cursor-pointer"
    @click="clickHandle"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { hello } from '@am-ui/shared';
import { withDefaults, defineProps } from 'vue';

const props = withDefaults(
  defineProps<{
    text?: string;
  }>(),
  { text: 'World' },
);

const clickHandle = () => {
  hello(props?.text);
};
</script>
