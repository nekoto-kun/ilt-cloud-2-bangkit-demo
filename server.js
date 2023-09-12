import hapi from '@hapi/hapi'

import { contacts } from './contacts.js'

(async () => {
  const server = hapi.server({
    port: 3000,
    host: 'localhost'
  })

  server.route([
    {
      method: 'GET',
      path: '/contacts',
      handler: () => contacts
    },
    {
      method: 'POST',
      path: '/contacts',
      handler: (request, h) => {
        const id = contacts[contacts.length - 1].id + 1

        contacts.push({ id, ...request.payload })

        return h.response({ message: 'Contact added' }).code(201)
      }
    },
    {
      method: 'DELETE',
      path: '/contacts/{id}',
      handler: (request, h) => {
        const { id } = request.params
        const index = contacts.findIndex(c => c.id === Number(id))

        if (index < 0) {
          return h.response({ message: 'Contact not found' }).code(404)
        }

        contacts.splice(index, 1)

        return { message: 'Contact deleted' }
      }
    }
  ])

  await server.start()
  console.log('Server running on %s', server.info.uri)
})()