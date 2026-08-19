import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { THEME } from "../theme";

interface Contestant {
  name: string;
  percent: number;
  color: string;
  message: string;
}

interface Winner {
  name: string;
  color: string;
  message: string;
}

const INITIAL_CONTESTANTS: Contestant[] = [
  { name: "Grosgab", percent: 17.3, color: THEME.palette.wheel.main, message: "Anything has to be better than 2024 right?" },
  { name: "Aster", percent: 13.2, color: THEME.palette.wheel.secondary, message: "Pay your fines" },
  { name: "Tac", percent: 12.7, color: THEME.palette.wheel.tertiary, message: "Maybe make the playoffs this year?" },
  { name: "Djez", percent: 12.2, color: THEME.palette.wheel.quaternary, message: "2026-2027 Froots Fantasy Champion!" },
  { name: "Keshav", percent: 10.7, color: THEME.palette.wheel.quinary, message: "Welcome" },
  { name: "Pratek", percent: 9.1, color: THEME.palette.wheel.senary, message: "All his players are gonna be named aster anyway" },
  { name: "Rishi", percent: 7.6, color: THEME.palette.wheel.septenary, message: "No Achane keeper this year" },
  { name: "Vinay", percent: 6.1, color: THEME.palette.wheel.octonary, message: "Welcome." },
  { name: "Prote", percent: 4.6, color: THEME.palette.wheel.nonary, message: "Remember Drew Brees is not in this draft!" },
  { name: "Moon", percent: 3.0, color: THEME.palette.wheel.denary, message: "I hate Moon." },
  { name: "Gman", percent: 2.0, color: THEME.palette.wheel.undenary, message: "You're not getting Bijan JSN and Kyren again." },
  { name: "Boonx", percent: 1.5, color: THEME.palette.wheel.duodenary, message: "Last year's champ, last year as champ." },
];

const toHexColor = (rgb: [number, number, number]): string =>
  `#${rgb
    .map((component) => component.toString(16).padStart(2, "0"))
    .join("")}`;

