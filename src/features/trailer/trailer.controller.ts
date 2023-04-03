import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse
} from '@nestjs/swagger';
import { catchError, lastValueFrom, mergeMap } from 'rxjs';

import { TmdbService } from '../../shared/services/tmdb.service';
import { ViaplayService } from '../../shared/services/viaplay.service';

import { TrailerResponse } from './trailer.response';

@Controller('trailer')
export class TrailerController {
  constructor(private viaplay: ViaplayService, private tmdb: TmdbService) {}

  @Get('movie')
  @ApiOkResponse({
    description: 'Get movie trailer',
    type: TrailerResponse
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async getMovieYouTubeTrailer(
    @Query('resource_link') resourceLink: string
  ): Promise<TrailerResponse> {
    if (!resourceLink) throw new BadRequestException();

    return {
      site: 'YouTube',
      url: await lastValueFrom(
        this.viaplay.getImdbInfo(resourceLink).pipe(
          mergeMap((imdbData) => this.tmdb.getIdFromExternalId(imdbData.id)),
          mergeMap((tmdbId) => this.tmdb.getYouTubeTrailer(tmdbId)),
          catchError(() => {
            throw new NotFoundException();
          })
        )
      )
    };
  }
}
