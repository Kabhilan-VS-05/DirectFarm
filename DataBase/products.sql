SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `unit` int(11) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `status` enum('available','out of stock','available soon','pending') DEFAULT 'available',
  `mobile_number` varchar(10) NOT NULL,
  `created_by` varchar(255) DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_by` varchar(255) DEFAULT 'farmer',
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `expiry_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `products` (`product_id`, `user_id`, `product_name`, `unit`, `cost`, `stock_quantity`, `status`, `mobile_number`, `created_by`, `created_at`, `updated_by`, `updated_at`, `expiry_date`) VALUES
(1, 9, 'Carrot', 20, 35.00, 50, 'available', '123567890', 'admin', '2024-11-12 05:06:29', 'farmer', '2024-11-18 05:08:14', '2024-11-22');


ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_name` (`product_name`);


ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;


ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

