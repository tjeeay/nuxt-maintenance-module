import checkMaintenanceMode from './lib/check-maintenance-mode'
import initMiddlewareHandler from './lib/middleware-handler'

export default function MaintenanceModule(moduleOptions) {
  if (checkMaintenanceMode()) {
    /* eslint-disable-next-line */
    console.log('[maintenance-module] > !!! Notice: maintenance mode is enabled')
  }

  const options = {
    ...moduleOptions,
    ...this.options.maintenance,
  }

  this.addServerMiddleware({
    path: '/',
    handler: initMiddlewareHandler(options),
  })
}

exports.meta = require('./package.json')
