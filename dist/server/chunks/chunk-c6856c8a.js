import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { L as Link } from "./chunk-5c423806.js";
import PropTypes__default from "prop-types";
import { Image } from "@nextui-org/react";
import { b as SeriesMetadata } from "./chunk-a773efb0.js";
function ProfileLink({ config, children }) {
  let finalUrl = `/${config.pageSlug}`;
  return /* @__PURE__ */ jsx(Link, { href: finalUrl, children });
}
ProfileLink.propTypes = {
  config: PropTypes__default.object,
  children: PropTypes__default.any
};
function ProfileSmall({ page, series, routeParams, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col sm:p-0 md:mt-6", children: [
    series && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-gray-100 text-2xl sm:text-4xl font-bold mb-6", children: series.title }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(SeriesMetadata, { item: series }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex", children: /* @__PURE__ */ jsx(ProfileLink, { config: {
        pageSlug: routeParams.pageSlug
      }, children: /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Image, { src: page.logo, alt: page.title, className: "h-8 w-8 mr-4 rounded-full border-2 border-white/30" }),
        /* @__PURE__ */ jsx("span", { className: "mr-8 text-sm sm:text-base font-bold", children: page.title })
      ] }) }) }),
      children
    ] }),
    series && /* @__PURE__ */ jsx("div", { className: "hidden mt-6", children: series.shortDescription || series.description })
  ] });
}
export {
  ProfileSmall as P
};
