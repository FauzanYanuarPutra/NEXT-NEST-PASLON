# FULLSTACK DEVELOPER NEXT JS + NEST JS
<!-- 


## Tentang Proyek

Tulis deskripsi lebih detail tentang proyek Anda di sini.
 -->
### Teknologi yang Digunakan

- [Nest.js](https://nestjs.com/) (Framework backend)
- [TypeORM](https://typeorm.io/) (ORM untuk database)
- [Next.js](https://nextjs.org/) (Framework frontend)
- [Cloudinary](https://cloudinary.com/) (Layanan penyimpanan dan pengelolaan gambar)
- [Tailwind CSS](https://tailwindcss.com/) (Framework CSS)
- PostgreSQL (Database)

## API Endpoints

### LOGIN & REGISTER

#### LOGIN

**Request:**

- Metode: POST
- Endpoint: `http://localhost:5000/auth/login`

**Contoh Request:**
```json

{
    "email": "cipta@gmail.com",
    "password": "password",
}

```

**Response:**

```json
{
    "data": {
        "access_token": "token random yang akan di generate"
    }
}

```

#### REGISTER

**Request:**

- Metode: POST
- Endpoint: `http://localhost:5000/auth/register`

**Contoh Request:**
```json

{
    "username": "username",
    "email": "email@gmail.com", // unique 
    "password": "password",
    "isAdmin": true // default nya galse (optional)
}

```

**Response:**

```json
{
    "data": {
        "access_token": "token random yang akan di generate"
    }
}

```


### Paslon CRUD

#### Mendapatkan Semua Paslon

**Request:**

- Metode: GET
- Endpoint: `http://localhost:5000/paslons`
- Required Token: Yes

**Response:**

```json
[
    {
        "id": 1,
        "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696003467/bpg0nzltjefik82qxdgg.png",
        "name": "name 1",
        "visi": "visi 1",
        "parties": [
            {
                "id": 1,
                "name": "partai 1"
            }
        ]
    },
    {
        "id": 2,
        "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696049999/hd68krdlnczvhwbdnpgm.png",
        "name": "name 2",
        "visi": "visi 2",
        "parties": [
            {
                "id": 2,
                "name": "partai 2"
            }
        ]
    },
    {
        "id": 3,
        "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696003685/srzzg41ru6mq5wj0imk0.png",
        "name": "name 3",
        "visi": "visi 3",
        "parties": []
    }
]

```

#### Mendapatkan Detail Paslon

**Request:**

- Metode: GET
- Endpoint: `http://localhost:5000/paslons/1`
- Required Token: Yes


**Response:**

```json
{
    "id": 1,
    "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696003467/bpg0nzltjefik82qxdgg.png",
    "name": "name 1",
    "visi": "visi 1",
    "parties": [
        {
            "id": 1,
            "name": "partai 1"
        }
    ]
}
```

#### Menambahkan Data Paslon

**Request:**

- Metode: POST
- Endpoint: `http://localhost:5000/paslons`
- Required Token: Yes


**Contoh Request:**

image dari file, yang nantinya saat tersimpan di database adalah url dari image yang disimpan di cloudinary

```json
{
    "name": "data baru",
    "visi": "visi baru",
    "parties": [2]
}
```

**Response:**

```json
{
  "message": "created success",
  "data": {
    "id": 4,
    "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696003467/bpg0nzltjefik82qxdgg.png",
    "name": "name baru",
    "visi": "visi baru",
    "parties": [
      {
        "id": 1,
        "name": "partai 1"
      }
    ]
  }
}
```


#### Mengubah Data Paslon

**Request:**

- Metode: PATCH
- Endpoint: `http://localhost:5000/paslons/2`
- Required Token: Yes



**Contoh Request:**

```json
{
    "name": "updated name baru"
}
```

**Response:**

```json
{
  "message": "updated success",
  "data": {
      "id": 2,
      "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696003467/bpg0nzltjefik82qxdgg.png",
      "name": "updated name baru",
      "visi": "visi 2",
      "parties": [
          {
              "id": 2,
              "name": "partai 2"
          }
      ]
  }
}
```

#### Menghapus Data Paslon

**Request:**

- Metode: DELETE
- Endpoint: `http://localhost:5000/paslons/2`
- Required Token: Yes
- Request Body: 
    -Form Data:
        -name
        -visi
        -image
        -parties

**Response:**

```json
{
  "message": "deleted success",
  "data": {
      "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696003467/bpg0nzltjefik82qxdgg.png",
      "name": "updated name baru",
      "visi": "visi 2",
      "parties": [
          {
              "id": 2,
              "name": "partai 2"
          }
      ]
  }
}
```

### Voters CRUD
Comming soon
...

### Parties CRUD
Comming soon
...

## Cara Menjalankan Proyek

Berikan instruksi tentang cara menjalankan proyek Anda di sini. Misalnya, instal dependensi, konfigurasi database, dan langkah-langkah lain yang diperlukan.

### Menjalankan Server Next.js (FrontEnd)

```bash
# Navigasikan ke direktori frontend
cd frontend-next

# Install dependensi dengan npm atau yarn
npm install
# atau
yarn

# Jalankan server dalam mode pengembangan
npm run dev
# atau
yarn dev

```

### Menjalankan Server Nest.js (Backend)

```bash
# Navigasikan ke direktori backend
cd backend-nest

# Install dependensi dengan npm atau yarn
npm install
# atau
yarn

# Jalankan server dalam mode pengembangan
npm run start:dev
# atau
yarn start:dev

```
