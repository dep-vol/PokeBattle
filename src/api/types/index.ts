export type GetCharactersType = {
    results: CharactersBase;
}

export type CharactersBase = {
    name: string;
    url: string;
}[]

export type GetChar = {
    name: string;
    sprites: {front_default: string};
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    weight: number;
}

export type Char = {
    name: string;
    sprites: string;
    stats: {
        name: string;
        base: number;
    }[];
    weight: number;
}