-- setup.sql — Run this once in MySQL to set up your database

CREATE DATABASE IF NOT EXISTS taskr_db;
USE taskr_db;

CREATE TABLE IF NOT EXISTS tasks (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  text      VARCHAR(255) NOT NULL,
  due       DATE DEFAULT NULL,
  done      BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
