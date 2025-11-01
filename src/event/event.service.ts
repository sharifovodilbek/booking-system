import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    try {
      const event = await this.prisma.event.create({ data: createEventDto });
      return { message: 'Tadbir muvaffaqiyatli yaratildi', data: event };
    } catch (err) {
      throw new InternalServerErrorException('Tadbir yaratishda xatolik yuz berdi');
    }
  }

  async findAll(query: any) {
    try {
      const { sort = 'id', page = 1, limit = 10, name } = query;

      const skip = (page - 1) * limit;
      const where: any = name ? { name: { contains: name, mode: 'insensitive' as const } } : {};


      const events = await this.prisma.event.findMany({
        where,
        skip: Number(skip),
        take: Number(limit),
      });

      const total = await this.prisma.event.count({ where });

      return {
        message: 'Tadbirlar royxati',
        data: events,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
        },
      };
    } catch (err) {
      throw new InternalServerErrorException('Tadbirlarni olishda xatolik yuz berdi');
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.prisma.event.findUnique({ where: { id } });
      if (!event) throw new NotFoundException(`ID ${id} bo'lgan tadbir topilmadi`);
      return { message: 'Tadbir topildi', data: event };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Tadbirni olishda xatolik yuz berdi');
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      const existing = await this.prisma.event.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`ID ${id} bo'lgan tadbir topilmadi`);

      const updated = await this.prisma.event.update({
        where: { id },
        data: updateEventDto,
      });

      return { message: 'Tadbir muvaffaqiyatli yangilandi', data: updated };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Tadbirni yangilashda xatolik yuz berdi');
    }
  }

  async remove(id: number) {
  const event = await this.prisma.event.findUnique({
    where: { id },
    include: { bookings: true },
  });
  if (!event) throw new NotFoundException(`ID ${id} bo'lgan tadbir topilmadi`);
  if (event.bookings.length > 0)
    throw new BadRequestException('Bu tadbirda bronlar mavjud, ochirish mumkin emas');

  await this.prisma.event.delete({ where: { id } });
  return { message: 'Tadbir muvaffaqiyatli ochirildi' };
}

}
