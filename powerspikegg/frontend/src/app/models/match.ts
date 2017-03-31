/* tslint:disable */
declare module game.leagueoflegends {


  interface ProtoBufMapItem<KeyType, ValueType> {
    key: KeyType,
    value: ValueType
  }

  interface ProtoBufMap<KeyType, ValueType> {
    clear(): void;
    delete(key: KeyType): void;
    get(key: KeyType): ValueType;
    has(key: KeyType): boolean;
    set(key: KeyType, value: ValueType): void;
    forEach(fn: (value: ValueType, key?: KeyType) => void): void;
    size: number;
    map: { [key: string]: ProtoBufMapItem<KeyType, ValueType> }
  }

  export interface ProtoBufBuilder {
    Summoner: SummonerBuilder;
    SummonerSpell: SummonerSpellBuilder;
    Item: ItemBuilder;
    Champion: ChampionBuilder;
    MatchReference: MatchReferenceBuilder;
    MatchDetail: MatchDetailBuilder;
    TeamDetail: TeamDetailBuilder;
    Participant: ParticipantBuilder;
    PlayerStatistics: PlayerStatisticsBuilder;
    DamageStatistic: DamageStatisticBuilder;
    Region: Region;
    Map: Map;
    QueueType: QueueType;
    Season: Season;

  }
}

declare module game.leagueoflegends {

  export interface Summoner {



    id?: number;


    getId?(): number;
    setId?(id: number): void;




    name?: string;


    getName?(): string;
    setName?(name: string): void;




    region?: Region;


    getRegion?(): Region;
    setRegion?(region: Region): void;




  }

  export interface SummonerMessage extends Summoner {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface SummonerBuilder {
    new (data?: Summoner): SummonerMessage;
    decode(buffer: ArrayBuffer): SummonerMessage;
    decode(buffer: ByteBuffer): SummonerMessage;
    decode64(buffer: string): SummonerMessage;

  }

}


declare module game.leagueoflegends {

  export interface SummonerSpell {



    id?: number;


    getId?(): number;
    setId?(id: number): void;




    name?: string;


    getName?(): string;
    setName?(name: string): void;




  }

  export interface SummonerSpellMessage extends SummonerSpell {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface SummonerSpellBuilder {
    new (data?: SummonerSpell): SummonerSpellMessage;
    decode(buffer: ArrayBuffer): SummonerSpellMessage;
    decode(buffer: ByteBuffer): SummonerSpellMessage;
    decode64(buffer: string): SummonerSpellMessage;

  }

}


declare module game.leagueoflegends {

  export interface Item {



    id?: number;


    getId?(): number;
    setId?(id: number): void;




    name?: string;


    getName?(): string;
    setName?(name: string): void;




  }

  export interface ItemMessage extends Item {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface ItemBuilder {
    new (data?: Item): ItemMessage;
    decode(buffer: ArrayBuffer): ItemMessage;
    decode(buffer: ByteBuffer): ItemMessage;
    decode64(buffer: string): ItemMessage;

  }

}


declare module game.leagueoflegends {

  export interface Champion {



    id?: number;


    getId?(): number;
    setId?(id: number): void;




    name?: string;


    getName?(): string;
    setName?(name: string): void;




  }

  export interface ChampionMessage extends Champion {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface ChampionBuilder {
    new (data?: Champion): ChampionMessage;
    decode(buffer: ArrayBuffer): ChampionMessage;
    decode(buffer: ByteBuffer): ChampionMessage;
    decode64(buffer: string): ChampionMessage;

  }

}


declare module game.leagueoflegends {

  export interface MatchReference {



    id?: number;


    getId?(): number;
    setId?(id: number): void;




    timestamp?: number;


    getTimestamp?(): number;
    setTimestamp?(timestamp: number): void;




    version?: string;


    getVersion?(): string;
    setVersion?(version: string): void;




    plateform_id?: string;


