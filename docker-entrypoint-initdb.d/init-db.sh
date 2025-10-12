#!/bin/bash
set -e

# Часть 1: Суперпользователь создает пользователя и БД
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER "$DB_USER" PASSWORD '$DB_PASSWORD';
  CREATE DATABASE "$DB_NAME";
  GRANT ALL PRIVILEGES ON DATABASE "$DB_NAME" TO "$DB_USER";
EOSQL

# Часть 2: Суперпользователь настраивает владельца БД и схему
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" <<-EOSQL
  ALTER DATABASE "$DB_NAME" OWNER TO "$DB_USER";
  CREATE SCHEMA IF NOT EXISTS gps;
  ALTER SCHEMA gps OWNER TO "$DB_USER";
EOSQL

# Часть 3: Суперпользователь предоставляет права
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" <<-EOSQL
  GRANT ALL ON ALL TABLES IN SCHEMA gps TO "$DB_USER";
  GRANT ALL ON ALL SEQUENCES IN SCHEMA gps TO "$DB_USER";
  GRANT ALL ON ALL FUNCTIONS IN SCHEMA gps TO "$DB_USER";
EOSQL

# Часть 4: Подключение к созданной базе данных, DB_USER создает таблицы и расширения
psql -v ON_ERROR_STOP=1 --username "$DB_USER" --dbname "$DB_NAME" <<-EOSQL

  -- Создание расширения для работы с UUID
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA gps;

  -- Создание таблицы users
  CREATE TABLE IF NOT EXISTS gps.users (
    id uuid DEFAULT gps.uuid_generate_v4() NOT NULL PRIMARY KEY,
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

  -- Создание таблицы shifts
  CREATE TABLE IF NOT EXISTS gps.shifts (
    id uuid DEFAULT gps.uuid_generate_v4() NOT NULL PRIMARY KEY,
    date DATE NOT NULL,
    shift_number INTEGER NOT NULL,
    team_number INTEGER NOT NULL,
    
    -- Уникальность по дате и бригаде
    UNIQUE (date, team_number),
    
    -- Уникальность по дате и смене
    UNIQUE (date, shift_number)
  );

  -- Создание таблицы user_shifts
  CREATE TABLE IF NOT EXISTS gps.user_shifts (
    id uuid DEFAULT gps.uuid_generate_v4() NOT NULL PRIMARY KEY,
    attendance VARCHAR(255) NOT NULL,
    hours_worked DECIMAL(5, 2) NOT NULL,
    section VARCHAR(255),
    shift_profession VARCHAR(255),
    user_id uuid NOT NULL,
    shift_id uuid NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES gps.users(id),
    FOREIGN KEY (shift_id) REFERENCES gps.shifts(id)
  );
EOSQL
