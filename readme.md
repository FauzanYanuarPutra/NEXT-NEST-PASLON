# FULLSTACK DEVELOPER NEXT JS + NEST JS
<!-- 


## Tentang Proyek

Tulis deskripsi lebih detail tentang proyek Anda di sini.
 -->
 <div style="display: flex; gap: 4rem; justify-content: flex-end;">
    <img src="https://tkssharma.com/static/02dfdac16100b40337b156a95ab4b1fe/56e34/nextjs.png" width="100">
    <img src="https://www.sotatek.com/wp-content/uploads/2021/04/NestJS-300x300.png" width="100">
    <img src="https://seeklogo.com/images/T/typeorm-logo-F243B34DEE-seeklogo.com.png" width="100">
    <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_tailwind_icon_130128.png" width="100">
    <img src="https://cloudinary-res.cloudinary.com/image/upload/c_scale,fl_attachment,w_500/v1/logo/for_white_bg/cloudinary_icon_for_white_bg.png" width="100">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="100">
</div>

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
- Required Token: No
- Admin Only: No 

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
- Required Token: No
- Admin Only: No 

**Contoh Request:**
```json

{
    "username": "username",
    "email": "email@gmail.com", // unique 
    "password": "password",
    "isAdmin": true // default nya false ( optional )
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
- Admin Only: No 


**Deskripsi:**
Operasi ini digunakan untuk mendapatkan daftar semua paslon yang tersedia dalam sistem.

**Response:**

```json
{
    "user": {
        "id": 1,
        "isAdmin": true,
        "iat": 1696818135,
        "exp": 1696821735
    },
    "data": [
        {
            "id": 13,
            "name": "Naruto & Sasuke",
            "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696771158/s5cidmuplsifcu17az9b.jpg",
            "visi": "menjadi hokage",
            "parties": [
                {
                    "id": 25,
                    "name": "partai A"
                },
                {
                    "id": 26,
                    "name": "Partai B"
                },
                {
                    "id": 21,
                    "name": "Partai C"
                }
            ],
            "voter": [
                {
                    "id": 3,
                    "username": "fauzan baru"
                },
                {
                    "id": 5,
                    "username": "fauzanbaru"
                },
                {
                    "id": 4,
                    "username": "tiktok"
                }
            ]
        },
        {
            "id": 14,
            "name": "Luffy & Zoro",
            "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696774955/dinzodwjcb9vebg9jnha.jpg",
            "visi": "menjadi raja bajak laut, dan menjadi samurai terkuat",
            "parties": [
                {
                    "id": 27,
                    "name": "grind line"
                },
                {
                    "id": 24,
                    "name": "east blue"
                }
            ],
            "voter": [
                {
                    "id": 1,
                    "username": "admin"
                }
            ]
        }
    ]
}

```

#### Mendapatkan Detail Paslon

**Request:**

- Metode: GET
- Endpoint: `http://localhost:5000/paslons/1`
- Required Token: Yes
- Admin Only: No 

**Deskripsi:**
Operasi ini digunakan untuk mendapatkan detail paslon berdasarkan ID tertentu.

**Parameter URL:**
- `:id`  (integer): ID paslon yang ingin dilihat detailnya.

**Response:**

```json
{
    "data": {
        "id": 13,
        "name": "Naruto & Sasuke",
        "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696771158/s5cidmuplsifcu17az9b.jpg",
        "visi": "menjadi hokage",
        "parties": [
            {
                "id": 25,
                "name": "partai A"
            },
            {
                "id": 26,
                "name": "Partai B"
            },
            {
                "id": 21,
                "name": "Partai C"
            }
        ]
    }
}
```

#### Menambahkan Data Paslon

**Request:**

- Metode: POST
- Endpoint: `http://localhost:5000/paslons`
- Required Token: Yes
- Admin Only: Yes 


**Deskripsi:**
Operasi ini digunakan untuk mendapatkan detail paslon berdasarkan ID tertentu.

**Request Body:**

- **Form Data:**
  - `name`: Nama paslon yang ingin ditambah.
  - `visi`: Visi paslon yang ingin ditambah.
  - `image`: URL gambar paslon yang ingin ditambah.
  - `parties`: Informasi partai politik yang terkait dengan paslon yang ingin ditambah.


