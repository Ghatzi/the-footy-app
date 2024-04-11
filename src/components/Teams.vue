<script setup lang="ts">
import { ref, onMounted, Ref, computed } from 'vue';
import { mdiMagnify } from '@mdi/js';
import Squads from '@/components/Squads.vue';
import { api } from '@/composables/axios';
import { getTeamOptions, getSquadOptions } from '@/composables/api';
import { Teams, Players } from '@/types/types';

let teams: Ref<Teams[] | null> = ref(null);
let players: Ref<Players[]> = ref([]);
const selectedTeam = ref('');

onMounted(async () => {
  const res = await api(getTeamOptions);
  teams.value = res.response[0].league.standings[0];
});

const getSortedTeams = computed(() =>
  teams.value?.map(x => x.team.name).sort()
);

const getTeamId = (name: string) => {
  const filterByName = teams.value?.filter(x => x.team.name === name);
  const getId = filterByName?.map(x => x.team.id);

  return getId?.toString() ?? '';
};

const getTeamSquad = computed(async () => {
  const id = getTeamId(selectedTeam.value);
  const res = await api(getSquadOptions);

  players.value = res.response[0]
    .filter((teams: Teams) => teams.team.id === Number(id))
    .map((x: Players) => x.players);
});
</script>

<template>
  <v-container>
    <v-select
      :prepend-inner-icon="mdiMagnify"
      hide-details
      label="Select Team"
      v-model="selectedTeam"
      :items="getSortedTeams"
      @change="getTeamSquad"
    >
    </v-select>

    <Squads
      v-if="selectedTeam"
      :players="players"
      :get-team-id="getTeamId(selectedTeam)"
    />
  </v-container>
</template>

<style scoped></style>
