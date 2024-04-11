export interface Settings {
  league: string;
  season: string;
}

export interface Teams {
  team: {
    [id: string]: string | number;
    name: string;
  };
}

export interface Players {
  players: [
    {
      id: number;
      name: string;
      age: number;
      number: number;
      position: string;
    }
  ];
}
