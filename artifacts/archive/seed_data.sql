-- Users table
INSERT INTO Users (username, email, password_hash) VALUES
('moviebuff123', 'moviebuff123@example.com', 'hashedpassword1'),
('casualviewer', 'casualviewer@example.com', 'hashedpassword2'),
('criticinsights', 'criticinsights@example.com', 'hashedpassword3');

-- Movies table
INSERT INTO Movies (title, release_date, genre, synopsis, trailer_url) VALUES
('Inception', '2010-07-16', 'Science Fiction', 'A thief with the ability to enter people\'s dreams and steal secrets from their subconscious.', 'https://example.com/trailer/inception'),
('The Matrix', '1999-03-31', 'Action', 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.', 'https://example.com/trailer/matrix'),
('Interstellar', '2014-11-07', 'Adventure', 'A team of explorers travel through a wormhole in space in an attempt to save humanity.', 'https://example.com/trailer/interstellar');

-- TVShows table
INSERT INTO TVShows (title, release_date, genre, synopsis, trailer_url) VALUES
('Breaking Bad', '2008-01-20', 'Crime', 'A high school chemistry teacher turned methamphetamine manufacturer.', 'https://example.com/trailer/breakingbad'),
('Stranger Things', '2016-07-15', 'Drama', 'A group of kids uncover a series of supernatural mysteries in their small town.', 'https://example.com/trailer/strangerthings'),
('The Crown', '2016-11-04', 'Historical Drama', 'The story of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.', 'https://example.com/trailer/thecrown');

-- Watchlist table
INSERT INTO Watchlist (user_id, movie_id, show_id, status) VALUES
(1, 1, NULL, 'planned'),
(1, NULL, 1, 'watched'),
(2, 2, NULL, 'planned'),
(3, NULL, 2, 'planned');

-- Ratings table
INSERT INTO Ratings (user_id, movie_id, show_id, rating) VALUES
(1, 1, NULL, 5),
(1, NULL, 1, 4),
(2, 2, NULL, 3),
(3, NULL, 2, 5);

-- Reviews table
INSERT INTO Reviews (user_id, movie_id, show_id, review_text) VALUES
(1, 1, NULL, 'A mind-bending masterpiece with stunning visuals.'),
(1, NULL, 1, 'Intense and thrilling with a gripping storyline.'),
(2, 2, NULL, 'A genre-defining film that still holds up.'),
(3, NULL, 2, 'An engaging series with strong performances.');

-- ViewingHistory table
INSERT INTO ViewingHistory (user_id, movie_id, show_id, watched_date) VALUES
(1, 1, NULL, '2023-01-15'),
(1, NULL, 1, '2023-02-20'),
(2, 2, NULL, '2023-03-10'),
(3, NULL, 2, '2023-04-05');

-- Friends table
INSERT INTO Friends (user_id, friend_id) VALUES
(1, 2),
(1, 3),
(2, 3);

-- Notifications table
INSERT INTO Notifications (user_id, message, type) VALUES
(1, 'New episode of Breaking Bad is releasing soon!', 'release'),
(2, 'Reminder: You planned to watch The Matrix this weekend.', 'reminder'),
(3, 'Stranger Things Season 4 is now available!', 'release');

-- Metadata table
INSERT INTO Metadata (movie_id, show_id, cast, crew, streaming_platforms) VALUES
(1, NULL, 'Leonardo DiCaprio, Joseph Gordon-Levitt', 'Christopher Nolan', 'Netflix, Amazon Prime'),
(NULL, 1, 'Bryan Cranston, Aaron Paul', 'Vince Gilligan', 'Netflix, Hulu'),
(2, NULL, 'Keanu Reeves, Laurence Fishburne', 'The Wachowskis', 'HBO Max'),
(NULL, 2, 'Winona Ryder, David Harbour', 'The Duffer Brothers', 'Netflix');