import checkIPWhiteList from './check-ip-white-list'
import checkMaintenanceMode from './check-maintenance-mode'
import redirect from './redirect'

export default function initMiddlewareHandler(options) {
  options.homepage = options.homepage || '/'
  options.maintenancePage = options.maintenancePage || '/maintenance'
  options.ipWhiteListFilename = options.ipWhiteListFilename || '.maintenance.ip'

  return function MaintenanceMiddleware(req, res, next) {
    const isInMaintenancePage = req.url.startsWith(options.maintenancePage)

    const greenLight = function () {
      if (isInMaintenancePage) {
        return redirect(res, options.homepage)
      }
      return next()
    }

    if (!checkMaintenanceMode()) {
      return greenLight()
    }

    // check whether the client IP address is in the IP white list
    const isInWhiteList = checkIPWhiteList(req, options)

    if (isInWhiteList) {
      return greenLight()
    } else if (isInMaintenancePage) {
      return next()
    }

    return redirect(res, options.maintenancePage)
  }
}
