<script setup lang="ts">
import { onMounted, Ref, ref, computed } from "vue";
import { getFixtureOptions } from "@/composables/api";
import { api } from "@/composables/axios";

const props = defineProps({
    getTeamId: {
        type: String,
        required: true,
    },
});

interface Fixtures {
    fixture: {
        id: number;
        date: string;
        venue: {
            name: string;
        };
    };
    league: {
        id: number;
        name: string;
    };
    teams: {
        home: {
            id: number;
            name: string;
            logo: string;
        };
        away: {
            id: number;
            name: string;
            logo: string;
        };
    };
}

let fixtures: Ref<Fixtures[] | null> = ref(null);

onMounted(async () => {
    const res = await api(getFixtureOptions);
    fixtures.value = res.response;
});

const getFixturesById = computed(() => {
    return fixtures.value?.find(
        (x) =>
            x.teams.home.id === Number(props.getTeamId) ||
            x.teams.away.id === Number(props.getTeamId)
    );
});

const formatDate = (date: any) =>
    new Date(date).toLocaleTimeString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
</script>

<template>
    <div class="pa-4 fixtures">
        <h3>Next Fixture:</h3>

        <!-- <div class="text-center">
        <img :src="getFixturesById?.teams.home.logo" alt="" />
        Vs
        <img :src="getFixturesById?.teams.away.logo" alt="" />
    </div> -->

        <div>
            <p>{{ getFixturesById?.league.name }}</p>
            <p>{{ formatDate(getFixturesById?.fixture.date) }}</p>
            <p>{{ getFixturesById?.teams.home.name }}</p>
            <p>{{ getFixturesById?.teams.away.name }}</p>
            <p>{{ getFixturesById?.fixture.venue.name }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fixtures {
    background-color: red;
}
</style>
