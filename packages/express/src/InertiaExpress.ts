import { Request, Response } from 'express'
import { Inertia } from '@inertify/core'

export class InertiaExpress extends Inertia {
  constructor(protected req: Request, protected res: Response) {
    super(req)
  }

  async render(
    component: string,
    props?: Record<string, any>,
    options?: { return: boolean }
  ): Promise<void | string | null> {
    const { view, manifest } = InertiaExpress.config
    const { statusCode, headers, data, isInertia } = await this.getReponseData({
      component,
      props,
    })

    this.res.status(statusCode)
    this.res.set(headers)

    if (options?.return) {
      if (isInertia) return data

      return new Promise((resolve, reject) => {
        this.res.render(view, { manifest, inertiaData: data }, (err, html) => {
          if (err) reject(err)
          else resolve(html)
        })
      })
    }

    if (isInertia) this.res.end(data)
    else this.res.render(view, { manifest, inertiaData: data })
  }
}
