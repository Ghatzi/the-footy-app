<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Players, Headers } from "@/types/types";
import { teamColors } from "@/composables/teamColors";

const props = defineProps({
    players: {
        type: Object,
        required: true,
    },
    getTeamId: {
        type: String,
        required: true,
    },
});

const tableHeaders: Headers[] = [
    {
        name: "name",
        friendlyName: "Name",
        type: "string",
    },
    {
        name: "position",
        friendlyName: "Position",
        type: "string",
    },
    {
        name: "age",
        friendlyName: "Age",
        type: "numeric",
    },
    {
        name: "number",
        friendlyName: "Shirt Number",
        type: "numeric",
    },
];

const sortOrder = ref(true);
const sortByName = ref("");

watch(
    () => props.getTeamId,
    () => {
        sortOrder.value = true;
        sortByName.value = "";
    }
);

const getData = computed(() =>
    props.players.flatMap((players: Players) => players)
);

const sortPlayers = (sortBy: string, sortType: string) => {
    sortByName.value = sortBy;
    sortOrder.value = !sortOrder.value;

    props.players.flatMap((players: Players[]) => {
        players.sort((a: any, b: any) =>
            sortOrder.value
                ? sortType === "numeric"
                    ? b[sortBy] - a[sortBy]
                    : b[sortBy].localeCompare(a[sortBy])
                : sortType === "numeric"
                ? a[sortBy] - b[sortBy]
                : a[sortBy].localeCompare(b[sortBy])
        );
    });
};

const getTeamColors = computed(() => {
    const setTeamColors = teamColors
        .filter((team) => team.id === Number(props.getTeamId))
        .map((selectedTeam) => {
            const colors = {
                primary: selectedTeam.primary,
                secondary: selectedTeam.secondary,
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
    <div class="pa-2 bg-white">
        <h3>Team Squads</h3>

        <h5 v-if="sortByName" class="text-capitalize font-weight-regular">
            Current Sort By: {{ sortByName }}
        </h5>
    </div>

    <v-table v-if="players.length" hover density="compact">
        <thead>
            <tr :style="setLinearGradient">
                <th v-for="headers in tableHeaders">
                    <span class="d-flex">
                        {{ headers.friendlyName }}
                        <span class="d-flex flex-column ml-1 icon">
                            <i
                                @click="sortPlayers(headers.name, headers.type)"
                                :title="`sort ${headers.name} by ${
                                    sortOrder ? 'ascending' : 'decending'
                                }`"
                                :class="{ rotate: !sortOrder }"
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

<style lang="scss" scoped>
.icon {
    i {
        cursor: pointer;
        background: transparent;
        border: solid 5px transparent;
        border-top-width: 0;
        margin: 7px 4px 0 3px;
        border-bottom: solid 7px #fff;
    }

    .rotate {
        transform: rotate(180deg);
        transition: transform 0.2s 0.1s;
    }
}
</style>
