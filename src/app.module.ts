import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BookingsModule, EventModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
