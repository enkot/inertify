import { SetMetadata } from '@nestjs/common'

export const Render = (page: string) => SetMetadata('inertia', page)
