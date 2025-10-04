import { useEffect, useRef, useState, useCallback } from 'react';

export function useLazyVideo(): { videoRef: React.RefObject<HTMLVideoElement | null>; isVisible: boolean } {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.load(); // Ensures src fetches if lazy
      await video.play();
    } catch (e) {
      console.warn('Lazy play failed (may need user interaction):', e);
    }
  }, []);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.pause();
      if (video.currentTime > 0) {
        video.currentTime = 0; // Reset for loop
      }
    } catch (e) {
      console.warn('Pause failed:', e);
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        root: null, // Use viewport
        rootMargin: '200px', // Preload 200px before entering view (helps fast scrolls)
        threshold: 0.1 // Start when 10% visible
      }
    );

    observer.observe(videoRef.current); // Observe the video itself

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isVisible, playVideo, pauseVideo]);

  return { videoRef, isVisible };
}