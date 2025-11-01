import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @ApiProperty({ example: 1 })
    @IsInt()
    event_id: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    user_id: number;
}