    getPlateformId?(): string;
    setPlateformId?(plateformId: string): void;




    region?: Region;


    getRegion?(): Region;
    setRegion?(region: Region): void;




    queue_type?: QueueType;


    getQueueType?(): QueueType;
    setQueueType?(queueType: QueueType): void;




    season?: Season;


    getSeason?(): Season;
    setSeason?(season: Season): void;




    detail?: MatchDetail;


    getDetail?(): MatchDetail;
    setDetail?(detail: MatchDetail): void;




  }

  export interface MatchReferenceMessage extends MatchReference {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface MatchReferenceBuilder {
    new (data?: MatchReference): MatchReferenceMessage;
    decode(buffer: ArrayBuffer): MatchReferenceMessage;
    decode(buffer: ByteBuffer): MatchReferenceMessage;
    decode64(buffer: string): MatchReferenceMessage;

  }

}


declare module game.leagueoflegends {

  export interface MatchDetail {



    map?: Map;


    getMap?(): Map;
    setMap?(map: Map): void;




    duration?: number;


    getDuration?(): number;
    setDuration?(duration: number): void;




    teams?: TeamDetail[];


    getTeams?(): TeamDetail[];
    setTeams?(teams: TeamDetail[]): void;




  }

  export interface MatchDetailMessage extends MatchDetail {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface MatchDetailBuilder {
    new (data?: MatchDetail): MatchDetailMessage;
    decode(buffer: ArrayBuffer): MatchDetailMessage;
    decode(buffer: ByteBuffer): MatchDetailMessage;
    decode64(buffer: string): MatchDetailMessage;

  }

}


declare module game.leagueoflegends {

  export interface TeamDetail {



    id?: number;


    getId?(): number;
    setId?(id: number): void;




    winner?: boolean;


    getWinner?(): boolean;
    setWinner?(winner: boolean): void;




    banned_champion_ids?: number[];


    getBannedChampionIds?(): number[];
    setBannedChampionIds?(bannedChampionIds: number[]): void;




    baron_kills?: number;


    getBaronKills?(): number;
    setBaronKills?(baronKills: number): void;




    dragon_kills?: number;


    getDragonKills?(): number;
    setDragonKills?(dragonKills: number): void;




    tower_kills?: number;


    getTowerKills?(): number;
    setTowerKills?(towerKills: number): void;




    first_baron?: boolean;


    getFirstBaron?(): boolean;
    setFirstBaron?(firstBaron: boolean): void;




    first_dragon?: boolean;


    getFirstDragon?(): boolean;
    setFirstDragon?(firstDragon: boolean): void;




    first_blood?: boolean;


    getFirstBlood?(): boolean;
    setFirstBlood?(firstBlood: boolean): void;




    first_tower?: boolean;


    getFirstTower?(): boolean;
    setFirstTower?(firstTower: boolean): void;




    first_inhibitor?: boolean;


    getFirstInhibitor?(): boolean;
    setFirstInhibitor?(firstInhibitor: boolean): void;




    first_rift_herald?: boolean;


    getFirstRiftHerald?(): boolean;
    setFirstRiftHerald?(firstRiftHerald: boolean): void;




    participants?: Participant[];


    getParticipants?(): Participant[];
    setParticipants?(participants: Participant[]): void;




  }

  export interface TeamDetailMessage extends TeamDetail {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface TeamDetailBuilder {
    new (data?: TeamDetail): TeamDetailMessage;
    decode(buffer: ArrayBuffer): TeamDetailMessage;
    decode(buffer: ByteBuffer): TeamDetailMessage;
    decode64(buffer: string): TeamDetailMessage;

  }

}


declare module game.leagueoflegends {

  export interface Participant {



    id?: number;


    getId?(): number;
    setId?(id: number): void;




    summoner?: Summoner;


    getSummoner?(): Summoner;
    setSummoner?(summoner: Summoner): void;




    summoner_spell_1?: SummonerSpell;


