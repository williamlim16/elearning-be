import { prisma } from './repository'
import process from 'node:process'
import { prepopulateDB } from './src/config/prepopulateDB'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { typeDef as coursesTypeDef, resolvers as courseResolvers } from './src/course/graphql'
import { typeDef as baseTypeDef } from './src/config/graphql'
import _ from 'lodash'
import initializeRoute from './src/config/routes'
import initializeExpress from './src/config/express'
import initializeWebsocket from './src/config/websocket'

async function main (): Promise<void> {
  const app = initializeExpress()
  const server = http.createServer(app)

  /**
   * Apollo server stuffs
   */

  const apolloServer = new ApolloServer({
    typeDefs: [baseTypeDef, coursesTypeDef],
    resolvers: _.merge({}, courseResolvers),
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: server }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })]
  })

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
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
  await new Promise<void>(resolve => server.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:3030${apolloServer.graphqlPath}`)
}

main().catch(e => { console.error('unknown error', e) })

process.on('exit', () => {
  void prisma.$disconnect()
})
