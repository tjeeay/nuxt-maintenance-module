import path from 'path'
import { EOL } from 'os'

const defaultOptions = {
  homepage: '/',
  maintenancePage: '/maintenance',
  ipWhiteListFilename: '.maintenance.ip',
}

export default function MaintenanceModule(moduleOptions) {
  if (process.env.MAINTENANCE_MODE === 'enable') {
    /* eslint-disable-next-line */
    console.log('> !!! Notice: maintenance mode is enabled', EOL)
  }

  const options = {
    ...defaultOptions,
    ...moduleOptions,
    ...this.options.maintenance,
  }

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
