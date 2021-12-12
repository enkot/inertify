import { SetMetadata } from '@nestjs/common'

export const Flash = (data: any) => SetMetadata('flash', data)
