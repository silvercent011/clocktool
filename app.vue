<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const $q = useQuasar();

watch(
  () => $q.dark.isActive,
  (val) => {
    console.log(val ? "On dark mode" : "On light mode");
  }
);
$q.dark.set(true);
</script>
