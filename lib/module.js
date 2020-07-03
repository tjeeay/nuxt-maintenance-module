import path from 'path'
import { EOL } from 'os'
import isInIPWhiteList from './utils/is-in-ip-white-list'

const defaultOptions = {
  middlewarePath: '/maintenance/check',
  maintenancePage: '/maintenance.html',
  ipWhiteListFilename: '.maintenance.ip',
}

export default function MaintenanceModule(moduleOptions) {
  if (process.env.MAINTENANCE_MODE !== 'enable') {
    return
  }

  /* eslint-disable-next-line */
  console.log('> !!! Notice: maintenance mode is enabled', EOL)

  const options = {
    ...defaultOptions,
    ...moduleOptions,
    ...this.options.maintenance,
  }

  const filepath = path.join(this.options.rootDir, options.ipWhiteListFilename)

  this.addServerMiddleware({
    path: options.middlewarePath,
    handler(req, res) {
      res.end(
        JSON.stringify({
          pass: isInIPWhiteList(filepath, req),
        }),
      )
    },
  })

  this.options.router = this.options.router || {}
  this.options.router.middleware = this.options.router.middleware || []
  this.options.router.middleware.unshift('maintenance')

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.server.template'),
    fileName: 'generated.plugin.maintenance.server.js',
    options,
  })
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.client.template'),
    fileName: 'generated.plugin.maintenance.client.js',
    options,
  })
}

exports.meta = require('../package.json')
