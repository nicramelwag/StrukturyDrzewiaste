-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 07 Wrz 2018, 18:08
-- Wersja serwera: 10.1.31-MariaDB
-- Wersja PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `strukturydrzewiaste`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `drzewo`
--

CREATE TABLE `drzewo` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_polish_ci NOT NULL,
  `parentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `drzewo`
--

INSERT INTO `drzewo` (`id`, `name`, `parentId`) VALUES
(131, 'Maria', NULL),
(132, 'Barbara', 131),
(133, 'Stefcia', 131),
(134, 'Marysia', 131),
(135, 'Jan', 131),
(136, 'Katarzyna', 133),
(138, 'Bożena', 133),
(139, 'Marysia', 134),
(140, 'Stanisława', 132),
(141, 'Jan', 132),
(142, 'piotr', 132),
(158, 'świat', NULL),
(159, 'Europa', 158),
(160, 'Afryka', 158),
(161, 'Ameryka Północna', 158),
(162, 'Ameryka Południowa', 158),
(163, 'Australia', 158),
(164, 'Azja', 158),
(165, 'Antarktyda', 158),
(166, 'Polska', 159),
(167, 'Niemcy', 159),
(168, 'Francja', 159),
(169, 'Holandia', 159),
(170, 'Wielka Brytania', 159),
(171, 'Podkarpackie', 166),
(172, 'Małopolskie', 166),
(173, 'Mazowieckie', 166),
(174, '1234', NULL),
(175, '6', 178),
(176, '3', 174),
(177, '7', 174),
(178, '5', 174),
(179, '9', 174),
(180, '2', 174),
(181, '4', 175),
(182, '3', 175),
(183, '8', 175),
(184, '6', 175),
(185, 'abc', NULL),
(186, 'a', 185),
(187, 'g', 185),
(188, 't', 185),
(189, 'y', 185),
(190, 'z', 185),
(191, 'r', 185),
(192, 'b', 185),
(193, 'd', 186),
(194, 'g', 186),
(195, 'h', 186),
(196, 'j', 186),
(197, 'k', 186),
(198, 'q', 187),
(199, 'w', 187),
(200, 'e', 187),
(201, 'r', 187),
(202, 't', 187);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tree`
--

CREATE TABLE `tree` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idRoot` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `tree`
--

INSERT INTO `tree` (`id`, `idUser`, `idRoot`, `title`, `description`) VALUES
(6, 5, 131, 'Pokolenia', 'Imitacja drzewa genealogicznego '),
(7, 4, 158, 'Podział Administracyjny', 'zawiera podział na kontynenty, kraje'),
(8, 3, 174, 'Cyferki', 'Drzewo zawiera cyfry'),
(9, 4, 185, 'Literki', 'Drzewo zawiera litery');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_polish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(3, 'marcin@o2.pl', '$2y$10$A0VnQLmbkdeub0/y4xOEjuA4SHii/yHtw6f97.eHm7DEUURxbG/KW'),
(4, 'admin@o2.pl', '$2y$10$E7gUZTPuUzZdWoU8xU8KlOPYTwq68GAH10Xe3WFkgm3.ZoM0rdIka'),
(5, 'test@o2.pl', '$2y$10$HbaR4FYUkDR8evcf.lDLSeljnu7F8QyrFKEgrYGZO8WYmY/WIcljG');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `drzewo`
--
ALTER TABLE `drzewo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentId` (`parentId`);

--
-- Indeksy dla tabeli `tree`
--
ALTER TABLE `tree`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `drzewo`
--
ALTER TABLE `drzewo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT dla tabeli `tree`
--
ALTER TABLE `tree`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
