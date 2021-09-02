<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>


## Installation

將專案根目錄的`.env.example`複製一份並重新命名為`.env`，設定本地開發用 database 相關連接。

```bash
$ mongo
db.createUser({user: "interview_test_0902", pwd: "interview_test_0902", roles: ["readWrite"]})
```


```bash
$ npm i
```

## Running the app
### Using Docker Compose
```bash
$ docker-compose up -d
```
The server will run on port 9000.

### Local
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test Curls
使用時請記得將ObjectId置換成實際產生出的id。

```bash
# GET PRODUCTS
curl --location --request GET 'localhost:9000/products?lastId=613128d9648d21014e05495a&pageSize=100'

# CREATE PRODUCTS
curl --location --request POST 'localhost:9000/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "PD2",
    "price": 4,
    "description": "This is PD2",
    "imageUrl": "https://localhost.com"
}'

# GET ONE PRODUCT
curl --location --request GET 'localhost:9000/products/613128dc648d21bea1054965'

# CREATE ORDER
curl --location --request POST 'localhost:9000/orders' \
--header 'Content-Type: application/json' \
--data-raw '{
    "items": [
        {"productId": "613128dc648d21bea1054965", "count": 5},
        {"productId": "613128dc648d21bea1054965", "count": 4}
    ]   
}'

# GET ONE ORDER
curl --location --request GET 'localhost:9000/orders/613129c0648d2116f805497f'
```

## License

Nest is [MIT licensed](LICENSE).

## Document

### List Products
**URL** : `/api/products`

**Method** : `GET`

**Query** : 
```json
{
  "lastId": "[mongodb object id]",
  "pageSize": "[number]"
}
```

**Required Fields**: none

**Description**: 
- `lastId`: 上次查找時最後一筆Id，與pageSize配合可作pagination，若為空則從第一筆開始列出。
- `pageSize`: 一頁筆數，若為空則預設為10。

#### Success Responses
**Code** : `200 OK`

**Content** : 
```json
[
  {
    "_id": "[mongodb object id]",
    "name": "[string]",
    "price": "[number]",
    "description": "[string]",
    "imageUrl": "[string]"
  },...
]
```

#### Error Responses
- `400` lastId不為合法ObjectId、pageSize不為正整數












### Create Products
**URL** : `/api/products`

**Method** : `POST`

**Body** : 
```json
{
  "name": "[string]",
  "price": "[number]",
  "description": "[string]",
  "imageUrl": "[string]"
}
```

**Required Fields**: `name`, `price`, `description`, `imageUrl`

**Description**: 
- `name`: 商品名稱。
- `price`: 商品價格，必須為正數。
- `description`: 商品敘述。
- `imageUrl`: 商品圖片連結。

#### Success Responses
**Code** : `200 OK`

**Content** : 
```json
{
  "_id": "[mongodb object id]",
  "name": "[string]",
  "price": "[number]",
  "description": "[string]",
  "imageUrl": "[string]"
}
```

#### Error Responses
- `400` 欠缺必須項、商品價格不為正數









### Get One Product
**URL** : `/api/products/:id`

**Method** : `GET`

**Param** : 
```json
{
  "id": "[mongodb object id]"
}
```

**Required Fields**: `id`

**Description**: 
- `id`: 商品id。

#### Success Responses
**Code** : `200 OK`

**Content** : 
```json
{
  "_id": "[mongodb object id]",
  "name": "[string]",
  "price": "[number]",
  "description": "[string]",
  "imageUrl": "[string]"
}
```

#### Error Responses
- `400` `productId`不為合法ObjectId
- `404` 查無商品










### Create Order
**URL** : `/api/orders`

**Method** : `POST`

**Body** : 
```json
{
  "items": [
    {
      "productId": "[mongodb object id]",
      "count": "[number]"
    },...
  ]
}
```

**Required Fields**: `items`,`items.productId`, `items.count`

**Description**: 
- `items`: 下訂商品，為陣列，最少需有一筆資料。
  - productId: 下訂商品的商品id。
  - count: 下定商品的數量，為正整數。

#### Success Responses
**Code** : `200 OK`

**Content** : 
```json
{
  "items": [
    {
      "productId": "[mongodb object id]",
      "count": "[number]",
      "price": "[number]"
    },...
  ],
  "_id": "[mongodb object id]",
  "status": "[string]"
}
```

#### Error Responses
- `400` `items`數量少於1、`productId`不為合法ObjectId、訂單內存在有`productId`不存在的商品、`count`數量不為正整數










### Get One Order
**URL** : `/api/orders/:id`

**Method** : `GET`

**Param** : 
```json
{
  "id": "[mongodb object id]"
}
```

**Required Fields**: `id`

**Description**: 
- id: order id。

#### Success Responses
**Code** : `200 OK`

**Content** : 
```json
{
  "items": [
    {
      "productId": "[mongodb object id]",
      "count": "[number]",
      "price": "[number]"
    },...
  ],
  "_id": "[mongodb object id]",
  "status": "[string]"
}
```

#### Error Responses
- `400` `id`不為合法ObjectId
- `404` order不存在