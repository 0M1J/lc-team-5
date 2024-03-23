-- Script for creating EMPTY database tables.

DROP DATABASE IF EXISTS Le_chainon_deployment;
CREATE DATABASE Le_chainon_deployment;
USE Le_chainon_deployment;

-- Table Address
CREATE TABLE Address (
    address_id                     INT PRIMARY KEY, -- Address ID
    address_name                   VARCHAR(100), -- Address (e.g., 111 rue le chainon)
    city                           VARCHAR(50), -- City
    province                       VARCHAR(50), -- Province
    postal_code                    VARCHAR(10) -- Postal code
);

-- Table User
CREATE TABLE User (
    user_id                       INT PRIMARY KEY, -- User ID
    first_name                    VARCHAR(50) NOT NULL, -- First name
    last_name                     VARCHAR(150) NOT NULL, -- Last name
    username                      VARCHAR(50) NOT NULL, -- Username
    email                         VARCHAR(100) NOT NULL, -- Email
    password                      VARCHAR(100) NOT NULL, -- Password
    gender                        VARCHAR(10) NOT NULL, -- Gender of the user (e.g., F or X)
    date_of_birth                 DATE NOT NULL, -- Date of birth
    address_id                    INT NOT NULL, -- Address ID (foreign key)
    role                          VARCHAR(50) NOT NULL, -- Role of the user (e.g., caregiver or resident)
    FOREIGN KEY (address_id)      REFERENCES Address(address_id) -- Reference to the Address table
);
