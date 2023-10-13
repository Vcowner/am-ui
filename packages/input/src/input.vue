<!--
 * @Author: liaokt
 * @Description: input 组件
 * @Date: 2023-10-10 09:15:18
 * @LastEditors: liaokt
 * @LastEditTime: 2023-10-10 09:30:05
-->
<template>
  <div>
    <input
      :value="modelValue"
      class="am-input"
      type="text"
      @input="inputHandle"
    >
  </div>
</template>

<script lang="ts" setup>
import { hello } from '@am-ui/shared';

withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: '' });

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function inputHandle(e: any) {
  const { value } = e.target;
  emit('update:modelValue', value);
  hello(value);
}
</script>
