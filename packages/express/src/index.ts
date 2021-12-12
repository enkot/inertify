import { Request, Response, NextFunction } from 'express'
import { InertiaExpress } from './InertiaExpress'

declare global {
  namespace Express {
    export interface Response {
      inertia: InertiaExpress
    }
  }
}

export const inertia = (options?: {
  view?: string
  version?: string
  manifest?: any
}) => {
  const { view = 'index', version = '1', manifest } = options || {}

  InertiaExpress.setConfig({
    view,
    version,
    manifest,
  })

  return (req: Request, res: Response, next: NextFunction) => {
    res.inertia = new InertiaExpress(req, res)

    next()
  }
}