**Response:**

```json
{
    "user": {
        "id": 1,
        "isAdmin": true,
        "iat": 1696818135,
        "exp": 1696821735
    },
    "data": {
        "paslon": {
            "name": "nama a",
            "visi": "visi a",
            "image": null,
            "id": 18
        },
        "parties": [
            {
                "name": "partai 3"
            },
            {
                "name": "partai 4"
            }
        ],
        "message": "Paslon created"
    }
}
```


#### Mengubah Data Paslon

**Request:**

- Metode: PATCH
- Endpoint: `http://localhost:5000/paslons/2`
- Required Token: Yes
- Admin Only: Yes 


**Deskripsi:**
Operasi ini digunakan untuk menghapus data paslon berdasarkan ID tertentu.

**Request Body:**

- **Form Data:**
  - `name`: Nama paslon yang ingin diubah.
  - `visi`: Visi paslon yang ingin diubah.
  - `image`: URL gambar paslon yang ingin diubah.
  - `parties`: Informasi partai politik yang terkait dengan paslon yang ingin diubah.


**Response:**

```json
{
    "user": {
        "id": 1,
        "isAdmin": true,
        "iat": 1696818135,
        "exp": 1696821735
    },
    "data": {
        "paslon": {
            "id": 18,
            "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696818702/qg8bnmxpyvww2fslp64u.png",
            "parties": [
                {
                    "id": 34,
                    "name": "partai 3"
                },
                {
                    "id": 35,
                    "name": "partai 4"
                }
            ]
        },
        "parties": [
            {
                "id": 34,
                "name": "partai 3",
                "paslon": {
                    "id": 18,
                    "name": "nama a",
                    "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696818702/qg8bnmxpyvww2fslp64u.png",
                    "visi": "visi a"
                }
            },
            {
                "id": 35,
                "name": "partai 4",
                "paslon": {
                    "id": 18,
                    "name": "nama a",
                    "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696818702/qg8bnmxpyvww2fslp64u.png",
                    "visi": "visi a"
                }
            },
            {
                "name": "partai 5"
            }
        ], // sedang menambah partai 5
        "message": "Paslon updated"
    }
}
```

#### Menghapus Data Paslon

**Request:**

- Metode: DELETE
- Endpoint: `http://localhost:5000/paslons/2`
- Required Token: Yes
- Admin Only: Yes 


**Deskripsi:**
Operasi ini digunakan untuk menghapus data paslon berdasarkan ID tertentu.

**Parameter URL:**
- `:id` (integer): ID paslon yang ingin dihapus.


**Response:**

```json
{
    "user": {
        "id": 1,
        "isAdmin": true,
        "iat": 1696818135,
        "exp": 1696821735
    },
    "data": {
        "raw": [],
        "affected": 1
    }
}
```

### Voters
#### Memilih Paslon

**Request:**

- Metode: PATCH
- Endpoint: `http://localhost:5000/users/vote/:id_user/:id_paslon`
- Required Token: Yes
- Admin Only: No 


**Deskripsi:**
Operasi ini memungkinkan pengguna untuk memberikan suara pada pasangan calon tertentu.

**Parameter URL:**
- `:id_user`  (integer): ID Pengguna yang sedang login / yang sedang memilih.
- `:id_paslon`  (integer): ID pasangan calon yang ingin dipilih.


**Response:**

```json
{
    "user": {
        "id": 1,
        "isAdmin": true,
        "iat": 1696822766,
        "exp": 1696826366
    },
    "data": {
        "id": 1,
        "username": "admin",
        "email": "admin@gmail.com",
        "password": "$2b$10$.AwvIRofzdfChvetnlR.6Otvo5I/h5jRBhDjUcRxDBo44tT0voaRS",
        "isAdmin": true,
        "paslon": {
            "id": 19,
            "name": "nama a",
            "image": null,
            "visi": "visi a",
            "parties": [
                {
                    "id": 37,
                    "name": "partai 3"
                },
                {
                    "id": 38,
                    "name": "partai 4"
                }
            ],
            "voter": []
        }
    }
}
```

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
