import fs from 'fs'
import path from 'path'
import { EOL } from 'os'

export default function checkIPWhiteList(req, options) {
  /**
   * Get real Client IP from X-Forwarded-For header
   * Example: X-Forwarded-For: <client>, <proxy1>, <proxy2>
   * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Forwarded-For
   */
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const realIP = clientIP
    .split(',')
    .map(ip => ip.trim())
    .shift()
  if (realIP === '127.0.0.1') {
    return true
  }

  try {
    const filepath = path.isAbsolute(options.ipWhiteListFilename)
      ? options.ipWhiteListFilename
      : path.join(process.env.PWD, options.ipWhiteListFilename)

    const isFileExists = fs.existsSync(filepath)

    if (!isFileExists) {
      console.warn('[maintenance-module] Can not found the IP white list file: ', filepath)
      return false
    }

    const whiteListIPs = fs.readFileSync(filepath, { encoding: 'utf8' })
    const ips = whiteListIPs.split(EOL).filter(ip => ip)

    return ips.includes(realIP)
  } catch (e) {
    console.warn('[maintenance-module] Check IP white list failed.', e)
  }

  return false
}
