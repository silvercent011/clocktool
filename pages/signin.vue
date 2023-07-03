<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const { signIn } = useAuth();

function signInWithAtlassian() {
  signIn("atlassian");
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white q-pa-sm">
      <Toolbar />
    </q-header>

    <q-page-container class="q-pa-lg">
      <div class="column flex-center height-full">
        <q-btn
          color="primary"
          icon-right="fa-brands fa-atlassian"
          @click="signInWithAtlassian"
        >
          Entrar com Atlassian
        </q-btn>
      </div>
    </q-page-container>
  </q-layout>
</template>
