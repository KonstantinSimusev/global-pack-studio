\connect gps_system_db_2025

ALTER SCHEMA public OWNER TO admin_navigator_2025;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(512) NOT NULL,
    refresh_token VARCHAR(512),
    profession VARCHAR(255)
);

ALTER TABLE public.users OWNER TO admin_navigator_2025;
