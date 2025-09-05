export default function MyCinemaDashboard() {
  const [watchlist, setWatchlist] = React.useState([
    { id: 1, title: "Movie One", rating: 4, progress: "Halfway", watched: false },
    { id: 2, title: "Movie Two", rating: 5, progress: "Not Started", watched: false },
  ]);

  const [recommendations] = React.useState([
    { id: 3, title: "Movie Three", genre: "Action" },
    { id: 4, title: "Movie Four", genre: "Drama" },
  ]);

  const handleMarkWatched = (id) => {
    setWatchlist((prev) => 
      prev.map((item) => item.id === id ? { ...item, watched: !item.watched } : item)
    );
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => [...prev, { ...movie, watched: false }]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 space-y-4 md:space-y-0 md:space-x-4 bg-gray-100">
      <nav className="flex-none w-full md:w-1/5 p-4 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-indigo-600">MyCinema</h1>
        <ul className="mt-6 space-y-2">
          <li><button className="focus:outline-none focus-visible:ring-2 ring-indigo-400">Home</button></li>
          <li><button className="focus:outline-none focus-visible:ring-2 ring-indigo-400">Watchlist</button></li>
          <li><button className="focus:outline-none focus-visible:ring-2 ring-indigo-400">Discover</button></li>
        </ul>
      </nav>
      <main className="flex-grow p-4 space-y-6">
        <header className="flex items-center space-x-4">
          <input type="text" placeholder="Search..." className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 ring-indigo-400" />
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center">JD</div>
        </header>
        <section aria-label="Watchlist" className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {watchlist.map((movie) => (
              <div key={movie.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
                <img src="https://via.placeholder.com/80x120" alt="" className="w-20 h-30 rounded-lg" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-yellow-500 ${i < movie.rating ? 'filled' : ''}`}>&#9733;</span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded">{movie.progress}</span>
                  </div>
                  <button
                    onClick={() => handleMarkWatched(movie.id)}
                    className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded focus:outline-none focus-visible:ring-2 ring-indigo-400">
                    {movie.watched ? 'Unmark Watched' : 'Mark Watched'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section aria-label="Recommendations" className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recommendations for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white p-4 rounded-lg shadow">
                <img src="https://via.placeholder.com/80x120" alt="" className="w-full h-30 rounded-t-lg" />
                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-lg font-semibold">{rec.title}</h3>
                  <button
                    onClick={() => addToWatchlist(rec)}
                    className="px-4 py-1 bg-indigo-600 text-white rounded focus:outline-none focus-visible:ring-2 ring-indigo-400">
                    Add to Watchlist
                  </button>
                </div>
                <span className="text-sm text-gray-600">{rec.genre}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <aside className="flex-none w-full md:w-1/5 p-4 bg-white rounded-lg shadow space-y-6">
        <section aria-label="Activity" className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="text-sm">No recent activity available.</li>
          </ul>
        </section>
        <section aria-label="Analytics" className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <div className="flex justify-center items-center">
            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="4" y="10" width="4" height="10" className="text-teal-400" />
              <rect x="10" y="4" width="4" height="16" className="text-indigo-400" />
              <rect x="16" y="8" width="4" height="12" className="text-teal-400" />
            </svg>
          </div>
        </section>
      </aside>
    </div>
  );
}