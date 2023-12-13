import { E as EpisodeLink, a as EpisodePlayButton, P as PageBackdropContext, i as import_0 } from "../chunks/chunk-5c423806.js";
import { g as getPage, d as getSeriesInfoBySeriesSlug, e as getEpisodesBySeriesSlug, a as getSeries, A as APP_HOST, E as EMBED_HOST, f as API_CLIENT_ID, S as SeriesLink, c as ShareButton } from "../chunks/chunk-a773efb0.js";
import { render } from "vike/abort";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import * as PropTypes from "prop-types";
import PropTypes__default from "prop-types";
import { DateTime } from "luxon";
import prettyMilliseconds from "pretty-ms";
import { Image, Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { ArrowSmallUpIcon } from "@heroicons/react/20/solid/index.js";
import { P as ProfileSmall } from "../chunks/chunk-c6856c8a.js";
import { L as List } from "../chunks/chunk-7e8a76dd.js";
import { FaceFrownIcon } from "@heroicons/react/24/outline/index.js";
import { navigate } from "vike/client/router";
import "react-dom/server";
import "video.js";
import "videojs-contrib-ads";
import "videojs-ima";
import "react-aria";
import "react-stately";
import "clsx";
import "@headlessui/react";
import "react-social-icons";
import "canvas-confetti";
import "vike/server";
import "html-entities";
import "i18next";
import "react-i18next";
import "i18next-browser-languagedetector";
import "i18next-resources-to-backend";
import "axios";
async function onBeforeRender(pageContext) {
  let { pageSlug, seriesSlug } = pageContext.routeParams;
  let pageResult = await getPage(pageSlug);
  if (!pageResult) {
    throw render(404, `${pageSlug} doesn't exist.`);
  }
  let onDemandServiceId = pageResult.onDemandServiceId;
  let series = await getSeriesInfoBySeriesSlug(seriesSlug, onDemandServiceId);
  if (!series) {
    throw render(404, `${seriesSlug} doesn't exist.`);
  }
  let episodesResponse = await getEpisodesBySeriesSlug(seriesSlug, onDemandServiceId);
  let onDemandSeries = await getSeries(onDemandServiceId);
  const pageProps = {
    page: pageResult,
    // page: await getPage(pageSlug),
    onDemandServiceId,
    seriesSlug,
    onDemandSeries,
    series,
    onDemandEpisodes: episodesResponse.items,
    onDemandEpisodesTotal: episodesResponse.total,
    onDemandEpisodesTotalDuration: episodesResponse.totalDuration,
    routeParams: pageContext.routeParams,
    feedUrl: `${APP_HOST}/${pageSlug}/episodes/${seriesSlug}/feed`,
    embedUrl: `${EMBED_HOST}/?mode=episodes&seriesId=${series.id}&clientId=${API_CLIENT_ID}&ref=inondapods`
  };
  return {
    pageContext: {
      pageProps
    }
  };
}
const import_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: onBeforeRender
}, Symbol.toStringTag, { value: "Module" }));
function EpisodeListItemSkeleton() {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center space-x-6\r\n            px-6 py-5 shadow-sm animate-pulse\r\n            border-b-1\r\n            border-white/30\r\n            md:mb-2\r\n            md:rounded-large\r\n            md:border\r\n             ",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "rounded bg-white/50 h-10 w-10" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-2 w-64 bg-white/50 rounded" }),
          /* @__PURE__ */ jsx("div", { className: "h-2 w-24 bg-white/50 rounded" }),
          /* @__PURE__ */ jsx("div", { className: "h-2 w-16 bg-white/50 rounded" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "--flex-shrink-0 font-bold text-sm", children: /* @__PURE__ */ jsx("div", { className: "h-2 w-6 bg-white/50 rounded" }) })
      ]
    }
  );
}
function dateFormatter(date, locale) {
  return DateTime.fromJSDate(date).setLocale(locale).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
}
function FormattedDate({ date, ...props }) {
  if (typeof date === "string")
    date = new Date(date);
  return /* @__PURE__ */ jsx("time", { dateTime: date.toISOString(), ...props, children: dateFormatter(date, "it") });
}
FormattedDate.propTypes = {
  date: PropTypes__default.any
};
function Duration({ milliseconds, ...props }) {
  milliseconds = prettyMilliseconds(milliseconds, { compact: true });
  milliseconds = milliseconds.replace("s", " sec");
  milliseconds = milliseconds.replace("m", " min");
  milliseconds = milliseconds.replace("h", " hour");
  return /* @__PURE__ */ jsx("span", { ...props, children: milliseconds });
}
Duration.propTypes = {
  seconds: PropTypes.number
};
function EpisodeListItem({ episode, pos, page }) {
  return (
    // border-gray-200 bg-white sm:shadow-sm sm:rounded-lg sm:border pb-6 sm:pb-0 border-b-1
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center border-white/30 border-b-1 pb-6 sm:p-6 sm:shadow-sm sm:rounded-large sm:border",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mr-6", children: /* @__PURE__ */ jsx(EpisodeLink, { item: episode, children: /* @__PURE__ */ jsx(
            Image,
            {
              loading: "lazy",
              className: "h-12 w-12 sm:h-24 sm:w-24 border-1 border-white/30 object-cover",
              src: episode.episodeImageUrl || episode.seriesImageUrl || page.logo,
              alt: episode.episodeTitle || episode.originalFileName
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 mr-6", children: [
            /* @__PURE__ */ jsx(EpisodeLink, { item: episode, children: /* @__PURE__ */ jsx("h2", { className: "font-medium text-sm", children: episode.episodeTitle || episode.originalFileName }) }),
            /* @__PURE__ */ jsx("p", { className: "truncate text-sm text-white", children: /* @__PURE__ */ jsx(
              FormattedDate,
              {
                date: episode.createdOn,
                className: "order-first text-sm leading-7 text-slate-300"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white text-sm", title: "Episodio numero " + pos, children: [
              "Episodio #",
              pos
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(EpisodePlayButton, { episode }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-white font-bold mt-4", children: /* @__PURE__ */ jsx(Duration, { milliseconds: episode.duration }) })
          ] })
        ]
      }
    )
  );
}
EpisodeListItem.propTypes = {
  episode: PropTypes.object,
  pos: PropTypes.number,
  routeParams: PropTypes.object,
  page: PropTypes.object
};
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: isVisible && /* @__PURE__ */ jsx("div", { className: "bottom-36 right-6 fixed z-10 opacity-50 hover:opacity-100", children: /* @__PURE__ */ jsx(
    Button,
    {
      onPress: () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }),
      isIconOnly: true,
      radius: "full",
      children: /* @__PURE__ */ jsx(ArrowSmallUpIcon, { className: "h-8 w-8", "aria-hidden": "true" })
    }
  ) }) });
};
function SeriesListItem2({ item, routeParams }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "mr-4 aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-large sm:aspect-none sm:h-20 sm:w-20",
        children: /* @__PURE__ */ jsx(SeriesLink, { item, children: /* @__PURE__ */ jsx(Image, { loading: "lazy", src: item.imageUrl, alt: item.title, className: "h-full w-full object-cover object-center sm:h-full sm:w-full" }) })
      }
    ),
    /* @__PURE__ */ jsx(SeriesLink, { item, children: /* @__PURE__ */ jsx("h3", { className: "inline-block font-medium text-base", children: item.title || "-" }) })
  ] });
}
SeriesListItem2.propTypes = {
  item: PropTypes__default.object,
  routeParams: PropTypes__default.object
};
function Page(pageProps) {
  const { page, seriesSlug, onDemandServiceId, onDemandSeries, series, onDemandEpisodes, onDemandEpisodesTotal, routeParams } = pageProps;
  const [posts, setPosts] = useState(onDemandEpisodes);
  const [offset, setOffset] = useState(onDemandEpisodes.length);
  const { setBackdropImage } = useContext(PageBackdropContext);
  useEffect(() => {
    setPosts(onDemandEpisodes);
    setOffset(onDemandEpisodes.length);
  }, [onDemandEpisodes]);
  useEffect(() => {
    setBackdropImage(series.imageUrl);
    return () => {
      setBackdropImage(null);
    };
  }, [series]);
  async function loadData() {
    setOffset(posts.length + 15);
    let data = await getEpisodesBySeriesSlug(seriesSlug, onDemandServiceId, { start: offset });
    setPosts([...posts, ...data.items]);
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-7xl grow lg:flex", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 lg:pr-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 pb-0 sm:p-0 sm:mb-6", children: [
        /* @__PURE__ */ jsxs(Breadcrumbs, { className: "mb-6", children: [
          /* @__PURE__ */ jsx(BreadcrumbItem, { onPress: () => navigate("/" + routeParams.pageSlug), children: page.title }),
          /* @__PURE__ */ jsx(BreadcrumbItem, { children: series.title })
        ] }),
        /* @__PURE__ */ jsx(ProfileSmall, { page, series, routeParams, children: /* @__PURE__ */ jsx("div", { className: "space-x-2", children: /* @__PURE__ */ jsx(ShareButton, { enableFeed: true, enableEmbed: true }) }) })
      ] }),
      /* @__PURE__ */ jsx(ScrollToTopButton, {}),
      /* @__PURE__ */ jsx(
        InfiniteScroll,
        {
          next: loadData,
          hasMore: posts.length < onDemandEpisodesTotal,
          loader: /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4", children: [
            /* @__PURE__ */ jsx(EpisodeListItemSkeleton, {}),
            /* @__PURE__ */ jsx(EpisodeListItemSkeleton, {}),
            /* @__PURE__ */ jsx(EpisodeListItemSkeleton, {}),
            /* @__PURE__ */ jsx(EpisodeListItemSkeleton, {}),
            /* @__PURE__ */ jsx(EpisodeListItemSkeleton, {})
          ] }),
          dataLength: posts.length,
          children: /* @__PURE__ */ jsx(List, { children: posts.map((episode, i) => /* @__PURE__ */ jsx(
            EpisodeListItem,
            {
              pos: onDemandEpisodesTotal - i,
              page,
              episode,
              routeParams
            },
            episode.fileHash
          )) })
        }
      ),
      !posts.length && /* @__PURE__ */ jsxs("div", { className: "text-base text-white flex flex-col items-center space-x-2 px-6 py-5 shadow-sm animate-pulse border-b-1 md:mb-2 md:rounded-lg md:border md:border-white/30", children: [
        /* @__PURE__ */ jsx(FaceFrownIcon, { className: "w-10" }),
        " ",
        /* @__PURE__ */ jsx("span", { children: "Non ci sono ancora episodi per questa serie." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:block mt-9 mb-9 shrink-0 border-t border-white/30 lg:w-96 lg:border-l lg:border-t-0 lg:pl-6", children: [
      /* @__PURE__ */ jsx("div", { className: "relative flex items-center rounded space-x-3 h-96 mb-6", children: /* @__PURE__ */ jsx(
        Image,
        {
          className: "h-full w-full object-cover object-center sm:h-full sm:w-full",
          src: series.imageUrl
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl mb-8 text-white", children: "Potrebbe interessarti anche" }),
        /* @__PURE__ */ jsx(List, { children: onDemandSeries.map((item) => item.id !== series.id ? /* @__PURE__ */ jsx(SeriesListItem2, { item, routeParams }, item.id) : null) })
      ] })
    ] })
  ] });
}
Page.metaTags = (pageProps) => {
  const { page, series } = pageProps;
  return {
    title: series.title,
    description: series.description,
    ogImage: series.imageUrl
  };
};
const import_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const configValuesImported = [
  {
    configName: "onRenderHtml",
    importPath: "/renderer/+onRenderHtml.jsx",
    isValueFile: true,
    exportValues: import_0
  },
  {
    configName: "onBeforeRender",
    importPath: "/pages/profile/episodes/+onBeforeRender.js",
    isValueFile: true,
    exportValues: import_1
  },
  {
    configName: "Page",
    importPath: "/pages/profile/episodes/+Page.jsx",
    isValueFile: true,
    exportValues: import_2
  }
];
const configValuesSerialized = {
  ["passToClient"]: {
    definedAt: { "files": [{ "filePathToShowToUser": "/pages/profile/episodes/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "/pages/profile/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }] },
    valueSerialized: '["pageProps","documentProps","pageProps","documentProps","pageProps","documentProps","acceptsLanguages","locale"]'
  }
};
export {
  configValuesImported,
  configValuesSerialized
};
