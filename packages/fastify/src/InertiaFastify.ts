import { FastifyRequest, FastifyReply } from 'fastify'
import { Inertia } from '@inertify/core'

export class InertiaFastify extends Inertia {
  constructor(protected req: FastifyRequest, protected reply: FastifyReply) {
    super(req)
  }

  async render(
    component: string,
    props?: Record<string, any>
  ): Promise<void | string | null> {
    const { view, manifest } = InertiaFastify.config
    const { statusCode, headers, data, isInertia } = await this.getReponseData({
      component,
      props,
    })

    this.reply.status(statusCode)
    this.reply.headers(headers)

    if (isInertia) return data
    else return this.reply.view(view, { manifest, inertiaData: data })
  }
}
