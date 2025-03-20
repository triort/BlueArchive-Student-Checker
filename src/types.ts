export type Student = {
    id: string;
    name: string;
    fullname?: string;
    school: string;
    age?: number;
    releaseDate: string;
    rarity: string | number;
    limited: boolean;
    combatClass: string;
    role: string;
    position: string;
    attackType?: string;
    armorType: string;
    affinity: {
        urban?: string;
        outdoors: string;
        indoors: string;
    };
    weapon: string;
    owned?: boolean;
};