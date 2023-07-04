<script setup lang="ts">
import { Issue } from "types/JiraIssuesRequest";

const props = defineProps<{
  issue: Issue;
}>();

const { data: session } = useAuth();

const { data } = await useLazyAsyncData(props.issue.id, () =>
  fetchIssueData(props.issue.id)
);

const { data: status, refresh: refreshStatus } = await useFetch(
  "/api/timer/status",
  {
    query: { issue_key: props.issue.key, email: session.value!.user!.email },
  }
);

async function Start() {
  const { data } = await useFetch("/api/timer/start", {
    method: "POST",
    body: { issue_key: props.issue.key, email: session.value!.user!.email },
  });
  refreshStatus();
}

async function Stop() {
  const { data } = await useFetch("/api/timer/stop", {
    method: "POST",
    body: { issue_key: props.issue.key, email: session.value!.user!.email },
  });
  refreshStatus();
}
</script>

<template>
  <q-card bordered flat class="full-width">
    <q-card-section>
      <div class="text-h6">
        <q-img
          :src="issue.fields.issuetype.iconUrl"
          spinner-color="white"
          style="height: 30px; max-width: 30px"
        />
        {{ issue.fields.summary }}
        <q-badge outline color="primary" :label="issue.key" />
      </div>
    </q-card-section>
    <q-card-section class="text-h6">
      Tempo gasto: {{ data?.fields.timetracking.timeSpent ?? "0h" }}
    </q-card-section>
    <q-card-actions>
      <q-btn
        disable
        flat
        dense
        color="primary"
        label="Adicionar Registro"
        icon="add"
        class="q-mr-sm"
      />

      <q-btn
        flat
        dense
        color="primary"
        label="Iniciar"
        icon="play_arrow"
        class="q-mr-sm"
        @click="Start"
        v-if="status !== 'running'"
      />
      <q-btn
        flat
        dense
        color="primary"
        label="Parar"
        icon="stop"
        class="q-mr-sm"
        @click="Stop"
        v-if="status === 'running'"
      />
    </q-card-actions>
  </q-card>
</template>
