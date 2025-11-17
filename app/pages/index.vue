<script setup lang="ts">
import { tiles } from "~/utils/tiles";
import { useAI } from "../composables/useAI";
const { messages, ask } = useAI();

const x = 32;
const y = 24;
const map = ref<string[][]>(
  Array.from({ length: y }, () => Array(x).fill(""))
);
const selectedTile = ref<string | null>(null);

function selectTile(tile: any) {
  selectedTile.value = tile.id;
}

function click({ row, col }: { row: number; col: number }) {
  if (map.value[row] && col >= 0 && col < map.value[row].length) {
    if (selectedTile.value) {
      map.value[row][col] = selectedTile.value;
    } else {
      map.value[row][col] = "";
    }
  }
}

async function onSend(msg: string) {
  const change = await ask(msg, map.value);
  if (change) {
    Object.entries(change).forEach(([key, id]) => {
      const [rowStr, colStr] = key.split(".");
      const row = Number(rowStr);
      const col = Number(colStr);
      if (
        Number.isInteger(row) &&
        Number.isInteger(col) &&
        row >= 0 &&
        row < y &&
        col >= 0 &&
        col < x &&
        map.value[row]
      ) {
        map.value[row][col] = id;
      }
    });
  }
}

onMounted(() => {
  messages.value.push({
    role: "user",
    content: "可用材料列表：" + JSON.stringify(tiles.value),
    hidden: true,
  });
});
</script>

<template>
  <div class="w-screen h-100dvh flex max-md:flex-col">
    <TilePalette class="md:w-40!" :tiles="tiles" @select="selectTile" />
    <MapCanvas class="flex-1" :map="map" @click="click" />
    <ChatBox class="max-md:h-80 md:w-80!" :messages="messages" @send="onSend" />
  </div>
</template>
