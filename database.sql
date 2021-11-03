-- MN Marketing SQL query file for DB and all four tables. 
-- Tables should be created in this order to avoid FK errors (see notes)
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- create second to avoid FK errors w/ job_postings table
CREATE TABLE "add_post_contact" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(500) NOT NULL
);

-- create third to avoid FK errors w/ job_postings table
CREATE TABLE "hiring_contact" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(500) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "phone" VARCHAR(500) NOT NULL
);

--spike tables by Mo - need more eyeballs
CREATE TABLE "job_postings" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    --FK
    "company" VARCHAR(500) NOT NULL,
    "available_role" VARCHAR(500) NOT NULL,
    "application_link" VARCHAR(500) NOT NULL,
    "post_contact_id" INT REFERENCES "add_post_contact" NOT NULL,
    --FK
    "job_city" VARCHAR(255) NOT NULL,
    "remote" VARCHAR(255) NOT NULL,
    "job_state" VARCHAR(255) NOT NULL,
    "internship" BOOLEAN NOT NULL,
    "share_contact" BOOLEAN NOT NULL,
    "archived" BOOLEAN NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "hiring_contact_id" INT REFERENCES "hiring_contact" NOT NULL
);