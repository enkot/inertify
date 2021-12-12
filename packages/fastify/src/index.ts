import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { InertiaFastify } from './InertiaFastify'

declare module 'fastify' {
  interface FastifyReply {
    inertia: InertiaFastify
    view: any
  }
}

export interface InertiaFastifyOptions {
  view?: string
  version?: string
  manifest?: any
}

const callback: FastifyPluginAsync<InertiaFastifyOptions> = async (
  fastify,
  { view = 'index', version = '1', manifest }
) => {
  InertiaFastify.setConfig({
    view,
    version,
    manifest,
  })

  fastify.decorateReply('inertia', null)
  fastify.addHook(
    'onRequest',
    async (req: FastifyRequest, reply: FastifyReply) => {
      reply.inertia = new InertiaFastify(req, reply)
    }
  )
}

export const inertiaAdapter = fp(callback)
