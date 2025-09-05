jsx
export default function MyCinemaDashboard() {
  const [watchlist, setWatchlist] = React.useState([
    { id: 1, title: "Inception", rating: 5, progress: "80%", watched: false },
    { id: 2, title: "The Matrix", rating: 4, progress: "50%", watched: false },
  ]);

  const [recommendations] = React.useState([
    { id: 3, title: "Interstellar", genre: "Sci-Fi" },
    { id: 4, title: "Parasite", genre: "Thriller" },
  ]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-1/4 bg-white p-4 shadow-lg">
        <h1 className="text-2xl text-indigo-600 font-bold">MyCinema</h1>
        <nav className="mt-8">
          <ul>
            <li className="mb-4 text-lg">Home</li>
            <li className="mb-4 text-lg">Watchlist</li>
            <li className="mb-4 text-lg">Discover</li>
            <li className="mb-4 text-lg">Profile</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 md:w-2/4 p-4">
        <header className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md p-2 border rounded"
          />
          <div className="ml-2 w-8 h-8 flex justify-center items-center bg-indigo-600 text-white rounded-full">
            JD
          </div>
        </header>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Watchlist</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {watchlist.map((movie) => (
              <div key={movie.id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src="https://via.placeholder.com/150"
                  alt={movie.title}
                  className="w-full rounded"
                />
                <h3 className="mt-2 text-lg font-bold">{movie.title}</h3>
                <div className="flex items-center">
                  <div className="text-yellow-500">{'★'.repeat(movie.rating)}</div>
                </div>
                <span className="block bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mt-2 mb-4">
                  {movie.progress}
                </span>
                <button
                  className={`w-full p-2 rounded ${
                    movie.watched
                      ? "bg-gray-400 text-white"
                      : "bg-indigo-600 text-white"
                  }`}
                  onClick={() =>
                    setWatchlist((prev) =>
                      prev.map((m) =>
                        m.id === movie.id ? { ...m, watched: !m.watched } : m
                      )
                    )
                  }
                >
                  {movie.watched ? "Watched" : "Mark watched"}
                </button>
              </div>
            ))}
          </div>
          <h2 className="mt-8 mb-4 text-xl font-semibold">Recommendations</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src="https://via.placeholder.com/150"
                  alt={rec.title}
                  className="w-full rounded"
                />
                <h3 className="mt-2 text-lg font-bold">{rec.title}</h3>
                <span className="block bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mt-2 mb-4">
                  {rec.genre}
                </span>
                <button
                  onClick={() =>
                    setWatchlist((prev) => [
                      ...prev,
                      { id: rec.id, title: rec.title, rating: 0, progress: "0%", watched: false },
                    ])
                  }
                  className="w-full p-2 rounded bg-indigo-600 text-white"
                >
                  Add to Watchlist
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <aside className="w-full md:w-1/4 bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <ul>
          <li className="mb-4">Reviewed: Inception</li>
          <li className="mb-4">Reviewed: The Matrix</li>
        </ul>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Analytics</h2>
          <div className="bg-gray-200 p-4 rounded">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-full h-40 text-teal-600"
            >
              {/* Placeholder for chart */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
            </svg>
          </div>
        </div>
      </aside>
    </div>
  );
}