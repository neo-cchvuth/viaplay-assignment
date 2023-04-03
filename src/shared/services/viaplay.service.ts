import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ViaplayService {
  constructor(private http: HttpService) {}

  getImdbInfo(resourceLink: string) {
    return this.http
      .get(resourceLink)
      .pipe(
        map(
          (res) =>
            res.data._embedded['viaplay:blocks'][0]._embedded['viaplay:product']
              .content.imdb
        )
      );
  }
}
