import { useState, useEffect } from 'react';

export const NowPage = () => {
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      const token = params.get('access_token');
      if (token) {
        fetchTrack(token);
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const fetchTrack = async (token: string) => {
    setLoading(true);
    setError('');
    try {
      const r = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) throw new Error();
      const d = await r.json();
      if (d.items?.length > 0) {
        const item = d.items[0].track;
        setTrack({
          name: item.name,
          artist: item.artists.map((a: any) => a.name).join(', '),
          img: item.album.images[0]?.url,
          url: item.external_urls.spotify,
          playedAt: d.items[0].played_at,
        });
      }
    } catch {
      setError('Couldn\'t fetch. Token may have expired — try reconnecting.');
    }
    setLoading(false);
  };

  const connect = () => {
    if (!clientId.trim()) {
      setError('Enter your Client ID first.');
      return;
    }
    const redirect = encodeURIComponent(window.location.href.split('#')[0]);
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirect}&scope=${encodeURIComponent('user-read-recently-played')}`;
  };

  const timeAgo = (iso: string) => {
    if (!iso) return '';
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f0f14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '56px',
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@300;400;500;600&display=swap'); input::placeholder{color:rgba(255,255,255,0.25);} .sp-track:hover{background:rgba(30,215,96,0.08)!important;}`}</style>
      <div style={{ maxWidth: '460px', width: '100%', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '3rem', color: '#fff', margin: '0 0 0.4rem' }}>
            now<span style={{ color: '#E3000B' }}>.</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.35)', fontSize: '14px', margin: 0 }}>
            what's been playing lately
          </p>
        </div>

        <div style={{ background: 'rgba(30,215,96,0.05)', border: '1px solid rgba(30,215,96,0.2)', borderRadius: '20px', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.3rem', color: '#1DB954', margin: 0 }}>
              last played
            </h2>
          </div>

          {loading && (
            <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '14px', textAlign: 'center', padding: '1rem 0' }}>
              fetching...
            </div>
          )}

          {track && (
            <a
              href={track.url}
              target="_blank"
              rel="noreferrer"
              className="sp-track"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem',
                borderRadius: '12px',
                transition: 'background 0.2s',
              }}
            >
              {track.img && <img src={track.img} alt="" style={{ width: '60px', height: '60px', borderRadius: '8px', flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '16px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {track.name}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                  {track.artist}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#1DB954', marginTop: '4px' }}>
                  ♫ {timeAgo(track.playedAt)}
                </div>
              </div>
            </a>
          )}

          {!track && !loading && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Spotify Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && connect()}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#fff',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={connect}
                  style={{
                    background: '#1DB954',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    color: '#000',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  connect
                </button>
              </div>
              {error && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#ff6b6b', fontSize: '12px', margin: '0 0 0.75rem' }}>
                  {error}
                </p>
              )}
              <button
                onClick={() => setShowHelp((s) => !s)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {showHelp ? '▲ hide setup guide' : '▼ how to get a client id'}
              </button>
              {showHelp && (
                <div style={{ marginTop: '0.75rem', padding: '1rem', background: 'rgba(0,0,0,0.25)', borderRadius: '10px' }}>
                  {['Go to developer.spotify.com/dashboard', 'Log in and click "Create app"', 'Add this page\'s URL as a Redirect URI', 'Copy the Client ID and paste it above'].map((s, i) => (
                    <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: '0 0 6px', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#1DB954', fontWeight: 600, flexShrink: 0 }}>{i + 1}.</span>
                      {s}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
