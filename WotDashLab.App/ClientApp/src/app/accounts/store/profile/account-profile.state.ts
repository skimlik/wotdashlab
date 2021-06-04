export declare type MissionsStatus =
  | 'NONE'
  | 'UNLOCKED'
  | 'NEED_GET_MAIN_REWARD'
  | 'MAIN_REWARD_GOTTEN'
  | 'NEED_GET_ADD_REWARD'
  | 'NEED_GET_ALL_REWARDS'
  | 'ALL_REWARDS_GOTTEN';

export interface ITankShortInfo {
  tankId: number;
  name: string;
  shortName: string;
  description: string;
  type: string;
  tier: number;
  nation: string;
  images: {
    smallIcon: string;
    contourIcon: string;
    bigIcon: string;
  }
}

export interface IAccountProfileState {
  accountId: string;
  nickname: string;
  clientLanguage: string;
  createdAt: number;
  updatedAt?: number;
  lastBattleTime?: number;
  globalRating: number;
  clanId: number;
  logoutAt?: number;
  private?: IAccountPrivateData;
  tankInfos: {[key: number]: ITankShortInfo };
  statistics: {
    treesCut: number;
    frags: { [key: number]: number };
    all: IAccountStatistics;
  };
}

export interface IAccountBoosters {
  count: number;
  expirationTime: number;
  state: 'ACTIVE' | 'INACTIVE' | 'USED';
}

export interface IAccountGroupedContacts {
  blocked: number[];
  ignored: number[];
  muted: number[];
}

export interface IAccountRestrictions {
  chatBanTime?: number;
}

export interface IAccountPrivateData {
  banInfo: string;
  banTime: string;
  battleLifeTime?: number;
  bonds: number;
  credits: number;
  gold: number;
  freeXp: number;
  garage: number[];
  isBoundToPhone: boolean;
  isPremium: boolean;
  restrictions: IAccountRestrictions;
  personalMissions?: {[key: string]: MissionsStatus};
  premiumExpiresAt?: number;
  boosters?: IAccountBoosters;
  groupedContacts?: {};
}

export interface IAccountStatistics {
  spotted: number;
  battlesOnStunningVehicles: number;
  avgDamageBlocked: number;
  directHitsReceived: number;
  explosionHits: number;
  piercingsHits: number;
  piercingsReceived: number;
  piercings: number;
  xp: number;
  survivedBattles: number;
  droppedCapturePoints: number;
  hitsPercents: number;
  draws: number;
  battles: number;
  damageReceived: number;
  avgDamageAssisted: number;
  avgDamageAssistedTrack: number;
  avgDamageAssistedRadio: number;
  frags: number;
  stunNumber: number;
  capturePoints: number;
  stunAssistedDamage: number;
  hits: number;
  battleAvgXp: number;
  wins: number;
  losses: number;
  damageDealt: number;
  noDamageDirectHitsReceived: number;
  shots: number;
  explosionHitsReceived: number;
  tankingFactor: number;
  maxFrags: number;
  maxDamage: number;
  maxXp: number;
  maxXpTankId?: number;
  maxFragsTankId?: number;
  maxDamageTankId?: number;
}
