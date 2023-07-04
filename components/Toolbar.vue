<script lang="ts" setup>
const { data: session, signOut } = useAuth();

const drawer = ref(false);
</script>

<template>
  <q-header reveal bordered class="bg-primary text-white q-pa-sm">
    <q-toolbar>
      <q-toolbar-title>
        <q-btn
          v-if="session"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />
        ClockTool
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <q-drawer v-model="drawer" v-if="session" show-if-above :breakpoint="800">
    <q-img class="sticky-top" src="https://cdn.quasar.dev/img/material.png">
      <div class="fixed-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img :src="(session.user!.image as string)" />
        </q-avatar>
        <div class="text-weight-bold">{{ session.user?.name }}</div>
        <div>{{ session.user?.email }}</div>
      </div>
    </q-img>

    <q-scroll-area style="height: calc(100% - 150px)">
      <q-list padding>
        <q-item>
          <q-btn class="full-width" color="red" @click="() => signOut()"
            >Sair</q-btn
          >
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
