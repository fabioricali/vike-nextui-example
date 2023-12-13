import request from "axios";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { DocumentIcon, BookmarkIcon, LinkIcon, RssIcon, ShareIcon } from "@heroicons/react/24/outline/index.js";
import { c as PERMALINK_BASE_PLACEHOLDER, u as usePageContext, L as Link } from "./chunk-5c423806.js";
import PropTypes__default from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, Tabs, Tab, useDisclosure } from "@nextui-org/react";
import { SocialIcon } from "react-social-icons";
import { useRef } from "react";
import confetti from "canvas-confetti";
const API_HOST = "https://api.xdevel.com";
const API_CLIENT_ID = "65acf1b9ec730b5126ea4c671db703613d07277b";
const APP_HOST = "https://pods.inonda.com";
const EMBED_HOST = "https://odplay.xdevel.com";
const getEpisodesBySeriesSlug = async function(seriesSlug, onDemandServiceId, options) {
  let opts = Object.assign({
    start: 0,
    limit: 15,
    search: "",
    onlyParents: false,
    childOf: 0,
    type: "json",
    permalinkBase: ""
  }, options);
  let url = `${API_HOST}/streamsolution/web/on-demand/episodes/series/${onDemandServiceId}/${seriesSlug}?clientId=${API_CLIENT_ID}&onlyParents=${opts.onlyParents}&childOf=${opts.childOf}&includeSeriesInfo=true&type=${opts.type}&permalinkBase=${opts.permalinkBase}`;
  url += "&cb=" + (/* @__PURE__ */ new Date()).getTime();
  url += `&start=${opts.start}`;
  url += `&limit=${opts.limit}`;
  if (opts.search) {
    url += `&search=${opts.search}`;
  }
  let res = await request({ url });
  if (opts.type === "rss") {
    return res.data;
  }
  return res.data.result;
};
const getEpisodeBySlug = async function(episodeSlug, seriesSlug, onDemandServiceId) {
  let url = `${API_HOST}/streamsolution/web/on-demand/episode/read/${onDemandServiceId}/${seriesSlug}/${episodeSlug}?clientId=${API_CLIENT_ID}&includeSeriesInfo=1`;
  let res = await request({ url });
  return res.data.result;
};
const getSeries = async function(serviceId, categories = "") {
  let url = `${API_HOST}/streamsolution/web/on-demand/series/read/${serviceId}?categories=${categories}&clientId=${API_CLIENT_ID}`;
  let res = await request({ url });
  return res.data.result.items;
};
const getSeriesInfoBySeriesSlug = async function(seriesSlug, onDemandServiceId) {
  let url = `${API_HOST}/streamsolution/web/on-demand/series/readSingle/${onDemandServiceId}/${seriesSlug}?clientId=${API_CLIENT_ID}`;
  let res = await request({ url });
  return res.data.result;
};
const getPage = async function(profileSlug) {
  let url = `${API_HOST}/xsocial/inonda/public/profile/${profileSlug}?clientId=${API_CLIENT_ID}`;
  let res = await request({ url });
  return res.data.result;
};
const getEpisodeWavePoints = async function(episode) {
  if (episode && episode.wavePointsUrl) {
    let res = await request({ url: episode.wavePointsUrl });
    if (!res || !res.data)
      return null;
    return res.data.data;
  } else {
    return null;
  }
};
function seriesLinkFunc(config) {
  return config.seriesDerivatePermalink.replace(PERMALINK_BASE_PLACEHOLDER, "/" + config.pageSlug);
}
function SeriesLink({ item, children }) {
  const { pageProps } = usePageContext();
  let finalUrl = seriesLinkFunc({
    pageSlug: pageProps.page.slug,
    seriesDerivatePermalink: item.seriesDerivatePermalink
  });
  return /* @__PURE__ */ jsx(Link, { href: finalUrl, children });
}
SeriesLink.propTypes = {
  item: PropTypes__default.object,
  children: PropTypes__default.any
};
function EpisodesCounter({ item, className }) {
  return /* @__PURE__ */ jsxs("div", { className: "inline leading-4 " + className, children: [
    /* @__PURE__ */ jsx(DocumentIcon, { className: "inline-block text-base text-white w-5 h-5 mr-1.5" }),
    /* @__PURE__ */ jsx("div", { className: "inline-block", children: /* @__PURE__ */ jsx(SeriesLink, { item, children: /* @__PURE__ */ jsxs("span", { className: "block text-xs --md:text-base font-normal pr-2 w-full sm:w-auto", children: [
      item.episodesCount,
      " puntate"
    ] }) }) })
  ] });
}
EpisodesCounter.propTypes = {
  className: PropTypes__default.any,
  item: PropTypes__default.object
};
function SeriesCategories({ item, className }) {
  if (!item || !item.categories.length)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "inline leading-4 " + className, children: [
    /* @__PURE__ */ jsx(BookmarkIcon, { className: "inline-block text-base text-white w-5 h-5 mr-1.5" }),
    item.categories.map((category, i, t) => /* @__PURE__ */ jsx("div", { className: "inline-block", children: /* @__PURE__ */ jsx("fake-link", { href: "/series?category=" + category, children: /* @__PURE__ */ jsxs("span", { className: "block text-xs --md:text-base font-normal pr-1 w-full sm:w-auto", children: [
      /* @__PURE__ */ jsx("span", { children: category }),
      i < t.length - 1 && /* @__PURE__ */ jsx("span", { children: ", " })
    ] }) }) }, i))
  ] });
}
SeriesCategories.propTypes = {
  className: PropTypes__default.any,
  item: PropTypes__default.object
};
function SeriesMetadata({ item }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-x-3", children: [
    /* @__PURE__ */ jsx(EpisodesCounter, { item }),
    /* @__PURE__ */ jsx(SeriesCategories, { item })
  ] });
}
SeriesMetadata.propTypes = {
  item: PropTypes__default.object
};
const style = "";
function createSocialsObject(linkToShare, descriptionToShare) {
  return [
    {
      type: "facebook",
      url: `https://www.facebook.com/sharer.php?u=${linkToShare}`
    },
    {
      type: "x",
      url: `https://twitter.com/share?url=${linkToShare}&text=${descriptionToShare}`
    },
    {
      type: "whatsapp",
      url: `https://api.whatsapp.com/send?text=${descriptionToShare}%20${linkToShare}`
    },
    {
      type: "pinterest",
      url: `https://pinterest.com/pin/create/button/?url=${linkToShare}&description=${descriptionToShare}`
    },
    {
      type: "linkedin",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${linkToShare}&title=${descriptionToShare}`
    }
  ];
}
function copyText(inputRef) {
  confetti();
  inputRef.current.select();
  navigator.clipboard.writeText(inputRef.current.value).then();
}
function Socials({ shareUrl, content }) {
  const { urlOriginal } = usePageContext();
  const inputOfPageLinkRef = useRef(null);
  const { t } = useTranslation();
  const linkToShareOriginal = shareUrl || APP_HOST + urlOriginal;
  const linkToShare = encodeURIComponent(linkToShareOriginal);
  const descriptionToShare = encodeURIComponent(content || "");
  const socials = createSocialsObject(linkToShare, descriptionToShare);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex space-x-4 mb-6 mt-4", children: socials.map((social) => /* @__PURE__ */ jsx(
      "a",
      {
        href: social.url,
        target: "_blank",
        rel: "noreferrer",
        children: /* @__PURE__ */ jsx(
          SocialIcon,
          {
            as: "span",
            network: social.type,
            className: "--shadow-md --shadow-cyan-500/30 rounded-full transition-all hover:shadow-cyan-500/50 hover:scale-110 hover:shadow-lg active:scale-80"
          }
        )
      },
      social.type
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2 text-left", children: t("Copy and paste this link into an email or chat") }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "url",
            readOnly: true,
            defaultValue: linkToShareOriginal,
            ref: inputOfPageLinkRef,
            labelPlacement: "outside",
            startContent: /* @__PURE__ */ jsx(LinkIcon, { className: "w-5 text-yellow-500" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onPress: () => copyText(inputOfPageLinkRef),
            children: t("Copy")
          }
        )
      ] })
    ] })
  ] });
}
Socials.propTypes = {
  shareUrl: PropTypes__default.any,
  content: PropTypes__default.any
};
function openLink(inputRef) {
  window.open(inputRef.current.value);
}
function Feed() {
  const { t } = useTranslation();
  const inputOfFeedLinkRef = useRef(null);
  const { pageProps } = usePageContext();
  const feedUrl = pageProps.feedUrl;
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("p", { className: "mb-2 text-left", children: t("Copy the feed url") }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "url",
          readOnly: true,
          defaultValue: feedUrl,
          ref: inputOfFeedLinkRef,
          labelPlacement: "outside",
          startContent: /* @__PURE__ */ jsx(RssIcon, { className: "w-5 text-yellow-500" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onPress: () => copyText(inputOfFeedLinkRef),
          children: t("Copy")
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onPress: () => openLink(inputOfFeedLinkRef),
          children: t("Open")
        }
      )
    ] })
  ] });
}
function templateEmbed(embedUrl) {
  return `<div class="streamsolution-odplay" style="position: relative; height: 600px; width: 100%"><iframe style="position: absolute; top: 0; left:0; width: 100%; height: 100%; border:0;" src="${embedUrl}" title="StreamSolution ODPlay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
}
function Embed() {
  const { t } = useTranslation();
  const { pageProps } = usePageContext();
  const textareaRef = useRef(null);
  const { embedUrl, embedEpisodeAudio } = pageProps;
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("iframe", { src: embedUrl, className: `w-full mb-4 ${embedEpisodeAudio ? "h-[200px]" : "aspect-video"} bg-transparent` }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
      /* @__PURE__ */ jsx(
        Textarea,
        {
          ref: textareaRef,
          label: t("Copy the embed code and paste it in your html"),
          value: templateEmbed(embedUrl),
          maxRows: 2,
          classNames: {
            input: "opacity-50"
          },
          readOnly: true
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onPress: () => copyText(textareaRef),
          children: t("Copy")
        }
      )
    ] })
  ] });
}
function ShareModal({ isOpen, onOpenChange, shareUrl, content, enableFeed, enableEmbed }) {
  usePageContext();
  const { t } = useTranslation();
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen,
      onOpenChange,
      defaultOpen: false,
      backdrop: "blur",
      size: "3xl",
      placement: "top",
      children: /* @__PURE__ */ jsx(ModalContent, { children: (onClose) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(ModalHeader, { className: "flex flex-col gap-1", children: t("Sharing Options") }),
        /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx("div", { className: "pb-4", children: /* @__PURE__ */ jsxs(Tabs, { "aria-label": "Options", fullWidth: true, size: "md", children: [
          /* @__PURE__ */ jsx(Tab, { title: t("Share on social network"), children: /* @__PURE__ */ jsx(Socials, { shareUrl, content }) }, "socials"),
          enableFeed && /* @__PURE__ */ jsx(Tab, { title: t("Get RSS feed"), children: /* @__PURE__ */ jsx(Feed, {}) }, "feed"),
          enableEmbed && /* @__PURE__ */ jsx(Tab, { title: t("Embed widget"), children: /* @__PURE__ */ jsx(Embed, {}) }, "embed")
        ] }) }) })
      ] }) })
    }
  );
}
ShareModal.propTypes = {
  isOpen: PropTypes__default.bool,
  enableFeed: PropTypes__default.bool,
  enableEmbed: PropTypes__default.bool,
  onOpenChange: PropTypes__default.func,
  shareUrl: PropTypes__default.any,
  content: PropTypes__default.any
};
function ShareButton(props) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        onPress: onOpen,
        variant: "bordered",
        startContent: /* @__PURE__ */ jsx(ShareIcon, { className: "w-5", "aria-hidden": "true" }),
        className: "border-white/30 hidden sm:inline-flex",
        children: t("Share")
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        onPress: onOpen,
        variant: "light",
        size: "sm",
        isIconOnly: true,
        className: "sm:hidden",
        children: /* @__PURE__ */ jsx(ShareIcon, { "aria-hidden": "true" })
      }
    ),
    /* @__PURE__ */ jsx(ShareModal, { isOpen, onOpenChange, ...props })
  ] });
}
export {
  APP_HOST as A,
  EMBED_HOST as E,
  SeriesLink as S,
  getSeries as a,
  SeriesMetadata as b,
  ShareButton as c,
  getSeriesInfoBySeriesSlug as d,
  getEpisodesBySeriesSlug as e,
  API_CLIENT_ID as f,
  getPage as g,
  getEpisodeBySlug as h,
  getEpisodeWavePoints as i,
  seriesLinkFunc as s
};
