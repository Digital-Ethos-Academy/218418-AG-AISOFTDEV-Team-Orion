function MyCinemaDashboard() {
  const [watchlist, setWatchlist] = React.useState([
    { id: 1, title: "Inception", genre: "Sci-Fi", rating: 4.5, watched: false },
    { id: 2, title: "Interstellar", genre: "Adventure", rating: 4.7, watched: false }
  ]);
  
  const recommendations = [
    { id: 3, title: "Avatar", genre: "Action" },
    { id: 4, title: "Titanic", genre: "Drama" }
  ];
  
  const toggleWatched = (id) => {
    setWatchlist(watchlist.map(movie => 
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ));
  };

  const addToWatchlist = (rec) => {
    setWatchlist([...watchlist, {...rec, watched: false, rating: 0 }]);
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 p-4">
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="font-bold text-xl mb-4">MyCinema</h2>
        <nav>
          <ul className="space-y-2">
            <li className="text-gray-700">Home</li>
            <li className="text-gray-700">Watchlist</li>
            <li className="text-gray-700">Discover</li>
          </ul>
        </nav>
      </aside>
      <main className="w-full md:w-1/2 flex flex-col space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <input type="text" className="flex-grow p-2 border-b border-gray-300 focus:outline-none" placeholder="Search"/>
            <div className="bg-gray-200 p-2 rounded-full">JD</div>
          </div>
          <h3 className="text-lg font-semibold">Watchlist</h3>
          {watchlist.map(movie => (
            <div key={movie.id} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
              <div>
                <h4 className="text-md font-bold">{movie.title}</h4>
                <p className="text-sm text-gray-600">{movie.genre} <span aria-label={`star rating`}>⭐️{movie.rating}</span></p>
              </div>
              <button 
                className={`bg-indigo-500 text-white px-3 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${movie.watched ? 'opacity-50' : ''}`} 
                onClick={() => toggleWatched(movie.id)}>
                {movie.watched ? "Watched" : "Mark Watched"}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <div className="grid grid-cols-2 gap-4">
            {recommendations.map(rec => (
              <div key={rec.id} className="bg-gray-100 p-2 rounded-lg">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt={`Poster of ${rec.title}`} 
                  className="rounded-md mb-2"
                />
                <h4 className="text-md font-bold">{rec.title}</h4>
                <p className="text-sm text-gray-600">{rec.genre}</p>
                <button 
                  className="mt-2 bg-teal-500 text-white px-3 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" 
                  onClick={() => addToWatchlist(rec)}>
                  Add to Watchlist
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Analytics & Activity</h3>
        <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
          <svg className="w-full h-24 text-indigo-400" aria-label="Sample analytics chart">
            <rect width="100%" height="100%" fill="currentColor" />
          </svg>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <h4 className="font-bold">Recent Reviews</h4>
          <ul className="list-disc pl-4">
            <li>Awesome movie!</li>
            <li>Great storyline.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

// expose globally for simple script include in index.html
window.MyCinemaDashboard = MyCinemaDashboard;