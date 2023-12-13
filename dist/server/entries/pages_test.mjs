import { i as import_0 } from "../chunks/chunk-5c423806.js";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import "react-dom/server";
import "prop-types";
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
  const pageProps = {};
  return {
    pageContext: {
      pageProps
    }
  };
}
const _onBeforeRender = {
  passToClient: ["pageProps", "documentProps"]
};
const import_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _onBeforeRender,
  onBeforeRender
}, Symbol.toStringTag, { value: "Module" }));
AModal.defaultProps = {
  title: "",
  closeButtonText: "Close",
  okButtonText: "Ok",
  isOpen: null,
  onOpenChange: null,
  onOkClick: null
};
function AModal(props) {
  function onOkButtonPress(onClose) {
    if (typeof props.onOkClick === "function") {
      props.onOkClick(onClose);
    }
  }
  return /* @__PURE__ */ jsx(Modal, { isOpen: props.isOpen, onOpenChange: props.onOpenChange, children: /* @__PURE__ */ jsx(ModalContent, { children: (onClose) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ModalHeader, { className: "flex flex-col gap-1", children: props.title }),
    /* @__PURE__ */ jsx(ModalBody, { children: props.children }),
    /* @__PURE__ */ jsxs(ModalFooter, { children: [
      /* @__PURE__ */ jsx(Button, { color: "danger", variant: "light", onPress: onClose, children: props.closeButtonText }),
      /* @__PURE__ */ jsx(Button, { color: "primary", onPress: () => onOkButtonPress(onClose), children: props.okButtonText })
    ] })
  ] }) }) });
}
const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
  // More people...
];
function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  function onOkClick(close) {
    close();
  }
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-full flex-col dark", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-7xl grow lg:flex _bg-amber-700", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 lg:pr-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center space-x-3 bg-blue-800 h-96 mb-6", children: [
        /* @__PURE__ */ jsx(Button, { onPress: onOpen, children: "Open Modal" }),
        /* @__PURE__ */ jsx(AModal, { onOkClick, title: "Share", isOpen, onOpenChange, children: /* @__PURE__ */ jsx("div", { children: "Some info" }) })
      ] }),
      people.map((person, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative flex items-center space-x-3 mb-2 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("img", { className: "h-10 w-10 rounded-full", src: person.imageUrl, alt: "" }) }),
            /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxs("a", { href: "#", className: "focus:outline-none", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute inset-0", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: person.name }),
              /* @__PURE__ */ jsx("p", { className: "truncate text-sm text-gray-500", children: person.role })
            ] }) })
          ]
        },
        i
      ))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0 lg:pl-6", children: /* @__PURE__ */ jsx("div", { className: "relative flex items-center space-x-3 bg-blue-800 h-96 mb-6" }) })
  ] }) });
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
    importPath: "/pages/test/+onBeforeRender.js",
    isValueFile: true,
    exportValues: import_1
  },
  {
    configName: "Page",
    importPath: "/pages/test/+Page.jsx",
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