    getSummonerSpell_1?(): SummonerSpell;
    setSummonerSpell_1?(summonerSpell_1: SummonerSpell): void;




    summoner_spell_2?: SummonerSpell;


    getSummonerSpell_2?(): SummonerSpell;
    setSummonerSpell_2?(summonerSpell_2: SummonerSpell): void;




    items?: Item[];


    getItems?(): Item[];
    setItems?(items: Item[]): void;




    statistics?: PlayerStatistics;


    getStatistics?(): PlayerStatistics;
    setStatistics?(statistics: PlayerStatistics): void;




  }

  export interface ParticipantMessage extends Participant {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface ParticipantBuilder {
    new (data?: Participant): ParticipantMessage;
    decode(buffer: ArrayBuffer): ParticipantMessage;
    decode(buffer: ByteBuffer): ParticipantMessage;
    decode64(buffer: string): ParticipantMessage;

  }

}


declare module game.leagueoflegends {

  export interface PlayerStatistics {



    kills?: number;


    getKills?(): number;
    setKills?(kills: number): void;




    deaths?: number;


    getDeaths?(): number;
    setDeaths?(deaths: number): void;




    assists?: number;


    getAssists?(): number;
    setAssists?(assists: number): void;




    champion_level?: number;


    getChampionLevel?(): number;
    setChampionLevel?(championLevel: number): void;




    magic_damages?: DamageStatistic;


    getMagicDamages?(): DamageStatistic;
    setMagicDamages?(magicDamages: DamageStatistic): void;




    physical_damages?: DamageStatistic;


    getPhysicalDamages?(): DamageStatistic;
    setPhysicalDamages?(physicalDamages: DamageStatistic): void;




    true_damages?: DamageStatistic;


    getTrueDamages?(): DamageStatistic;
    setTrueDamages?(trueDamages: DamageStatistic): void;




    total_damages?: DamageStatistic;


    getTotalDamages?(): DamageStatistic;
    setTotalDamages?(totalDamages: DamageStatistic): void;




    total_heal?: number;


    getTotalHeal?(): number;
    setTotalHeal?(totalHeal: number): void;




    largest_critical_strike?: number;


    getLargestCriticalStrike?(): number;
    setLargestCriticalStrike?(largestCriticalStrike: number): void;




    gold_earned?: number;


    getGoldEarned?(): number;
    setGoldEarned?(goldEarned: number): void;




    gold_spent?: number;


    getGoldSpent?(): number;
    setGoldSpent?(goldSpent: number): void;




    minions_killed?: number;


    getMinionsKilled?(): number;
    setMinionsKilled?(minionsKilled: number): void;




    neutral_minions_killed?: number;


    getNeutralMinionsKilled?(): number;
    setNeutralMinionsKilled?(neutralMinionsKilled: number): void;




    neutral_minions_killed_ennemy_jungle?: number;


    getNeutralMinionsKilledEnnemyJungle?(): number;
    setNeutralMinionsKilledEnnemyJungle?(neutralMinionsKilledEnnemyJungle: number): void;




    neutral_minions_killed_team_jungle?: number;


    getNeutralMinionsKilledTeamJungle?(): number;
    setNeutralMinionsKilledTeamJungle?(neutralMinionsKilledTeamJungle: number): void;




    sight_wards_bought?: number;


    getSightWardsBought?(): number;
    setSightWardsBought?(sightWardsBought: number): void;




    vision_wards_bought?: number;


    getVisionWardsBought?(): number;
    setVisionWardsBought?(visionWardsBought: number): void;




    wards_placed?: number;


    getWardsPlaced?(): number;
    setWardsPlaced?(wardsPlaced: number): void;




    wards_killed?: number;


    getWardsKilled?(): number;
    setWardsKilled?(wardsKilled: number): void;




    double_kills?: number;


    getDoubleKills?(): number;
    setDoubleKills?(doubleKills: number): void;




    triple_kills?: number;


