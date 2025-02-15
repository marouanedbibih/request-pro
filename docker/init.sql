-- Drop the database if it exists
DROP DATABASE IF EXISTS request_pro_db;

-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS request_pro_db;

-- Create a user with a password and grant privileges to the database
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON request_pro_db.* TO 'user'@'%';

-- Apply the changes
FLUSH PRIVILEGES;