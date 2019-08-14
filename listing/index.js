"use strict"

const fetch = require("node-fetch")

// sort by price, date, discount, name
// discriminant can be lang, category, product status, quantity
/*const list = (offset, limit, sort, discriminant) => {
  const body = {
    "from": offset,
    "size": limit,
    "sort": [],
    //"query": {},
    "_source": {
        "includes": [],
        "excludes": []
    }
  }
}*/


const body = {
  "from" : 0, "size" : 10,
  "sort": [ {
      "productBasePrice": "asc",
      "productSalePrice": {
        "order": "asc",
        "missing": "_last",
        
          "filter": {
            "range": {
              "productSalePrice": {
                "gte": 0
              }
            }
          }
        
      },
      "productSpecialPrice": {
        "order": "asc",
        "missing": "_last",
          "filter": {
            "range": {
              "productSpecialPrice": {
                "gte": 0
              }
            }
          }
        
      }
    }  
  ]
}
 
fetch("http://localhost:9200/holyproducts/_search", {
  method: "post",
  body:    JSON.stringify(body),
  headers: { "Content-Type": "application/json" },
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
.then(json => console.log(JSON.stringify(json, null, 2)))