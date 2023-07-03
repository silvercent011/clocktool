<script lang="ts" setup>
const { session } = useAuth();
</script>

<template>
  <q-toolbar>
    <q-toolbar-title> ClockTool </q-toolbar-title>
    <template v-if="session">
      <q-avatar>
        <img :src="session.user.image" />
      </q-avatar>
    </template>
  </q-toolbar>
</template>
