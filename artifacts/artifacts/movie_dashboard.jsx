export default function MyCinemaDashboard(){
  const [query,setQuery]=React.useState("");
  const initialWatchlist=[
    {id:1,title:"Inception",year:2010,runtime:149,rating:4.5,genres:["Sci‑Fi","Thriller"],progress:60,poster:"https://via.placeholder.com/300x450?text=Inception"},
    {id:2,title:"Stranger Things",year:2016,rating:4.2,genres:["Sci‑Fi","Drama"],progress:20,poster:"https://via.placeholder.com/300x450?text=Stranger+Things"},
    {id:3,title:"The Batman",year:2022,runtime:176,rating:4.1,genres:["Action","Crime"],progress:0,poster:"https://via.placeholder.com/300x450?text=The+Batman"}
  ];
  const initialRecs=[
    {id:4,title:"Interstellar",rating:4.7,genres:["Sci‑Fi","Adventure"],poster:"https://via.placeholder.com/300x450?text=Interstellar"},
    {id:5,title:"Dune",rating:4.3,genres:["Sci‑Fi","Drama"],poster:"https://via.placeholder.com/300x450?text=Dune"},
    {id:6,title:"The Matrix",rating:4.8,genres:["Sci‑Fi","Action"],poster:"https://example.com/missing.jpg"}
  ];
  const [watchlist,setWatchlist]=React.useState(initialWatchlist);
  const [watched,setWatched]=React.useState([]);
  const [recs,setRecs]=React.useState(initialRecs);
  const [activity,setActivity]=React.useState([{id:"a1",text:"Welcome to MyCinema! Start building your watchlist.",time:"just now"}]);
  const [imgErrors,setImgErrors]=React.useState(new Set());
  const avatarInitials="JD";
  const genreIcon=(g)=>(
    g==="Sci‑Fi"?<svg className="w-3.5 h-3.5 text-teal-300" viewBox="0 0 24 24" fill="currentColor"><path d="M3 11h6l3-8 3 8h6l-4.9 3.6 1.9 6L12 17l-6 3.6 1.9-6z"/></svg>:
    g==="Action"?<svg className="w-3.5 h-3.5 text-indigo-300" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12l10-9 10 9-10 9L2 12zm10-5l-6.5 5L12 17l6.5-5L12 7z"/></svg>:
    g==="Drama"?<svg className="w-3.5 h-3.5 text-rose-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm-2 7h-2v2h2v-2zm8 0h-6v2h6v-2zm-8 4h6v2H10v-2z"/></svg>:
    g==="Thriller"?<svg className="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7z"/></svg>:
    g==="Adventure"?<svg className="w-3.5 h-3.5 text-emerald-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l9 20-9-5-9 5 9-20z"/></svg>:
    g==="Crime"?<svg className="w-3.5 h-3.5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v6H4V4zm0 10h16v6H4v-6zm3-8v2h2V6H7zm0 10v2h2v-2H7z"/></svg>:null
  );
  const StarRating=({value=0})=>{
    const stars=[1,2,3,4,5];
    return <div className="flex items-center gap-0.5" aria-label={`Rating ${value} out of 5`}>
      {stars.map(s=><svg key={s} className={`w-4 h-4 ${s<=Math.round(value)?'text-yellow-400':'text-slate-500'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.984 2.136c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.38 8.72c-.783-.57-.38-1.81.588-1.81H7.43a1 1 0 00.95-.69l1.07-3.292z"/></svg>)}
    </div>;
  };
  const addToWatchlist=(item)=>{
    setWatchlist(prev=>{
      if(prev.find(m=>m.id===item.id)) return prev;
      return [...prev,{...item,progress:0,year:2024,runtime:120}];
    });
    setRecs(prev=>prev.map(r=>r.id===item.id?{...r,added:true}:r));
    setActivity(a=>[{id:crypto.randomUUID(),text:`Added "${item.title}" to your watchlist.`,time:"now"},...a]);
  };
  const markWatched=(id)=>{
    setWatchlist(prev=>{
      const item=prev.find(m=>m.id===id);
      if(!item) return prev;
      setWatched(w=>[{...item,progress:100,watchedAt:new Date().toLocaleDateString()},...w]);
      setActivity(a=>[{id:crypto.randomUUID(),text:`Marked "${item.title}" as watched.`,time:"now"},...a]);
      return prev.filter(m=>m.id!==id);
    });
  };
  const filteredWatchlist=watchlist.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()));
  const filteredRecs=recs.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()));
  const onImgError=(id,e)=>{
    const p=new Set(Array.from(imgErrors));
    p.add(id);
    setImgErrors(p);
    e.currentTarget.src="https://via.placeholder.com/300x450?text=No+Image";
  };
  const stats=React.useMemo(()=>{
    const all=[...watchlist,...watched];
    const byGenre={};
    all.forEach(m=>m.genres?.forEach(g=>byGenre[g]=(byGenre[g]||0)+1));
    const entries=Object.entries(byGenre).slice(0,4);
    return entries.length?entries:[["Sci‑Fi",2],["Action",1],["Drama",1]];
  },[watchlist,watched]);
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="font-semibold text-lg tracking-tight text-slate-100">MyCinema</div>
          <div className="flex-1 flex justify-center">
            <label className="relative w-full max-w-xl">
              <span className="sr-only">Search</span>
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387-1.414 1.414-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd"/></svg>
              <input aria-label="Search movies and shows" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-800/80 text-slate-100 placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 border border-slate-700"/>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="p-2 rounded-lg hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              <svg className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 00-5 5v3.09c0 .52-.2 1.02-.57 1.39L4 13v1h16v-1l-2.43-1.52a2 2 0 01-.57-1.39V7a5 5 0 00-5-5zm0 20a3 3 0 003-3H9a3 3 0 003 3z"/></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">{avatarInitials}</div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <nav className="lg:col-span-2">
          <div className="bg-slate-800/80 rounded-xl shadow-lg shadow-black/30 p-3">
            <ul className="space-y-1">
              {[
                {label:"Home",icon:(<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 8-1.5 1.5L18 11.1V21H6v-9.9l-1.5 1.4L3 11l9-8z"/></svg>)},
                {label:"Watchlist",icon:(<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12a2 2 0 012 2v16l-8-4-8 4V4a2 2 0 012-2z"/></svg>)},
                {label:"History",icon:(<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8v5l4 2-.7 1.9L10 13V8h2zm0-6a10 10 0 100 20 10 10 0 000-20z"/></svg>)},
                {label:"Recommendations",icon:(<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12l10-9 10 9-4 0v8H6v-8H2z"/></svg>)},
                {label:"Profile",icon:(<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z"/></svg>)}
              ].map((item,i)=>(
                <li key={i}>
                  <button aria-label={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/60 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                    <span className="text-slate-300">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <main className="lg:col-span-7 space-y-6">
          <section aria-labelledby="watchlist-heading" className="bg-slate-800/80 rounded-xl shadow-lg shadow-black/30 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 id="watchlist-heading" className="text-xl font-semibold">Watchlist</h2>
              <span className="text-xs text-slate-400">{filteredWatchlist.length} items</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredWatchlist.map(item=>(
                <article key={item.id} className="rounded-xl bg-slate-900/40 border border-slate-700/50 overflow-hidden">
                  <div className="relative">
                    <img src={item.poster} alt={`Poster of ${item.title}`} onError={(e)=>onImgError(item.id,e)} className="w-full h-48 object-cover"/>
                    <div className="absolute top-2 left-2 flex gap-2">
                      {item.genres.map(g=>(
                        <span key={g} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-600/20 text-teal-300 text-xs border border-teal-500/30">
                          {genreIcon(g)}<span>{g}</span>
                        </span>
                      ))}
                    </div>
                    <span className={`absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full ${item.progress===100?'bg-emerald-600/30 text-emerald-200 border border-emerald-500/30':'bg-indigo-600/30 text-indigo-200 border border-indigo-500/30'}`}>{item.progress===100?"Watched":`Progress ${item.progress}%`}</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="font-medium leading-tight">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <StarRating value={item.rating}/>
                      <span className="text-xs text-slate-400">{item.year || "—"}</span>
                    </div>
                    {imgErrors.has(item.id)?<p className="text-xs text-rose-300">Image not available</p>:null}
                    <div className="flex items-center justify-between mt-2">
                      <button onClick={()=>markWatched(item.id)} aria-label={`Mark ${item.title} as watched`} className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Mark watched</button>
                      <span className="text-xs text-slate-400">{item.runtime?`${item.runtime} min`:""}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section aria-labelledby="discover-heading" className="bg-slate-800/80 rounded-xl shadow-lg shadow-black/30 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 id="discover-heading" className="text-xl font-semibold">Discover</h2>
              <span className="text-xs text-slate-400">{filteredRecs.length} recommendations</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredRecs.map(item=>(
                <article key={item.id} className="rounded-xl bg-slate-900/40 border border-slate-700/50 overflow-hidden">
                  <div className="relative">
                    <img src={item.poster} alt={`Poster of ${item.title}`} onError={(e)=>onImgError(item.id,e)} className="w-full h-40 object-cover"/>
                    <div className="absolute top-2 left-2 flex gap-2">
                      {item.genres.map(g=>(
                        <span key={g} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-600/20 text-teal-300 text-[10px] border border-teal-500/30">
                          {genreIcon(g)}<span>{g}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <StarRating value={item.rating}/>
                    {imgErrors.has(item.id)?<p className="text-[11px] text-rose-300">Image not available</p>:null}
                    <button disabled={item.added || watchlist.some(w=>w.id===item.id)} onClick={()=>addToWatchlist(item)} aria-label={`Add ${item.title} to watchlist`} className={`w-full mt-1 px-3 py-1.5 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${item.added || watchlist.some(w=>w.id===item.id) ? 'bg-slate-700 text-slate-300 cursor-not-allowed':'bg-teal-600 hover:bg-teal-500 text-white'}`}>{item.added || watchlist.some(w=>w.id===item.id) ? 'Added' : 'Add to Watchlist'}</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
        <aside className="lg:col-span-3 space-y-6">
          <section className="bg-slate-800/80 rounded-xl shadow-lg shadow-black/30 p-4">
            <h2 className="text-xl font-semibold mb-3">Profile & Activity</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-semibold">{avatarInitials}</div>
              <div>
                <p className="font-medium">Jordan Doe</p>
                <p className="text-xs text-slate-400">Member since 2021</p>
              </div>
            </div>
            <ul className="space-y-3" aria-label="Recent activity">
              {activity.slice(0,6).map(a=>(
                <li key={a.id} className="text-sm flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-teal-500"></span>
                  <div>
                    <p>{a.text}</p>
                    <span className="text-xs text-slate-400">{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="bg-slate-800/80 rounded-xl shadow-lg shadow-black/30 p-4">
            <h3 className="text-lg font-semibold mb-3">Analytics</h3>
            <div className="text-xs text-slate-400 mb-2">Watch distribution by genre</div>
            <div className="space-y-2">
              {stats.map(([g,count],idx)=>{
                const total=stats.reduce((s,[,c])=>s+c,0);
                const pct=Math.round((count/total)*100);
                return (
                  <div key={g}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="flex items-center gap-1">{genreIcon(g)}<span>{g}</span></span>
                      <span className="text-slate-400">{pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div className={`h-full ${idx%2===0?'bg-indigo-500':'bg-teal-500'}`} style={{width:`${pct}%`}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <svg viewBox="0 0 200 60" className="w-full mt-4 rounded-lg bg-slate-900/40 border border-slate-700">
              <polyline fill="none" stroke="#34d399" strokeWidth="2" points="0,40 20,30 40,32 60,20 80,25 100,18 120,22 140,15 160,18 180,12 200,10"/>
              <polyline fill="none" stroke="#6366f1" strokeWidth="2" points="0,48 20,45 40,44 60,38 80,40 100,36 120,35 140,30 160,28 180,25 200,22"/>
            </svg>
          </section>
        </aside>
      </div>
      <footer className="px-4 pb-6 max-w-7xl mx-auto text-center text-xs text-slate-500">© {new Date().getFullYear()} MyCinema</footer>
    </div>
  );
}