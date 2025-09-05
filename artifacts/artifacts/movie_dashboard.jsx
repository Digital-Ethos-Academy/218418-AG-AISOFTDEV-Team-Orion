export default function MyCinemaDashboard() {
  const { useState, useEffect, useMemo } = React;
  const initialWatchlist = [
    { id: 1, title: "Inception", year: 2010, duration: "149 min", genres: ["Sci‑Fi", "Thriller"], rating: 4.5, progress: 40, watched: false, poster: "https://via.placeholder.com/320x480/1f2937/ffffff?text=Inception" },
    { id: 2, title: "Stranger Things", year: 2016, duration: "3 seasons", genres: ["TV", "Mystery"], rating: 4.3, progress: 20, watched: false, poster: "https://via.placeholder.com/320x480/111827/ffffff?text=Stranger+Things" },
    { id: 3, title: "The Batman", year: 2022, duration: "176 min", genres: ["Action", "Crime"], rating: 4.2, progress: 70, watched: false, poster: "https://via.placeholder.com/320x480/0f172a/ffffff?text=The+Batman" }
  ];
  const initialRecommendations = [
    { id: 101, title: "Dune", genres: ["Sci‑Fi", "Adventure"], rating: 4.4, poster: "https://via.placeholder.com/320x480/111827/ffffff?text=Dune" },
    { id: 102, title: "The Crown", genres: ["TV", "Drama"], rating: 4.0, poster: "https://via.placeholder.com/320x480/1f2937/ffffff?text=The+Crown" },
    { id: 103, title: "Blade Runner 2049", genres: ["Sci‑Fi", "Neo‑noir"], rating: 4.1, poster: "https://via.placeholder.com/320x480/0f172a/ffffff?text=BR+2049" },
    { id: 104, title: "Oppenheimer", genres: ["Drama", "History"], rating: 4.6, poster: "https://via.placeholder.com/320x480/0b132b/ffffff?text=Oppenheimer" },
    { id: 105, title: "Arcane", genres: ["TV", "Animation"], rating: 4.7, poster: "https://via.placeholder.com/320x480/111827/ffffff?text=Arcane" },
    { id: 106, title: "John Wick", genres: ["Action", "Crime"], rating: 4.0, poster: "https://via.placeholder.com/320x480/0f172a/ffffff?text=John+Wick" }
  ];
  const activities = [
    { id: "a1", user: "EV", action: "reviewed", title: "Inception", rating: 5, text: "Mind-bending visuals." },
    { id: "a2", user: "MK", action: "watched", title: "The Batman", rating: 4, text: "Moody and gripping." },
    { id: "a3", user: "JS", action: "added", title: "Dune", rating: null, text: "Queued for weekend." }
  ];
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [recs, setRecs] = useState(initialRecommendations);
  const [query, setQuery] = useState("");
  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    if (!announce) return;
    const t = setTimeout(() => setAnnounce(""), 1500);
    return () => clearTimeout(t);
  }, [announce]);

  const filteredWatchlist = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return watchlist;
    return watchlist.filter(w => w.title.toLowerCase().includes(q) || w.genres.join(" ").toLowerCase().includes(q));
  }, [query, watchlist]);

  const handleMarkWatched = (id) => {
    setWatchlist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, watched: !item.watched, progress: 100 } : item
      )
    );
    const movie = watchlist.find(m => m.id === id);
    setAnnounce(`${movie ? movie.title : "Item"} marked as watched`);
  };

  const handleAddToWatchlist = (rec) => {
    if (watchlist.some(w => w.title === rec.title)) return;
    setWatchlist(prev => [...prev, { id: Date.now(), title: rec.title, year: "", duration: "", genres: rec.genres, rating: rec.rating, progress: 0, watched: false, poster: rec.poster }]);
    setAnnounce(`${rec.title} added to Watchlist`);
  };

  const isAdded = (rec) => watchlist.some(w => w.title === rec.title);

  const Star = ({ filled }) => (
    <svg aria-hidden="true" className={`h-4 w-4 ${filled ? "text-amber-400" : "text-slate-600"}`} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0l-2.802 2.035c-.784.57-1.839-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.17-3.292z" />
    </svg>
  );

  const Rating = ({ value }) => {
    const stars = [1, 2, 3, 4, 5].map(i => i <= Math.round(value) ? true : false);
    return (
      <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
        {stars.map((s, i) => <Star key={i} filled={s} />)}
        <span className="ml-1 text-xs text-slate-400">{value.toFixed(1)}</span>
      </div>
    );
  };

  const TagIcon = ({ name }) => {
    const base = "h-3.5 w-3.5";
    if (name.toLowerCase().includes("sci")) {
      return (<svg className={base} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"/></svg>);
    }
    if (name.toLowerCase().includes("tv")) {
      return (<svg className={base} viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16a2 2 0 012 2v7a2 2 0 01-2 2h-5l2 3h-2l-2-3-2 3H9l2-3H4a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>);
    }
    if (name.toLowerCase().includes("action")) {
      return (<svg className={base} viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
    }
    if (name.toLowerCase().includes("drama") || name.toLowerCase().includes("history")) {
      return (<svg className={base} viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v12a4 4 0 11-8 0 4 4 0 11-8 0V4z"/></svg>);
    }
    if (name.toLowerCase().includes("mystery") || name.toLowerCase().includes("crime")) {
      return (<svg className={base} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 00-7 7h2a5 5 0 119.6 1.9c-.8 1.6-2.6 2.3-2.6 4.1v1h2v-1c0-1 .8-1.6 1.5-2.2A7 7 0 0012 2zm-1 16h2v2h-2v-2z"/></svg>);
    }
    return (<svg className={base} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9"/></svg>);
  };

  const GenreTag = ({ g }) => (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-800/80 text-teal-300 ring-1 ring-teal-500/20 px-2 py-0.5 text-[10px] font-medium">
      <TagIcon name={g} />
      {g}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-3 items-center gap-4 py-4">
            <h1 className="font-semibold tracking-tight text-slate-100"><span className="rounded bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-transparent">MyCinema</span></h1>
            <div className="flex justify-center">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative w-full max-w-md">
                <svg className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2a8 8 0 105.292 14.292l4.207 4.207 1.414-1.414-4.207-4.207A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/></svg>
                <input id="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search titles, genres..." aria-label="Search movies and shows" className="w-full rounded-lg bg-slate-800/80 pl-10 pr-3 py-2 text-sm placeholder-slate-400 text-slate-100 shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button aria-label="Open notifications" className="mr-3 rounded-full p-2 text-slate-300 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a2 2 0 001.995-1.85L14 20h-4a2 2 0 001.85 1.995L12 22zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"/></svg>
              </button>
              <div className="flex items-center gap-2">
                <div aria-hidden="true" className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-teal-400 text-slate-900 flex items-center justify-center text-sm font-bold">MC</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <nav aria-label="Primary" className="lg:col-span-2">
            <div className="sticky top-[72px] space-y-2 rounded-xl bg-slate-900/70 p-3 shadow-lg shadow-black/30 ring-1 ring-slate-800">
              {[
                { name: "Home", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l10 9h-3v9h-6v-6H11v6H5v-9H2l10-9z"/></svg>) },
                { name: "Watchlist", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h14a2 2 0 012 2v16l-9-4-9 4V5a2 2 0 012-2z"/></svg>) },
                { name: "History", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8v5h4v2h-6V8h2zm0-6a10 10 0 11-7.07 2.93L2 7V2h5L4.84 4.16A8 8 0 1012 4z"/></svg>) },
                { name: "Recommendations", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/></svg>) },
                { name: "Profile", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5.33 0-8 2.667-8 6v2h16v-2c0-3.333-2.667-6-8-6z"/></svg>) }
              ].map((item, idx) => (
                <a key={idx} href="#" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${item.name === "Watchlist" ? "bg-slate-800/70 text-teal-300 ring-1 ring-teal-500/20" : "text-slate-300"}`}>
                  <span className="text-slate-300">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </nav>

          <main className="space-y-6 lg:col-span-7">
            <section aria-labelledby="watchlist-heading" className="rounded-2xl bg-slate-900/70 p-5 shadow-xl shadow-black/30 ring-1 ring-slate-800">
              <h2 id="watchlist-heading" className="mb-4 text-lg font-semibold text-slate-100">Watchlist</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredWatchlist.map(item => (
                  <article key={item.id} className="group overflow-hidden rounded-xl bg-slate-800/70 ring-1 ring-slate-700 shadow-md">
                    <div className="relative">
                      <img src={item.poster} alt={`${item.title} poster`} className="h-48 w-full object-cover" />
                      <div className="absolute left-2 top-2 flex flex-wrap gap-1">
                        {item.genres.slice(0,3).map((g, i) => <GenreTag key={i} g={g} />)}
                      </div>
                      <div className={`absolute right-2 top-2 rounded-md px-2 py-1 text-[10px] font-semibold ${item.watched ? "bg-indigo-500/90 text-white" : "bg-teal-500/90 text-slate-900"}`}>
                        {item.watched ? "Watched" : `Progress ${item.progress}%`}
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      <h3 className="font-semibold text-slate-100">{item.title}</h3>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{item.year}</span>
                        <span>{item.duration}</span>
                      </div>
                      <Rating value={item.rating} />
                      <div className="pt-2">
                        <button
                          aria-pressed={item.watched}
                          aria-label={`Mark ${item.title} as watched`}
                          onClick={() => handleMarkWatched(item.id)}
                          className={`w-full rounded-lg px-3 py-2 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${item.watched ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-gradient-to-r from-teal-400 to-indigo-500 text-slate-900 hover:from-teal-300 hover:to-indigo-400"}`}
                        >
                          {item.watched ? "Undo watched" : "Mark watched"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
                {filteredWatchlist.length === 0 && (
                  <p className="col-span-full rounded-lg border border-dashed border-slate-700 p-6 text-center text-sm text-slate-400">No results in your watchlist for “{query}”.</p>
                )}
              </div>
            </section>

            <section aria-labelledby="discover-heading" className="rounded-2xl bg-slate-900/70 p-5 shadow-xl shadow-black/30 ring-1 ring-slate-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 id="discover-heading" className="text-lg font-semibold text-slate-100">Discover</h2>
                <span className="text-xs text-slate-400">Tailored for you</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recs.map(rec => (
                  <article key={rec.id} className="overflow-hidden rounded-xl bg-slate-800/70 ring-1 ring-slate-700">
                    <div className="relative">
                      <img src={rec.poster} alt={`${rec.title} poster`} className="h-44 w-full object-cover" />
                      <div className="absolute left-2 top-2 flex flex-wrap gap-1">
                        {rec.genres.slice(0,3).map((g, i) => <GenreTag key={i} g={g} />)}
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-100">{rec.title}</h3>
                        <Rating value={rec.rating} />
                      </div>
                      <button
                        aria-label={`Add ${rec.title} to Watchlist`}
                        onClick={() => handleAddToWatchlist(rec)}
                        disabled={isAdded(rec)}
                        className={`w-full rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${isAdded(rec) ? "bg-slate-700 text-slate-300" : "bg-gradient-to-r from-indigo-500 to-teal-400 text-slate-900 hover:from-indigo-400 hover:to-teal-300 shadow-sm"}`}
                      >
                        {isAdded(rec) ? "Added" : "Add to Watchlist"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          <aside className="space-y-6 lg:col-span-3">
            <section className="rounded-2xl bg-slate-900/70 p-5 shadow-xl shadow-black/30 ring-1 ring-slate-800">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div aria-hidden="true" className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 text-slate-900 flex items-center justify-center font-bold">AL</div>
                  <div>
                    <p className="font-medium">Alex Lane</p>
                    <p className="text-xs text-slate-400">Movie Enthusiast</p>
                  </div>
                </div>
                <span className="rounded-md bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300 ring-1 ring-indigo-500/30">Pro</span>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-slate-300">Recent activity</h3>
              <ul className="space-y-3">
                {activities.map(a => (
                  <li key={a.id} className="flex items-start gap-3">
                    <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full bg-slate-800 text-teal-300 ring-1 ring-slate-700 flex items-center justify-center text-xs font-bold">{a.user}</div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-200"><span className="capitalize">{a.action}</span> <span className="text-teal-300">{a.title}</span></p>
                      {a.rating ? <div className="mt-1 flex"><Rating value={a.rating} /></div> : null}
                      <p className="text-xs text-slate-400">{a.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-slate-900/70 p-5 shadow-xl shadow-black/30 ring-1 ring-slate-800">
              <h3 className="mb-4 text-sm font-semibold text-slate-300">Analytics</h3>
              <div className="grid grid-cols-5 items-end gap-2" aria-label="Mini watch analytics">
                {[60, 40, 80, 45, 70].map((h, i) => (
                  <div key={i} className="group flex flex-col items-center gap-1">
                    <div className="w-full rounded-md bg-gradient-to-t from-slate-800 to-slate-700 p-0.5 ring-1 ring-slate-700">
                      <div className="h-24 w-full rounded bg-gradient-to-t from-indigo-500 to-teal-400" style={{height: `${h}%`}} />
                    </div>
                    <span className="text-[10px] text-slate-400">W{i+1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-slate-800/80 p-3">
                <svg viewBox="0 0 200 60" className="h-24 w-full">
                  <polyline points="0,50 30,40 60,42 90,25 120,28 150,15 180,20 200,10" fill="none" stroke="url(#g)" strokeWidth="3" />
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-xs text-slate-400">Weekly watch trend</p>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">{announce}</div>
    </div>
  );
}