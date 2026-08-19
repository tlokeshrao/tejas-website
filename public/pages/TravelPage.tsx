import React, { useState, FC } from "react";
// @ts-ignore
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ============================================================
// YOUR DATA — edit this section to add new trips
// ============================================================

const PLACES: Place[] = [
  { code: "IAD", name: "Washington D.C.", country: "USA",         lat: 38.95,  lng: -77.46  },
  { code: "ATL", name: "Atlanta",         country: "USA",         lat: 33.64,  lng: -84.43  },
  { code: "DEN", name: "Denver",          country: "USA",         lat: 39.86,  lng: -104.67 },
  { code: "JFK", name: "New York",        country: "USA",         lat: 40.64,  lng: -73.78  },
  { code: "SAT", name: "San Antonio",     country: "USA",         lat: 29.53,  lng: -98.47  },
  { code: "SFO", name: "San Francisco",   country: "USA",         lat: 37.62,  lng: -122.38 },
  { code: "SAV", name: "Savannah",        country: "USA",         lat: 32.13,  lng: -81.20  },
  { code: "CHS", name: "Charleston",      country: "USA",         lat: 32.90,  lng: -80.04  },
  { code: "STT", name: "St. Thomas",      country: "USVI",        lat: 18.34,  lng: -64.97  },
  { code: "YYZ", name: "Toronto",         country: "Canada",      lat: 43.68,  lng: -79.63  },
  { code: "YUL", name: "Montreal",        country: "Canada",      lat: 45.47,  lng: -73.74  },
  { code: "YQB", name: "Quebec City",     country: "Canada",      lat: 46.79,  lng: -71.39  },
  { code: "LIS", name: "Lisbon",          country: "Portugal",    lat: 38.78,  lng: -9.14   },
  { code: "BCN", name: "Barcelona",       country: "Spain",       lat: 41.30,  lng: 2.08    },
  { code: "GRX", name: "Granada",         country: "Spain",       lat: 37.19,  lng: -3.78   },
  { code: "COR", name: "Córdoba",         country: "Spain",       lat: 37.89,  lng: -4.77   },
  { code: "SVQ", name: "Seville",         country: "Spain",       lat: 37.38,  lng: -5.99   },
  { code: "LHR", name: "London",          country: "UK",          lat: 51.47,  lng: -0.45   },
  { code: "CDG", name: "Paris",           country: "France",      lat: 49.01,  lng: 2.55    },
  { code: "NRT", name: "Tokyo",           country: "Japan",       lat: 35.77,  lng: 140.39  },
  { code: "SAL", name: "San Salvador",    country: "El Salvador", lat: 13.44,  lng: -89.06  },
  { code: "LIM", name: "Lima",            country: "Peru",        lat: -12.02, lng: -77.11  },
  { code: "CUZ", name: "Cusco",           country: "Peru",        lat: -13.54, lng: -71.94  },
  { code: "PTY", name: "Panama City",     country: "Panama",      lat: 9.07,   lng: -79.38  },
  { code: "MEX", name: "Mexico City",     country: "Mexico",      lat: 19.44,  lng: -99.07  },
];

// ============================================================

interface Place {
  code: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
}

const COUNTRIES = Array.from(new Set(PLACES.map(p => p.country)));

