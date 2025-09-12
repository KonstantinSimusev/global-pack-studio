\connect gps_system_db_2025

-- Изменение владельца схемы
ALTER SCHEMA public OWNER TO admin_navigator_2025;

-- Создание расширения для работы с UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

-- Создание таблицы users
CREATE TABLE IF NOT EXISTS public.users (
  id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
  login VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(512) NOT NULL,
  refresh_token VARCHAR(512),
  profession VARCHAR(255) NOT NULL
);
