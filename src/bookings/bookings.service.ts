import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async reserve(createBookingDto: CreateBookingDto) {
    const { event_id, userId } = createBookingDto;

    const event = await this.prisma.event.findUnique({
      where: { id: event_id },
      include: { bookings: true },
    });

    if (!event) throw new NotFoundException('Event topilmadi');

    if (event.bookings.length >= event.total_seats)
      throw new BadRequestException('Joylar tugagan');

    const oldBooking = await this.prisma.bookings.findFirst({
      where: { event_id, userId: userId },
    });

    if (oldBooking)
      throw new BadRequestException('Siz allaqachon bu eventga bron qilgansiz');

    return await this.prisma.bookings.create({
      data: { event_id, userId: userId },
    });
  }

  async findAll() {
    return await this.prisma.bookings.findMany({
      include: { user: true, event: true },
    });
  }

  async findOne(id: number) {
    const booking = await this.prisma.bookings.findUnique({
      where: { id },
      include: { user: true, event: true },
    });

    if (!booking) throw new NotFoundException('Booking topilmadi');
    return booking;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.bookings.delete({ where: { id } });
  }
}
