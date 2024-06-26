-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июн 26 2024 г., 17:09
-- Версия сервера: 10.7.3-MariaDB
-- Версия PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `purchase_service`
--

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `good` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `link` varchar(2048) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `arrival_date` datetime DEFAULT NULL,
  `author_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('На рассмотрении','Закупаем','Доставляем','Ожидает получения','Получен') DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `good`, `quantity`, `link`, `creation_date`, `arrival_date`, `author_id`, `status`, `price`) VALUES
(12, 'Мармелад апельсиновый', 101, 'https://www.ozon.ru/product/marmelad-zheleynyy-apelsin-tri-kota-lakomstva-dlya-zdorovya-35g-12-sht-176657490', '2024-04-17 21:57:26', '2024-06-23 00:00:00', 5, 'Ожидает получения', 1000.00),
(13, 'Сыр', 100, 'https://www.ozon.ru/product/syr-brest-litovsk-klassicheskiy-kusok-200-g-145923198', '2024-04-18 00:07:10', '2024-07-05 00:00:00', 5, 'Ожидает получения', 3100.56),
(15, 'Тумба', 5, 'https://www.ozon.ru/product/zamm-tumba-mobilnaya-3-yashch-41h50h61-3-sm-1335255365', '2024-04-18 19:22:04', '2024-04-25 00:00:00', 5, 'Ожидает получения', 20000.00),
(16, 'Мармелад червячки', 10, 'https://www.ozon.ru/product/marmelad-zhevatelnyy-700-g-v-kisloy-obsypke-assorti-vkusov-chervyachki-gusenichki-mishki-yagodki-204460643', '2024-04-20 10:38:12', '2024-04-23 00:00:00', 34, 'На рассмотрении', 1000.00),
(17, 'Сок апельсиновый', 3, 'https://www.ozon.ru/product/sok-j7-apelsinovyy-s-myakotyu-0-97-l-142401224', '2024-04-26 14:30:27', '2024-05-03 00:00:00', 5, 'На рассмотрении', 567.00),
(18, 'Сок яблочный', 3, 'https://www.ozon.ru/product/sok-dobryy-yablochnyy-2-l-139204352/', '2024-04-26 14:31:04', '2024-04-28 00:00:00', 5, 'Получен', NULL),
(19, 'Сок вишневая черешня', 5, 'https://www.ozon.ru/product/napitok-sokosoderzhashchiy-lyubimyy-vishnevaya-chereshnya-1-93-l-142401126', '2024-04-26 14:31:42', '2024-04-27 00:00:00', 5, 'Закупаем', NULL),
(20, 'Сок ананасовый', 2, 'https://www.ozon.ru/product/sok-santal-ananasovyy-1-l-141580323/', '2024-04-26 14:32:24', '2024-05-01 00:00:00', 5, 'Ожидает получения', NULL),
(23, 'Сок яблочный', 15, 'https://www.ozon.ru/product/sok-rich-yablochnyy-1-l-139204402', '2024-04-26 14:38:57', '2024-05-05 00:00:00', 8, 'На рассмотрении', NULL),
(24, 'Тыквенный сок', 5, 'https://www.ozon.ru/product/sok-tykvennyy-kuhmaster-naturalnyy-680ml-4sht-1547100477/', '2024-04-26 17:58:01', '2024-04-27 00:00:00', 5, 'Доставляем', NULL),
(25, 'Сок тыква-яблоко', 4, 'https://www.ozon.ru/product/sok-sady-pridonya-tykva-yabloko-s-myakotyu-bez-sahara-1-l-143924015', '2024-04-26 18:37:45', '2024-04-28 00:00:00', 5, 'Получен', NULL),
(26, 'Сок тыква-апельсин', 5, 'https://www.ozon.ru/product/sok-ideas-detoks-tykva-apelsin-300-ml-1339094429', '2024-04-26 18:40:23', '2024-04-30 00:00:00', 5, 'Получен', NULL),
(27, 'Сок', 5, 'https://www.ozon.ru/product/sok-rich-yablochnyy-1-l-139204402', '2024-04-27 16:27:14', '2024-04-30 00:00:00', 5, 'Получен', NULL),
(28, 'Мармелад червячки', 5, 'https://www.ozon.ru/product/marmelad-zhevatelnyy-700-g-v-kisloy-obsypke-assorti-vkusov-chervyachki-gusenichki-mishki-yagodki-204460643', '2024-04-27 19:06:02', '2024-05-05 00:00:00', 5, 'Получен', 600.59),
(29, 'клава', 33, 'http://localhost:8080/phpmyadmin/index.php?route=/sql&db=web-db&table=orders&pos=0', '2024-05-29 20:03:53', '2024-05-30 00:00:00', 57, 'Получен', 123.00),
(30, 'SS', 1, 'ss@ss.ru', '2024-05-29 20:08:21', '1313-12-13 00:00:00', 59, 'Ожидает получения', 2000.00),
(31, 'zakaz', 1, 'https://animego.org/anime/van-pis-65', '2024-05-30 11:44:48', '2024-05-31 00:00:00', 64, 'На рассмотрении', 1000.00),
(32, 'zakaz', 1, 'https://animego.org/anime/van-pis-65', '2024-05-30 12:24:17', '2024-05-31 00:00:00', 66, 'Получен', 1000.00),
(33, 'zakaz21', 1, 'https://animego.org/anime/van-pis-65', '2024-05-30 12:24:28', '2024-06-04 00:00:00', 66, 'Ожидает получения', 1000.00),
(34, 'zakaz21', 34, 'https://animego.org/anime/van-pis-65', '2024-05-30 12:34:42', '2024-05-14 00:00:00', 66, 'Получен', 42.00),
(35, 'rgger', 5, 'grgrrg', '2024-06-17 15:56:30', '2024-06-20 00:00:00', 5, 'На рассмотрении', 100.00),
(36, 'fefeeffe', 0, 'r434t43', '2024-06-17 16:31:32', '2024-06-13 00:00:00', 68, 'На рассмотрении', 500.00),
(37, 'Сок виноградный без сахара', 1, 'https://www.ozon.ru/product/podarochnyy-kraft-paket-s-kruchenymi-ruchkami-22h12h25-sm-10-shtuk-1294147968', '2024-06-20 15:50:55', '2024-06-22 00:00:00', 5, 'На рассмотрении', 100.50),
(38, 'ааааааааа', 5, 'https://www.ozon.ru/product/dekorativnaya-interernaya-nastolnaya-vaza-dlya-dekora-koshachya-lapka-1158629748', '2024-06-20 16:22:28', '2024-06-22 00:00:00', 5, 'На рассмотрении', 55.00),
(39, 'Сок', 100, 'https://www.ozon.ru/product/sok-rich-yablochnyy-1-l-139204402', '2024-06-20 16:38:41', '2024-06-22 00:00:00', 5, 'На рассмотрении', 50.00),
(40, 'ffffff', 101, 'https://www.ozon.ru/product/marmelad-zheleynyy-apelsin-tri-kota-lakomstva-dlya-zdorovya-35g-12-sht-176657490/', '2024-06-20 16:43:20', '2024-06-29 00:00:00', 5, 'Получен', 1000.00),
(41, 'мармеладки', 500, 'https://www.ozon.ru/product/marmelad-zheleynyy-apelsin-tri-kota-lakomstva-dlya-zdorovya-35g-12-sht-176657490', '2024-06-20 16:48:46', '2024-06-22 00:00:00', 5, 'Получен', 500.00),
(42, '11', 1, 'https://www.ozon.ru/product/marmelad-zhevatelnyy-700-g-v-kisloy-obsypke-assorti-vkusov-chervyachki-gusenichki-mishki-yagodki-204460643', '2024-06-21 17:24:27', '2024-07-06 00:00:00', 98, 'Получен', 1000.00),
(43, 'торт', 15, 'https://www.ozon.ru/product/sok-rich-yablochnyy-1-l-139204402', '2024-06-21 17:33:06', '2024-06-29 00:00:00', 99, 'На рассмотрении', 1555.00),
(44, 'Мармелад', 4, 'https://www.ozon.ru/product/marmelad-zhevatelnyy-700-g-v-kisloy-obsypke-assorti-vkusov-chervyachki-gusenichki-mishki-yagodki-204460643', '2024-06-21 18:53:46', '2024-06-29 00:00:00', 5, 'На рассмотрении', 200.00);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `patname` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `patname`, `location`, `email`, `password`, `created_at`, `updated_at`, `is_admin`) VALUES
(1, 'Соня', 'Манеева', 'Рафисовна', 'Ульяновск', 'sonyam', '143143', NULL, NULL, 1),
(4, 'Николай', 'Александров', 'Викторович', 'Екатеринбург', 'anv@mail.ru', 'anvanv', NULL, NULL, 1),
(5, 'Полина', 'Андреева', 'Павловна', 'Москва', 'appavlovna', 'appapp', NULL, NULL, 0),
(7, 'Полина', 'Курочкина', 'Павловна', 'Москва', 'kppavlovna1', 'kpvkpv', NULL, NULL, 0),
(8, 'Виктория', 'Никифорова', 'Саввична', 'Москва', 'nvsavvichna', 'nvsnvs', NULL, NULL, 0),
(27, 'Георгий', 'Старов', 'Иванович', 'Москва', 'sgivanovich', 'gsigsi', NULL, NULL, 0),
(28, 'Тимур', 'Светов', 'Алексеевич', 'Владикавказ', 'stalexeevich', 'tsatsa', NULL, NULL, 0),
(29, 'Петр', 'Самойлов', 'Викторович', 'Санкт-Петербург', 'spviktorovich', 'psvpsv', NULL, NULL, 0),
(31, 'Николай', 'Щепкин', 'Иванович', 'Рязань', 'nchivanovich', 'nchinchi', NULL, NULL, 0),
(34, 'Алексей', 'Романов', 'Алексеевич', 'Пермь', 'romanovA', 'araara', NULL, NULL, 0),
(39, 'Ксения', 'Иванова', 'Федоровна', 'Москва', 'fedorovnai', 'ikfikf', NULL, NULL, 0),
(40, 'Ксения', 'Иванова', 'Федоровна', '', 'fedorovnai', 'ikfikf', NULL, NULL, 0),
(49, 'Анна', 'Сухова', 'Леонидовна', 'Москва', 'suhovaa1', 'salsal', NULL, NULL, 0),
(50, 'Анна', 'Григорьева', 'Тимофеевна', 'Санкт-Петербург', 'timatima', 'gatgat', NULL, NULL, 0),
(57, 'фанис', 'мазитов', 'ааааааа', 'аааааа', '8927807197', 'аааааа', NULL, NULL, 0),
(59, 'ииииммм', 'ииииммм', 'ииииммм', 'иииимммва', 'ииииммм', 'ииииммм', NULL, NULL, 0),
(64, 'Наиль', 'Каюмов', 'Радиславович', 'Ульяновск', 'n1', '1', NULL, NULL, 0),
(66, 'Наиль', 'Каюмов', 'Радиславович', 'Ульяновск', 'n11', '1', NULL, NULL, 0),
(68, 'аааааа', 'ааааааааааа', 'аааааа', 'аааааа', 'аааааа', 'аааааа', NULL, NULL, 0),
(69, 'фффффф', 'фффффф', 'фффффф', 'фффффф', '11111111', '111111111', NULL, NULL, 0),
(70, 'ввввввввв', 'ввввввввв', 'ввввввввв', 'ввввввввв', 'ввввввввв', 'ввввввввв', NULL, NULL, 0),
(71, 'ввввввввв', 'ввввввввв', 'ввввввввв', 'пппппп', 'ввввввввв', 'ввввввввв', NULL, NULL, 0),
(72, 'ыыыыыыыыы', 'ыыыыыыыыы', 'ыыыыыыыыы', 'ыыыыыыыыы', 'ыыыыыыыыы', 'ыыыыыыыыы', NULL, NULL, 0),
(73, 'ввврппр', 'ввврппр', 'ввврппр', 'ввврппр', 'ввврппр', 'ввврппр', NULL, NULL, 0),
(74, 'аипиапаип', 'аипиапаип', 'аипиапаип', 'аипиапаип', 'аипиапаип', 'аипиапаип', NULL, NULL, 0),
(75, 'адддддддд', 'адддддддд', 'адддддддд', 'адддддддд', '111111', '1111111', NULL, NULL, 0),
(76, 'ппппппп', 'ппппппп', 'ппппппп', 'ппппппп', '34343343434', 'ппппппп', NULL, NULL, 0),
(77, 'мммммммм', 'мммммммм', 'мммммммм', 'мммммммм', 'мммммммм', 'мммммммм', NULL, NULL, 0),
(78, 'ппииииии', 'ппииииии', 'ппииииии', 'ппииииии', 'ппииииии', 'ппииииии', NULL, NULL, 0),
(79, 'мсссссс', 'мсссссс', 'мсссссс', 'мсссссс', 'мсссссс', 'мсссссс', NULL, NULL, 0),
(80, 'ччччччч', 'ччччччч', 'ччччччч', 'ччччччч', 'ччччччч', 'ччччччч', NULL, NULL, 0),
(81, 'ииииииии', 'иииииииии', 'иииииииии', 'иииииииии', 'иииииииии', 'иииииииии', NULL, NULL, 0),
(82, 'иииииииии', 'иииииииии', 'иииииииии', 'иииииииии', 'иииииииии', 'иииииииии', NULL, NULL, 0),
(83, 'иииииииии', 'иииииииии', 'иииииииии', 'иииииииии', 'иииииииии', 'иииииииии', NULL, NULL, 0),
(84, 'мммммммммм', 'мммммммммм', 'мммммммммм', 'мммммммммм', 'мммммммммм', 'мммммммммм', NULL, NULL, 0),
(85, 'мммммммммм', 'мсссссс', 'мммммммммм', 'мммммммммм', 'мммммммммм', 'мммммммммм', NULL, NULL, 0),
(86, 'мммммммммм', 'мммммммммм', 'мммммммммм', 'мммммммммм', 'мммммммммм', 'мммммммммм', NULL, NULL, 0),
(87, 'нннннннн', 'нннннннн', 'нннннннн', 'нннннннн', 'нннннннн', 'нннннннн', NULL, NULL, 0),
(88, 'пппппппм', 'пппппппм', 'пппппппм', 'пппппппм', 'пппппппм', 'пппппппм', NULL, NULL, 0),
(89, 'аааааа', 'ааааааа', 'ааааааааа', 'ааааааа', '111111', 'ааааааааа', NULL, NULL, 0),
(90, 'аааааа', 'Аааааа', 'аааааа', 'аааааа', 'аааааа', 'маааааа', NULL, NULL, 0),
(94, 'ааааааа', 'ааааааа', 'ааааааа', 'ааааааа', 'ааааааа', 'ааааааа', NULL, NULL, 0),
(95, 'вввввввв', 'вввввввв', 'вввввввв', 'вввввввв', 'вввввввв', 'вввввввв', NULL, NULL, 0),
(96, 'пппппппп', 'пппппппп', 'ппппппппп', 'ппппппппп', 'пппппппп', 'пппппппппппп', NULL, NULL, 0),
(98, 'тест', 'тест', 'тест', 'тест', 'тест1111', 'тест111', NULL, NULL, 0),
(99, 'тестт', 'тестт', 'тестт', 'тестт', 'тестттт', 'тестттт', NULL, NULL, 0),
(100, 'тестстст', 'тестстст', 'тестстст', 'тестстст', 'тестстст', 'тестстст', NULL, NULL, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
