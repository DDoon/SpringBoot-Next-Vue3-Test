<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useBoardStore } from "../../store/modules/Board/Board";
import { Board } from "../../types/Board";

defineOptions({
  name: "BoardGetPage",
});

const boardStore = useBoardStore();

const board = ref<Board[] | null>();

onMounted(async () => {
  await boardStore.fetchBoards();
  board.value = boardStore.boards;
});
</script>

<template>
  <template v-if="board && board.length > 0">
    <div v-for="(b, index) in board" :key="index">
      <h2>{{ b.title }}</h2>
      <h3>Written by: {{ b.writer }}</h3>
      <p>{{ b.content }}</p>
      <!-- You can add more fields here as necessary -->
    </div>
  </template>
  <template v-else>
    <p>Loading...</p>
  </template>
</template>
