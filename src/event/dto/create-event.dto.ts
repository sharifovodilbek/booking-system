import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, MaxLength } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: 'Tadbir nomi', example: 'Music Festival' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Jami joylar soni', example: 200 })
  @IsInt()
  @Min(1)
  total_seats: number;
}
