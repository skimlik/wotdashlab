import { Injectable } from '@angular/core';
import { IAccountStatistics } from "../../store/profile/account-profile.state";

export class StatisticsService {

  constructor(private statistics: IAccountStatistics) {
  }

  get battles(): number {
    return this.statistics?.battles ?? 0;
  }

  get frags(): number {
    return this.statistics?.frags ?? 0;
  }

  get spotted(): number {
    return this.statistics?.spotted ?? 0;
  }

  get damageDealt(): number {
    return this.statistics?.damageDealt ?? 0;
  }

  get damageReceived(): number {
    return this.statistics?.damageReceived ?? 0;
  }

  get capturePoints(): number {
    return this.statistics?.capturePoints ?? 0;
  }

  get defence(): number {
    return this.statistics?.droppedCapturePoints ?? 0;
  }

  get fragsPerBattle(): number {
    return this.battles ? this.frags / this.battles : 0;
  }

  get damageDealtPerBattle(): number {
    return this.battles ? this.damageDealt / this.battles : 0;
  }

  get damageReceivedPerBattle(): number {
    return this.battles ? this.damageReceived / this.battles : 0;
  }

  get spottedPerBattle(): number {
    return this.battles ? this.spotted / this.battles : 0;
  }

  get capturePointsPerBattle(): number {
    return this.battles ? this.capturePoints / this.battles : 0;
  }

  get defencePerBattle(): number {
    return this.battles ? this.defence / this.battles : 0;
  }
}

@Injectable({ providedIn: 'root' })
export class StatisticsServiceFactory {
  create(statistics: IAccountStatistics): StatisticsService {
    return new StatisticsService(statistics);
  }
}
