<script setup lang="ts">
import { withBase } from 'vitepress'

withDefaults(defineProps<{
  src: string
  title?: string
  width?: number | string
  height?: number | string
}>(), {
  src: '',
  width: 400,
  height: 'auto',
})
</script>

<script lang="ts">
export default {
  name: 'CustomImage',
}
</script>

<template>
  <img :src="withBase(src)" :width="width" :height="height" :alt="title" :style="{ 'max-height': '100% !important' }">
</template>
