<script setup lang="ts">
import { computed } from "vue";
import { iconManifest } from "../theme/icons/manifest";

const props = withDefaults(
  defineProps<{
    name: keyof typeof iconManifest;
    size?: string;
  }>(),
  {
    size: "20px"
  }
);

const icon = computed(() => iconManifest[props.name]);
</script>

<template>
  <image :src="icon.src" :style="{ width: size, height: size }" mode="aspectFit" />
</template>
