import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('api/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('reserve')
  @ApiOperation({ summary: 'Joyni bron qilish' })
  reserve(@Body() dto: CreateBookingDto) {
    return this.bookingService.reserve(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha bronlarni olish' })
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta bronni olish' })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Bronni bekor qilish' })
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