const TravelPage: FC = () => {
  const [selected, setSelected] = useState<Place | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [filterCountry, setFilterCountry] = useState<string>("USA");
  const [zoom, setZoom] = useState<number>(1);
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f14", paddingTop: "80px", paddingBottom: "4rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@300;400;500;600&display=swap');
        .tl-dot { transition: transform 0.15s; cursor: pointer; }
        .tl-dot:hover { transform: scale(1.4); }
        .tl-pill { transition: all 0.15s; }
        .tl-pill:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,215,0,0.35) !important; }
        .tl-select {
          appearance: none;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 7px 36px 7px 14px;
          color: rgba(255,255,255,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }
        .tl-select:hover { border-color: rgba(255,215,0,0.3); }
        .tl-select option { background: #1a1a24; color: #fff; }
        .tl-zoom-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          width: 30px;
          height: 30px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .tl-zoom-btn:hover { border-color: rgba(255,215,0,0.3); color: #FFD700; }
        .tl-label {
          position: absolute;
          transform: translate(10px, -50%);
          background: rgba(10,10,16,0.92);
          border: 1px solid rgba(255,215,0,0.3);
          color: #FFD700;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 6px;
          pointer-events: none;
          white-space: nowrap;
          z-index: 10;
        }
      `}</style>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "3rem", color: "#fff", margin: "0 0 0.25rem" }}>
            travel<span style={{ color: "#E3000B" }}>.</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "14px", margin: 0 }}>
            {PLACES.length} places · {new Set(PLACES.map(p => p.country)).size} countries
          </p>
        </div>

        {/* Map container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "50%",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(255,215,0,0.1)",
            marginBottom: "1.5rem",
            background: "#0d1117",
          }}
        >
          {/* Zoom controls */}
          <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10, display: "flex", flexDirection: "column", gap: 4 }}>
            <button className="tl-zoom-btn" onClick={() => setZoom(z => Math.min(z * 1.5, 12))}>+</button>
            <button className="tl-zoom-btn" onClick={() => { setZoom(1); setCenter([0, 0]); }}>⊙</button>
            <button className="tl-zoom-btn" onClick={() => setZoom(z => Math.max(z / 1.5, 1))}>−</button>
          </div>
          <div style={{ position: "absolute", inset: 0 }}>
            <ComposableMap
              projection="geoEquirectangular"
              projectionConfig={{ scale: 153, center: [0, 0] }}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup
                zoom={zoom}
                center={center}
                onMoveEnd={({ zoom: z, coordinates }: { zoom: number; coordinates: [number, number] }) => {
                  setZoom(z);
                  setCenter(coordinates);
                }}
                minZoom={1}
                maxZoom={12}
              >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo: any) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1a2035"
                      stroke="#2d3a55"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#1a2035" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {PLACES.map(pl => {
                const isHov = hovered === pl.code;
                const isSel = selected?.code === pl.code;
                const showLabel = isHov || isSel;

                return (
                  <Marker key={pl.code} coordinates={[pl.lng, pl.lat]}>
                    <g
                      onClick={e => { e.stopPropagation(); setSelected(s => s?.code === pl.code ? null : pl); }}
                      onMouseEnter={() => setHovered(pl.code)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {isSel && (
                        <circle r={10 / zoom} fill="none" stroke="rgba(255,215,0,0.35)" strokeWidth={1 / zoom} />
                      )}
                      <circle
                        r={(isSel ? 6 : 4) / zoom}
                        fill={isSel ? "#FFD700" : "rgba(255,215,0,0.85)"}
                        style={{
                          filter: isSel
                            ? "drop-shadow(0 0 6px rgba(255,215,0,0.5))"
                            : isHov
                            ? "drop-shadow(0 0 4px rgba(255,215,0,0.4))"
                            : "drop-shadow(0 0 3px rgba(255,215,0,0.3))",
                          transition: "all 0.15s",
                        }}
                      />
                      {showLabel && (
                        <>
                          <rect
                            x={12 / zoom}
                            y={-10 / zoom}
                            width={(pl.name.length * 7 + 18) / zoom}
                            height={19 / zoom}
                            rx={4 / zoom}
                            fill="rgba(10,10,16,0.92)"
                            stroke="rgba(255,215,0,0.3)"
                            strokeWidth={0.5 / zoom}
                          />
                          <text
                            x={21 / zoom}
                            y={3 / zoom}
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: `${11 / zoom}px`,
                              fill: "#FFD700",
                              pointerEvents: "none",
                              fontWeight: 500,
                            }}
                          >
                            {pl.name}
                          </text>
                        </>
                      )}
                    </g>
                  </Marker>
                );
              })}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>

        {/* Country DDL + city pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <select
            className="tl-select"
            value={filterCountry}
            onChange={e => { setFilterCountry(e.target.value); setSelected(null); }}
          >
            {COUNTRIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {PLACES.filter(pl => pl.country === filterCountry).map(pl => (
              <button
                key={pl.code}
                className="tl-pill"
                onClick={() => setSelected(s => s?.code === pl.code ? null : pl)}
                style={{
                  background: selected?.code === pl.code ? "rgba(255,215,0,0.1)" : "rgba(255,255,255,0.03)",
                  border: selected?.code === pl.code ? "1px solid rgba(255,215,0,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: selected?.code === pl.code ? "#FFD700" : "rgba(255,255,255,0.6)",
                  fontWeight: selected?.code === pl.code ? 600 : 400,
                }}
              >
                {pl.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TravelPage;