const LotteryPage: FC = () => {
  const [contestants, setContestants] = useState<Contestant[]>(INITIAL_CONTESTANTS);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [winners, setWinners] = useState<Array<{ name: string; color: string }>>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [remainingSpins, setRemainingSpins] = useState(12);
  const [rotation, setRotation] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const totalChance = useMemo(
    () => contestants.reduce((sum, contestant) => sum + contestant.percent, 0),
    [contestants],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const size = 420;
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const radius = size / 2;
    let startAngle = 0;

    context.clearRect(0, 0, size, size);
    context.save();
    context.translate(radius, radius);
    context.rotate((rotation * Math.PI) / 180);
    context.translate(-radius, -radius);

    contestants.forEach((contestant) => {
      const sliceAngle = (contestant.percent / totalChance) * 2 * Math.PI;

      context.fillStyle = contestant.color;
      context.beginPath();
      context.moveTo(radius, radius);
      context.arc(radius, radius, radius, startAngle, startAngle + sliceAngle);
      context.closePath();
      context.fill();

      context.save();
      context.translate(radius, radius);
      context.rotate(startAngle + sliceAngle / 2);
      context.textAlign = "right";
      context.fillStyle = "#ffffff";
      context.font = "16px Arial";

      const textFits = context.measureText(contestant.name).width < radius - 36;
      if (textFits) {
        context.fillText(contestant.name, radius - 12, 4);
      } else {
        context.beginPath();
        context.moveTo(radius - 10, 0);
        context.lineTo(radius - 28, -10);
        context.lineTo(radius - 28, 10);
        context.closePath();
        context.fill();
      }

      context.restore();
      startAngle += sliceAngle;
    });

    context.restore();
  }, [contestants, rotation, totalChance]);

  const removeContestant = (name: string) => {
    setContestants((current) => {
      const next = current.filter((contestant) => contestant.name !== name);
      const nextTotal = next.reduce((sum, contestant) => sum + contestant.percent, 0);
      if (nextTotal === 0) {
        return [];
      }

      return next.map((contestant) => ({
        ...contestant,
        percent: (contestant.percent / nextTotal) * 100,
      }));
    });
  };

  const pickWinnerByPointerColor = (): Winner | null => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    const pointerX = Math.floor(canvas.width / 2);
    const pointerY = 31;

    const pixel = context.getImageData(pointerX, pointerY, 1, 1).data;
    const color = toHexColor([pixel[0], pixel[1], pixel[2]]);

    const selected = contestants.find(
      (contestant) => contestant.color.toLowerCase() === color.toLowerCase(),
    );

    if (selected) {
      return {
        name: selected.name,
        color: selected.color,
        message: selected.message,
      };
    }

    for (let y = pointerY + 1; y < canvas.height; y += 1) {
      const fallbackPixel = context.getImageData(pointerX, y, 1, 1).data;
      const fallbackColor = toHexColor([fallbackPixel[0], fallbackPixel[1], fallbackPixel[2]]);
      const fallback = contestants.find(
        (contestant) => contestant.color.toLowerCase() === fallbackColor.toLowerCase(),
      );
      if (fallback) {
        return {
          name: fallback.name,
          color: fallback.color,
          message: fallback.message,
        };
      }
    }

    return null;
  };

  const spinWheel = () => {
    if (isSpinning || remainingSpins <= 0 || contestants.length === 0) {
      return;
    }

    setIsSpinning(true);
    setWinner(null);

    const duration = 10000 + Math.random() * 5000;
    const startTime = performance.now();
    const startRotation = rotation;
    const spinSpeed = 720;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRotation(startRotation + eased * spinSpeed * (duration / 1000));

      if (progress < 1) {
        requestAnimationFrame(animate);
        return;
      }

      const selected = pickWinnerByPointerColor();
      if (selected) {
        setWinner(selected);
        setWinners((current) => [...current, { name: selected.name, color: selected.color }]);
        setRemainingSpins((current) => current - 1);
        setShowModal(true);
      }

      setIsSpinning(false);
    };

    requestAnimationFrame(animate);
  };

  const resetWheel = () => {
    setContestants(INITIAL_CONTESTANTS);
    setWinner(null);
    setWinners([]);
    setIsSpinning(false);
    setRemainingSpins(12);
    setRotation(0);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    if (winner) {
      removeContestant(winner.name);
    }
  };

  return (
    <div
      style={{
        backgroundColor: THEME.palette.sleeper.main,
        fontFamily: "Arial, sans-serif",
        color: THEME.palette.sleeper.tertiary,
        textAlign: "center",
        minHeight: "100vh",
        padding: "72px 1rem 2rem",
        position: "relative",
      }}
    >
      <button
        onClick={resetWheel}
        style={{
          position: "absolute",
          top: "72px",
          right: "1rem",
          backgroundColor: THEME.palette.button.secondary,
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 14px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Reset Draft
      </button>

      <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1.5rem" }}>
        Welcome to the 2026 Fantasy Draft
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <section
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "1rem",
            textAlign: "left",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Remaining Contestants</h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.35rem" }}>
            {contestants.map((contestant) => (
              <li key={contestant.name} style={{ color: "rgba(255,255,255,0.9)" }}>
                {contestant.name} - {contestant.percent.toFixed(1)}% chance
              </li>
            ))}
          </ul>
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "min(420px, 90vw)",
              aspectRatio: "1 / 1",
              border: `2px solid ${THEME.palette.common.white}`,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                borderTop: `30px solid ${THEME.palette.button.primary}`,
                zIndex: 10,
              }}
            />
          </div>

          <button
            onClick={spinWheel}
            disabled={isSpinning || remainingSpins <= 0}
            style={{
              padding: "12px 24px",
              fontSize: "1.1rem",
              backgroundColor: THEME.palette.sleeper.quaternary,
              color: THEME.palette.common.black,
              border: "none",
              borderRadius: "8px",
              cursor: isSpinning || remainingSpins <= 0 ? "not-allowed" : "pointer",
              opacity: isSpinning || remainingSpins <= 0 ? 0.6 : 1,
            }}
          >
            {remainingSpins <= 0 ? "Draft Complete" : isSpinning ? "Spinning..." : "Spin Wheel"}
          </button>

          <div>Spins remaining: {remainingSpins}</div>
        </section>

        <section
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", paddingBottom: "0.6rem" }}>Order</th>
                <th style={{ textAlign: "left", paddingBottom: "0.6rem" }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {winners.length > 0 ? (
                winners.map((pick, index) => (
                  <tr key={`${pick.name}-${index}`} style={{ color: pick.color }}>
                    <td style={{ padding: "0.25rem 0" }}>{index + 1}</td>
                    <td style={{ padding: "0.25rem 0" }}>{pick.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>Lottery not started yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>

      {showModal && winner && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
            padding: "1rem",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: THEME.palette.sleeper.secondary,
              borderRadius: "12px",
              padding: "1.5rem",
              width: "min(520px, 95vw)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 style={{ marginTop: 0 }}>The Winner Is...</h2>
            <div style={{ color: winner.color, fontSize: "2.4rem", fontWeight: 700 }}>{winner.name}</div>
            <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{winner.message}</p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "0.5rem",
                backgroundColor: THEME.palette.button.secondary,
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 18px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotteryPage;
