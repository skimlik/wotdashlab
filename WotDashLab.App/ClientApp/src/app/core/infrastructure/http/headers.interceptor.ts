import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { ExpiresHeaderName, TokenHeaderName, UsernameHeaderName } from './constants';
import { UnixDateService } from '../../services/unix-date.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private storage: LocalStorageService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers.set('Content-Type', 'application/json');
    const auth = this.storage.getValue("Auth");
    if (auth) {
      const authObj = JSON.parse(auth);
      if (authObj.accessToken) {
        if (authObj.expiresAt) {
          const expiration = UnixDateService.fromUnixDate(+authObj.expiresAt);
          if (expiration.valueOf() > new Date().valueOf()) {
            headers = headers.append(TokenHeaderName, authObj.accessToken);
            headers = headers.append(ExpiresHeaderName, authObj.expiresAt);
            headers = headers.append(UsernameHeaderName, authObj.nickname);
          } else {
            this.storage.removeValue("Auth");
          }
        }
      }
    }

    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
