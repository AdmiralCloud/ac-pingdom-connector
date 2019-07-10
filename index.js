const _ = require('lodash')

const os = require('os')
const http = require('http')

const pingdomConnector = () => {

  const init = (params, cb) => {
    const enabled = _.get(params, 'enabled', true)
    if (!enabled) return cb()

    const port = _.get(params, 'port', 40400)
    const logger = _.get(params, 'logger')
    const headlineLength = _.get(params, 'headlineLength', 60)

    if (logger) {
      logger.info(_.pad(' ACTIVATE PINGDOM CONNECTOR ', headlineLength, '*'))
    }
    // find IP address
    let ip = ''
    let ifaces = os.networkInterfaces()
    let eth = ifaces['en0'] || ifaces['eth0']
    if (eth) ip = _.find(eth, { family: 'IPv4' }) && _.find(eth, { family: 'IPv4' }).address
    console.log(ip)
    http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('I am alive\n')
    }).listen(port, ip)
    if (logger) logger.info('Pingdom connector running on port %s', port)
    return cb()
  }

  return {
    init
  }

}

module.exports = pingdomConnector()