    getTripleKills?(): number;
    setTripleKills?(tripleKills: number): void;




    quadra_kills?: number;


    getQuadraKills?(): number;
    setQuadraKills?(quadraKills: number): void;




    penta_kills?: number;


    getPentaKills?(): number;
    setPentaKills?(pentaKills: number): void;




    unreal_kills?: number;


    getUnrealKills?(): number;
    setUnrealKills?(unrealKills: number): void;




    killing_sprees?: number;


    getKillingSprees?(): number;
    setKillingSprees?(killingSprees: number): void;




    largest_killing_spree?: number;


    getLargestKillingSpree?(): number;
    setLargestKillingSpree?(largestKillingSpree: number): void;




    largest_multi_kill?: number;


    getLargestMultiKill?(): number;
    setLargestMultiKill?(largestMultiKill: number): void;




    inhibitor_kills?: number;


    getInhibitorKills?(): number;
    setInhibitorKills?(inhibitorKills: number): void;




    tower_kills?: number;


    getTowerKills?(): number;
    setTowerKills?(towerKills: number): void;




    first_blood_assist?: boolean;


    getFirstBloodAssist?(): boolean;
    setFirstBloodAssist?(firstBloodAssist: boolean): void;




    first_blood_kill?: boolean;


    getFirstBloodKill?(): boolean;
    setFirstBloodKill?(firstBloodKill: boolean): void;




    first_inhibitor_kill?: boolean;


    getFirstInhibitorKill?(): boolean;
    setFirstInhibitorKill?(firstInhibitorKill: boolean): void;




    first_tower_assist?: boolean;


    getFirstTowerAssist?(): boolean;
    setFirstTowerAssist?(firstTowerAssist: boolean): void;




    first_tower_kill?: boolean;


    getFirstTowerKill?(): boolean;
    setFirstTowerKill?(firstTowerKill: boolean): void;




  }

  export interface PlayerStatisticsMessage extends PlayerStatistics {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface PlayerStatisticsBuilder {
    new (data?: PlayerStatistics): PlayerStatisticsMessage;
    decode(buffer: ArrayBuffer): PlayerStatisticsMessage;
    decode(buffer: ByteBuffer): PlayerStatisticsMessage;
    decode64(buffer: string): PlayerStatisticsMessage;

  }

}


declare module game.leagueoflegends {

  export interface DamageStatistic {



    total?: number;


    getTotal?(): number;
    setTotal?(total: number): void;




    to_champions?: number;


    getToChampions?(): number;
    setToChampions?(toChampions: number): void;




    taken?: number;


    getTaken?(): number;
    setTaken?(taken: number): void;




  }

  export interface DamageStatisticMessage extends DamageStatistic {
    toArrayBuffer(): ArrayBuffer;
    encode(): ByteBuffer;
    encodeJSON(): string;
    toBase64(): string;
    toString(): string;
  }

  export interface DamageStatisticBuilder {
    new (data?: DamageStatistic): DamageStatisticMessage;
    decode(buffer: ArrayBuffer): DamageStatisticMessage;
    decode(buffer: ByteBuffer): DamageStatisticMessage;
    decode64(buffer: string): DamageStatisticMessage;

  }

}


declare module game.leagueoflegends {
  export const enum Region {
    BR = 0,
    EUNE = 1,
    EUW = 2,
    KR = 3,
    LAN = 4,
    LAS = 5,
    NA = 6,
    OCE = 7,
    RU = 8,
    TR = 9,

  }
}

declare module game.leagueoflegends {
  export const enum Map {
    SUMMONER_RIFT = 0,

  }
}

declare module game.leagueoflegends {
  export const enum QueueType {
    TEAM_BUILDER_RANKED_SOLO = 0,

  }
}

declare module game.leagueoflegends {
  export const enum Season {
    SEASON2017 = 0,
    PRESEASON2017 = 1,
    SEASON2016 = 2,

  }
}


