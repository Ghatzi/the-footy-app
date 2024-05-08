export interface Settings {
    league: string;
    season: string;
    nextFixture: string;
}

export interface Teams {
    team: {
        [id: string]: string | number;
        name: string;
    };
}

export interface Players {
    players: Player[];
}

export interface Player {
    id: number;
    name: string;
    position: string;
    age: number;
    number: number;
}

export interface Headers {
    name: string;
    friendlyName: string;
    type: string;
}
