import { ApiProperty } from '@nestjs/swagger';

export class TrailerResponse {
  @ApiProperty({ example: 'YouTube' })
  site: string;

  @ApiProperty({ example: 'https://www.youtube.com/watch?v=7W1m5ER3I1Y' })
  url: string;
}
