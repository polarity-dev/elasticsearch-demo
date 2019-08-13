'use strict'

const fetch = require('node-fetch')

const body = {
  "from" : 0, "size" : 10,
//  "sort": [
//      {"productBasePrice": "asc"}
//  ]
}
 
fetch('http://localhost:9200/holyproducts/_search', {
    method: 'post',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => {
    const hits = json.hits.hits
        
    const data = hits.map(hit => hit._source)

    return {
      skip: body.from,
      limit: body.size,
      took: json.took,
      count: json.hits.total,
      products: data
    }
  })
  .then(json => {
    const sorted = json.products.sort((product1, product2) => {
      const min1 = Math.min(product1.productBasePrice, product1.productSpecialPrice, product1.productSalePrice)
      const min2 = Math.min(product2.productBasePrice, product2.productSpecialPrice, product2.productSalePrice)
      if (min1 <= min2) {return -1} else {return 1}
    })

    return {
      skip: json.skip,
      limit: json.limit,
      took: json.took,
      count: json.count,
      products: sorted
    }
  })
  .then(json => console.log(JSON.stringify(json, null, 2)))