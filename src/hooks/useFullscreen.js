import { useCallback } from "react";

// Bật/tắt toàn màn hình.
export function useFullscreen() {
  return useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);
}
