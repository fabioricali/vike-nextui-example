import { u as usePageContext, i as import_0 } from "../chunks/chunk-5c423806.js";
import { jsxs, jsx } from "react/jsx-runtime";
import PropTypes__default from "prop-types";
import { FaceFrownIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline/index.js";
import "react-dom/server";
import "react";
import "@nextui-org/react";
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
function Page({ is404 }) {
  const { abortStatusCode, abortReason } = usePageContext();
  if (abortStatusCode === 404 || is404) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center p-12 sm:p-4", children: [
      /* @__PURE__ */ jsx(FaceFrownIcon, { className: "w-64 m-auto mb-4 text-yellow-500" }),
      /* @__PURE__ */ jsx("h1", { className: "font-bold text-5xl", children: "404" }),
      /* @__PURE__ */ jsx("h2", { className: "mb-2 text-yellow-500", children: "Page not found" }),
      /* @__PURE__ */ jsx("p", { children: abortReason || "This page could not be found." })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("div", { className: "text-center p-12 sm:p-4", children: [
      /* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-64 m-auto mb-4 text-red-400" }),
      /* @__PURE__ */ jsx("h1", { className: "font-bold text-5xl", children: "500" }),
      /* @__PURE__ */ jsx("h2", { className: "mb-2 text-red-400", children: "Internal error" }),
      /* @__PURE__ */ jsx("p", { children: abortReason || "Something went wrong." })
    ] });
  }
}
Page.propTypes = {
  is404: PropTypes__default.bool
};
const import_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
    configName: "Page",
    importPath: "/pages/_error/+Page.jsx",
    isValueFile: true,
    exportValues: import_1
  }
];
const configValuesSerialized = {
  ["passToClient"]: {
    definedAt: { "files": [{ "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }] },
    valueSerialized: '["pageProps","documentProps","acceptsLanguages","locale"]'
  }
};
export {
  configValuesImported,
  configValuesSerialized
};
