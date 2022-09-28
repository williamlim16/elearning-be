import { prisma } from './repository'
import process from 'node:process'
import { prepopulateDB } from './src/config/prepopulateDB'
import http from 'http'
import initializeRoute from './src/config/routes'
import initializeExpress from './src/config/express'
import initializeWebsocket from './src/config/websocket'

async function main (): Promise<void> {
  const app = initializeExpress()
  const server = http.createServer(app)

  /**
   * Websockets
   */
  initializeWebsocket(server)

  /**
   * Application routes & seeding database
   */
  prepopulateDB()
  initializeRoute(app)

  /**
   * Start the server
   */
  const port = process.env.PORT
  server.listen(port)
  console.log('🚀 Server ready at http://localhost:3030')
}

main().catch(e => { console.error('unknown error', e) })

process.on('exit', () => {
  void prisma.$disconnect()
})
