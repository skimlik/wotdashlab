import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class DomEvents {
  private detectExternalClick(e: any, nativeElement: any): boolean {
    if (!e || !e.target) {
      return false;
    }

    const target = e.target;
    if (target === nativeElement) {
      return false;
    }
    let parent = target.parentNode;

    while (parent && parent.nodeName !== 'BODY') {
      if (parent === nativeElement) {
        return false;
      }

      if (parent.parentNode === null && parent.nodeName !== 'BODY') {
        return false;
      }
      parent = parent.parentNode;
    }
    return true;
  }

  public onElementOuterClick(target: Element): Observable<Event> {
    const clickEvent$ = fromEvent(document, 'click')
      .pipe(
        filter(ev => this.detectExternalClick(ev, target)),
      );

    return clickEvent$;
  }
}
