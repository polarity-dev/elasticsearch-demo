'use strict'

const { Client } = require('elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
  await client.index({
    index: 'products',
    body: {
      id: 0,
      name: 'rosario',
      price: 10,
      sale: 10
    }
  })

  await client.index({
    index: 'products',
    body: {
      id: 1,
      name: 'crocifisso',
      price: 15,
      sale: 0
    }
  })

  await client.index({
    index: 'products',
    body: {
      id: 2,
      name: 'candela',
      price: 5,
      sale: 50
    }
  })
 
  await client.index({
    index: 'products',
    body: {
      id: 3,
      name: 'ostia',
      price: 2,
      sale: 33
    }
  })
    

  await client.indices.refresh({ index: 'game-of-thrones' })
}

run()
