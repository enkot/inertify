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
export class InertiaInterceptor implements NestInterceptor {
  constructor(@Inject(REFLECTOR) protected readonly reflector: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const res = ctx.getResponse()
    const component = this.reflector.get('inertia', context.getHandler())

    if (!component) return next.handle()

    return next
      .handle()
      .pipe(
        map((props) => res.inertia.render(component, props, { return: true }))
      )
  }
}
