'use strict'

const { Client } = require('elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
  await client.index({
    index: 'products',
    id: 20,
    body: {
      name: 'rosario',
      price: 10,
      sale: 10
    }
  })

  await client.index({
    index: 'products',
    id: 30,
    body: {
      name: 'crocifisso',
      price: 15,
      sale: 0
    }
  })

  await client.index({
    index: 'products',
    id: 40,
    body: {
      name: 'candela',
      price: 5,
      sale: 50
    }
  })
 
  await client.index({
    index: 'products',
    id: 50,
    body: {
      name: 'ostia',
      price: 2,
      sale: 33
    }
  })
    

  await client.indices.refresh({ index: 'game-of-thrones' })
}

run()
