-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Апр 20 2024 г., 06:33
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
  `status` enum('На рассмотрении','Закупаем','Доставляем','Ожидает получения','Получен') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `good`, `quantity`, `link`, `creation_date`, `arrival_date`, `author_id`, `status`) VALUES
(12, 'Мармелад апельсиновый', 6, 'https://www.ozon.ru/product/marmelad-zheleynyy-apelsin-tri-kota-lakomstva-dlya-zdorovya-35g-12-sht-176657490', '2024-04-17 21:57:26', '2024-04-19 00:00:00', 5, 'Закупаем'),
(13, 'Сыр', 1, 'https://www.ozon.ru/product/syr-brest-litovsk-klassicheskiy-kusok-200-g-145923198', '2024-04-18 00:07:10', '2024-04-19 00:00:00', 5, 'Доставляем'),
(15, 'Тумба', 1, 'https://www.ozon.ru/product/zamm-tumba-mobilnaya-3-yashch-41h50h61-3-sm-1335255365', '2024-04-18 19:22:04', '2024-04-20 00:00:00', 5, 'Закупаем');

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
(7, 'Полина', 'Курочкина', 'Павловна', 'Москва', 'kppavlovna', 'kpvkpv', NULL, NULL, 0),
(8, 'Виктория', 'Никифорова', 'Саввична', 'Москва', 'nvsavvichna', 'nvsnvs', NULL, NULL, 0),
(23, 'Валерия', 'Николаева', 'Сергеевна', 'Пермь', 'nvsergeevna', 'vnsvns', NULL, NULL, 0),
(27, 'Георгий', 'Старов', 'Иванович', 'Тверь', 'sgivanovich1', 'gsigsi', NULL, NULL, 0),
(28, 'Тимур', 'Светов', 'Алексеевич', 'Владикавказ', 'stalexeevich', 'tsatsa', NULL, NULL, 0),
(29, 'Петр', 'Самойлов', 'Викторович', 'Санкт-Петербург', 'spviktorovich', 'psvpsv', NULL, NULL, 0),
(31, 'Николай', 'Щепкин', 'Иванович', 'Рязань', 'nchivanovich1', 'nchinchi', NULL, NULL, 0),
(32, 'Константин', 'Беляков', 'Дмитриевич', 'Томск', 'bidmitrievich', 'bidbid', NULL, NULL, 0),
(34, 'Алексей', 'Романов', 'Алексеевич', 'Пермь', 'romanovA', 'araara', NULL, NULL, 0);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

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
