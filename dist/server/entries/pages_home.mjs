import { i as import_0 } from "../chunks/chunk-5c423806.js";
import { redirect } from "vike/abort";
import { jsx, Fragment } from "react/jsx-runtime";
import "react-dom/server";
import "react";
import "prop-types";
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
async function onBeforeRender(pageContext) {
  throw redirect("/radiotaormina");
}
const _onBeforeRender = {
  passToClient: ["pageProps", "documentProps"]
};
const import_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _onBeforeRender,
  onBeforeRender
}, Symbol.toStringTag, { value: "Module" }));
function Page() {
  return /* @__PURE__ */ jsx(Fragment, {});
}
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
    importPath: "/pages/home/+onBeforeRender.js",
    isValueFile: true,
    exportValues: import_1
  },
  {
    configName: "Page",
    importPath: "/pages/home/+Page.jsx",
    isValueFile: true,
    exportValues: import_2
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
