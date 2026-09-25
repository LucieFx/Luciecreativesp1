/**
 * YouTube IFrame Player API Registry & Lifecycle Controller
 * Manages dynamic loading of the YouTube API script and coordinates
 * "pause-others" cross-player synchronization across the entire application.
 */

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

class YouTubeRegistry {
  private players: Map<string, any> = new Map();
  private isApiLoading = false;
  private isApiReady = false;
  private readyCallbacks: (() => void)[] = [];

  /**
   * Dynamically loads the YouTube IFrame API script once
   */
  public loadApi(): Promise<void> {
    if (typeof window === "undefined") {
      return Promise.resolve();
    }

    if (this.isApiReady && window.YT && window.YT.Player) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.readyCallbacks.push(resolve);

      if (this.isApiLoading) {
        return;
      }

      this.isApiLoading = true;

      // If already present in DOM
      if (window.YT && window.YT.Player) {
        this.onReady();
        return;
      }

      // Hook global callback
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        this.onReady();
      };

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    });
  }

  private onReady() {
    this.isApiReady = true;
    this.isApiLoading = false;
    while (this.readyCallbacks.length > 0) {
      const cb = this.readyCallbacks.shift();
      if (cb) cb();
    }
  }

  public register(id: string, player: any) {
    this.players.set(id, player);
  }

  public unregister(id: string) {
    this.players.delete(id);
  }

  public getPlayer(id: string) {
    return this.players.get(id);
  }

  /**
   * Pause-others behavior: the moment any video starts playing,
   * call pauseVideo() on every other active player instance on the page.
   */
  public pauseAllExcept(activeId: string) {
    this.players.forEach((player, id) => {
      if (id !== activeId && player && typeof player.pauseVideo === "function") {
        try {
          // Check state if available: 1 = PLAYING, 3 = BUFFERING
          const state = typeof player.getPlayerState === "function" ? player.getPlayerState() : -1;
          if (state === 1 || state === 3) {
            player.pauseVideo();
          }
        } catch (e) {
          // Ignore transient cross-frame errors
        }
      }
    });
  }

  /**
   * Pause all active players (e.g. upon tab switch or modal open)
   */
  public pauseAll() {
    this.players.forEach((player) => {
      if (player && typeof player.pauseVideo === "function") {
        try {
          player.pauseVideo();
        } catch (e) {
          // Ignore
        }
      }
    });
  }
}

export const youTubeRegistry = new YouTubeRegistry();
