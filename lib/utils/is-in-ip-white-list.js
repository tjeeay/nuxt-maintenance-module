import fs from 'fs'
import { EOL } from 'os'

export default function isInIPWhiteList(filepath, req) {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  if (clientIP === '127.0.0.1') {
    return true
  }

  const isFileExists = fs.existsSync(filepath)

  if (!isFileExists) {
    return false
  }

  const whiteListIPs = fs.readFileSync(filepath, { encoding: 'utf8' })
  const ips = whiteListIPs.split(EOL).filter(ip => ip)

  return ips.includes(clientIP)
}
