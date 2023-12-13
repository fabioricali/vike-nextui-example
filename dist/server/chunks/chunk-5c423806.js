import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import React, { useContext, createContext, useReducer, useRef, useMemo, useEffect, useState, useLayoutEffect } from "react";
import * as PropTypes from "prop-types";
import PropTypes__default from "prop-types";
import { Button, NextUIProvider } from "@nextui-org/react";
import videojs from "video.js";
import "videojs-contrib-ads";
import "videojs-ima";
import { useSlider, useFocusRing, useSliderThumb, VisuallyHidden, mergeProps } from "react-aria";
import { useSliderState } from "react-stately";
import clsx from "clsx";
import { Disclosure } from "@headlessui/react";
import "react-social-icons";
import "canvas-confetti";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { encode } from "html-entities";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
const PageShell$1 = "";
let childrenPropType = PropTypes__default.oneOfType([PropTypes__default.arrayOf(PropTypes__default.node), PropTypes__default.node]).isRequired;
const Context = React.createContext(void 0);
PageContextProvider.propTypes = {
  pageContext: PropTypes__default.any,
  children: childrenPropType
};
function PageContextProvider({ pageContext, children }) {
  return /* @__PURE__ */ jsx(Context.Provider, { value: pageContext, children });
}
function usePageContext() {
  return useContext(Context);
}
Link.propTypes = {
  className: PropTypes__default.string,
  href: PropTypes__default.string.isRequired
};
function Link(props) {
  const pageContext = usePageContext();
  const className = [props.className, pageContext.urlPathname === props.href && "is-active"].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("a", { ...props, className: className + " transition duration-300 text-white hover:text-yellow-500 _bg-yellow-300" });
}
const videoJs = "";
const videojsContribAds = "";
const videojs_ima = "";
const EPISODE_LAST_TIME_LOCALSTORAGE_PREFIX = "episodeLastTime";
function findEpisodeIndex(episodes, fileUrl) {
  return episodes.findIndex((episode) => episode.fileUrl === fileUrl);
}
const ActionKind = {
  SET_META: "SET_META",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  SET_CURRENT_TIME: "SET_CURRENT_TIME",
  SET_DURATION: "SET_DURATION",
  PLAYER_ENGINE_READY: "PLAYER_ENGINE_READY",
  LOADING: "LOADING"
};
const MediaPlayerContext = createContext(null);
function mediaReducer(state, action) {
  switch (action.type) {
    case ActionKind.SET_META:
      return { ...state, episode: action.payload };
    case ActionKind.PLAY:
      return { ...state, playing: true };
    case ActionKind.PAUSE:
      return { ...state, playing: false };
    case ActionKind.TOGGLE_MUTE:
      return { ...state, muted: action.payload };
    case ActionKind.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case ActionKind.SET_DURATION:
      return { ...state, duration: action.payload };
    case ActionKind.PLAYER_ENGINE_READY:
      return { ...state, playerEngineReady: true };
    case ActionKind.LOADING:
      return { ...state, loading: action.payload };
  }
}
function MediaProvider({ children }) {
  let [state, dispatch] = useReducer(mediaReducer, {
    playing: false,
    loading: false,
    muted: false,
    duration: 0,
    currentTime: 0,
    episode: null,
    playerEngineReady: false,
    playerElement: null
  });
  let playerContainerRef = useRef(null);
  let playerElementRef = useRef(null);
  let playerRef = useRef(null);
  let { pageProps } = usePageContext();
  let actions = useMemo(() => {
    return {
      resumePlay() {
        playerRef.current.reset();
        setTimeout(() => {
          this.play(playerRef.current.episode);
        });
      },
      getLocalLastCurrentTime(episode) {
        if (episode) {
          const lastCurrentTime = EPISODE_LAST_TIME_LOCALSTORAGE_PREFIX + (episode.id || episode.episodeId);
          const lastCurrentTimeFound = localStorage.getItem(lastCurrentTime);
          if (lastCurrentTimeFound) {
            playerRef.current.currentTime(lastCurrentTimeFound);
          } else {
            playerRef.current.currentTime(0);
          }
        }
      },
      setLocalLastCurrentTime(episode, currentTime) {
        if (currentTime === void 0)
          return;
        localStorage.setItem(EPISODE_LAST_TIME_LOCALSTORAGE_PREFIX + episode.id || episode.episodeId, currentTime);
      },
      deleteLocalLastCurrentTime(episode) {
        localStorage.removeItem(EPISODE_LAST_TIME_LOCALSTORAGE_PREFIX + episode.id || episode.episodeId);
      },
      play(episode) {
        var _a2;
        if (episode) {
          dispatch({ type: ActionKind.SET_META, payload: episode });
          if (playerRef.current && playerRef.current.currentSrc() !== episode.fileUrl) {
            let playbackRate = playerRef.current.playbackRate();
            playerRef.current.episode = episode;
            playerRef.current.src(episode.fileUrl);
            playerRef.current.load();
            playerRef.current.pause();
            playerRef.current.playbackRate(playbackRate);
            this.getLocalLastCurrentTime(episode);
          }
        }
        (_a2 = playerRef.current) == null ? void 0 : _a2.play();
      },
      prev() {
        if (!pageProps.onDemandEpisodes)
          return;
        let currentIndex = findEpisodeIndex(pageProps.onDemandEpisodes, playerRef.current.src());
        if (currentIndex > -1) {
          let prevEpisode = pageProps.onDemandEpisodes[--currentIndex];
          if (prevEpisode) {
            actions.play(prevEpisode);
          }
        }
      },
      next() {
        if (!pageProps.onDemandEpisodes)
          return;
        let currentIndex = findEpisodeIndex(pageProps.onDemandEpisodes, playerRef.current.src());
        if (currentIndex > -1) {
          let nextEpisode = pageProps.onDemandEpisodes[++currentIndex];
          if (nextEpisode) {
            actions.play(nextEpisode);
          }
        }
      },
      moveDomElementAt(newParentElement) {
        this.getPlayerElement()._orginalParentElement = this.getPlayerWrapperElement().parentElement;
        newParentElement.appendChild(this.getPlayerWrapperElement());
      },
      resetDomElementAt() {
        if (this.getPlayerElement()._orginalParentElement) {
          this.getPlayerElement()._orginalParentElement.appendChild(this.getPlayerWrapperElement());
        }
      },
      poster(imageUrl) {
        playerRef.current.poster(imageUrl);
      },
      pause() {
        var _a2;
        (_a2 = playerRef.current) == null ? void 0 : _a2.pause();
      },
      toggle(episode) {
        this.isPlaying(episode) ? actions.pause() : actions.play(episode);
      },
      seekBy(amount) {
        if (playerRef.current) {
          playerRef.current.currentTime(playerRef.current.currentTime() + amount);
        }
      },
      seek(time) {
        if (playerRef.current) {
          playerRef.current.currentTime(time);
        }
      },
      playbackRate(rate) {
        if (playerRef.current) {
          playerRef.current.playbackRate(rate);
        }
      },
      toggleMute() {
        const muted = !playerRef.current.muted();
        dispatch({
          type: ActionKind.TOGGLE_MUTE,
          payload: muted
        });
        playerRef.current.muted(muted);
      },
      isPlaying(episode) {
        return episode ? state.playing && this.isCurrent(episode) : state.playing;
      },
      isCurrent(episode) {
        var _a2;
        return ((_a2 = playerRef.current) == null ? void 0 : _a2.currentSrc()) === episode.fileUrl;
      },
      isEmpty() {
        var _a2;
        return ((_a2 = playerRef.current) == null ? void 0 : _a2.currentSrc()) === "";
      },
      getPlayerElement() {
        return playerElementRef.current;
      },
      getPlayerWrapperElement() {
        return playerElementRef.current.parentElement;
      }
    };
  }, [state.playing]);
  useEffect(() => {
    if (!playerRef.current) {
      const videoJsElement = playerElementRef.current = document.createElement("video");
      videoJsElement.setAttribute("class", "video-js vjs-fluid");
      playerContainerRef.current.appendChild(videoJsElement);
      const videoJsInstance = videojs(videoJsElement, {
        loadingSpinner: false
        //controlBar: false
      }, () => {
        dispatch({ type: ActionKind.PLAYER_ENGINE_READY });
      });
      videoJsInstance.on("play", () => {
        dispatch({ type: ActionKind.PLAY });
      });
      videoJsInstance.on("pause", () => dispatch({ type: ActionKind.PAUSE }));
      videoJsInstance.on("timeupdate", () => {
        const currentTime = playerRef.current.currentTime();
        dispatch({
          type: ActionKind.SET_CURRENT_TIME,
          payload: Math.floor(currentTime)
        });
        actions.setLocalLastCurrentTime(playerRef.current.episode, currentTime);
      });
      videoJsInstance.on("durationchange", () => dispatch({
        type: ActionKind.SET_DURATION,
        payload: Math.floor(playerRef.current.duration())
      }));
      videoJsInstance.on("ended", () => {
        actions.deleteLocalLastCurrentTime(playerRef.current.episode);
        actions.next();
      });
      videoJsInstance.on("seeking", () => dispatch({ type: ActionKind.LOADING, payload: true }));
      videoJsInstance.on("seeked", () => dispatch({ type: ActionKind.LOADING, payload: false }));
      videoJsInstance.on("waiting", () => dispatch({ type: ActionKind.LOADING, payload: true }));
      videoJsInstance.on("stalled", () => dispatch({ type: ActionKind.LOADING, payload: true }));
      videoJsInstance.on("canplaythrough", () => dispatch({ type: ActionKind.LOADING, payload: false }));
      videoJsInstance.on("playing", () => dispatch({ type: ActionKind.LOADING, payload: false }));
      videoJsInstance.on("error", (e) => {
        console.log("error", e, videoJsInstance);
        actions.resumePlay();
      });
      playerRef.current = videoJsInstance;
    }
  }, [playerContainerRef]);
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);
  useEffect(() => {
  }, [pageProps.episode]);
  let api = useMemo(() => ({ ...state, ...actions }), [state, actions]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MediaPlayerContext.Provider, { value: api, children }),
    /* @__PURE__ */ jsx("div", { className: "hidden", ref: playerContainerRef })
  ] });
}
function useMediaPlayer(episode) {
  let player = useContext(MediaPlayerContext);
  return useMemo(
    () => ({
      ...player,
      play() {
        player.play(episode);
      },
      toggle() {
        player.toggle(episode);
      },
      get playing() {
        return player.isPlaying(episode);
      },
      get loading() {
        return player.loading && player.isPlaying(episode);
      }
    }),
    [player, episode]
  );
}
MediaProvider.propTypes = {
  children: PropTypes__default.any
};
function ForwardIcon(props) {
  return /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", fill: "none", ...props, children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M16 5L19 8M19 8L16 11M19 8H10.5C7.46243 8 5 10.4624 5 13.5C5 15.4826 5.85204 17.2202 7 18.188",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M13 15V19",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M16 18V16C16 15.4477 16.4477 15 17 15H18C18.5523 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H17C16.4477 19 16 18.5523 16 18Z",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function ForwardButton({ player, amount = 10 }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: "group relative rounded-full transition hover:scale-110 active:scale-90",
      onClick: () => player.seekBy(amount),
      "aria-label": `Fast-forward ${amount} seconds`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 -left-2 md:hidden" }),
        /* @__PURE__ */ jsx(ForwardIcon, { className: "h-6 w-6 stroke-white/60 " })
      ]
    }
  );
}
function MuteIcon({ muted, ...props }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: muted ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("path", { d: "M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" }),
        /* @__PURE__ */ jsx("path", { d: "M16 10L19 13", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M19 10L16 13", fill: "none" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("path", { d: "M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" }),
        /* @__PURE__ */ jsx("path", { d: "M17 7C17 7 19 9 19 12C19 15 17 17 17 17", fill: "none" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15.5 10.5C15.5 10.5 16 10.9998 16 11.9999C16 13 15.5 13.5 15.5 13.5",
            fill: "none"
          }
        )
      ] })
    }
  );
}
function MuteButton({ player }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: "group relative rounded-md transition hover:scale-110 active:scale-90 -focus:outline-none -focus:ring-2 -focus:ring-slate-400 -focus:ring-offset-2 md:order-none",
      onClick: () => player.toggleMute(),
      "aria-label": player.muted ? "Unmute" : "Mute",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 md:hidden" }),
        /* @__PURE__ */ jsx(
          MuteIcon,
          {
            muted: player.muted,
            className: "h-6 w-6 fill-white stroke-white -group-hover:scale-110"
          }
        )
      ]
    }
  );
}
const playbackRates = [
  {
    value: 1,
    icon: function PlaybackIcon(props) {
      return /* @__PURE__ */ jsxs(
        "svg",
        {
          "aria-hidden": "true",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "white",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          ...props,
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z",
                fill: "currentColor",
                stroke: "currentColor",
                strokeWidth: "2"
              }
            ),
            /* @__PURE__ */ jsx("path", { d: "M3.75 7.25L5.25 5.77539V11.25" }),
            /* @__PURE__ */ jsx("path", { d: "M8.75 7.75L11.25 10.25" }),
            /* @__PURE__ */ jsx("path", { d: "M11.25 7.75L8.75 10.25" })
          ]
        }
      );
    }
  },
  {
    value: 1.5,
    icon: function PlaybackIcon2(props) {
      return /* @__PURE__ */ jsxs(
        "svg",
        {
          "aria-hidden": "true",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "white",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          ...props,
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z",
                fill: "currentColor",
                stroke: "currentColor",
                strokeWidth: "2"
              }
            ),
            /* @__PURE__ */ jsx("path", { d: "M2.75 7.25L4.25 5.77539V11.25" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M7.5 11C7.5 11.2761 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.2761 6.5 11C6.5 10.7239 6.72386 10.5 7 10.5C7.27614 10.5 7.5 10.7239 7.5 11Z",
                strokeWidth: "1"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M12.25 5.75H9.75V8.25H10.75C11.5784 8.25 12.25 8.92157 12.25 9.75V9.75C12.25 10.5784 11.5784 11.25 10.75 11.25H9.75"
              }
            )
          ]
        }
      );
    }
  },
  {
    value: 2,
    icon: function PlaybackIcon3(props) {
      return /* @__PURE__ */ jsxs(
        "svg",
        {
          "aria-hidden": "true",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "white",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          ...props,
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z",
                fill: "currentColor",
                stroke: "currentColor",
                strokeWidth: "2"
              }
            ),
            /* @__PURE__ */ jsx("path", { d: "M9.75 8.75L12.25 11.25" }),
            /* @__PURE__ */ jsx("path", { d: "M12.25 8.75L9.75 11.25" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3.75 7.25C3.75 7.25 3.90144 5.75 5.63462 5.75C6.1633 5.75 6.5448 5.95936 6.81973 6.25035C7.67157 7.15197 6.97033 8.47328 6.0238 9.28942L3.75 11.25H7.25"
              }
            )
          ]
        }
      );
    }
  }
];
function PlaybackRateButton({ player }) {
  let [playbackRate, setPlaybackRate] = useState(playbackRates[0]);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: "relative flex h-6 w-6 items-center justify-center rounded-md text-white/20 transition hover:scale-110 active:scale-90",
      onClick: () => {
        setPlaybackRate((rate) => {
          let existingIdx = playbackRates.indexOf(rate);
          let idx = (existingIdx + 1) % playbackRates.length;
          let next = playbackRates[idx];
          player.playbackRate(next.value);
          return next;
        });
      },
      "aria-label": "Playback rate",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute md:hidden" }),
        /* @__PURE__ */ jsx(playbackRate.icon, { className: "h-4 w-4" })
      ]
    }
  );
}
function PauseIcon(props) {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 36 36", "aria-hidden": "true", ...props, children: /* @__PURE__ */ jsx("path", { d: "M8.5 4C7.67157 4 7 4.67157 7 5.5V30.5C7 31.3284 7.67157 32 8.5 32H11.5C12.3284 32 13 31.3284 13 30.5V5.5C13 4.67157 12.3284 4 11.5 4H8.5ZM24.5 4C23.6716 4 23 4.67157 23 5.5V30.5C23 31.3284 23.6716 32 24.5 32H27.5C28.3284 32 29 31.3284 29 30.5V5.5C29 4.67157 28.3284 4 27.5 4H24.5Z" }) });
}
function PlayIcon(props) {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 36 36", "aria-hidden": "true", ...props, children: /* @__PURE__ */ jsx("path", { d: "M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z" }) });
}
function PlayButton({ player }) {
  let Icon = player.playing ? PauseIcon : PlayIcon;
  return /* @__PURE__ */ jsx(
    Button,
    {
      className: "group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/70 transition hover:scale-110 active:scale-90 -focus:outline-none -focus:ring-2 -focus:ring-slate-700 -focus:ring-offset-2 md:h-14 md:w-14",
      onPress: () => player.toggle(),
      "aria-label": player.playing ? "Pause" : "Play",
      isIconOnly: true,
      isLoading: player.loading,
      children: !player.loading && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-3 md:hidden" }),
        /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 fill-black md:h-7 md:w-7" })
      ] })
    }
  );
}
PlayButton.propTypes = {
  player: PropTypes__default.object
};
function RewindIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M8 5L5 8M5 8L8 11M5 8H13.5C16.5376 8 19 10.4624 19 13.5C19 15.4826 18.148 17.2202 17 18.188" }),
        /* @__PURE__ */ jsx("path", { d: "M5 15V19" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M8 18V16C8 15.4477 8.44772 15 9 15H10C10.5523 15 11 15.4477 11 16V18C11 18.5523 10.5523 19 10 19H9C8.44772 19 8 18.5523 8 18Z"
          }
        )
      ]
    }
  );
}
function RewindButton({ player, amount = 10 }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: "group relative rounded-full transition hover:scale-110 active:scale-90",
      onClick: () => player.seekBy(-amount),
      "aria-label": `Rewind ${amount} seconds`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 -right-2 md:hidden" }),
        /* @__PURE__ */ jsx(RewindIcon, { className: "h-6 w-6 stroke-white/60" })
      ]
    }
  );
}
RewindButton.propTypes = {
  player: PropTypes__default.object,
  amount: PropTypes__default.number
};
function parseTime$1(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  return [hours, minutes, seconds];
}
function formatTime(seconds, totalSeconds = seconds) {
  let totalWithoutLeadingZeroes = totalSeconds.slice(
    totalSeconds.findIndex((x) => x !== 0)
  );
  return seconds.slice(seconds.length - totalWithoutLeadingZeroes.length).map((x) => x.toString().padStart(2, "0")).join(":");
}
function Thumb(props) {
  let { state, trackRef, focusProps, isFocusVisible, index } = props;
  let inputRef = useRef(null);
  let { thumbProps, inputProps } = useSliderThumb(
    { index, trackRef, inputRef },
    state
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute top-1/2 -translate-x-1/2",
      style: {
        left: `${state.getThumbPercent(index) * 100}%`
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ...thumbProps,
          onMouseDown: (...args) => {
            var _a2, _b;
            (_a2 = thumbProps.onMouseDown) == null ? void 0 : _a2.call(thumbProps, ...args);
            (_b = props.onChangeStart) == null ? void 0 : _b.call(props);
          },
          onPointerDown: (...args) => {
            var _a2, _b;
            (_a2 = thumbProps.onPointerDown) == null ? void 0 : _a2.call(thumbProps, ...args);
            (_b = props.onChangeStart) == null ? void 0 : _b.call(props);
          },
          className: clsx(
            "h-4 rounded-full transition hover:scale-110 active:scale-90 ",
            isFocusVisible || state.isThumbDragging(index) ? "w-5 h-5 bg-slate-500 md:w-1.5 md:bg-white" : "border border-slate-400 w-4 bg-slate-800 md:w-1 md:bg-white/80 md:border-none"
          ),
          children: /* @__PURE__ */ jsx(VisuallyHidden, { children: /* @__PURE__ */ jsx("input", { ref: inputRef, ...mergeProps(inputProps, focusProps) }) })
        }
      )
    }
  );
}
Thumb.propTypes = {
  state: PropTypes__default.object,
  trackRef: PropTypes__default.any,
  focusProps: PropTypes__default.any,
  isFocusVisible: PropTypes__default.bool,
  index: PropTypes__default.number,
  onChangeStart: PropTypes__default.func
};
function Slider(props) {
  let trackRef = useRef(null);
  let state = useSliderState(props);
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );
  let { focusProps, isFocusVisible } = useFocusRing();
  let currentTime = parseTime$1(state.getThumbValue(0));
  let totalTime = parseTime$1(state.getThumbMaxValue(0));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...groupProps,
      className: "border-t-1 border-slate-400 md:border-none absolute inset-x-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative",
      children: [
        props.label && /* @__PURE__ */ jsx("label", { className: "sr-only", ...labelProps, children: props.label }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ...trackProps,
            onMouseDown: (...args) => {
              var _a2, _b;
              (_a2 = trackProps.onMouseDown) == null ? void 0 : _a2.call(trackProps, ...args);
              (_b = props.onChangeStart) == null ? void 0 : _b.call(props);
            },
            onPointerDown: (...args) => {
              var _a2, _b;
              (_a2 = trackProps.onPointerDown) == null ? void 0 : _a2.call(trackProps, ...args);
              (_b = props.onChangeStart) == null ? void 0 : _b.call(props);
            },
            ref: trackRef,
            className: "relative w-full bg-white/20 md:rounded-full",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: clsx(
                    "h-2 md:rounded-l-xl md:rounded-r-md",
                    isFocusVisible || state.isThumbDragging(0) ? "bg-white" : "bg-white/80"
                  ),
                  style: {
                    width: state.getThumbValue(0) === 0 ? 0 : `calc(${state.getThumbPercent(0) * 100}% - ${isFocusVisible || state.isThumbDragging(0) ? "0.3125rem" : "0.25rem"})`
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                Thumb,
                {
                  index: 0,
                  state,
                  trackRef,
                  onChangeStart: props.onChangeStart,
                  focusProps,
                  isFocusVisible
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-2 md:flex", children: [
          /* @__PURE__ */ jsx(
            "output",
            {
              ...outputProps,
              "aria-live": "off",
              className: clsx(
                "hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block",
                state.getThumbMaxValue(0) === 0 && "opacity-0",
                isFocusVisible || state.isThumbDragging(0) ? "text-white font-bold" : "text-white"
              ),
              children: formatTime(currentTime, totalTime)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm leading-6 text-slate-300", "aria-hidden": "true", children: "/" }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: clsx(
                "hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 text-white md:block",
                state.getThumbMaxValue(0) === 0 && "opacity-0"
              ),
              children: formatTime(totalTime)
            }
          )
        ] })
      ]
    }
  );
}
Slider.propTypes = {
  state: PropTypes__default.object,
  trackRef: PropTypes__default.any,
  focusProps: PropTypes__default.any,
  label: PropTypes__default.any,
  isFocusVisible: PropTypes__default.bool,
  index: PropTypes__default.number,
  onChangeStart: PropTypes__default.func
};
class VideoSwitcher {
  constructor(videoSource, viewTarget, options = {}) {
    this.videoSource = videoSource;
    this.viewTarget = viewTarget;
    this.drawingStatus = 1;
    this._currentSrc = this.videoSource.currentSrc;
    this.canvasVisible = false;
    this.options = Object.assign({}, {
      aspectRatio: "16/9",
      firstFrameDelay: 100,
      poster: null,
      onBeforeCapture: null,
      isPrimary: false
    }, options);
    this.createCanvas();
    this.createCanvasObserver();
    this.createVideoHandles();
    this.createPoster();
    if (window) {
      window._videoViewCollisions = window._videoViewCollisions || {};
      this.globalVideoViewCollisions = window._videoViewCollisions;
    } else {
      console.log("no window found");
    }
  }
  createCanvasObserver() {
    this.canvas.style.display = "none";
    this.handleCanvasIntersection = setInterval(() => {
      this.canvasVisible = this.constructor.isElementVisible(this.canvas);
      if (this.options.isPrimary) {
        this.globalVideoViewCollisions[this._currentSrc] = this.canvasVisible;
        this.canvas.style.display = "block";
      } else {
        if (this.canvasVisible && this.globalVideoViewCollisions[this._currentSrc]) {
          this.canvas.style.display = "none";
        } else {
          this.canvas.style.display = "block";
        }
      }
    }, 20);
  }
  destroyCanvasObserver() {
    clearInterval(this.handleCanvasIntersection);
    if (this.globalVideoViewCollisions[this._currentSrc]) {
      delete this.globalVideoViewCollisions[this._currentSrc];
    }
    console.log("destroy observer");
  }
  static isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    return !(rect.bottom < 0 || rect.top > windowHeight || rect.right < 0 || rect.left > windowWidth);
  }
  pause() {
    this.drawingStatus = 0;
  }
  resume() {
    this.drawingStatus = 1;
  }
  createPoster() {
    if (this.options.poster) {
      let imageToLoad;
      if (Array.isArray(this.options.poster)) {
        imageToLoad = this.options.poster[this.options.poster.length - 1];
      } else {
        imageToLoad = this.options.poster;
      }
      const image = new Image();
      image.onload = () => {
        this.drawFrame(image);
      };
      image.src = imageToLoad;
    }
  }
  createVideoHandles() {
    this._handlePlaying = () => {
      this.runCapture();
    };
    this._handleLoadeddata = () => {
      setTimeout(() => {
        if (this._onBeforeCapture() === false) {
          return false;
        }
        this.drawFrame();
      }, this.options.firstFrameDelay);
    };
    this._handleEnded = () => {
      this.destroy();
    };
    this.videoSource.addEventListener("playing", this._handlePlaying, false);
    this.videoSource.addEventListener("loadeddata", this._handleLoadeddata, false);
    this.videoSource.addEventListener("ended", this._handleEnded, false);
  }
  _onBeforeCapture() {
    if (typeof this.options.onBeforeCapture === "function") {
      if (this.options.onBeforeCapture(this) === false) {
        return false;
      }
    }
  }
  destroyVideoHandles() {
    this.videoSource.removeEventListener("playing", this._handlePlaying);
    this.videoSource.removeEventListener("loadeddata", this._handleLoadeddata);
    this.videoSource.removeEventListener("ended", this._handleEnded);
  }
  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = `width: 100%; aspect-ratio: ${this.options.aspectRatio}`;
    this.viewTarget.appendChild(this.canvas);
    this.canvasContext = this.canvas.getContext("2d");
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }
  destroyCanvas() {
    this.canvas.remove();
    this.destroyCanvasObserver();
  }
  drawFrame(source) {
    const _source = source || this.videoSource;
    this._currentSrc = _source.currentSrc;
    this.canvasContext.drawImage(_source, 0, 0, this.canvas.width, this.canvas.height);
  }
  runCapture() {
    if (this._onBeforeCapture() === false) {
      return false;
    }
    if ((this.videoSource.paused || this.videoSource.ended) && this.drawingStatus === 1)
      return false;
    this.drawFrame();
    requestAnimationFrame(() => {
      this.runCapture();
    });
  }
  destroy() {
    this.destroyVideoHandles();
    this.destroyCanvas();
    if (this.globalVideoViewCollisions[this.videoSource.currentSrc]) {
      delete this.globalVideoViewCollisions[this.videoSource.currentSrc];
    }
  }
}
function EpisodePlayButton({ episode, size = "sm", className = "" }) {
  let player = useMediaPlayer(episode);
  return /* @__PURE__ */ jsx(
    Button,
    {
      onPress: () => {
        player.toggle();
      },
      "aria-label": `${player.playing ? "Pause" : "Play"} episode ${episode.episodeTitle || episode.originalFileName}`,
      isLoading: player.loading,
      variant: "bordered",
      size,
      radius: "full",
      isIconOnly: true,
      className: "border-amber-500/30 text-amber-500 " + className,
      children: player.loading ? "" : player.playing ? /* @__PURE__ */ jsx(PauseIcon, { className: "m-2 fill-current" }) : /* @__PURE__ */ jsx(PlayIcon, { className: "m-2 fill-current" })
    }
  );
}
EpisodePlayButton.propTypes = {
  episode: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.any
};
function VideoFrame({ episode, isPrimary }) {
  let player = useMediaPlayer(episode);
  const [canShowPlayerButton, setCanShowPlayerButton] = useState(true);
  const [canShowPoster, setCanShowPoster] = useState(true);
  const [canBeVisible, setCanBeVisible] = useState(false);
  const videoViewContainerRef = useRef(null);
  const playButtonRef = useRef(null);
  useLayoutEffect(() => {
    if ((episode == null ? void 0 : episode.contentType) === "video" && player.playerEngineReady) {
      window._videoViewCollisions = window._videoViewCollisions || {};
      if (window._videoViewCollisions[episode.fileUrl])
        return;
      player.moveDomElementAt(videoViewContainerRef.current);
      window._videoViewCollisions[episode.fileUrl] = true;
      setCanBeVisible(true);
    }
    return () => {
      if (window._videoViewCollisions) {
        delete window._videoViewCollisions[episode.fileUrl];
      }
      player.resetDomElementAt();
    };
  }, [episode, player.playerEngineReady]);
  useEffect(() => {
    if (!player.playing && (player.isEmpty() || !player.isCurrent(episode))) {
      setCanShowPoster(true);
    } else {
      setCanShowPoster(false);
    }
    if (player.playing) {
      setTimeout(() => {
        player.playing && setCanShowPlayerButton(false);
      }, 3e3);
    } else {
      setCanShowPlayerButton(true);
    }
  }, [episode, player.playing, player.episode]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: videoViewContainerRef,
      className: `relative ${canBeVisible ? "" : "hidden"}`,
      onClick: () => player.toggle(),
      onMouseEnter: () => setCanShowPlayerButton(true),
      onMouseMove: () => setCanShowPlayerButton(true),
      onMouseLeave: () => player.playing && setCanShowPlayerButton(false),
      children: [
        canShowPoster && /* @__PURE__ */ jsx("div", { className: "bg-black absolute w-full h-full z-10", style: {
          backgroundImage: `url("${episode.episodeImageUrl}")`,
          backgroundSize: "cover",
          backgroundRepeat: "none"
        } }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: playButtonRef,
            className: `${canShowPlayerButton ? "opacity-100" : "opacity-0"} z-10 transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150`,
            children: /* @__PURE__ */ jsx(
              EpisodePlayButton,
              {
                episode,
                size: "lg",
                className: "border-white-500/30 text-white-500 bg-black/60"
              }
            )
          }
        )
      ]
    }
  );
}
VideoFrame.propTypes = {
  episode: PropTypes.object,
  isPrimary: PropTypes.bool
};
const PERMALINK_BASE_PLACEHOLDER = "https://permalink-base.api.xdevel.com/profile";
function EpisodeLink({ item, children, ...props }) {
  const { pageProps } = usePageContext();
  let finalUrl = item.episodeDerivatePermalink.replace(PERMALINK_BASE_PLACEHOLDER, "/" + pageProps.page.slug);
  let title = item.episodeTitle || item.originalFileName;
  return /* @__PURE__ */ jsx(Link, { href: finalUrl, title, ...props, children });
}
EpisodeLink.propTypes = {
  item: PropTypes.object,
  children: PropTypes.any
};
function parseTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  return [hours, minutes, seconds];
}
function formatHumanTime(seconds) {
  let [h, m, s] = parseTime(seconds);
  return `${h} hour${h === 1 ? "" : "s"}, ${m} minute${m === 1 ? "" : "s"}, ${s} second${s === 1 ? "" : "s"}`;
}
function PlayerControls() {
  let player = useMediaPlayer();
  let { pageProps } = usePageContext();
  const videoViewContainerRef = useRef(null);
  const videoViewInstanceRef = useRef(null);
  let wasPlayingRef = useRef(false);
  let [currentTime, setCurrentTime] = useState(player.currentTime);
  useEffect(() => {
    setCurrentTime(null);
  }, [player.currentTime]);
  useEffect(() => {
    var _a2;
    if (((_a2 = player.episode) == null ? void 0 : _a2.contentType) === "video" && player.playerEngineReady) {
      videoViewInstanceRef.current = new VideoSwitcher(player.getPlayerElement(), videoViewContainerRef.current, {
        poster: player.episode.episodeImageUrl || player.episode.videoThumbnails,
        onBeforeCapture() {
          return player.getPlayerElement().src === player.episode.fileUrl;
        }
      });
      if (player.playing) {
        videoViewInstanceRef.current.runCapture();
      }
    }
    return () => {
      if (videoViewInstanceRef.current) {
        videoViewInstanceRef.current.destroy();
        videoViewInstanceRef.current = null;
      }
    };
  }, [player.episode, player.playerEngineReady]);
  if (!player.episode) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative flex items-center gap-6 bg-black/70 px-4 py-4 shadow shadow-slate-200/80 ring-1 ring-slate-900/5 backdrop-blur-sm md:px-6",
      children: [
        /* @__PURE__ */ jsx("div", { ref: videoViewContainerRef, className: "absolute right-1 -top-48 aspect-video w-80 md:-top-48 md:right-3" }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "h-10 w-10 md:h-14 md:w-14 rounded object-cover",
            src: player.episode.episodeImageUrl || player.episode.seriesImageUrl || pageProps.page.logo,
            alt: ""
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(PlayButton, { player }) }),
        /* @__PURE__ */ jsxs("div", { className: "mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1", children: [
          /* @__PURE__ */ jsx(
            EpisodeLink,
            {
              item: player.episode,
              className: "text-white truncate text-center text-sm font-bold leading-6 md:text-left",
              children: player.episode.episodeTitle || player.episode.originalFileName
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-6", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center md:hidden", children: /* @__PURE__ */ jsx(MuteButton, { player }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-none items-center gap-4", children: [
              /* @__PURE__ */ jsx(RewindButton, { player }),
              /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(PlayButton, { player }) }),
              /* @__PURE__ */ jsx(ForwardButton, { player })
            ] }),
            /* @__PURE__ */ jsx(
              Slider,
              {
                label: "Current time",
                maxValue: player.duration,
                step: 1,
                value: [currentTime ?? player.currentTime],
                onChange: ([value]) => setCurrentTime(value),
                onChangeEnd: ([value]) => {
                  player.seek(value);
                  if (wasPlayingRef.current) {
                    player.play();
                  }
                },
                numberFormatter: { format: formatHumanTime },
                onChangeStart: () => {
                  wasPlayingRef.current = player.playing;
                  player.pause();
                }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(PlaybackRateButton, { player }) }),
              /* @__PURE__ */ jsx("div", { className: "hidden items-center md:flex", children: /* @__PURE__ */ jsx(MuteButton, { player }) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
const LogoInonda = "/assets/static/logo-inonda.821b8f91.png";
const navigation = [
  // { name: 'Home', href: '/' },
  // { name: 'Radio Taormina', href: '/radiotaormina' },
  // { name: 'Test', href: '/test' },
  // { name: 'Projects', href: '#' },
  // { name: 'Calendar', href: '#' },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Navbar() {
  const pageContext = usePageContext();
  return /* @__PURE__ */ jsx(Disclosure, { as: "nav", className: "bg-black border-b-1 border-white/30", children: ({ open }) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-0", children: /* @__PURE__ */ jsxs("div", { className: "relative flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center", children: [
          /* @__PURE__ */ jsx("img", { src: LogoInonda, alt: "InondaPods", className: "h-6" }),
          /* @__PURE__ */ jsx("strong", { className: "text-orange-100 text-xs", children: "PODS" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:ml-6 sm:block", children: /* @__PURE__ */ jsx("div", { className: "flex space-x-4", children: navigation.map((item) => /* @__PURE__ */ jsx(
          "a",
          {
            href: item.href,
            className: classNames(
              pageContext.urlPathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700",
              "rounded-md px-3 py-2 text-sm font-medium"
            ),
            "aria-current": pageContext.urlPathname === item.href ? "page" : void 0,
            children: item.name
          },
          item.name
        )) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          className: "relative rounded-full --bg-gray-800 p-1 text-gray-400",
          children: [
            /* @__PURE__ */ jsx("span", { className: "absolute -inset-1.5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "View notifications" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Disclosure.Panel, { className: "sm:hidden", children: /* @__PURE__ */ jsx("div", { className: "space-y-1 px-2 pb-3 pt-2", children: navigation.map((item) => /* @__PURE__ */ jsx(
      Disclosure.Button,
      {
        as: "a",
        href: item.href,
        className: classNames(
          pageContext.urlPathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700",
          "block rounded-md px-3 py-2 text-base font-medium"
        ),
        "aria-current": pageContext.urlPathname === item.href ? "page" : void 0,
        children: item.name
      },
      item.name
    )) }) })
  ] }) });
}
const PageBackdropContext = createContext();
const PageBackdropProvider = function({ children }) {
  const [backdropImage, setBackdropImage] = useState(null);
  return /* @__PURE__ */ jsxs(PageBackdropContext.Provider, { value: { backdropImage, setBackdropImage }, children: [
    backdropImage && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("img", { className: "block fixed -z-10 w-full filter blur-md opacity-80", src: backdropImage }),
      /* @__PURE__ */ jsx("div", { className: "fixed -z-10 w-full h-full", style: { background: "linear-gradient(to bottom, rgba(0,0,0,.3), black 100vh, #14191a)" } })
    ] }),
    children
  ] });
};
PageShell.propTypes = {
  pageContext: PropTypes__default.any,
  children: childrenPropType
};
function PageShell({ pageContext, children }) {
  return /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(NextUIProvider, { children: /* @__PURE__ */ jsx(PageContextProvider, { pageContext, children: /* @__PURE__ */ jsx(MediaProvider, { children: /* @__PURE__ */ jsx(PageBackdropProvider, { children: /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Content, { children }),
    /* @__PURE__ */ jsx("div", { className: "fixed left-0 bottom-0 w-full z-10", children: /* @__PURE__ */ jsx(PlayerControls, {}) })
  ] }) }) }) }) }) });
}
Layout.propTypes = {
  children: childrenPropType
};
function Layout({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen subpixel-antialiased", children });
}
Content.propTypes = {
  children: childrenPropType
};
function Content({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "mx-auto px-0 pt-0 pb-32 sm:px-6 sm:pt-6 lg:px-8", children });
}
const logoUrl = "/assets/static/logo.0ab59a12.svg";
function getPageMetaTags(pageContext) {
  const metaDefault = {
    title: "InondaPods",
    description: "The podcast platform."
  };
  let dynamicMeta = {};
  if (pageContext.exports.Page && pageContext.exports.Page.metaTags) {
    dynamicMeta = pageContext.exports.Page.metaTags(pageContext.pageProps);
  }
  return Object.assign({}, metaDefault, dynamicMeta);
}
const encodeObjectToHtmlEntities = function(obj) {
  const encodedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      encodedObj[key] = encode((obj[key] + "").trim());
    }
  }
  return encodedObj;
};
const generateHtmlMetaTags = function(meta) {
  meta = encodeObjectToHtmlEntities(meta);
  let template = "";
  if (meta.description) {
    template += `<meta name="description" content="${meta.description}" />
`;
  }
  if (meta.title) {
    template += `<title>${meta.title}</title>
`;
  }
  if (meta.fbAppId) {
    template += `<meta property="fb:app_id" content="${meta.fbAppId}" />
`;
  }
  if (meta.ogSiteName) {
    template += `<meta property="og:site_name" content="${meta.ogSiteName}" />
`;
  }
  if (meta.ogType) {
    template += `<meta property="og:type" content="${meta.ogType}" />
`;
  }
  if (meta.ogTitle) {
    template += `<meta property="og:title" content="${meta.ogTitle}" />
`;
  }
  if (meta.ogDescription) {
    template += `<meta property="og:description" content="${meta.ogDescription}" />
`;
  }
  if (meta.ogImage) {
    template += `<meta property="og:image" content="${meta.ogImage}" />
`;
  }
  if (meta.ogImageWidth) {
    template += `<meta property="og:image:width" content="${meta.ogImageWidth}" />
`;
  }
  if (meta.ogImageHeight) {
    template += `<meta property="og:image:height" content="${meta.ogImageHeight}" />
`;
  }
  if (meta.ogImageDescription) {
    template += `<meta property="og:image:alt" content="${meta.ogImageDescription}" />
`;
  }
  if (meta.ogUrl) {
    template += `<meta property="og:url" content="${meta.ogUrl}" />
`;
  }
  if (meta.alAndroidUrl) {
    template += `<meta property="al:android:url" content="${meta.alAndroidUrl}" />
`;
  }
  if (meta.alAndroidPackage) {
    template += `<meta property="al:android:package" content="${meta.alAndroidPackage}" />
`;
  }
  if (meta.alAndroidClass) {
    template += `<meta property="al:android:class" content="${meta.alAndroidClass}" />
`;
  }
  if (meta.alAndroidAppName) {
    template += `<meta property="al:android:app_name" content="${meta.alAndroidAppName}" />
`;
  }
  if (meta.alIosUrl) {
    template += `<meta property="al:ios:url" content="${meta.alIosUrl}" />
`;
  }
  if (meta.alIosAppStoreId) {
    template += `<meta property="al:ios:app_store_id" content="${meta.alIosAppStoreId}" />
`;
  }
  if (meta.alIosAppName) {
    template += `<meta property="al:ios:app_name" content="${meta.alIosAppName}" />
`;
  }
  if (meta.twitterTitle) {
    template += `<meta name="twitter:title" content="${meta.twitterTitle}" />
`;
  }
  if (meta.twitterDescription) {
    template += `<meta name="twitter:description" content="${meta.twitterDescription}" />
`;
  }
  if (meta.twitterImage) {
    template += `<meta name="twitter:image" content="${meta.twitterImage}" />
`;
  }
  if (meta.twitterPlayer) {
    template += `<meta name="twitter:player" content="${meta.twitterPlayer}" />
`;
  }
  if (meta.twitterPlayerWidth) {
    template += `<meta name="twitter:player:width" content="${meta.twitterPlayerWidth}" />
`;
  }
  if (meta.twitterPlayerHeight) {
    template += `<meta name="twitter:player:height" content="${meta.twitterPlayerHeight}" />
`;
  }
  if (meta.twitterAppUrlIphone) {
    template += `<meta name="twitter:app:url:iphone" content="${meta.twitterAppUrlIphone}" />
`;
  }
  if (meta.twitterAppUrlGooglePlay) {
    template += `<meta name="twitter:app:url:googleplay" content="${meta.twitterAppUrlGooglePlay}" />
`;
  }
  if (meta.twitterAppIdIphone) {
    template += `<meta name="twitter:app:id:iphone" content="${meta.twitterAppIdIphone}" />
`;
  }
  if (meta.twitterAppNameIphone) {
    template += `<meta name="twitter:app:name:iphone" content="${meta.twitterAppNameIphone}" />
`;
  }
  if (meta.twitterAppIdIpad) {
    template += `<meta name="twitter:app:id:ipad" content="${meta.twitterAppIdIpad}" />
`;
  }
  if (meta.twitterAppNameIpad) {
    template += `<meta name="twitter:app:name:ipad" content="${meta.twitterAppNameIpad}" />
`;
  }
  if (meta.twitterAppNameGooglePlay) {
    template += `<meta name="twitter:app:name:googleplay" content="${meta.twitterAppNameGooglePlay}" />
`;
  }
  if (meta.twitterAppIdGooglePlay) {
    template += `<meta name="twitter:app:id:googleplay" content="${meta.twitterAppIdGooglePlay}" />
`;
  }
  return template;
};
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
function initLocale(locale) {
  return i18n.use(initReactI18next).use(LanguageDetector).use(resourcesToBackend((language) => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./chunk-02c1c313.js"), "../locales/it.json": () => import("./chunk-f0930333.js") }), `../locales/${language}.json`))).init({
    fallbackLng: false,
    lng: locale || "en",
    debug: true,
    interpolation: {
      escapeValue: false
      // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
}
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
async function onRenderHtml(pageContext) {
  const { Page, pageProps, locale } = pageContext;
  await initLocale(locale);
  if (!Page)
    throw new Error("My render() hook expects pageContext.Page to be defined");
  const pageHtml = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(PageShell, { pageContext, children: /* @__PURE__ */ jsx(Page, { ...pageProps }) })
  );
  const meta = getPageMetaTags(pageContext);
  const documentHtml = escapeInject(_a || (_a = __template(['<!DOCTYPE html>\n    <html lang="en" class="h-full bg-black dark">\n    <head>\n        <meta charset="UTF-8"/>\n        <link rel="icon" href="', '"/>\n        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n        ', '\n        <link\n            rel="preconnect"\n            href="https://cdn.fontshare.com"\n            crossOrigin="anonymous"\n        />\n        <link\n            rel="stylesheet"\n            href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"\n        />\n        <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"><\/script>\n    </head>\n    <body class="h-full">\n    <div id="page-view">', '</div>\n    <div id="page-loader" class="hide">\n        <div class="loader"></div>\n    </div>\n    </body>\n    </html>'])), logoUrl, dangerouslySkipEscape(generateHtmlMetaTags(meta)), dangerouslySkipEscape(pageHtml));
  return {
    documentHtml,
    pageContext: {
      // hostname: 'a'
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    }
  };
}
const import_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: onRenderHtml
}, Symbol.toStringTag, { value: "Module" }));
export {
  EpisodeLink as E,
  Link as L,
  PageBackdropContext as P,
  VideoFrame as V,
  EpisodePlayButton as a,
  useMediaPlayer as b,
  PERMALINK_BASE_PLACEHOLDER as c,
  import_0 as i,
  usePageContext as u
};
