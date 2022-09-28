import crypto from 'crypto'

export const createHash = (string: string): string => {
  const key = process.env.ACCESS_SECRET as string
  const hash = crypto.createHmac('sha256', key).update(string).digest('hex')
  return hash
}
