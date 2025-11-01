
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Foydalanuvchi toliq ismi',
    example: 'Ali Valiyev',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'Foydalanuvchi email manzili (unique)',
    example: 'ali@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Parol (kamida 6 ta belgidan iborat bolishi kerak)',
    example: 'strongPassword123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
