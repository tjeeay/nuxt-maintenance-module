# nuxt-maintenance-module

A Nuxt.js module that can easily enable maintenance mode while upgrading your system.

## Installation

```sh
npm install nuxt-maintenance-module
```

## Useage

just simple set the environment variable `MAINTENANCE_MODE=enable` when running your nuxt app.

```sh
MAINTENANCE_MODE=enable nuxt start
```

if maintenance mode was enabled, user access any pages will be redirect to the maintenance page(default: `/maintenance`). unless add user's IP address in `.maintenance.ip` file at root directory of the app.

```sh
# .maintenance.ip (one IP address per line)

192.168.1.2
192.168.2.3
```

## License

MIT
