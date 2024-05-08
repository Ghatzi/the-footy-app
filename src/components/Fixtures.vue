<script setup lang="ts">
import { onMounted, Ref, ref, computed } from "vue";
import { getFixtureOptions } from "@/composables/api";
import { api } from "@/composables/axios";
import { formatDate } from "@/composables/functions";
import { Fixtures } from "@/types/types";

const props = defineProps({
    getTeamId: {
        type: String,
        required: true,
    },
});

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
</script>

<template>
    <div class="pa-2">
        <h3>Next Fixture:</h3>

        <div class="text-center">
            <img :src="getFixturesById?.teams.home.logo" alt="home team logo" />
            <span class="text-h6">Vs</span>
            <img :src="getFixturesById?.teams.away.logo" alt="away team logo" />
        </div>

        <div class="text-right">
            <h5 class="font-weight-regular">
                {{ formatDate(getFixturesById?.fixture.date) }}
            </h5>
            <h5 class="font-weight-regular">
                {{ getFixturesById?.fixture.venue.name }}
            </h5>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
