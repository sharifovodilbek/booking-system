import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existing) {
        throw new BadRequestException('Bu email allaqachon mavjud');
      }

      const user = await this.prisma.user.create({
        data: createUserDto,
      });

      return {
        message: 'Foydalanuvchi muvaffaqiyatli yaratildi',
        data: user,
      };
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      throw new InternalServerErrorException('Foydalanuvchi yaratishda xatolik yuz berdi');
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return { message: 'Foydalanuvchilar royxati', data: users };
    } catch (err) {
      throw new InternalServerErrorException('Foydalanuvchilarni olishda xatolik yuz berdi');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException(`ID ${id} bo'lgan foydalanuvchi topilmadi`);

      return { message: 'Foydalanuvchi topildi', data: user };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Foydalanuvchini olishda xatolik yuz berdi');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException(`ID ${id} bo'lgan foydalanuvchi topilmadi`);

      const updated = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return { message: 'Foydalanuvchi muvaffaqiyatli yangilandi', data: updated };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Foydalanuvchini yangilashda xatolik yuz berdi');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException(`ID ${id} bo'lgan foydalanuvchi topilmadi`);

      await this.prisma.user.delete({ where: { id } });

      return { message: 'Foydalanuvchi muvaffaqiyatli ochirildi' };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Foydalanuvchini ochirishda xatolik yuz berdi');
    }
  }
}
