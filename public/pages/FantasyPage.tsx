import React, { FC, useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { THEME } from "../theme";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const TARGET_DATE = new Date("2026-07-18T21:00:00-05:00");

const EMPTY_TIME: TimeLeft = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const FantasyPage: FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY_TIME);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(EMPTY_TIME);
        setIsTimeUp(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const units = useMemo(
    () => [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: 0,
        backgroundColor: THEME.palette.sleeper.main,
        paddingTop: "56px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: THEME.palette.sleeper.secondary,
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            marginBottom: "2rem",
            color: THEME.palette.sleeper.tertiary,
          }}
        >
          Fantasy Football Lottery
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
          }}
        >
          {units.map((unit) => (
            <div
              key={unit.label}
              style={{
                backgroundColor: THEME.palette.sleeper.main,
                color: THEME.palette.sleeper.tertiary,
                padding: "1.25rem",
                borderRadius: "10px",
                minWidth: "120px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: "bold",
                }}
              >
                {unit.value}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="contained"
          onClick={() => navigate("/fantasy/lottery")}
          disabled={!isTimeUp}
          sx={{
            marginTop: "20px",
            backgroundColor: THEME.palette.sleeper.quaternary,
            color: THEME.palette.common.black,
            "&:hover": {
              backgroundColor: THEME.palette.sleeper.tertiary,
            },
            "&:disabled": {
              backgroundColor: THEME.palette.button.tertiary,
              color: THEME.palette.common.white,
            },
          }}
        >
          Go to Lottery
        </Button>
      </div>
    </div>
  );
};

export default FantasyPage;
