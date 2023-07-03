<script lang="ts" setup>
const { data } = await useLazyAsyncData("my-issues", () => fetchMyOpenIssues());
</script>

<template>
  <q-item v-for="issue in data?.issues">
    <IssueCard :issue="issue" />
  </q-item>
</template>
