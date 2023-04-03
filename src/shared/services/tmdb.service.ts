import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

import { Media } from '../types/media';
import { constructYouTubeUrl } from '../helpers/youtube';

@Injectable()
export class TmdbService {
  baseUrl = process.env.TMDB_API_URL;
  baseParams = {
    api_key: process.env.TMDB_API_KEY
  };

  constructor(private http: HttpService) {}

  getYouTubeTrailer(id: number, type = Media.MOVIE) {
    return this.http
      .get(`${this.baseUrl}/${type}/${id}/videos`, {
        params: this.baseParams
      })
      .pipe(
        map((res) => {
          const result = res.data.results.find(
            (result) => result.type === 'Trailer' && result.site === 'YouTube'
          );
          return constructYouTubeUrl(result.key);
        })
      );
  }

  getIdFromExternalId(id: string, source = 'imdb_id', type = Media.MOVIE) {
    return this.http
      .get(`${this.baseUrl}/find/${id}`, {
        params: Object.assign({ external_source: source }, this.baseParams)
      })
      .pipe(map((res) => res.data[type + '_results'][0].id));
  }
}
