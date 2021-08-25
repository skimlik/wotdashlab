import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { YoutubeFeedService } from "../youtube-feed.service";
import { loadYoutubeFeed, loadYoutubeFeedComplete } from "./youtube-feed.actions";
import { map, mergeMap } from "rxjs/operators";

@Injectable()
export class YoutubeFeedEffects {

  loadFeed$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadYoutubeFeed),
      mergeMap(({ request, region }) => this.feedService.get(region, request)),
      map((payload) => loadYoutubeFeedComplete({ payload })),
    ),
    { dispatch: true }
  );

  constructor(private actions: Actions, private feedService: YoutubeFeedService) {
  }
}
