jsx
export default function MyCinemaDashboard() {
  const [watchlist, setWatchlist] = React.useState([
    { id: 1, title: 'Inception', genre: 'Sci-Fi', rating: 4.8, watched: false },
    { id: 2, title: 'Avatar', genre: 'Adventure', rating: 4.6, watched: false },
  ]);

  const recommendations = [
    { id: 3, title: 'Titanic', genre: 'Drama', rating: 4.9 },
    { id: 4, title: 'The Matrix', genre: 'Sci-Fi', rating: 4.7 },
  ];

  const handleMarkWatched = (id) => {
    setWatchlist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, watched: !item.watched } : item
      )
    );
  };

  const handleAddToWatchlist = (recommendation) => {
    if (!watchlist.find((item) => item.id === recommendation.id)) {
      setWatchlist((prev) => [...prev, { ...recommendation, watched: false }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <nav className="bg-white w-full md:w-1/5 p-4 border-r">
        <h1 className="text-2xl font-bold text-center mb-4">MyCinema</h1>
      </nav>
      <main className="flex-grow md:w-3/5 p-4">
        <header className="flex justify-between items-center mb-4">
          <div className="flex-grow mx-4">
            <input
              type="text"
              className="w-full p-2 rounded-lg border"
              placeholder="Search movies"
            />
          </div>
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white">
            AB
          </div>
        </header>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <img
                  src={`https://via.placeholder.com/150`}
                  alt=""
                  className="h-32 w-full object-cover mb-2 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{movie.title}</h3>
                  <p className="text-sm text-gray-500">{movie.genre}</p>
                  <div className="flex items-center my-2">
                    <span className="text-yellow-500">{movie.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleMarkWatched(movie.id)}
                  className="mt-auto bg-teal-500 text-white px-4 py-2 rounded-lg"
                >
                  {movie.watched ? 'Watched' : 'Mark as Watched'}
                </button>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <img
                  src={`https://via.placeholder.com/150`}
                  alt=""
                  className="h-32 w-full object-cover mb-2 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{rec.title}</h3>
                  <p className="text-sm text-gray-500">{rec.genre}</p>
                  <div className="flex items-center my-2">
                    <span className="text-yellow-500">{rec.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToWatchlist(rec)}
                  className="mt-auto bg-indigo-500 text-white px-4 py-2 rounded-lg"
                >
                  Add to Watchlist
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <aside className="bg-white w-full md:w-1/5 p-4 border-l">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <div className="mb-4">
          <svg
            className="w-full h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3v18h18M3 10h5M3 6h9M3 14h9M3 18h9"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul>
          <li className="mb-2">
            <span className="text-indigo-600">Reviewed: Inception</span>
          </li>
        </ul>
      </aside>
    </div>
  );
}