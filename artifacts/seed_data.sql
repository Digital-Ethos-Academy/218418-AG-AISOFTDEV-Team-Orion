-- Users Table
INSERT INTO Users (username, email, password) VALUES
('john_doe', 'john.doe@example.com', 'password123'),
('jane_smith', 'jane.smith@example.com', 'securepass456'),
('critic_julia', 'julia.critic@example.com', 'reviewer789');

-- Movies Table
INSERT INTO Movies (title, release_date, synopsis, duration, metadata) VALUES
('Inception', '2010-07-16', 'A thief who steals corporate secrets through dream-sharing technology.', 148, X''),
('The Matrix', '1999-03-31', 'A hacker discovers the reality is a simulated reality.', 136, X''),
('Interstellar', '2014-11-07', 'A team of explorers travel through a wormhole in space.', 169, X'');

-- TV_Shows Table
INSERT INTO TV_Shows (title, release_date, synopsis, seasons, episodes, metadata) VALUES
('Breaking Bad', '2008-01-20', 'A high school chemistry teacher turned methamphetamine producer.', 5, 62, X''),
('Game of Thrones', '2011-04-17', 'Noble families in a medieval setting vie for control of the Iron Throne.', 8, 73, X''),
('Stranger Things', '2016-07-15', 'A group of kids encounter supernatural forces in their small town.', 4, 34, X'');

-- User_Watchlist Table
INSERT INTO User_Watchlist (user_id, movie_id, show_id, status, watched_date) VALUES
(1, 1, NULL, 'planned', NULL),
(1, NULL, 1, 'watched', '2023-10-01'),
(2, 2, NULL, 'watched', '2023-09-15'),
(2, NULL, 2, 'planned', NULL),
(3, NULL, 3, 'planned', NULL);

-- Ratings Table
INSERT INTO Ratings (user_id, movie_id, show_id, rating, review) VALUES
(1, 1, NULL, 5, 'Absolutely mind-bending!'),
(2, 2, NULL, 4, 'A classic with groundbreaking special effects.'),
(1, NULL, 1, 5, 'One of the best TV shows ever made.'),
(3, NULL, 3, 4, 'Nostalgic and thrilling!');

-- Viewing_History Table
INSERT INTO Viewing_History (user_id, movie_id, show_id, watched_date) VALUES
(1, 1, NULL, '2023-10-01'),
(1, NULL, 1, '2023-09-15'),
(2, 2, NULL, '2023-09-15'),
(2, NULL, 2, '2023-09-20');

-- Friends Table
INSERT INTO Friends (user_id, friend_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 1);

-- Notifications Table
INSERT INTO Notifications (user_id, message) VALUES
(1, 'New episode of Breaking Bad is available.'),
(1, 'Inception has been added to your watchlist.'),
(2, 'Game of Thrones new season release date announced.'),
(3, 'Stranger Things is coming to your watchlist soon.');