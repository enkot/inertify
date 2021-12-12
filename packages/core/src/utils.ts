import { Buffer } from 'buffer'
import { createHash } from 'crypto'
import { readFile } from 'fs/promises'

export const hash = (value: string | Buffer): string =>
  createHash('md5').update(value).digest('hex')

export const readManifest = async (manifestPath: string) => {
  try {
    if (typeof manifestPath === 'string') {
      const buffer = await readFile(manifestPath)

      return {
        manifest: JSON.parse(buffer.toString('utf8')),
        version: hash(buffer),
      }
    }
  } catch (error: any) {
    console.warn(error.message)
  }
}

export const getObjectValue = (object: Record<string, any>, key: string) => {
  return object[
    Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase()) || ''
  ]
}

export enum HEADERS {
  INERTIA = 'X-Inertia',
  INERTIA_PARTIAL_DATA = 'X-Inertia-Partial-Data',
  INERTIA_PARTIAL_DATA_COMPONENT = 'X-Inertia-Partial-Component',
  INERTIA_VERSION = 'X-Inertia-Version',
  INERTIA_LOCATION = 'X-Inertia-Location',
  CONTENT_TYPE = 'Content-Type',
  SET_COOKIE = 'Set-Cookie',
  COOKIE = 'Cookie',
  VARY = 'Vary',
  REFERER = 'Referer',
}
