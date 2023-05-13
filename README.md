

Co-authored-by: kelvinhenri99 <kelvin5henri@gmail.com>

## Getting Started

## Install dependencys

2. Install dependencys server-side
   ```sh
   composer install
   ```
3. Create table corresponds to .env
   ```js
   DB_DATABASE = yourdatabase_name
   DB_USERNAME = your_username
   DB_PASSWORD = your_password
   ```
5. Run migration & Seeder
   ```sh
   php artisan migrate:fresh --seed
   ```
6. Install dependencys client-side
   ```sh
    npm install || yarn install
    ```
7. Create .env file
    ```sh
    cp .env.example .env
    ```
8. Generate key
    ```sh
    php artisan key:generate
    ```

## Usage

9. Run server-side (Laravel)
    ```sh
    php artisan serve
    https://localhost:8000
    ```
10. Run client-side (ReactJS)
    ```sh
    npm run dev || yarn dev
    https://localhost:3000
    ```
