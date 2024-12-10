-- Nastavuje SQL mód, aby sa automaticky nemenilo správanie AUTO_INCREMENT.
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

-- Začína transakciu na vykonanie zmien ako jednotný blok.
START TRANSACTION;

-- Nastavuje časové pásmo servera na jednotnú správu časových údajov.
SET time_zone = "+00:00";

-- Vytvára tabuľku `users` na uchovávanie údajov o používateľoch.
CREATE TABLE users (
  id int(11) NOT NULL,                             -- Jedinečný identifikátor používateľa.
  name varchar(100) NOT NULL,                      -- Meno používateľa, max. 100 znakov.
  birth_year int(11) NOT NULL,                     -- Rok narodenia používateľa.
  country varchar(100) NOT NULL,                   -- Krajina pôvodu používateľa.
  email varchar(255) NOT NULL,                     -- E-mailová adresa používateľa.
  password varchar(255) NOT NULL,                  -- Heslo používateľa (hashované).
  phone varchar(20) DEFAULT NULL,                  -- Telefónne číslo používateľa (voliteľné).
  notes text DEFAULT NULL,                         -- Poznámky spojené s používateľom (voliteľné).
  created_at timestamp NOT NULL DEFAULT current_timestamp(), -- Dátum a čas vytvorenia záznamu.
  updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() -- Dátum a čas poslednej aktualizácie záznamu.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

-- Vytvára tabuľku `user_audit_log` na uchovávanie záznamov o zmenách v používateľských údajoch.
CREATE TABLE user_audit_log (
  id int(11) NOT NULL,                             -- Jedinečný identifikátor záznamu auditu.
  user_id int(11) DEFAULT NULL,                    -- Identifikátor používateľa, na ktorého sa záznam vzťahuje.
  action enum('CREATE','UPDATE','DELETE') NOT NULL, -- Akcia, ktorá bola vykonaná (CREATE, UPDATE, DELETE).
  timestamp timestamp NOT NULL DEFAULT current_timestamp(), -- Čas, kedy bola akcia vykonaná.
  details text DEFAULT NULL                        -- Podrobnosti o zmene (voliteľné).
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Vkladá ukážkové údaje do tabuľky `user_audit_log`.
INSERT INTO user_audit_log (id, user_id, action, timestamp, details) VALUES
(1, NULL, 'CREATE', '2024-12-05 00:49:05', '{"name":"Mykyta Hryshyn","email":"grymik09@gmail.com","country":"Slovakia"}'),
(2, NULL, 'DELETE', '2024-12-05 00:49:12', '{"deleted_at":"2024-12-05 01:49:12"}'),
(3, NULL, 'CREATE', '2024-12-05 10:18:56', '{"name":"Mykyta Hryshyn","email":"grymik09@gmail.com","country":"Slovakia"}'),
(4, NULL, 'DELETE', '2024-12-05 10:19:02', '{"deleted_at":"2024-12-05 11:19:02"}'),
(5, NULL, 'CREATE', '2024-12-05 10:36:13', '{"name":"Mykyta Hryshyn","email":"grymik09@gmail.com","country":"SK"}'),
(6, NULL, 'DELETE', '2024-12-05 10:36:21', '{"deleted_at":"2024-12-05 11:36:21"}'),
(7, NULL, 'CREATE', '2024-12-05 15:40:35', '{"name":"Mykyta Hryshyn","email":"grymik09@gmail.com","country":"SK"}'),
(8, NULL, 'DELETE', '2024-12-05 15:40:56', '{"deleted_at":"2024-12-05 16:40:56"}'),
(9, NULL, 'CREATE', '2024-12-08 21:13:02', '{"name":"Mykyta Hryshyn","email":"grymik09@gmail.com","country":"SK"}'),
(10, NULL, 'DELETE', '2024-12-08 21:13:10', '{"deleted_at":"2024-12-08 22:13:10"}');

-- Pridáva primárne a unikátne kľúče do tabuľky `users`.
ALTER TABLE users
  ADD PRIMARY KEY (id),                            -- Primárny kľúč na identifikáciu záznamov.
  ADD UNIQUE KEY email (email),                    -- Unikátny kľúč pre e-mailové adresy.
  ADD KEY idx_email (email);                       -- Index pre rýchle vyhľadávanie podľa e-mailu.

-- Pridáva primárny kľúč a index na `user_id` v tabuľke `user_audit_log`.
ALTER TABLE user_audit_log
  ADD PRIMARY KEY (id),                            -- Primárny kľúč na identifikáciu záznamov auditu.
  ADD KEY user_id (user_id);                       -- Index pre efektívne vyhľadávanie podľa `user_id`.

-- Nastavuje auto-increment na stĺpec `id` v tabuľke `user_audit_log`.
ALTER TABLE user_audit_log
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

-- Pridáva cudzí kľúč do tabuľky `user_audit_log`, ktorý odkazuje na `id` v tabuľke `users`.
ALTER TABLE user_audit_log
  ADD CONSTRAINT user_audit_log_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;

-- Potvrdzuje transakciu a vykoná všetky zmeny.
COMMIT;