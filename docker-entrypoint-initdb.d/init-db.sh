#!/bin/bash
set -e

# Создание пользователя и базы данных
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER "$DB_USER" PASSWORD '$DB_PASSWORD';
  CREATE DATABASE "$DB_NAME";
  GRANT ALL PRIVILEGES ON DATABASE "$DB_NAME" TO "$DB_USER";
EOSQL

# Сначала подключаемся как суперпользователь для изменения владельца БД
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" <<-EOSQL
  ALTER DATABASE "$DB_NAME" OWNER TO "$DB_USER";
EOSQL

# Подключение к созданной базе данных и выполнение основных операций
psql -v ON_ERROR_STOP=1 --username "$DB_USER" --dbname "$DB_NAME" <<-EOSQL

  -- Изменение владельца схемы
  ALTER SCHEMA public OWNER TO "$DB_USER";

  -- Создание расширения для работы с UUID
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

  -- Создание таблицы users
  CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    position_code INTEGER NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    patronymic VARCHAR(100) NOT NULL,
    profession VARCHAR(255) NOT NULL,
    personal_number INTEGER NOT NULL UNIQUE,
    team_number INTEGER NOT NULL,
    work_schedule VARCHAR(10) NOT NULL,
    workshop_code VARCHAR(20) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(512) NOT NULL,
    refresh_token VARCHAR(512)
  );

  -- Предоставление прав на таблицы
  GRANT ALL ON ALL TABLES IN SCHEMA public TO "$DB_USER";
  GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO "$DB_USER";
  GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO "$DB_USER";
EOSQL
