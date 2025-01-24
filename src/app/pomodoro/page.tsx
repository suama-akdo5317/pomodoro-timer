'use client';

import React, { useState, useEffect } from 'react';
import { Timer, PlayCircle, PauseCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const nextPeriod = isWorkTime ? 5 * 60 : 25 * 60;
      setTimeLeft(nextPeriod);
      setIsWorkTime(!isWorkTime);
      setIsRunning(false);

      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === "granted") {
        new Notification(isWorkTime ? "休憩時間です！" : "作業を始めましょう！");
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorkTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsWorkTime(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <Card className="w-96 bg-white dark:bg-slate-800">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Timer className="w-8 h-8 mr-2" />
              <h2 className="text-2xl font-bold">
                {isWorkTime ? "作業時間" : "休憩時間"}
              </h2>
            </div>

            <div className="text-6xl font-mono mb-8">
              {formatTime(timeLeft)}
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={toggleTimer}
                className="w-24"
                variant="outline"
              >
                {isRunning ? (
                  <PauseCircle className="w-6 h-6" />
                ) : (
                  <PlayCircle className="w-6 h-6" />
                )}
              </Button>

              <Button
                onClick={resetTimer}
                className="w-24"
                variant="outline"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
