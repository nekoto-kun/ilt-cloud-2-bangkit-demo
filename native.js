import http from 'http'

import { contacts } from './contacts.js'

(async () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json')

    const { url } = request

    switch (true) {
      case url === '/contacts': {
        const { method } = request

        if (method === 'GET') {
          return response.end(JSON.stringify(contacts))
        }

        if (method === 'POST') {
          let body = ''

          request.on('data', chunk => {
            body += chunk.toString()
          })

          request.on('end', () => {
            const id = contacts[contacts.length - 1].id + 1

            contacts.push({ id, ...JSON.parse(body) })

            response.statusCode = 201
            return response.end(JSON.stringify({ message: 'Contact added' }))
          })
        }
      } break

      case url.startsWith('/contacts/'): {
        const { method } = request

        if (method === 'DELETE') {
          const id = Number(url.split('/')[2])
          const index = contacts.findIndex(c => c.id === id)

          if (index < 0) {
            response.statusCode = 404
            return response.end(JSON.stringify({ message: 'Contact not found' }))
          }

          contacts.splice(index, 1)

          return response.end(JSON.stringify({ message: 'Contact deleted' }))
        }
      } break
    }
  })

  server.listen(3000, () => {
    console.log('Server running in native mode on http://localhost:3000')
  })
})()