CREATE DATABASE  IF NOT EXISTS `supermarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supermarket`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `amount` int NOT NULL,
  `total_cost` int NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `cart_id_idx` (`cart_id`),
  CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (10,2,6,222,2),(13,1,5,150,2),(14,4,4,120,3),(15,7,10,100,3),(16,14,2,52,3),(17,23,2,20,4),(18,17,3,27,4),(19,22,3,24,4),(20,11,2,26,4),(21,10,2,24,5),(22,16,2,44,5),(23,8,3,36,6),(24,20,4,56,6),(25,4,3,90,7),(26,2,1,37,8),(27,2,2,74,9),(28,19,4,52,10),(29,24,6,60,11),(30,9,5,70,12),(31,12,5,150,13),(32,6,5,30,14),(33,3,4,356,15),(34,2,5,185,16),(35,5,4,60,17),(36,6,7,42,18),(37,18,4,24,19),(38,4,6,180,20),(39,5,4,60,21),(40,10,5,60,22),(41,19,6,78,23),(42,22,6,48,24),(43,23,7,70,24),(44,2,7,259,24),(45,5,6,90,24),(46,11,7,91,24),(47,7,4,40,25),(48,8,6,72,25),(49,2,5,185,26),(50,4,3,90,26),(51,1,6,180,27),(52,3,4,356,28),(53,2,5,185,29),(54,2,6,222,30),(55,1,5,150,31),(57,11,10,130,32),(58,6,9,54,32),(59,15,7,112,32),(60,17,6,54,32),(62,3,9,801,33),(64,7,2,20,33),(65,1,4,120,33),(66,2,8,296,34),(67,3,9,801,35),(68,7,2,20,35),(69,1,4,120,35),(70,2,8,296,35),(71,2,4,148,36),(72,2,2,74,37),(73,10,3,36,38),(74,9,6,84,39),(75,13,5,125,40),(76,14,6,156,41),(77,7,5,50,42),(78,10,5,60,43),(79,22,6,48,44),(80,3,2,178,45),(81,1,2,60,46),(82,4,7,210,47),(83,13,3,75,48),(85,2,6,234,49),(86,7,6,60,49),(99,2,4,156,51),(102,12,7,210,52),(103,10,5,60,52),(104,2,5,195,50),(105,3,4,344,50),(106,3,4,344,55);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(9) NOT NULL,
  `created_date` datetime NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`cart_id`),
  KEY `customer_id_carts_idx` (`customer_id`),
  CONSTRAINT `customer_id_carts` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (2,'121212121','2021-06-16 13:38:57',0),(3,'121212121','2021-06-29 15:29:15',0),(4,'121212121','2021-06-29 16:29:32',0),(5,'121212121','2021-06-29 16:31:26',0),(6,'121212121','2021-06-29 16:33:39',0),(7,'121212121','2021-06-30 16:41:28',0),(8,'121212121','2021-06-30 17:14:08',0),(9,'121212121','2021-06-30 17:38:25',0),(10,'121212121','2021-06-30 20:29:54',0),(11,'121212121','2021-06-30 20:33:13',0),(12,'121212121','2021-06-30 20:34:49',0),(13,'121212121','2021-06-30 20:47:33',0),(14,'121212121','2021-06-30 20:54:33',0),(15,'121212121','2021-06-30 21:00:38',0),(16,'121212121','2021-06-30 21:05:54',0),(17,'121212121','2021-06-30 21:13:54',0),(18,'121212121','2021-06-30 21:21:52',0),(19,'121212121','2021-06-30 21:58:09',0),(20,'121212121','2021-06-30 22:05:57',0),(21,'121212121','2021-06-30 22:13:30',0),(22,'121212121','2021-06-30 22:17:23',0),(23,'121212121','2021-06-30 22:31:39',0),(24,'121212121','2021-06-30 22:36:30',0),(25,'121212121','2021-06-30 22:43:44',0),(26,'121212121','2021-06-30 22:49:54',0),(27,'121212121','2021-06-30 23:13:28',0),(28,'121212121','2021-06-30 23:15:09',0),(29,'121212121','2021-06-30 23:16:30',0),(30,'121212121','2021-06-30 23:17:59',0),(31,'121212121','2021-06-30 23:18:40',0),(32,'121212121','2021-06-30 23:20:24',0),(33,'121212121','2021-06-30 23:26:38',0),(34,'121212121','2021-07-01 16:01:19',0),(35,'121212121','2021-07-02 00:48:35',0),(36,'121212121','2021-07-02 02:08:17',0),(37,'121212121','2021-07-02 11:40:24',0),(38,'121212121','2021-07-02 11:49:28',0),(39,'121212121','2021-07-02 13:58:29',0),(40,'121212121','2021-07-02 14:05:27',0),(41,'121212121','2021-07-02 14:07:43',0),(42,'121212121','2021-07-02 14:09:08',0),(43,'121212121','2021-07-02 14:42:52',0),(44,'121212121','2021-07-02 15:04:21',0),(45,'121212121','2021-07-02 15:13:32',0),(46,'121212121','2021-07-02 15:17:56',0),(47,'121212121','2021-07-02 15:24:00',0),(48,'121212121','2021-07-02 15:49:10',0),(49,'121212121','2021-07-02 15:56:41',0),(50,'111111111','2021-07-03 20:52:57',0),(51,'121212121','2021-07-05 17:33:43',0),(52,'121212121','2021-07-05 20:31:24',0),(53,'141313131','2021-07-05 20:56:11',1),(54,'121212121','2021-07-05 21:49:40',1),(55,'111111111','2021-07-06 14:21:23',0),(56,'111111111','2021-07-06 14:24:14',1);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Meat & Fish'),(2,'Dairy'),(3,'Vegetables and fruit'),(4,'Bread'),(5,'Snacks'),(6,'Drinks');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Tel Aviv'),(2,'Haifa'),(3,'Jerusalem'),(4,'Bee\'r sheva'),(5,'Rishon LeZion'),(6,'Ramat Gan'),(7,'Beit shemesh'),(8,'Rehovot'),(9,'Netanya'),(10,'Givatayim');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(9) NOT NULL,
  `cart_id` int NOT NULL,
  `total_cost` int NOT NULL,
  `shipping_city` varchar(45) NOT NULL,
  `shipping_street` varchar(45) NOT NULL,
  `shipping_date` datetime NOT NULL,
  `created_time` date NOT NULL,
  `credit_card` varchar(40) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `cart_id_idx` (`cart_id`) /*!80000 INVISIBLE */,
  KEY `customer_id_orders_idx` (`customer_id`),
  CONSTRAINT `cart_id_order` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  CONSTRAINT `customer_id_orders` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'121212121',2,372,'1','Sumsum 33','2021-07-01 00:00:00','2021-06-29','4111111111111'),(2,'121212121',3,272,'1','Sumsum 33','2021-07-06 00:00:00','2021-06-29','4111111111111'),(3,'121212121',4,97,'1','Sumsum 33','2021-07-01 00:00:00','2021-06-29','4111111111111'),(4,'121212121',5,68,'1','Sumsum 33','2021-07-01 00:00:00','2021-06-29','4111111111111'),(5,'121212121',6,92,'1','Sumsum 33','2021-07-04 00:00:00','2021-06-30','4111111111111'),(6,'121212121',7,90,'1','Sumsum 33','2021-07-01 00:00:00','2021-06-30','4111111111111'),(7,'121212121',8,37,'1','Sumsum 33','2021-07-04 00:00:00','2021-06-30','4111111111111'),(8,'121212121',9,74,'1','Sumsum 33','2021-07-04 00:00:00','2021-06-30','4111111111111'),(9,'121212121',10,52,'1','Sumsum 33','2021-07-04 00:00:00','2021-06-30','4111111111111'),(10,'121212121',11,60,'1','Sumsum 33','2021-07-06 00:00:00','2021-06-30','4111111111111'),(11,'121212121',12,70,'1','Sumsum 33','2021-07-21 00:00:00','2021-06-30','4111111111111'),(12,'121212121',13,150,'1','Sumsum 33','2021-07-21 00:00:00','2021-06-30','4111111111111'),(13,'121212121',14,30,'1','Sumsum 33','2021-07-29 00:00:00','2021-06-30','4111111111111'),(14,'121212121',15,356,'1','Sumsum 33','2021-07-26 00:00:00','2021-06-30','4111111111111'),(15,'121212121',16,185,'1','Sumsum 33','2021-07-27 00:00:00','2021-06-30','4111111111111'),(16,'121212121',17,60,'1','Sumsum 33','2021-07-27 00:00:00','2021-06-30','4111111111111'),(17,'121212121',18,42,'1','Sumsum 33','2021-07-26 00:00:00','2021-06-30','4111111111111'),(18,'121212121',19,24,'1','Sumsum 33','2021-07-26 00:00:00','2021-06-30','4111111111111'),(19,'121212121',20,180,'1','Sumsum 33','2021-07-27 00:00:00','2021-06-30','4111111111111'),(20,'121212121',21,60,'1','Sumsum 33','2021-07-27 00:00:00','2021-06-30','4111111111111'),(21,'121212121',22,60,'1','Sumsum 33','2021-07-25 00:00:00','2021-06-30','4111111111111'),(22,'121212121',23,78,'1','Sumsum 33','2021-07-25 00:00:00','2021-06-30','4111111111111'),(23,'121212121',24,558,'1','Sumsum 33','2021-07-25 00:00:00','2021-06-30','4111111111111'),(24,'121212121',25,112,'1','Sumsum 33','2021-07-25 00:00:00','2021-06-30','4111111111111'),(25,'121212121',26,275,'1','Sumsum 33','2021-07-18 00:00:00','2021-06-30','4111111111111'),(26,'121212121',27,180,'1','Sumsum 33','2021-07-30 00:00:00','2021-06-30','4111111111111'),(27,'121212121',28,356,'1','Sumsum 33','2021-07-14 00:00:00','2021-06-30','4111111111111'),(28,'121212121',29,185,'1','Sumsum 33','2021-07-21 00:00:00','2021-06-30','4111111111111'),(29,'121212121',30,222,'1','Sumsum 33','2021-07-22 00:00:00','2021-06-30','4111111111111'),(30,'121212121',31,150,'1','Sumsum 33','2021-07-19 00:00:00','2021-06-30','4111111111111'),(31,'121212121',32,350,'2','Sumsum 36','2021-07-18 00:00:00','2021-06-30','4111111111111'),(32,'121212121',33,941,'1','Sumsum 33','2021-07-20 00:00:00','2021-07-01','4111111111111'),(33,'121212121',34,296,'2','Gargamel 20','2021-07-04 00:00:00','2021-07-02','4111111111111'),(34,'121212121',35,1237,'2','Gargamel 20','2021-07-22 00:00:00','2021-07-02','4111111111111'),(35,'121212121',36,148,'1','Sumsum 33','2021-07-29 00:00:00','2021-07-02','4111111111111'),(36,'121212121',37,74,'2','Gargamel 20','2021-07-22 00:00:00','2021-07-02','4111111111111'),(37,'121212121',38,36,'1','Sumsum 33','2021-07-20 00:00:00','2021-07-02','4111111111111'),(38,'121212121',39,84,'1','Sumsum 33','2021-07-19 00:00:00','2021-07-02','4111111111111'),(39,'121212121',40,125,'1','Sumsum 33','2021-07-22 00:00:00','2021-07-02','4111111111111'),(40,'121212121',41,156,'1','Sumsum 33','2021-07-14 00:00:00','2021-07-02','4111111111111'),(41,'121212121',42,50,'2','Gargamel 20','2021-07-21 00:00:00','2021-07-02','4111111111111'),(42,'121212121',43,60,'1','Sumsum 33','2021-08-03 00:00:00','2021-07-02','4111111111111'),(43,'121212121',44,48,'1','Sumsum 33','2021-08-31 00:00:00','2021-07-02','4111111111111'),(44,'121212121',45,178,'1','Sumsum 33','2021-08-18 00:00:00','2021-07-02','4111111111111'),(45,'121212121',46,60,'1','Sumsum 33','2021-08-16 00:00:00','2021-07-02','4111111111111'),(46,'121212121',47,210,'2','Gargamel 20','2021-07-31 00:00:00','2021-07-02','4111111111111'),(47,'121212121',48,75,'1','Sumsum 33','2021-08-30 00:00:00','2021-07-02','4111111111111'),(48,'121212121',49,294,'1','Sumsum 33','2021-08-18 00:00:00','2021-07-04','4111111111111'),(49,'121212121',51,156,'1','Sumsum 33','2021-08-16 00:00:00','2021-07-05','4111111111111'),(50,'121212121',52,270,'5','Sumsum 9','2022-10-09 00:00:00','2021-07-05','4111111111111'),(51,'111111111',50,539,'5','Sumsum 33','2021-08-10 00:00:00','2021-07-06','4111111111111'),(52,'111111111',55,344,'5','Sumsum 33','2021-08-16 00:00:00','2021-07-06','4111111111111');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `price` int NOT NULL,
  `image` varchar(1000) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Kebab Greek',1,30,'Kebab-Greek.jpg'),(2,'Wiener Sausage Hot Dog',1,39,'Hot-Dog.png'),(3,'Salmon steak sliced ​​frozen',1,86,'Salmon.png'),(4,'Tuna in water',1,30,'Tuna.png'),(5,'Tara Milk 3%',2,15,'Milk.png'),(6,'Bio Yogurt Strawberry Danone',2,6,'Yogurt.jpg'),(7,'Drink milk with whole grains and banana',2,10,'grains-and-banana.jpeg'),(8,'Cooking Cream 15%',2,12,'CookingCream.png'),(9,'Red Pepper – By Kilo',3,14,'Red-Pepper.png'),(10,'Cherry Tomatoes – By Box',3,12,'Cherry-Tomatoes.jpg'),(11,'Banana – By Kilo',3,13,'Banana.png'),(12,'Strawberries – By Box',3,30,'strawberry.jpg'),(13,'Wheat Country Style Bread',4,25,'Bread.jpg'),(14,'Lavalia Tortilla Wrap',4,26,'lavalia-tortilla.png'),(15,'Six Pack Buns Breads',4,16,'hot-dog-buns.png'),(16,'Frozen Salted Pretzels',4,22,'pretzels.png'),(17,'Click Chocolate Covered Cornflakes ',5,9,'click-cornflakes.png'),(18,'Doritos Sour Spicy Flavor',5,6,'Doritos-Sour-Spicy-small.png'),(19,'Osem Bamba',5,13,'bamba-200g.png'),(20,'Chocolate Chip Cookies',5,14,'Chocolate-Chip-Cookies.jpeg'),(21,'Orange Juice',6,33,'Prigat.png'),(22,'Pink Lemonade',6,8,'Pink-Lemonade.png'),(23,'Fuze Tea Peach',6,10,'Fuze-Tea-Peach.png'),(24,'Apple Juice',6,10,'Tangelo-fresh-apple.png'),(35,'Mango',5,100,'Kebab-Greek.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(9) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `city_id` int NOT NULL,
  `street` varchar(45) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'Customer',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `city_idx` (`city_id`),
  CONSTRAINT `city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('111111111','Oogi','Fletzet','oogi@magic.com','bc161cd752d3c836987c5ecb67046518',5,'Sumsum 33','Customer'),('121212121','Hewan','Rada','hewan@gmail.com','bc161cd752d3c836987c5ecb67046518',1,'Sumsum 33','Customer'),('131313131','Magic','Info','magic@magic.com','bc161cd752d3c836987c5ecb67046518',4,'Who cares 55','Admin'),('141313131','Avi','Edri','avi@gmail.com','bc161cd752d3c836987c5ecb67046518',1,'Sumsum 36','Customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-06 14:28:34
