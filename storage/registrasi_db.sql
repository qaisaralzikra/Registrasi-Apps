-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20251005.967007883e
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 30, 2026 at 04:21 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registrasi_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-business connection indonesia - china|127.0.0.1', 'i:1;', 1788087952),
('laravel-cache-business connection indonesia - china|127.0.0.1:timer', 'i:1788087952;', 1788087952);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint UNSIGNED NOT NULL,
  `title_event` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle_event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc_event` text COLLATE utf8mb4_unicode_ci,
  `date_time_event` timestamp NULL DEFAULT NULL,
  `venue` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_fields_template` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title_event`, `subtitle_event`, `password`, `desc_event`, `date_time_event`, `venue`, `custom_fields_template`, `created_at`, `updated_at`) VALUES
(1, 'Hipmi Institute', 'Pelantikan Hipmi Institute 2026', '$2y$12$0ku8H8ToayYmhwhYXQORI.V0YdDrev/TCbuvxCGV.Sn4EIgv086Sa', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2026-05-05 10:00:00', 'MaxOne Hotel Makassar', '[{\"key\": \"nama_lengkap\", \"type\": \"text\", \"label\": \"Nama Lengkap\", \"active\": true, \"options\": null, \"required\": true}, {\"key\": \"nomor_whatsapp\", \"type\": \"phone\", \"label\": \"Nomor Whatsapp\", \"active\": true, \"options\": null, \"required\": true}, {\"key\": \"alamat\", \"type\": \"text\", \"label\": \"Alamat\", \"active\": true, \"options\": null, \"required\": true}, {\"key\": \"divisi\", \"type\": \"select\", \"label\": \"Divisi\", \"active\": true, \"options\": [\"Sekretaris\", \"Bendahara\", \"Ketua\", \"Wakil Ketua\", \"Publikasi Dan Dokumentasi\"], \"required\": true}]', '2026-07-06 04:56:52', '2026-07-06 05:23:40'),
(2, 'Business Connection Indonesia - Chine', 'Connecting Opportunities between Indonesia & China Through Smart Remmitance', '$2y$12$iX1ZSha07PxxrxFjiUf29eHVRiBDoTBJc3WRmkqwdz4UM/5J3ZgaK', 'Divisi International Banking dengan core\nbusiness produk Trade Finance dan\nRemittance, perlu membangun sinergi positif\ndalam rangka penyediaan layanan yang lebih\nbaik dan responsif kepada nasabah. Sebagai\nbagian dari upaya ini, Divisi International\nBanking Bank Sulselbar mengusulkan\npenyelenggaraan acara \"NETWORKING\nSESSION & TALKSHOW\". Acara ini dirancang\nuntuk memperkuat jaringan bisnis dan\ncustomer base Bank, khususnya untuk layanan\nremittance mata uang CNY (China Yuan) yang\nsaat ini negara china menjadi negara tujuan\nutama eskpor Sulawesi Selatan.', '2026-09-09 05:30:00', 'The Rinra Hotel - Macora Ballroom', '[{\"key\": \"nama_lengkap\", \"type\": \"text\", \"label\": \"Nama Lengkap\", \"active\": true, \"options\": null, \"required\": true}, {\"key\": \"nama_perusahaan_instansi\", \"type\": \"text\", \"label\": \"Nama Perusahaan / Instansi\", \"active\": true, \"options\": null, \"required\": true}, {\"key\": \"nomor_telepon\", \"type\": \"phone\", \"label\": \"Nomor Telepon\", \"active\": true, \"options\": null, \"required\": true}, {\"key\": \"alamat_email\", \"type\": \"email\", \"label\": \"Alamat Email\", \"active\": true, \"options\": null, \"required\": true}, {\"key\": \"negara\", \"type\": \"select\", \"label\": \"Negara\", \"active\": true, \"options\": [\"Indonesia\", \"China\"], \"required\": true}, {\"key\": \"kehadiran\", \"type\": \"select\", \"label\": \"Kehadiran\", \"active\": true, \"options\": [\"Hadir\", \"Tidak Hadir\"], \"required\": true}]', '2026-08-30 03:02:09', '2026-08-30 06:50:46');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(13, '0001_01_01_000001_create_cache_table', 1),
(14, '0001_01_01_000002_create_jobs_table', 1),
(15, '2026_07_06_113852_create_events_table', 1),
(16, '2026_07_06_113853_create_users_table', 1),
(17, '2026_07_06_113943_create_registrasi_table', 1),
(18, '2026_07_06_114004_create_qr_codes_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qr_codes`
--

