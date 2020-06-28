import fs from 'fs'
import { EOL } from 'os'

export default function isInIPWhiteList(filepath, req) {
  const isFileExists = fs.existsSync(filepath)

  if (!isFileExists) {
    return false
  }

  const whiteListIPs = fs.readFileSync(filepath, { encoding: 'utf8' })
  const ips = whiteListIPs.split(EOL).filter(ip => ip)

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  return ips.includes(ip)
}
