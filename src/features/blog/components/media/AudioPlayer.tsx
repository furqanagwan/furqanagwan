"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      const time = (value / 100) * duration;
      audioRef.current.currentTime = time;
      setProgress(value);
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  return (
    <div className="flex items-center gap-4 py-4 w-full max-w-md animate-fade-in group">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity shrink-0"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause size={14} className="fill-current" />
        ) : (
          <Play size={14} className="fill-current ml-0.5" />
        )}
      </button>

      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-foreground">Listen to article</span>
          <span className="text-muted-foreground">
            {formatTime(duration > 0 ? duration - currentTime : 0)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-black dark:bg-white transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
