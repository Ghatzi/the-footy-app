import { Settings } from "@/types/types";

const getYear = () => {
    const getMonth = new Date().getMonth() + 1;
    const getYear = new Date().getFullYear();

    if (getMonth <= 7) return (getYear - 1).toString();

    return `${getYear}`;
};

// const getNextFixture = () => {
//     const startDate = new Date("2023-08-12");
//     const endDate = new Date("2024-05-19");

//     const start = startDate.getTime();
//     const end = endDate.getTime();

//     const difference = end - start;

//     const weeks = Math.ceil(difference / (1000 * 60 * 60 * 24 * 7));

//     let counter = 0;
//     for (let i = 0; i < weeks; i++) {
//         counter++;
//     }

//     return weeks.toString();
// };

export const leagueSettings: Settings = {
    league: "39",
    season: getYear(),
    nextFixture: "50",
};
