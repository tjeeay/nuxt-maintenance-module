export default function checkMaintenanceMode() {
  return process.env.MAINTENANCE_MODE === 'enable'
}
