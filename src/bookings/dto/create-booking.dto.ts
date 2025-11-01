import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  event_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;
}
