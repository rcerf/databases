DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `bio` VARCHAR(255) NULL DEFAULT NULL,
  `date_joined` TIMESTAMP NULL DEFAULT NULL,
  `currentRoom` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `date` TIMESTAMP NULL DEFAULT NULL,
  `room` VARCHAR(20) NULL DEFAULT NULL,
  `user` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

