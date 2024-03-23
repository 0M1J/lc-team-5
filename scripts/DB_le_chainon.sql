-- Script for creating EMPTY database tables.

DROP DATABASE IF EXISTS Le_chainon_deployment;
CREATE DATABASE Le_chainon_deployment;
USE Le_chainon_deployment;

-- Table Address (Addresse)
CREATE TABLE Address (
    address_id                     INT PRIMARY KEY, -- Address ID
    address_name                   VARCHAR(100), -- Address (e.g., 111 rue le chainon)
    city                           VARCHAR(50), -- City
    province                       VARCHAR(50), -- Province
    postal_code                    VARCHAR(10) -- Postal code
);

-- Table User (Utilisateur)
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
    FOREIGN KEY (address_id)      REFERENCES Address(address_id) -- Referencing the Address table
);

-- Table Plan (Plan d'intervention)
CREATE TABLE Plan (
    plan_id                      INT PRIMARY KEY, -- Plan ID
    plan_name                    VARCHAR(255) NOT NULL, -- Plan name
    user_id                      INT NOT NULL, -- User ID of the user responsible for the plan
    priority                     INT, -- Plan priority
    creation_date                DATE, -- Date when the plan was created
    FOREIGN KEY (user_id)        REFERENCES User(user_id) -- Referencing the responsible user
);

-- Table Goal (Objectif)
CREATE TABLE Goal (
    goal_id                     INT PRIMARY KEY, -- Goal ID
    plan_id                     INT NOT NULL, -- Plan ID to which the goal is associated
    description                 TEXT, -- Goal description
    target_date                 DATE, -- Target date to achieve the goal
    FOREIGN KEY (plan_id)       REFERENCES Plan(plan_id) -- Referencing the associated plan
);

-- Table Resource (Ressource)
CREATE TABLE Resource (
    resource_id                INT PRIMARY KEY, -- Resource ID
    plan_id                    INT NOT NULL, -- Plan ID to which the resource is associated
    type                       VARCHAR(50) NOT NULL, -- Resource type (e.g., document, workshop)
    link                       VARCHAR(255) NOT NULL, -- Link to the resource
    FOREIGN KEY (plan_id)      REFERENCES Plan(plan_id) -- Referencing the associated plan
);

-- Table Message (Message)
CREATE TABLE Message (
    message_id                INT PRIMARY KEY, -- Message ID
    sender_id                 INT NOT NULL, -- User ID of the sender
    receiver_id               INT NOT NULL, -- User ID of the receiver
    content                   TEXT, -- Message content
    timestamp                 TIMESTAMP, -- Timestamp of the message
    FOREIGN KEY (sender_id)   REFERENCES User(user_id), -- Referencing the sender user
    FOREIGN KEY (receiver_id) REFERENCES User(user_id) -- Referencing the receiver user
);

-- Table Event (Événement)
CREATE TABLE Event (
    event_id                  INT PRIMARY KEY, -- Event ID
    plan_id                   INT NOT NULL, -- Plan ID to which the event is associated
    name                      VARCHAR(255) NOT NULL, -- Event name
    date                      DATE, -- Event date
    reminder_date             DATE, -- Reminder date for the event
    FOREIGN KEY (plan_id)     REFERENCES Plan(plan_id) -- Referencing the associated plan
);

-- Table Survey (Enquête)
CREATE TABLE Survey (
    survey_id                INT PRIMARY KEY, -- Survey ID
    plan_id                  INT NOT NULL, -- Plan ID related to the survey
    question                 TEXT, -- Survey question
    response                 TEXT, -- Survey response
    timestamp                TIMESTAMP, -- Timestamp of the survey
    FOREIGN KEY (plan_id)    REFERENCES Plan(plan_id) -- Referencing the related plan
);

-- Table Statistics (Statistiques)
CREATE TABLE Statistics (
    stat_id                 INT PRIMARY KEY, -- Statistic ID
    plan_id                 INT NOT NULL, -- Plan ID to which the statistics are related
    statistic_name          VARCHAR(255) NOT NULL, -- Name of the statistic
    value                   DECIMAL(10, 2), -- Value of the statistic (assuming decimal format)
    date                    DATE, -- Date of the statistic
    FOREIGN KEY (plan_id)   REFERENCES Plan(plan_id) -- Referencing the related plan
);

-- Table Calendar (Calendrier)
CREATE TABLE Calendar (
    event_id                INT PRIMARY KEY, -- Event ID
    event_name              VARCHAR(255) NOT NULL, -- Event name
    event_date              DATE NOT NULL, -- Event date
    event_description       TEXT, -- Event description
    event_location          VARCHAR(255) -- Event location
);

