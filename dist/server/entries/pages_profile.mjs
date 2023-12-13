import { u as usePageContext, i as import_0 } from "../chunks/chunk-5c423806.js";
import { g as getPage, a as getSeries, s as seriesLinkFunc, S as SeriesLink, b as SeriesMetadata, c as ShareButton } from "../chunks/chunk-a773efb0.js";
import { render } from "vike/abort";
import { jsxs, jsx } from "react/jsx-runtime";
import { L as List } from "../chunks/chunk-7e8a76dd.js";
import { Image, Button } from "@nextui-org/react";
import PropTypes__default from "prop-types";
import { navigate } from "vike/client/router";
import "react-dom/server";
import "react";
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
import "@heroicons/react/24/outline/index.js";
async function onBeforeRender(pageContext) {
  const { pageSlug } = pageContext.routeParams;
  const pageResult = await getPage(pageSlug);
  if (!pageResult) {
    throw render(404, `${pageSlug} doesn't exist.`);
  }
  let onDemandServiceId = pageResult.onDemandServiceId;
  if (!onDemandServiceId) {
    throw new Error("Failed to fetch on-demand service");
  }
  let onDemandSeries = await getSeries(onDemandServiceId);
  const pageProps = {
    page: pageResult,
    onDemandSeries,
    routeParams: pageContext.routeParams
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
function SeriesListItem({ item }) {
  const { pageProps } = usePageContext();
  let toEpisodesUrl = seriesLinkFunc({
    pageSlug: pageProps.page.slug,
    seriesDerivatePermalink: item.seriesDerivatePermalink
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "border-white/30 flex border-b-1 pb-6 sm:p-6 sm:shadow-sm sm:rounded-large sm:border lg:col-span-2",
      children: [
        /* @__PURE__ */ jsx(SeriesLink, { item, children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "aspect-h-1 aspect-w-1 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40",
            children: /* @__PURE__ */ jsx(
              Image,
              {
                loading: "lazy",
                src: item.imageUrl,
                alt: item.title,
                className: "h-full w-full object-cover object-center"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:justify-between ml-6 mt-0 w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-2 sm:mb-0", children: [
            /* @__PURE__ */ jsx(SeriesLink, { item, children: /* @__PURE__ */ jsx("h2", { className: "inline-block text-base sm:text-xl sm:font-medium", children: item.title || "-" }) }),
            /* @__PURE__ */ jsx("p", { className: "hidden sm:block mt-2 text-small font-light text-gray-300 mb-3", children: item.shortDescription || item.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center space-y-3", children: [
            /* @__PURE__ */ jsx(SeriesMetadata, { item }),
            /* @__PURE__ */ jsx("div", { className: "ml-auto hidden sm:block", children: /* @__PURE__ */ jsx(Button, { color: "warning", onClick: () => navigate(toEpisodesUrl), children: "Ascolta" }) })
          ] })
        ] })
      ]
    },
    item.id
  );
}
SeriesListItem.propTypes = {
  item: PropTypes__default.object
};
function ProfileBanner(page) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full _pb-6 md:pb-0 md:mb-6", children: [
    /* @__PURE__ */ jsx("img", { className: "h-24 w-full object-cover sm:rounded sm:h-32 md:h-64", src: page.topImage, alt: "" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 sm:px-6 lg:px-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(Image, { className: "h-24 w-24 rounded-full border-4 border-white/30 sm:h-32 sm:w-32", src: page.logo, alt: "Logo" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex sm:mt-16 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-6 min-w-0 flex-1 sm:hidden md:block", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-1xl font-bold text-gray-100 mb-1 sm:text-2xl sm:truncate", title: page.title, children: page.title }),
            /* @__PURE__ */ jsx("div", { className: "text-white/60 text-sm sm:truncate", title: page.shortDescription, children: page.shortDescription })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 _space-y-3 _space-x-3 sm:flex-row sm:space-y-0 _flex _justify-end", children: /* @__PURE__ */ jsx(ShareButton, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 hidden min-w-0 flex-1 sm:block md:hidden", children: /* @__PURE__ */ jsx("h1", { className: "truncate text-2xl font-bold text-gray-900", children: page.title }) })
    ] })
  ] });
}
function Page(pageProps) {
  const { page, onDemandSeries, routeParams } = pageProps;
  return /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-7xl grid row-span-2 md:grid-cols-8 gap-4", children: /* @__PURE__ */ jsxs("div", { className: "row-span-1 md:col-span-8 space-y-4", children: [
    /* @__PURE__ */ jsx(ProfileBanner, { ...page }),
    /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold", children: /* @__PURE__ */ jsx(List, { children: onDemandSeries.map((item) => /* @__PURE__ */ jsx(SeriesListItem, { item, routeParams }, item.id)) }) }),
    /* @__PURE__ */ jsx("div", { children: "Footer" })
  ] }) });
}
Page.metaTags = (pageProps) => {
  const { page } = pageProps;
  return {
    title: page.title,
    description: page.description
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
    importPath: "/pages/profile/+onBeforeRender.js",
    isValueFile: true,
    exportValues: import_1
  },
  {
    configName: "Page",
    importPath: "/pages/profile/+Page.jsx",
    isValueFile: true,
    exportValues: import_2
  }
];
const configValuesSerialized = {
  ["passToClient"]: {
    definedAt: { "files": [{ "filePathToShowToUser": "/pages/profile/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }] },
    valueSerialized: '["pageProps","documentProps","pageProps","documentProps","acceptsLanguages","locale"]'
  }
};
export {
  configValuesImported,
  configValuesSerialized
};
