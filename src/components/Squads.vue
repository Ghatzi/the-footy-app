<script setup lang="ts">
import { computed } from 'vue';
import { mdiMenuUp } from '@mdi/js';
import { Players } from '@/types/types';
import { teamColors } from '@/composables/teamColors';

const props = defineProps({
  players: {
    type: Object,
    required: true
  },
  getTeamId: {
    type: String,
    required: true
  }
});

const tableHeaders = ['Name', 'Position', 'Age', 'Shirt Number'];

const getData = computed(() =>
  props.players.flatMap((players: Players) => players)
);

const sortPlayers = (name?: string) => {
  if (name)
    getData.value.sort((a: any, b: any) => a['name'].localeCompare(b['name']));

  console.log(getData.value);
};

const getTeamColors = computed(() => {
  const setTeamColors = teamColors
    .filter(team => team.id === Number(props.getTeamId))
    .map(selectedTeam => {
      const colors = {
        primary: selectedTeam.primary,
        secondary: selectedTeam.secondary
      };

      return colors;
    });

  return setTeamColors;
});

const setLinearGradient = computed(() => {
  return `background-image: linear-gradient(0.25turn, ${getTeamColors.value[0].primary} 80%, ${getTeamColors.value[0].secondary})`;
});
</script>

<template>
  <v-btn @click="sortPlayers('name')" color="green"> sort by name </v-btn>

  <v-table v-if="players.length" hover density="compact">
    <thead>
      <tr :style="setLinearGradient">
        <th v-for="headers in tableHeaders">
          {{ headers }}
          <v-icon :icon="mdiMenuUp" size="30" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="player in getData" :key="player.id">
        <td>{{ player.name }}</td>
        <td>{{ player.position }}</td>
        <td>{{ player.age }}</td>
        <td>{{ player.number }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped></style>
