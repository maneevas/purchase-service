-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Мар 28 2024 г., 15:52
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
  `status` enum('На рассмотрении','Закупаем','Ждём','Доставляем','Доставлен','Ожидает получения','Получен') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `good`, `quantity`, `link`, `creation_date`, `arrival_date`, `author_id`, `status`) VALUES
(1, 'Ваза \"Кошачья лапка\"', 1, 'https://www.ozon.ru/product/dekorativnaya-interernaya-nastolnaya-vaza-dlya-dekora-koshachya-lapka-1158629748', '2024-03-26 00:00:00', '2024-03-28 00:00:00', 29, 'На рассмотрении'),
(3, 'Свеча чайная белая', 5, 'https://www.ozon.ru/product/svecha-bez-aromata-1-sm-h-3-7-sm-10-sht-736737643/', '2024-03-28 00:00:00', '2024-03-29 00:00:00', 29, 'Доставляем'),
(4, 'Крафт пакет', 14, 'https://www.ozon.ru/product/podarochnyy-kraft-paket-s-kruchenymi-ruchkami-22h12h25-sm-10-shtuk-1294147968', '2024-03-27 00:00:00', '2024-03-29 00:00:00', 29, 'Доставляем'),
(8, 'Мармелад', 10, 'https://www.ozon.ru/product/marmelad-zhevatelnyy-700-g-v-kisloy-obsypke-assorti-vkusov-chervyachki-gusenichki-mishki-yagodki-204460643', '2024-03-28 18:31:10', '2024-03-30 00:00:00', 31, 'На рассмотрении'),
(10, 'Сыр', 19, 'https://www.ozon.ru/product/syr-brest-litovsk-klassicheskiy-kusok-200-g-145923198', '2024-03-28 18:59:11', '2024-04-02 00:00:00', 31, 'Доставляем');

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
(27, 'Георгий', 'Старов', 'Иванович', 'Тверь', 'sgivanovich', 'gsigsi', NULL, NULL, 0),
(28, 'Тимур', 'Светов', 'Алексеевич', 'Владикавказ', 'stalexeevich', 'tsatsa', NULL, NULL, 0),
(29, 'Петр', 'Самойлов', 'Викторович', 'Санкт-Петербург', 'spviktorovich', 'psvpsv', NULL, NULL, 0),
(31, 'Николай', 'Щепкин', 'Иванович', 'Рязань', 'nchivanovich1', 'nchinchi', NULL, NULL, 0),
(32, 'Константин', 'Беляков', 'Дмитриевич', 'Томск', 'bidmitrievich', 'bidbid', NULL, NULL, 0);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

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
