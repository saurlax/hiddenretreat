<template>
  <PxCard>
    <div class="flex flex-col gap-2">
      <PxCard
        v-for="(m, i) in messages.filter((m) => !m.hidden)"
        :class="`box-border ${m.role}`"
        :key="i"
      >
        {{ m.content }}
      </PxCard>
    </div>
    <template #footer>
      <form class="flex gap-2" @submit.prevent="onSend">
        <PxInput v-model="question" placeholder="输入设计需求" />
        <PxButton @click="onSend">发送</PxButton>
      </form>
    </template>
  </PxCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  messages: Array<{ role: string; content: string; hidden?: boolean }>;
}>();
const emit = defineEmits(["send"]);
const question = ref("");

function onSend() {
  if (!question.value.trim()) return;
  emit("send", question.value.trim());
  question.value = "";
}
</script>

<style>
.assistant {
  color: var(--px-color-white);
  --px-bg-color: var(--px-color-primary) !important;
  --px-bg-shadow-color: var(--px-color-primary-dark-2) !important;
}
</style>