CREATE TABLE `qr_codes` (
  `id` bigint UNSIGNED NOT NULL,
  `id_user` bigint UNSIGNED NOT NULL,
  `id_event` bigint UNSIGNED NOT NULL,
  `qr_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_used` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qr_codes`
--

INSERT INTO `qr_codes` (`id`, `id_user`, `id_event`, `qr_token`, `is_used`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'P5H0TLPMWT', 0, '2026-07-06 06:03:25', '2026-07-06 06:03:25'),
(2, 2, 1, 'YFTQMACLUU', 0, '2026-07-06 06:07:19', '2026-07-06 06:07:19'),
(3, 3, 2, 'LE36LHQXYA', 1, '2026-08-30 03:31:05', '2026-08-30 04:06:11'),
(4, 4, 2, 'T2DJRBAVKH', 1, '2026-08-30 04:06:55', '2026-08-30 04:08:03'),
(5, 5, 2, 'CZMABLG7FQ', 1, '2026-08-30 04:14:16', '2026-08-30 06:51:50');

-- --------------------------------------------------------

--
-- Table structure for table `registrasi`
--

CREATE TABLE `registrasi` (
  `id` bigint UNSIGNED NOT NULL,
  `id_user` bigint UNSIGNED NOT NULL,
  `id_event` bigint UNSIGNED NOT NULL,
  `custom_field_values` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `registrasi`
--

INSERT INTO `registrasi` (`id`, `id_user`, `id_event`, `custom_field_values`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '{\"alamat\": \"Tamalanrea, Makassar, sulawesi Selatan\", \"divisi\": \"Publikasi Dan Dokumentasi\", \"nama_lengkap\": \"Qaisar Al Zikra\", \"nomor_whatsapp\": \"089685482284\"}', '2026-07-06 06:03:25', '2026-07-06 06:03:25'),
(2, 2, 1, '{\"alamat\": \"pettarani makassar sulawesi selatan\", \"divisi\": \"Sekretaris\", \"nama_lengkap\": \"Putra Rimba\", \"nomor_whatsapp\": \"089685482284\"}', '2026-07-06 06:07:19', '2026-07-06 06:07:19'),
(3, 3, 2, '{\"negara\": \"Indonesia\", \"kehadiran\": \"Hadir\", \"alamat_email\": \"qaisaralzikrah@gmail.com\", \"nama_lengkap\": \"Muh Qaisar Al-Zikra\", \"nomor_telepon\": \"089685482284\"}', '2026-08-30 03:31:05', '2026-08-30 03:31:05'),
(4, 4, 2, '{\"negara\": \"Indonesia\", \"kehadiran\": \"Hadir\", \"alamat_email\": \"qaisaralzikrah@gmail.com\", \"nama_lengkap\": \"M settiaraja moehadi\", \"nomor_telepon\": \"089685482284\"}', '2026-08-30 04:06:55', '2026-08-30 04:06:55'),
(5, 5, 2, '{\"negara\": \"Indonesia\", \"kehadiran\": \"Hadir\", \"alamat_email\": \"qaisaralzikrah@gmail.com\", \"nama_lengkap\": \"dewan\", \"nomor_telepon\": \"089685482284\"}', '2026-08-30 04:14:15', '2026-08-30 04:14:15');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('7KTD3o9s2C7rn6tZinuqp4psZeTRtXSQT51Yvkyb', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJQN0lWUHluNERDa1JBVFZ3SjdUbWVLVWM0c1VXb1JSS0J4RDdVejZ2IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX0sInVybCI6W10sImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoyfQ==', 1788105970);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `id_events` bigint UNSIGNED NOT NULL,
  `status` enum('hadir','belum hadir','tidak hadir') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'belum hadir',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `id_events`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'belum hadir', '2026-07-06 06:03:25', '2026-07-06 06:03:25'),
(2, 1, 'belum hadir', '2026-07-06 06:07:19', '2026-07-06 06:07:19'),
(3, 2, 'belum hadir', '2026-08-30 03:31:05', '2026-08-30 03:31:05'),
(4, 2, 'belum hadir', '2026-08-30 04:06:55', '2026-08-30 04:06:55'),
(5, 2, 'belum hadir', '2026-08-30 04:14:15', '2026-08-30 04:14:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `qr_codes`
--
ALTER TABLE `qr_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `qr_codes_qr_token_unique` (`qr_token`),
  ADD KEY `qr_codes_id_user_foreign` (`id_user`),
  ADD KEY `qr_codes_id_event_foreign` (`id_event`);

--
-- Indexes for table `registrasi`
--
ALTER TABLE `registrasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registrasi_id_user_foreign` (`id_user`),
  ADD KEY `registrasi_id_event_foreign` (`id_event`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id_events_foreign` (`id_events`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `qr_codes`
--
ALTER TABLE `qr_codes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `registrasi`
--
ALTER TABLE `registrasi`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `qr_codes`
--
ALTER TABLE `qr_codes`
  ADD CONSTRAINT `qr_codes_id_event_foreign` FOREIGN KEY (`id_event`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `qr_codes_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `registrasi`
--
ALTER TABLE `registrasi`
  ADD CONSTRAINT `registrasi_id_event_foreign` FOREIGN KEY (`id_event`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `registrasi_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_events_foreign` FOREIGN KEY (`id_events`) REFERENCES `events` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
