-- Insert data into Users table
INSERT INTO Users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_smith', 'jane@example.com', 'securepass456'),
('alex_brown', 'alex@example.com', 'mypassword789'),
('luke_white', 'luke@example.com', 'passw0rd'),
('emily_green', 'emily@example.com', 'emilypass987'),
('chris_blue', 'chris@example.com', 'bluepass654'),
('kate_black', 'kate@example.com', 'blackpass321'),
('mike_red', 'mike@example.com', 'redpass111'),
('sarah_yellow', 'sarah@example.com', 'yellowpass222'),
('david_gray', 'david@example.com', 'graypass333');

-- Insert data into Movies table
INSERT INTO Movies (title, release_date, synopsis, duration, metadata) VALUES
('The Great Adventure', '2022-01-15', 'A thrilling adventure of a lifetime.', 120, x''),
('Romantic Getaway', '2021-05-22', 'A romantic story set in the beautiful Paris.', 100, x''),
('Sci-Fi Future', '2023-03-10', 'A glimpse into the future with advanced technology.', 130, x''),
('Mystery Night', '2020-08-18', 'A detective story with unexpected twists.', 115, x''),
('Comedy Central', '2019-11-05', 'A hilarious journey through everyday life.', 95, x''),
('Horror House', '2020-10-31', 'A terrifying story set in a haunted mansion.', 110, x''),
('Action Packed', '2022-06-20', 'An action movie with thrilling sequences.', 140, x''),
('Drama Kings', '2021-02-28', 'A deep dive into the lives of three friends.', 125, x''),
('Animated World', '2018-12-25', 'A colorful animated movie for all ages.', 90, x''),
('Documentary Life', '2019-07-15', 'An insightful documentary about wildlife.', 85, x'');

-- Insert data into TV_Shows table
INSERT INTO TV_Shows (title, release_date, synopsis, seasons, episodes, metadata) VALUES
('Space Odyssey', '2021-01-01', 'An epic journey through space.', 2, 20, x''),
('Family Matters', '2019-05-10', 'A heartwarming family drama.', 4, 40, x''),
('Crime Scene', '2020-09-15', 'A gripping crime series.', 3, 30, x''),
('Fantasy World', '2022-11-25', 'A magical world of fantasy and adventure.', 1, 10, x''),
('Historic Times', '2018-02-20', 'A period drama set in ancient times.', 5, 50, x''),
('Comedy Nights', '2021-06-30', 'A comedy series to lighten your day.', 3, 30, x''),
('The Mystery Show', '2019-03-25', 'A series full of mysteries and suspense.', 2, 20, x''),
('Tech Revolution', '2020-12-10', 'A documentary series about technology.', 1, 8, x''),
('Wildlife Wonders', '2023-05-01', 'A series showcasing the wonders of wildlife.', 1, 8, x''),
('Cooking Secrets', '2022-04-15', 'A culinary journey with secret recipes.', 2, 16, x'');

-- Insert data into User_Watchlist table
INSERT INTO User_Watchlist (user_id, movie_id, show_id, status, watched_date) VALUES
(1, 1, NULL, 'planned', NULL),
(2, NULL, 1, 'watched', '2023-01-01'),
(3, 3, NULL, 'watched', '2023-02-15'),
(4, NULL, 2, 'planned', NULL),
(5, 5, NULL, 'planned', NULL),
(6, NULL, 3, 'watched', '2023-03-05'),
(7, 7, NULL, 'planned', NULL),
(8, NULL, 4, 'planned', NULL),
(9, 9, NULL, 'watched', '2023-04-10'),
(10, NULL, 5, 'watched', '2023-04-20');

-- Insert data into Ratings table
INSERT INTO Ratings (user_id, movie_id, show_id, rating, review) VALUES
(1, 2, NULL, 4, 'A charming romantic movie.'),
(2, NULL, 2, 5, 'An emotional rollercoaster.'),
(3, 3, NULL, 5, 'Incredible vision of the future.'),
(4, NULL, 1, 3, 'A good series with some slow episodes.'),
(5, 5, NULL, 2, 'Hilarious and refreshing.'),
(6, NULL, 3, 4, 'A thrilling crime series.'),
(7, 6, NULL, 4, 'Scary and entertaining.'),
(8, NULL, 4, 5, 'A magical experience.'),
(9, 1, NULL, 3, 'Decent adventure movie.'),
(10, NULL, 5, 4, 'Very informative and engaging.');

-- Insert data into Viewing_History table
INSERT INTO Viewing_History (user_id, movie_id, show_id, watched_date) VALUES
(1, 2, NULL, '2023-05-05'),
(2, NULL, 2, '2023-01-01'),
(3, 3, NULL, '2023-02-15'),
(4, NULL, 1, '2023-02-20'),
(5, 5, NULL, '2023-03-10'),
(6, NULL, 3, '2023-03-05'),
(7, 6, NULL, '2023-03-25'),
(8, NULL, 4, '2023-04-01'),
(9, 9, NULL, '2023-04-10'),
(10, NULL, 5, '2023-04-20');

-- Insert data into Friends table
INSERT INTO Friends (user_id, friend_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 1);

-- Insert data into Notifications table
INSERT INTO Notifications (user_id, message) VALUES
(1, 'Your planned movie is now available.'),
(2, 'New season of your favorite show is out!'),
(3, 'You have a friend request from Alex.'),
(4, 'Your watchlist has been updated.'),
(5, 'A new review has been posted on a movie you watched.'),
(6, 'Check out the new features on the platform.'),
(7, 'Your friend Chris has started watching a new show.'),
(8, 'Your planned show is starting soon.'),
(9, 'New recommendations are available based on your watchlist.'),
(10, 'Your review has received a like.');