// import { leagueSettings } from "@/config/leagueSettings";

// console.log(leagueSettings);

export const getTeamOptions = {
    method: "GET",
    url: "http://localhost:3500/response",
};

// export const getTeamOptions = {
//   method: 'GET',
//   url: `${import.meta.env.VITE_RAPIDAPI_URL}standings`,
//   params: {
//     season: leagueSettings.season,
//     league: leagueSettings.league
//   },
//   headers: {
//     'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_KEY}`,
//     'X-RapidAPI-Host': `${import.meta.env.VITE_RAPIDAPI_HOST}`
//   }
// };

export const getSquadOptions = {
    method: "GET",
    url: "http://localhost:3501/response",
};

// export const getSquadOptions = (id: number | string) => {
//   const options = {
//     method: 'GET',
//     url: `${import.meta.env.VITE_RAPIDAPI_URL}players/squads`,
//     params: {
//       team: id
//     },
//     headers: {
//       'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_KEY}`,
//       'X-RapidAPI-Host': `${import.meta.env.VITE_RAPIDAPI_HOST}`
//     }
//   };
//   return options;
// };

export const getFixtureOptions = {
    method: "GET",
    url: "http://localhost:3502/response",
};

// export const getFixtureOptions = {
//   method: 'GET',
//   url: `${import.meta.env.VITE_RAPIDAPI_URL}fixtures`,
//   params: {
//     season: leagueSettings.season,
//     league: leagueSettings.league,
//     next: leagueSettings.nextFixture
//   },
//   headers: {
//     'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_KEY}`,
//     'X-RapidAPI-Host': `${import.meta.env.VITE_RAPIDAPI_HOST}`
//   }
// };
