const _route$4 = "/@pageSlug";
const import_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _route$4
}, Symbol.toStringTag, { value: "Module" }));
const _route$3 = "/@pageSlug/episodes/@seriesSlug";
const import_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _route$3
}, Symbol.toStringTag, { value: "Module" }));
const _route$2 = "/@pageSlug/episodes/@seriesSlug/@episodeSlug";
const import_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _route$2
}, Symbol.toStringTag, { value: "Module" }));
const _route$1 = "/";
const import_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _route$1
}, Symbol.toStringTag, { value: "Module" }));
const _route = "/test";
const import_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _route
}, Symbol.toStringTag, { value: "Module" }));
const pageFilesLazy = {};
const pageFilesEager = {};
const pageFilesExportNamesLazy = {};
const pageFilesExportNamesEager = {};
const pageFilesList = [];
const neverLoaded = {};
const isGeneratedFile = true;
const pageConfigsSerialized = [
  {
    pageId: "/pages/profile",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/profile", "definedBy": "/pages/profile/" },
    loadConfigValuesAll: () => import("./entries/pages_profile.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        definedAt: { "isComputed": true },
        valueSerialized: "true"
      },
      ["clientRouting"]: {
        definedAt: { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: "true"
      }
    },
    configValuesImported: [
      {
        configName: "route",
        importPath: "/pages/profile/+route.js",
        isValueFile: true,
        exportValues: import_0
      }
    ]
  },
  {
    pageId: "/pages/profile/episodes",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/profile/episodes", "definedBy": "/pages/profile/episodes/" },
    loadConfigValuesAll: () => import("./entries/pages_profile_episodes.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        definedAt: { "isComputed": true },
        valueSerialized: "true"
      },
      ["clientRouting"]: {
        definedAt: { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: "true"
      }
    },
    configValuesImported: [
      {
        configName: "route",
        importPath: "/pages/profile/episodes/+route.js",
        isValueFile: true,
        exportValues: import_1
      }
    ]
  },
  {
    pageId: "/pages/profile/episodes/episode",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/profile/episodes/episode", "definedBy": "/pages/profile/episodes/episode/" },
    loadConfigValuesAll: () => import("./entries/pages_profile_episodes_episode.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        definedAt: { "isComputed": true },
        valueSerialized: "true"
      },
      ["clientRouting"]: {
        definedAt: { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: "true"
      }
    },
    configValuesImported: [
      {
        configName: "route",
        importPath: "/pages/profile/episodes/episode/+route.js",
        isValueFile: true,
        exportValues: import_2
      }
    ]
  },
  {
    pageId: "/pages/_error",
    isErrorPage: true,
    routeFilesystem: void 0,
    loadConfigValuesAll: () => import("./entries/pages_error.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        definedAt: { "isComputed": true },
        valueSerialized: "true"
      },
      ["clientRouting"]: {
        definedAt: { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: "true"
      }
    },
    configValuesImported: []
  },
  {
    pageId: "/pages/home",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/home", "definedBy": "/pages/home/" },
    loadConfigValuesAll: () => import("./entries/pages_home.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        definedAt: { "isComputed": true },
        valueSerialized: "true"
      },
      ["clientRouting"]: {
        definedAt: { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: "true"
      }
    },
    configValuesImported: [
      {
        configName: "route",
        importPath: "/pages/home/+route.js",
        isValueFile: true,
        exportValues: import_3
      }
    ]
  },
  {
    pageId: "/pages/test",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/test", "definedBy": "/pages/test/" },
    loadConfigValuesAll: () => import("./entries/pages_test.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        definedAt: { "isComputed": true },
        valueSerialized: "true"
      },
      ["clientRouting"]: {
        definedAt: { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: "true"
      }
    },
    configValuesImported: [
      {
        configName: "route",
        importPath: "/pages/test/+route.js",
        isValueFile: true,
        exportValues: import_4
      }
    ]
  }
];
const pageConfigGlobalSerialized = {
  configValuesImported: []
};
const pageFilesLazyIsomorph1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyIsomorph = { ...pageFilesLazyIsomorph1 };
pageFilesLazy[".page"] = pageFilesLazyIsomorph;
const pageFilesLazyServer1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyServer = { ...pageFilesLazyServer1 };
pageFilesLazy[".page.server"] = pageFilesLazyServer;
const pageFilesEagerRoute1 = /* @__PURE__ */ Object.assign({});
const pageFilesEagerRoute = { ...pageFilesEagerRoute1 };
pageFilesEager[".page.route"] = pageFilesEagerRoute;
const pageFilesExportNamesEagerClient1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerClient = { ...pageFilesExportNamesEagerClient1 };
pageFilesExportNamesEager[".page.client"] = pageFilesExportNamesEagerClient;
export {
  isGeneratedFile,
  neverLoaded,
  pageConfigGlobalSerialized,
  pageConfigsSerialized,
  pageFilesEager,
  pageFilesExportNamesEager,
  pageFilesExportNamesLazy,
  pageFilesLazy,
  pageFilesList
};
