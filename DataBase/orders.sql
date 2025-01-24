DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_by` varchar(255) DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(255) DEFAULT 'admin',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `product_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `orders` WRITE;
INSERT INTO `orders` VALUES (2,2,10,200,'confirmed','admin','2024-11-09 16:00:27','admin','2024-11-09 16:00:27'),(3,3,5,75,'pending','admin','2024-11-09 16:02:22','admin','2024-11-09 16:02:22');
UNLOCK TABLES;


