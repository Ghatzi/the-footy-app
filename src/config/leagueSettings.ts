import { Settings } from '@/types/types';

const getYear = () => {
  const getMonth = new Date().getMonth() + 1;
  const getYear = new Date().getFullYear();

  if (getMonth <= 7) return (getYear - 1).toString();

  return `${getYear}`;
};

export const leagueSettings: Settings = {
  league: '39',
  season: getYear()
};
