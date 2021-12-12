import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    export interface Request {
      flash: (name: string, value?: any) => any
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    sessionFlash?: Record<string, any>
  }
}

export const flash = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.flash = (name, value) => {
      const sessionFlash = req.session.sessionFlash || {}

      if (value) {
        req.session.sessionFlash = {
          ...req.session.sessionFlash,
          [name]: value,
        }
      } else if (name) {
        value = sessionFlash[name]
        delete sessionFlash[name]
        return value
      } else {
        req.session.sessionFlash = {}
        return sessionFlash
      }
    }

    next()
  }
}
