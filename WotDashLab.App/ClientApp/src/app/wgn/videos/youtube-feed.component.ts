import { Component, OnInit } from '@angular/core';
import { IWgnState } from "../store/wgn.state";
import { select, Store } from "@ngrx/store";
import { loadYoutubeFeed } from "./store/youtube-feed.actions";
import { VideoSearchRequest } from "./youtube-feed.service";
import {
  videoFeedPageNumberSelector,
  videoFeedPageSizeSelector,
  videoFeedSelector,
  videoFeedTotalPagesSelector
} from "./store";
import { LocalStorageService } from "../../core/infrastructure/local-storage.service";
import { map, withLatestFrom } from "rxjs/operators";
import { Observable, Observer } from "rxjs";

@Component({
  selector: 'app-youtube-feed',
  templateUrl: 'youtube-feed.component.html',
  styleUrls: ['youtube-feed.component.scss'],
})

export class YoutubeFeedComponent implements OnInit {
  private pageSize = 50;
  private totalPages$ = this.store.pipe(select(videoFeedTotalPagesSelector));

  public page$ = this.store.pipe(select(videoFeedPageNumberSelector));
  public feed$ = this.store.pipe(select(videoFeedSelector));
  public pageList$ = this.totalPages$.pipe(
    map((t) => Array.from(Array(t).keys())),
    map((t) => t.map(i => i + 1)),
  );

  private region = this.localStorage.getRegion();

  constructor(private store: Store<IWgnState>, private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.getData(1);
  }

  selectFirstPage(): void {
    this.getData(1);
  }

  selectLastPage(): void {
    const trigger$ = new Observable((observer: Observer<void>) => {
      observer.next();
      observer.complete;
    });

    trigger$.pipe(
      withLatestFrom(this.totalPages$, this.page$)
    ).subscribe(([_, lastPage, currentPage]) => {
      if (currentPage !== lastPage) {
        this.getData(lastPage);
      }
    });
  }

  selectPage(pageNo: number): void {
    this.getData(pageNo);
  }

  private getData(pageNo: number): void {
    const request: VideoSearchRequest = {
      pageNo,
      limit: this.pageSize,
    };

    this.store.dispatch(loadYoutubeFeed({ request, region: this.region}));
  };
}
