<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white q-pa-sm">
      <Toolbar />
    </q-header>

    <q-page-container class="q-pa-md">
      <slot />
    </q-page-container>
  </q-layout>
</template>
