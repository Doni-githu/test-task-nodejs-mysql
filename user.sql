CREATE TABLE User (
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(70) NOT NULL,
    lastName VARCHAR(70),
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    gender VARCHAR(8),
    phone VARCHAR,
    registrationDate DATE NOT NULL,
)