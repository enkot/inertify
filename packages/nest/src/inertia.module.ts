import { APP_INTERCEPTOR } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { InertiaInterceptor } from './inertia.interceptor'
import { FlashInterceptor } from './flash.interceptor'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: InertiaInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FlashInterceptor,
    },
  ],
  exports: [],
})
export class InertiaModule {}
