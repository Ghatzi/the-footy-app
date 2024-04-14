<script setup lang="ts">
import { computed } from 'vue';
import { Players, Headers } from '@/types/types';
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

const tableHeaders: Headers[] = [
  {
    name: 'name',
    friendlyName: 'Name',
    type: 'string'
  },
  {
    name: 'position',
    friendlyName: 'Position',
    type: 'string'
  },
  {
    name: 'age',
    friendlyName: 'Age',
    type: 'numeric'
  },
  {
    name: 'number',
    friendlyName: 'Shirt Number',
    type: 'numeric'
  }
];

const getData = computed(() =>
  props.players.flatMap((players: Players) => players)
);

const sortPlayers = (sortBy: string, sortType: string, sortOrder: string) => {
  props.players.flatMap((players: Players[]) => {
    players.sort((a: any, b: any) =>
      sortOrder === 'dsc'
        ? sortType === 'numeric'
          ? b[sortBy] - a[sortBy]
          : b[sortBy].localeCompare(a[sortBy])
        : sortType === 'numeric'
        ? a[sortBy] - b[sortBy]
        : a[sortBy].localeCompare(b[sortBy])
    );
  });
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
  <v-table v-if="players.length" hover density="compact">
    <thead>
      <tr :style="setLinearGradient">
        <th v-for="headers in tableHeaders">
          <span class="d-flex">
            {{ headers.friendlyName }}
            <span class="d-flex flex-column ml-1">
              <i
                @click="sortPlayers(headers.name, headers.type, 'asc')"
                :title="`Sort ${headers.name} by ascending`"
                class="sort-by-asc"
              ></i>
              <i
                @click="sortPlayers(headers.name, headers.type, 'dsc')"
                :title="`Sort ${headers.name} by decending`"
                class="sort-by-dsc"
              ></i>
            </span>
          </span>
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

<style scoped>
.sort-by-asc,
.sort-by-dsc {
  cursor: pointer;
  background: transparent;
  border: solid 5px transparent;
  border-top-width: 0;
}

.sort-by-asc {
  margin: 3px 4px 0 3px;
  border-bottom: solid 7px #fff;
}

.sort-by-dsc {
  margin: 2px 4px 0 3px;
  border-top: solid 7px #fff;
}
</style>
