import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const REFLECTOR = 'Reflector'

@Injectable()
export class FlashInterceptor implements NestInterceptor {
  constructor(@Inject(REFLECTOR) protected readonly reflector: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const flash = this.reflector.get('flash', context.getHandler())

    if (!flash) return next.handle()

    return next.handle().pipe(map((props) => req.flash('flash', flash)))
  }
}
