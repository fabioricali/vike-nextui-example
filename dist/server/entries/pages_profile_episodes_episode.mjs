import { b as useMediaPlayer, a as EpisodePlayButton, V as VideoFrame, P as PageBackdropContext, i as import_0 } from "../chunks/chunk-5c423806.js";
import { g as getPage, h as getEpisodeBySlug, i as getEpisodeWavePoints, e as getEpisodesBySeriesSlug, a as getSeries, A as APP_HOST, E as EMBED_HOST, f as API_CLIENT_ID, s as seriesLinkFunc, S as SeriesLink, c as ShareButton } from "../chunks/chunk-a773efb0.js";
import { render } from "vike/abort";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { P as ProfileSmall } from "../chunks/chunk-c6856c8a.js";
import { useRef, useEffect, useState, useContext } from "react";
import { Card, CardHeader, CardBody, Image, Breadcrumbs, BreadcrumbItem, Divider, Spacer } from "@nextui-org/react";
import { navigate } from "vike/client/router";
import * as PropTypes from "prop-types";
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
import "@heroicons/react/24/outline/index.js";
async function onBeforeRender(pageContext) {
  let { pageSlug, seriesSlug, episodeSlug } = pageContext.routeParams;
  let pageResult = await getPage(pageSlug);
  if (!pageResult) {
    throw render(404, `${pageSlug} doesn't exist.`);
  }
  let onDemandServiceId = pageResult.onDemandServiceId;
  let episode = await getEpisodeBySlug(episodeSlug, seriesSlug, onDemandServiceId);
  if (!episode) {
    throw render(404, `${episodeSlug} doesn't exist.`);
  }
  episode.wavePoints = await getEpisodeWavePoints(episode);
  const pageProps = {
    page: pageResult,
    episode,
    onDemandEpisodes: await getEpisodesBySeriesSlug(seriesSlug, onDemandServiceId),
    onDemandSeries: await getSeries(onDemandServiceId),
    routeParams: pageContext.routeParams,
    route: pageContext._pageContextInit.urlOriginal,
    feedUrl: `${APP_HOST}/${pageSlug}/episodes/${seriesSlug}/feed`,
    embedUrl: `${EMBED_HOST}/?f=${episode.fileHash}&clientId=${API_CLIENT_ID}&ref=inondapods`,
    embedEpisodeAudio: !!episode.wavePoints
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
function Card1({ textBig, text, subText, image, link }) {
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: "py-4 border-1 border-white/30 bg-black/30",
      isPressable: !!link,
      onClick: () => navigate(link),
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-0 pt-0 px-4 block text-left", children: [
          text && /* @__PURE__ */ jsx("p", { className: "text-tiny uppercase font-bold truncate", title: text, children: text }),
          subText && /* @__PURE__ */ jsx("small", { className: "block text-default-500 truncate", title: subText, children: subText }),
          textBig && /* @__PURE__ */ jsx("h4", { className: "font-bold text-small sm:text-large truncate", title: textBig, children: textBig })
        ] }),
        /* @__PURE__ */ jsx(CardBody, { className: "overflow-visible py-2", children: image && /* @__PURE__ */ jsx(
          Image,
          {
            alt: "Card background",
            className: "object-cover rounded-xl",
            src: image,
            sizes: "100%"
          }
        ) })
      ]
    }
  );
}
function XWAVE(domNode, duration, peaks, markers, opt) {
  var $ = this;
  var markerIndex = 1;
  var cursor = null;
  var cursorFill = null;
  var cursorTime = null;
  var timeline = null;
  var markerTrigger = [];
  var fadeLines = {};
  var hideMixOutLine = false;
  var hidePrefadeOutLine = false;
  var timeOnMouse = null;
  var quickTime = null;
  $.domNode = domNode;
  $.duration = duration || 0;
  $.peaks = peaks || [];
  $.markers = markers || {};
  $.opt = opt || {};
  $.canvas = null;
  $.floor = null;
  $.events = [];
  $.dragElement = null;
  $.dragMs = null;
  $.dragoffset = {
    x: 0,
    y: 0
  };
  $._HOURSMS = 36e5;
  $.lastStart = 0;
  $.lastEnd = 0;
  $.markerDef = {
    "in": {
      fill: "red",
      color: "white",
      y: 5
    },
    "mix": {
      fill: "yellow",
      color: "black",
      y: 20
    },
    "intro": {
      fill: "cyan",
      color: "black",
      y: 35
    },
    "outro": {
      fill: "blue",
      color: "white",
      y: 50
    },
    "prefade": {
      fill: "white",
      color: "black",
      y: 65
    },
    "ri": {
      fill: "fuchsia",
      color: "white",
      y: 80
    },
    "ro": {
      fill: "fuchsia",
      color: "white",
      y: 95
    },
    "out": {
      fill: "yellow",
      color: "black",
      y: 110
    }
  };
  if (typeof $.domNode === "undefined")
    throw new Error("Dom node required");
  $.defaultOpt = {
    backgroundColor: "#000",
    waveColor: "limegreen",
    lineBaseColor: "lime",
    width: 800,
    height: 200,
    timeline: true,
    timelineBackgroundColor: "#333",
    timelineHeight: 26,
    timelineTickerColor: "#777",
    timelineBorderColor: "#999",
    timelineTimeColor: "#ccc",
    cursorType: "line",
    // line, linefill, none
    cursorLineColor: "white",
    cursorFillColor: "black",
    cursorFillOpacity: 0.6,
    cursorTimeColor: "white",
    cursorTimeFontSize: "7pt",
    cursorTimeFontShadow: "0 0 3px #000",
    cursorTimeNegativeColor: "white",
    cursorLineWidth: 1,
    showCursorTime: true,
    markerLooked: false,
    markerLineWidth: 1,
    hideMarker: [],
    hideMarkerLabel: false,
    intraMarker: true,
    loadingText: "Loading...",
    loadingColor: "white",
    zoomWheel: true,
    highRender: false,
    blockRender: false,
    volume: 1,
    forceHideScroll: false,
    locked: false,
    showTimeOnMouse: false,
    timeOnMouseFontSize: "7pt",
    timeOnMouseColor: "white",
    timeOnMouseOpacity: 1,
    timeOnMouseBackgroundColor: "black",
    customMarkers: [],
    // not works now,
    hideTimeMilliseconds: false,
    showQuickTime: false,
    quickTimeColor: "white",
    quickTimeTextShadow: "0px 0px 5px black",
    fontFamily: "sans-serif"
  };
  var setDefault = function() {
    for (var i in $.defaultOpt) {
      if (!$.opt.hasOwnProperty(i)) {
        $.opt[i] = $.defaultOpt[i];
      }
    }
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  var drawTimeOnMouse = function() {
    timeOnMouse = document.createElement("div");
    timeOnMouse.style.position = "absolute";
    timeOnMouse.style.color = $.opt.timeOnMouseColor;
    timeOnMouse.style.backgroundColor = $.opt.timeOnMouseBackgroundColor;
    timeOnMouse.style.fontSize = $.opt.timeOnMouseFontSize;
    timeOnMouse.style.padding = "6px";
    timeOnMouse.style.margin = 0;
    timeOnMouse.style.display = "none";
    timeOnMouse.style.top = 0;
    timeOnMouse.style.left = 0;
    timeOnMouse.style.opacity = $.opt.timeOnMouseOpacity;
    timeOnMouse.style.zIndex = 10;
    timeOnMouse.style.cursor = "default";
    $.floor.appendChild(timeOnMouse);
  };
  var showTimeOnMouse = function() {
    if (!timeOnMouse)
      return;
    timeOnMouse.style.display = "block";
  };
  var hideTimeOnMouse = function() {
    if (!timeOnMouse)
      return;
    timeOnMouse.style.display = "none";
  };
  var drawQuickTime = function() {
    if (!$.opt.showQuickTime)
      return;
    quickTime = document.createElement("div");
    quickTime.style.position = "absolute";
    quickTime.style.fontSize = "10pt";
    quickTime.style.fontFamily = $.opt.fontFamily;
    quickTime.style.bottom = "8px";
    quickTime.style.left = "8px";
    quickTime.style.color = $.opt.quickTimeColor;
    quickTime.style.textShadow = $.opt.quickTimeTextShadow;
    quickTime.innerHTML = "- / -";
    $.floor.appendChild(quickTime);
  };
  var drawCursor = function() {
    if ($.opt.cursorType === "none")
      return;
    cursor = document.createElement("div");
    cursor.style.backgroundColor = $.opt.cursorLineColor;
    cursor.style.width = $.opt.cursorLineWidth + "px";
    cursor.style.height = $.floor.style.height;
    cursor.style.position = "absolute";
    cursor.style.left = 0;
    cursor.style.top = 0;
    cursor.style.margin = 0;
    cursor.style.zIndex = 1;
    cursor.dataset.time = 0;
    $.floor.appendChild(cursor);
    if ($.opt.cursorType === "linefill") {
      cursorFill = document.createElement("div");
      cursorFill.style.width = $.floor.offsetWidth + "px";
      cursorFill.style.height = $.canvas.height + "px";
      cursorFill.style.margin = 0;
      cursorFill.style.marginTop = $.canvas.style.marginTop ? $.canvas.style.marginTop : 0;
      cursorFill.style.backgroundColor = $.opt.cursorFillColor;
      cursorFill.style.opacity = $.opt.cursorFillOpacity;
      cursorFill.style.position = "absolute";
      cursorFill.style.right = 0;
      cursorFill.style.top = 0;
      cursorFill.style.zIndex = 0;
      $.floor.appendChild(cursorFill);
    }
    if ($.opt.showCursorTime) {
      cursorTime = document.createElement("div");
      cursorTime.style.width = "70px";
      cursorTime.style.textAlign = "left";
      cursorTime.style.height = "20px";
      cursorTime.style.margin = 0;
      cursorTime.style.marginTop = $.canvas.style.marginTop ? $.canvas.style.marginTop : 0;
      cursorTime.style.padding = 0;
      cursorTime.style.paddingTop = "2px";
      cursorTime.style.paddingLeft = "3px";
      cursorTime.style.paddingRight = "3px";
      cursorTime.style.position = "absolute";
      cursorTime.style.right = 0;
      cursorTime.style.top = 0;
      cursorTime.style.zIndex = 1;
      cursorTime.style.color = $.opt.cursorTimeColor;
      cursorTime.style.font = $.opt.cursorTimeFontSize + " " + $.opt.fontFamily;
      cursorTime.style.textShadow = $.opt.cursorTimeFontShadow;
      cursorTime.style.fontWeight = "bold";
      $.floor.appendChild(cursorTime);
    }
  };
  var drawTimeline = function() {
    timeline = document.createElement("div");
    timeline.style.position = "absolute";
    timeline.style.width = $.floor.style.width;
    timeline.style.height = $.opt.timelineHeight + "px";
    timeline.style.backgroundColor = $.opt.timelineBackgroundColor;
    timeline.style.borderBottom = "1px solid " + $.opt.timelineBorderColor;
    timeline.style.margin = 0;
    timeline.style.left = 0;
    timeline.style.top = 0;
    timeline.style.overflow = "hidden";
    timeline.style.boxSizing = "border-box";
    $.floor.appendChild(timeline);
    var tickerWidth = 50;
    var maxTicker = Math.round($.floor.offsetWidth / tickerWidth);
    var timeFormat = $.duration >= $._HOURSMS ? "HH:MM" : "MM:SS";
    for (var i = 0; i < maxTicker; i++) {
      var ticker = document.createElement("label");
      ticker.style.position = "absolute";
      ticker.style.display = "block";
      ticker.style.padding = 0;
      ticker.style.margin = 0;
      ticker.style.top = "6px";
      ticker.style.width = tickerWidth + "px";
      ticker.style.font = "7pt courier";
      ticker.style.fontWeight = "bold";
      ticker.style.color = $.opt.timelineTickerColor;
      ticker.style.textAlign = "center";
      ticker.style.background = "transparent";
      ticker.style.overflow = "hidden";
      if (i + 1 < maxTicker)
        ticker.style.borderRight = "1px solid " + $.opt.timelineTickerColor;
      ticker.style.boxSizing = "border-box";
      ticker.innerHTML = '<span style="margin: 0;padding: 0; display: block; color:' + $.opt.timelineTimeColor + '">' + msToTime(xToMs(i * tickerWidth + tickerWidth / 2), timeFormat) + '</span><span style="display: block;padding: 0;margin:-3px 0 0 0; color:' + $.opt.timelineTickerColor + '">|</span>';
      ticker.style.left = timeline.lastChild ? timeline.lastChild.offsetWidth * i + "px" : "0px";
      timeline.appendChild(ticker);
    }
    var timelineFloor = document.createElement("div");
    timelineFloor.style.position = "absolute";
    timelineFloor.style.width = $.floor.style.width;
    timelineFloor.style.height = $.opt.timelineHeight + "px";
    timelineFloor.style.backgroundColor = "transparent";
    timelineFloor.style.border = "none";
    timelineFloor.style.margin = 0;
    timelineFloor.style.left = 0;
    timelineFloor.style.top = 0;
    timelineFloor.style.boxSizing = "border-box";
    timeline.appendChild(timelineFloor);
  };
  var drawTimelineZoom = function(start, end) {
    var offset = start * $.canvas.offsetWidth / (end - start);
    timeline = document.createElement("div");
    timeline.style.position = "absolute";
    timeline.style.width = $.floor.style.width;
    timeline.style.height = $.opt.timelineHeight + "px";
    timeline.style.backgroundColor = $.opt.timelineBackgroundColor;
    timeline.style.borderBottom = "1px solid " + $.opt.timelineBorderColor;
    timeline.style.margin = 0;
    timeline.style.left = 0;
    timeline.style.top = 0;
    timeline.style.overflow = "hidden";
    timeline.style.boxSizing = "border-box";
    $.floor.appendChild(timeline);
    var tickerWidth = 50;
    var maxTicker = Math.round($.canvas.offsetWidth / tickerWidth + 3 + offset / tickerWidth);
    var timeFormat = $.duration >= $._HOURSMS ? "HH:MM" : "MM:SS";
    var step = (
      /*Math.round(offset / tickerWidth) > 1 ? */
      Math.round(offset / tickerWidth) - 3
    );
    for (var i = step; i < maxTicker; i++) {
      var ticker = document.createElement("label");
      ticker.style.position = "absolute";
      ticker.style.display = "block";
      ticker.style.padding = 0;
      ticker.style.margin = 0;
      ticker.style.top = "6px";
      ticker.style.width = tickerWidth + "px";
      ticker.style.font = "7pt courier";
      ticker.style.fontWeight = "bold";
      ticker.style.color = $.opt.timelineTickerColor;
      ticker.style.textAlign = "center";
      ticker.style.background = "transparent";
      ticker.style.overflow = "hidden";
      if (i + 1 < maxTicker)
        ticker.style.borderRight = "1px solid " + $.opt.timelineTickerColor;
      ticker.style.boxSizing = "border-box";
      ticker.innerHTML = '<span style="margin: 0;padding: 0; display: block; color:' + $.opt.timelineTimeColor + '">' + msToTime(xToMs(i * tickerWidth + tickerWidth / 2), timeFormat) + '</span><span style="display: block;padding: 0;margin:-3px 0 0 0; color:' + $.opt.timelineTickerColor + '">|</span>';
      ticker.style.left = timeline.lastChild ? timeline.lastChild.offsetWidth * i + "px" : step * tickerWidth + "px";
      timeline.appendChild(ticker);
    }
    var timelineFloor = document.createElement("div");
    timelineFloor.style.position = "absolute";
    timelineFloor.style.width = $.floor.style.width;
    timelineFloor.style.height = $.opt.timelineHeight + "px";
    timelineFloor.style.backgroundColor = "transparent";
    timelineFloor.style.border = "none";
    timelineFloor.style.margin = 0;
    timelineFloor.style.left = 0;
    timelineFloor.style.top = 0;
    timelineFloor.style.boxSizing = "border-box";
    timeline.appendChild(timelineFloor);
  };
  var getIntraMarker = function(markerName) {
    return $.domNode.querySelector('[data-intra="' + markerName + '"]');
  };
  var clearIntraMarker = function() {
    if (getIntraMarker("in"))
      $.floor.removeChild(getIntraMarker("in"));
    if (getIntraMarker("mix"))
      $.floor.removeChild(getIntraMarker("mix"));
    if (getIntraMarker("out"))
      $.floor.removeChild(getIntraMarker("out"));
    if (getIntraMarker("ref"))
      $.floor.removeChild(getIntraMarker("ref"));
  };
  var drawIntraMarker = function() {
    var marginTop = 0;
    if ($.opt.timeline) {
      marginTop = timeline.offsetHeight + "px";
    }
    if (getMarkerObj("in", true)) {
      var intraIn = document.createElement("div");
      intraIn.style.position = "absolute";
      intraIn.style.margin = 0;
      intraIn.style.marginTop = marginTop;
      intraIn.style.padding = 0;
      intraIn.style.top = 0;
      intraIn.style.left = 0;
      intraIn.style.width = getMarkerObj("in").offsetLeft + "px";
      intraIn.style.height = $.canvas.height + "px";
      intraIn.style.background = "#000";
      intraIn.style.opacity = 0.7;
      intraIn.dataset.intra = "in";
      $.floor.appendChild(intraIn);
    }
    if (getMarkerObj("mix", true) && getMarkerObj("out", true)) {
      var intraMix = document.createElement("DIV");
      intraMix.style.position = "absolute";
      intraMix.style.margin = 0;
      intraMix.style.marginTop = marginTop;
      intraMix.style.padding = 0;
      intraMix.style.top = 0;
      intraMix.style.left = getMarkerObj("mix").offsetLeft + "px";
      intraMix.style.width = getMarkerObj("out").offsetLeft - getMarkerObj("mix").offsetLeft + "px";
      intraMix.style.height = $.canvas.height + "px";
      intraMix.style.background = "linear-gradient(to right, transparent, black)";
      intraMix.style.opacity = 0.7;
      intraMix.dataset.intra = "mix";
      $.floor.appendChild(intraMix);
    }
    if (getMarkerObj("ri", true) && getMarkerObj("ro", true)) {
      var intraRef = document.createElement("div");
      intraRef.style.position = "absolute";
      intraRef.style.margin = 0;
      intraRef.style.marginTop = marginTop;
      intraRef.style.padding = 0;
      intraRef.style.top = 0;
      intraRef.style.left = getMarkerObj("ri").offsetLeft + "px";
      intraRef.style.width = getMarkerObj("ro").offsetLeft - getMarkerObj("ri").offsetLeft + "px";
      intraRef.style.height = $.canvas.height + "px";
      intraRef.style.background = $.markerDef.ri.fill;
      intraRef.style.opacity = 0.3;
      intraRef.dataset.intra = "ref";
      $.floor.appendChild(intraRef);
    }
    if (getMarkerObj("out", true)) {
      var intraOut = document.createElement("div");
      intraOut.style.position = "absolute";
      intraOut.style.margin = 0;
      intraOut.style.marginTop = marginTop;
      intraOut.style.padding = 0;
      intraOut.style.top = 0;
      intraOut.style.left = getMarkerObj("out").offsetLeft + "px";
      intraOut.style.width = $.floor.offsetWidth - getMarkerObj("out").offsetLeft + "px";
      intraOut.style.height = $.canvas.height + "px";
      intraOut.style.background = "#000";
      intraOut.style.opacity = 0.7;
      intraOut.dataset.intra = "out";
      intraOut.style.zIndex = 0;
      $.floor.appendChild(intraOut);
    }
  };
  var drawFadeLine = function() {
    var marginTop = 0;
    var svg = "";
    var line = "";
    if ($.opt.timeline) {
      marginTop = timeline.offsetHeight + "px";
    }
    if (getMarkerObj("mix", true) && getMarkerObj("out", true)) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.margin = 0;
      svg.style.marginTop = marginTop;
      svg.style.padding = 0;
      svg.style.position = "absolute";
      svg.style.top = 0;
      svg.style.left = getMarkerObj("mix").offsetLeft + "px";
      svg.style.visibility = hideMixOutLine ? "hidden" : "visible";
      var width = getMarkerObj("out").offsetLeft - getMarkerObj("mix").offsetLeft;
      svg.setAttribute("width", width);
      svg.setAttribute("height", $.canvas.height);
      $.floor.appendChild(svg);
      line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", 0);
      line.setAttribute("y1", 0);
      line.setAttribute("x2", svg.getAttribute("width"));
      line.setAttribute("y2", svg.getAttribute("height") / 2);
      line.style.stroke = $.markerDef.mix.fill;
      line.style.strokeWidth = 1;
      svg.appendChild(line);
      fadeLines.MIXOUT = svg;
    }
    if (getMarkerObj("prefade", true) && getMarkerObj("mix", true) && getMarkerObj("out", true)) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.margin = 0;
      svg.style.marginTop = marginTop;
      svg.style.padding = 0;
      svg.style.position = "absolute";
      svg.style.top = 0;
      svg.style.left = getMarkerObj("prefade").offsetLeft + "px";
      svg.style.visibility = hidePrefadeOutLine ? "hidden" : "visible";
      svg.setAttribute("width", getMarkerObj("out").offsetLeft - getMarkerObj("prefade").offsetLeft);
      svg.setAttribute("height", $.canvas.height);
      $.floor.appendChild(svg);
      line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", 0);
      line.setAttribute("y1", 0);
      line.setAttribute("x2", svg.getAttribute("width"));
      line.setAttribute("y2", svg.getAttribute("height") / 2);
      line.style.stroke = $.markerDef.prefade.fill;
      line.style.strokeWidth = 1;
      svg.appendChild(line);
      fadeLines.PREFADEOUT = svg;
    }
  };
  var clearFadeLines = function() {
    for (var f in fadeLines) {
      $.floor.removeChild(fadeLines[f]);
      delete fadeLines[f];
    }
  };
  $.hideMixOutLine = function() {
    var svg = fadeLines.MIXOUT;
    if (!svg)
      return;
    svg.style.visibility = "hidden";
    hideMixOutLine = true;
    $.fire("hideMixOutLine");
  };
  $.showMixOutLine = function() {
    var svg = fadeLines.MIXOUT;
    if (!svg)
      return;
    svg.style.visibility = "visible";
    hideMixOutLine = false;
    $.fire("hideIntraMarker");
  };
  $.hidePrefadeOutLine = function() {
    var svg = fadeLines.PREFADEOUT;
    if (!svg)
      return;
    svg.style.visibility = "hidden";
    hidePrefadeOutLine = true;
  };
  $.showPrefadeOutLine = function() {
    var svg = fadeLines.PREFADEOUT;
    if (!svg)
      return;
    svg.style.visibility = "visible";
    hidePrefadeOutLine = false;
  };
  var setMixOutLine = function() {
    var svg = fadeLines.MIXOUT;
    if (!svg)
      return;
    var line = svg.firstChild;
    svg.style.left = getMarkerObj("mix").offsetLeft + "px";
    var width = getMarkerObj("out").offsetLeft - getMarkerObj("mix").offsetLeft;
    svg.setAttribute("width", width);
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", svg.getAttribute("width"));
    line.setAttribute("y2", svg.getAttribute("height") / 2);
  };
  var setPrefadeOutLine = function() {
    var svg = fadeLines.PREFADEOUT;
    if (!svg)
      return;
    var line = svg.firstChild;
    svg.style.left = getMarkerObj("prefade").offsetLeft + "px";
    svg.setAttribute("width", getMarkerObj("out").offsetLeft - getMarkerObj("prefade").offsetLeft);
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", svg.getAttribute("width"));
    line.setAttribute("y2", svg.getAttribute("height") / 2);
  };
  var stylizeDomNode = function() {
    $.domNode.style.backgroundColor = $.opt.backgroundColor;
    $.domNode.style.width = $.opt.width + "px";
    $.domNode.style.height = $.opt.height + "px";
    $.domNode.style.position = "relative";
    $.domNode.style.overflowX = "auto";
    $.domNode.style.overflowY = "hidden";
    if ($.opt.highRender) {
      $.domNode.addEventListener("scroll", function() {
        clearFloor();
        clearCanvas();
        drawHighWaveform();
      });
    }
  };
  var drawCanvas = function() {
    $.canvas = document.createElement("canvas");
    $.canvas.width = $.domNode.offsetWidth;
    $.canvas.height = $.domNode.offsetHeight;
    $.floor = document.createElement("div");
    $.floor.style.position = "absolute";
    $.floor.style.width = $.domNode.offsetWidth + "px";
    $.floor.style.height = $.domNode.offsetHeight + "px";
    $.floor.style.margin = 0;
    $.floor.style.padding = 0;
    $.floor.style.background = "transparent";
    $.floor.style.overflowY = "hidden";
    $.domNode.appendChild($.floor);
    $.domNode.appendChild($.canvas);
    if ($.opt.timeline) {
      $.canvas.height = $.canvas.height - $.opt.timelineHeight;
      $.canvas.style.marginTop = $.opt.timelineHeight + "px";
    }
    if ($.opt.showTimeOnMouse) {
      drawTimeOnMouse();
    }
    $.floor.addEventListener("mousedown", function(e) {
      waveformClick(e, this);
    }, true);
    $.floor.addEventListener("mousemove", function(e) {
      waveformMouseMove(e);
    }, true);
    $.floor.addEventListener("mouseenter", function(e) {
      if ($.opt.showTimeOnMouse) {
        showTimeOnMouse();
      }
    });
    $.floor.addEventListener("mouseleave", function(e) {
      if ($.opt.showTimeOnMouse) {
        hideTimeOnMouse();
      }
    });
    if ($.opt.zoomWheel)
      $.floor.addEventListener("wheel", zoomWheel);
  };
  var drawBlockWaveform = function() {
    if ($.opt.timeline)
      drawTimeline();
    drawCursor();
    drawMarkes();
    drawQuickTime();
    if (!$.peaks || !Array.isArray($.peaks) || !$.peaks.length)
      return;
    let waveform = $.peaks;
    let waveformN = waveform.filter((element, index) => index % 2 === 0);
    let waveformP = waveform.filter((element, index) => index % 2 === 1);
    let waveformM = [];
    for (let i = 0; i < waveformN.length; i++) {
      let val = (-waveformN[i] + waveformP[i]) / 2;
      waveformM.push(val);
    }
    let { height, width } = $.canvas.parentNode.getBoundingClientRect();
    $.canvas.width = width;
    $.canvas.height = height;
    let context = $.canvas.getContext("2d");
    let prevI = 0;
    for (let x = 3; x < width; x++) {
      if (x % 3 === 0) {
        let i = Math.ceil(waveformM.length * (x / width));
        let medium = 0;
        if (prevI < i) {
          for (let y = prevI; y < i; y++) {
            medium += waveformM[y];
          }
          medium = medium / (i - prevI);
        } else {
          medium = waveformM[i];
        }
        let h = Math.round(medium * height) / 2;
        context.fillStyle = "orange";
        context.fillRect(x, height / 2 - h, 2, h);
        context.fillRect(x, height / 2 + h, 2, -h);
        prevI = i;
      }
    }
  };
  var drawHighWaveform = function() {
    markerIndex = 1;
    if ($.opt.forceHideScroll) {
      $.domNode.style.overflowX = "hidden";
      $.domNode.style.overflowY = "hidden";
      $.floor.style.overflowX = "hidden";
      $.floor.style.overflowY = "hidden";
    }
    if ($.opt.timeline)
      drawTimeline();
    drawCursor();
    drawMarkes();
    if (!$.peaks || !Array.isArray($.peaks) || !$.peaks.length)
      return;
    var factor = $.peaks.max();
    var ctx = $.canvas.getContext("2d");
    var height = $.canvas.height;
    var width = $.canvas.width;
    ctx.fillStyle = $.opt.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.moveTo(0, height / 2);
    var start = parseInt($.domNode.scrollLeft);
    var end = parseInt(start + $.domNode.offsetWidth);
    var step = 2;
    for (var i = start; i < end; i++) {
      if (step % 2 === 0) {
        step = parseInt(i * ($.peaks.length / width));
        if (step % 2 === 0)
          step += 1;
      } else {
        step = parseInt(i * ($.peaks.length / width));
        if (step % 2 !== 0)
          step += 1;
      }
      ctx.strokeStyle = $.opt.waveColor;
      var x = i;
      var y = $.peaks[step] / factor * height / (2.7 / $.opt.volume) + height / 2;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = $.opt.lineBaseColor;
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.closePath();
    setTimeout(function() {
      $.fire("drawWaveform", $.canvas);
    }, 0);
  };
  var drawHighWaveformZoom = function(start, end, onlyWave) {
    markerIndex = 1;
    $.lastStart = start;
    $.lastEnd = end;
    if ($.opt.timeline) {
      drawTimelineZoom(start, end);
    }
    if (!onlyWave) {
      drawCursor();
      drawMarkes();
    }
    if (!$.peaks || !Array.isArray($.peaks) || !$.peaks.length)
      return;
    var factor = $.peaks.max();
    var ctx = $.canvas.getContext("2d");
    var height = $.canvas.height;
    var width = $.canvas.width;
    ctx.fillStyle = $.opt.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.moveTo(0, height / 2);
    start = typeof start !== "undefined" ? start : parseInt($.domNode.scrollLeft);
    end = typeof end !== "undefined" ? end : parseInt(start + $.domNode.offsetWidth);
    var step = $.peaks.length / width;
    var step2 = $.peaks.length * (end - start) / (width * width);
    var lastI = 0;
    var max, min, x, y, incMax, incMin;
    for (var i = 1; i < width; i += 2) {
      max = 0;
      min = 0;
      incMax = 0;
      incMin = 0;
      for (var j = Math.round(start * step + lastI * step2); j < Math.round(start * step + i * step2); j++) {
        if ($.peaks[j] > 0) {
          max = max + $.peaks[j];
          incMax++;
        }
        if ($.peaks[j] < 0) {
          min = min + $.peaks[j];
          incMin++;
        }
      }
      if (incMin === 0)
        incMin = 1;
      if (incMax === 0)
        incMax = 1;
      ctx.strokeStyle = $.opt.waveColor;
      x = i - 1;
      y = -min / incMin / factor * height / (2.3 / $.opt.volume) + height / 2;
      ctx.lineTo(x, y);
      x = i;
      y = -max / incMax / factor * height / (2.3 / $.opt.volume) + height / 2;
      ctx.lineTo(x, y);
      lastI = i;
    }
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = $.opt.lineBaseColor;
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.closePath();
    setTimeout(function() {
      $.fire("drawWaveform", $.canvas);
    }, 0);
  };
  var drawWaveform = function() {
    if ($.opt.forceHideScroll) {
      $.domNode.style.overflowX = "hidden";
      $.domNode.style.overflowY = "hidden";
      $.floor.style.overflowX = "hidden";
      $.floor.style.overflowY = "hidden";
    }
    if ($.opt.blockRender) {
      return drawBlockWaveform();
    }
    if ($.opt.highRender) {
      drawHighWaveformZoom(0, $.domNode.offsetWidth);
      return;
    }
    markerIndex = 1;
    if ($.opt.timeline)
      drawTimeline();
    drawCursor();
    drawMarkes();
    if (!$.peaks || !Array.isArray($.peaks) || !$.peaks.length)
      return;
    var factor = $.peaks.max();
    var ctx = $.canvas.getContext("2d");
    var height = $.canvas.height;
    var width = $.canvas.width;
    ctx.fillStyle = $.opt.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.moveTo(0, height / 2);
    for (var i = 0; i < $.peaks.length; i += parseInt($.peaks.length / width / 2) * 2 + 1) {
      ctx.strokeStyle = $.opt.waveColor;
      var x = i / $.peaks.length * width;
      var y = $.peaks[i] / factor * height / (2.7 / $.opt.volume) + height / 2;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = $.opt.lineBaseColor;
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.closePath();
    setTimeout(function() {
      $.fire("drawWaveform", $.canvas);
    }, 0);
  };
  $.getZoom = function() {
    return Math.round($.floor.offsetWidth / $.domNode.offsetWidth * 100) + "%";
  };
  $.zoomIn = function(posX) {
    var oldWidth = $.floor.offsetWidth;
    var newWidth = oldWidth * 2;
    if (newWidth > $.peaks.length)
      return false;
    $.canvas.setAttribute("width", newWidth);
    $.floor.style.width = newWidth + "px";
    $.fire("zoomIn", newWidth, oldWidth, $.getZoom());
    $.fire("zoom", newWidth, oldWidth, $.getZoom());
    var cursorPos = $.getCursorTime();
    clearFloor();
    drawWaveform();
    $.setCursorTime(cursorPos);
    if (posX === "cursor") {
      posX = $.getCursorX() - $.domNode.offsetWidth / 2;
    }
    $.domNode.scrollLeft = typeof posX !== "undefined" ? posX : $.floor.offsetWidth / 2 - $.domNode.offsetWidth / 2;
  };
  $.zoomOut = function(posX) {
    var oldWidth = $.floor.offsetWidth;
    var newWidth = oldWidth / 2;
    if (newWidth < $.domNode.offsetWidth)
      return false;
    $.canvas.setAttribute("width", newWidth);
    $.floor.style.width = newWidth + "px";
    $.fire("zoomOut", newWidth, oldWidth, $.getZoom());
    $.fire("zoom", newWidth, oldWidth, $.getZoom());
    var cursorPos = $.getCursorTime();
    clearFloor();
    drawWaveform();
    $.setCursorTime(cursorPos);
    if (posX === "cursor") {
      posX = $.getCursorX() - $.domNode.offsetWidth / 2;
    }
    $.domNode.scrollLeft = typeof posX !== "undefined" ? posX : $.floor.offsetWidth / 2 - $.domNode.offsetWidth / 2;
  };
  var zoomWheel = function(e) {
    var offset;
    e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    var percentage = (e.clientX - $.domNode.getBoundingClientRect().left + $.domNode.scrollLeft) / $.floor.offsetWidth;
    if (e.deltaY * -1 > 0) {
      offset = percentage * $.floor.offsetWidth * 2 - (e.clientX - $.domNode.getBoundingClientRect().left);
      $.zoomIn(offset);
    } else {
      offset = percentage * $.floor.offsetWidth / 2 - (e.clientX - $.domNode.getBoundingClientRect().left);
      $.zoomOut(offset);
    }
  };
  $.on = function(event, callback) {
    $.events.push(event.toLowerCase(), callback);
  };
  $.fire = function() {
    var args = [];
    for (var i = 0; i < arguments.length; i++)
      args.push(arguments[i]);
    var event = args[0].toLowerCase();
    for (var j = 0; j <= $.events.length; j += 2) {
      if ($.events[j] === event)
        $.events[j + 1].apply($, args.slice(1));
      if ($.events[j] === "catchall")
        $.events[j + 1].apply(null, args);
    }
  };
  $.setCursorTime = function(ms) {
    if (typeof cursor === "undefined" || cursor === null || ms >= $.duration)
      return false;
    var x = msToX(ms);
    cursor.style.left = x + "px";
    cursor.dataset.time = ms;
    if (cursorFill) {
      cursorFill.style.width = $.floor.offsetWidth - x + "px";
    }
    if (quickTime) {
      quickTime.innerHTML = msToTime(ms, $.duration >= $._HOURSMS ? "HH:MM:SS" : "MM:SS.mmm") + " / " + msToTime($.duration, $.duration >= $._HOURSMS ? "HH:MM:SS" : "MM:SS.mmm");
    }
    if (cursorTime) {
      cursorTime.style.left = x + "px";
      cursorTime.innerHTML = msToTime(ms, $.duration >= $._HOURSMS ? "HH:MM:SS" : "MM:SS.mmm");
      if (cursorTime.offsetWidth + x > $.floor.offsetWidth) {
        cursorTime.style.marginLeft = -cursorTime.offsetWidth + "px";
        cursorTime.style.textAlign = "right";
        if (cursorFill) {
          cursorTime.style.color = $.opt.cursorTimeNegativeColor;
        }
      } else {
        cursorTime.style.marginLeft = 0;
        cursorTime.style.textAlign = "left";
        if (cursorFill) {
          cursorTime.style.color = $.opt.cursorTimeColor;
        }
      }
    }
    $.fire("cursorTimeChange", ms, x);
    for (var markerName in $.markers) {
      if ($.markers.hasOwnProperty(markerName)) {
        var mMs = $.getMarkerPosition(markerName);
        if (ms <= mMs && markerTrigger.indexOf(markerName) !== -1) {
          markerTrigger.splice(markerTrigger.indexOf(markerName), 1);
        }
        if (ms >= mMs && markerTrigger.indexOf(markerName) === -1) {
          markerTrigger.push(markerName);
          $.fire("marker" + toTitleCase(markerName) + "trigger", $.markers[markerName]);
        }
      }
    }
  };
  $.getCursorTime = function() {
    if (cursor === null || typeof cursor === "undefined")
      return false;
    return parseInt(cursor.dataset.time);
  };
  $.getCursorX = function() {
    if (cursor === null || typeof cursor === "undefined")
      return false;
    return parseInt(cursor.style.left);
  };
  var msToTime = function(duration2, format) {
    var milliseconds = parseInt(duration2 % 1e3), seconds = parseInt(duration2 / 1e3 % 60), minutes = parseInt(duration2 / (1e3 * 60) % 60), hours = parseInt(duration2 / (1e3 * 60 * 60) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (milliseconds.toString().length === 2)
      milliseconds = "0" + milliseconds;
    if (milliseconds.toString().length === 1)
      milliseconds = "00" + milliseconds;
    if (format !== null) {
      var formatted_time = format.replace("HH", hours);
      formatted_time = formatted_time.replace("MM", minutes);
      formatted_time = formatted_time.replace("SS", seconds);
      if ($.opt.hideTimeMilliseconds) {
        formatted_time = formatted_time.replace(".mmm", "");
      } else {
        formatted_time = formatted_time.replace("mmm", milliseconds);
      }
      formatted_time = formatted_time.replace("m", parseInt(milliseconds / 100));
      return formatted_time;
    } else {
      if ($.opt.hideTimeMilliseconds) {
        return hours + ":" + minutes + ":" + seconds;
      } else {
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      }
    }
  };
  var drawMarker = function(t, ms) {
    var x = msToX(ms);
    var y = null;
    if (typeof $.markerDef[t] === "undefined")
      return;
    var markerDef = $.markerDef[t];
    if (typeof markerDef.y === "number")
      y = markerDef.y;
    else {
      switch (markerDef.y) {
        case "top":
          break;
        case "middle":
          y = $.canvas.height / 2 - 8 + "px";
          break;
      }
    }
    y = 0;
    if (timeline !== null) {
      y = y + parseInt(timeline.offsetHeight);
    }
    var marker = document.createElement("div");
    marker.style.position = "absolute";
    marker.style.backgroundColor = markerDef.fill;
    marker.style.margin = 0;
    marker.style.top = y + "px";
    marker.style.width = $.opt.markerLineWidth + "px";
    marker.style.height = $.canvas.height + "px";
    marker.style.font = "7pt " + $.opt.fontFamily;
    marker.style.fontWeight = "bold";
    marker.style.zIndex = ++markerIndex;
    marker.dataset.marker = t;
    marker.dataset.ms = ms;
    if ($.opt.hideMarker.indexOf(t) !== -1) {
      marker.style.visibility = "hidden";
      marker.dataset.hidden = "true";
    }
    if (!$.opt.hideMarkerLabel) {
      var markerLabel = document.createElement("div");
      markerLabel.style.position = "absolute";
      markerLabel.style.padding = "2px";
      markerLabel.style.backgroundColor = markerDef.fill;
      markerLabel.style.color = markerDef.color;
      markerLabel.style.margin = 0;
      markerLabel.style.minWidth = "45px";
      markerLabel.style.textAlign = "center";
      markerLabel.innerHTML = t.toUpperCase();
      markerLabel.title = t.toUpperCase();
      markerLabel.style.top = "0";
      markerLabel.dataset.markerLabel = t;
      if (cursorTime !== null) {
        markerLabel.style.marginTop = cursorTime.style.height;
      }
      marker.appendChild(markerLabel);
      if (!$.opt.markerLooked && !$.opt.locked) {
        markerLabel.style.cursor = "e-resize";
        markerLabel.addEventListener("mousedown", markerMouseDown, false);
        $.domNode.addEventListener("mouseup", markerMouseUp, false);
      } else
        markerLabel.style.cursor = "default";
    }
    $.floor.appendChild(marker);
    if (markerLabel) {
      markerLabel.style.top = markerLabel.offsetHeight * getMarkersObj().length + getMarkersObj().length * 2 - markerLabel.offsetHeight + "px";
      if (marker.offsetWidth + x > $.floor.offsetWidth) {
        markerLabel.style.marginLeft = -marker.offsetWidth + "px";
      }
    }
    $.setMarkerPosition(t, ms);
  };
  var drawMarkes = function() {
    for (var m in $.markers) {
      if ($.markers.hasOwnProperty(m))
        drawMarker(m, $.markers[m]);
    }
    if ($.opt.intraMarker)
      drawIntraMarker();
    drawFadeLine();
  };
  var clearMarkes = function() {
    for (var m in $.markers) {
      $.floor.removeChild(getMarkerObj(m));
    }
    clearIntraMarker();
    clearFadeLines();
  };
  $.getMarkers = function() {
    return $.markers;
  };
  $.setPeaks = function(peaks2) {
    $.peaks = peaks2;
    redrawAll();
  };
  $.getPeaks = function() {
    return $.peaks;
  };
  $.setMarkers = function(markers2) {
    $.markers = markers2;
    clearFloor();
    drawWaveform();
  };
  $.setMarkerPosition = function(markerName, ms) {
    if (ms > $.duration)
      ms = $.duration;
    if (ms <= 0)
      ms = 0;
    var marker = getMarkerObj(markerName);
    if (marker === null)
      return false;
    switch (markerName) {
      case "in":
        if (ms >= $.markers["intro"])
          markerCollision("intro", ms);
        if (ms >= $.markers["outro"])
          markerCollision("outro", ms);
        if (ms >= $.markers["prefade"])
          markerCollision("prefade", ms);
        if (ms >= $.markers["ri"])
          markerCollision("ri", ms);
        if (ms >= $.markers["ro"])
          markerCollision("ro", ms);
        if (ms >= $.markers["mix"]) {
          markerCollision("in", $.markers["mix"]);
          markerCollision("intro", $.markers["mix"]);
          markerCollision("outro", $.markers["mix"]);
          markerCollision("prefade", $.markers["mix"]);
          markerCollision("ri", $.markers["mix"]);
          markerCollision("ro", $.markers["mix"]);
          resetMarkerLabel(marker);
          return false;
        }
        break;
      case "intro":
        if (ms <= $.markers["in"]) {
          markerCollision("intro", $.markers["in"]);
          resetMarkerLabel(marker);
          return false;
        }
        if (ms >= $.markers["outro"])
          markerCollision("outro", ms);
        if (ms >= $.markers["mix"]) {
          markerCollision("intro", $.markers["mix"]);
          markerCollision("outro", $.markers["mix"]);
          resetMarkerLabel(marker);
          return false;
        }
        break;
      case "outro":
        if (ms >= $.markers["mix"]) {
          markerCollision("outro", $.markers["mix"]);
          resetMarkerLabel(marker);
          return false;
        }
        if (ms <= $.markers["intro"])
          markerCollision("intro", ms);
        if (ms <= $.markers["in"]) {
          markerCollision("intro", $.markers["in"]);
          markerCollision("outro", $.markers["in"]);
          resetMarkerLabel(marker);
          return false;
        }
        break;
      case "ri":
        if (ms <= $.markers["in"]) {
          markerCollision("ri", $.markers["in"]);
          resetMarkerLabel(marker);
          return false;
        }
        if (ms >= $.markers["ro"]) {
          markerCollision("ro", ms);
        }
        if (ms >= $.markers["mix"]) {
          markerCollision("ri", $.markers["mix"]);
          markerCollision("ro", $.markers["mix"]);
          resetMarkerLabel(marker);
          return false;
        }
        break;
      case "ro":
        if (ms >= $.markers["mix"]) {
          markerCollision("ro", $.markers["mix"]);
          resetMarkerLabel(marker);
          return false;
        }
        if (ms <= $.markers["ri"]) {
          markerCollision("ri", ms);
        }
        if (ms <= $.markers["in"]) {
          markerCollision("ri", $.markers["in"]);
          markerCollision("ro", $.markers["in"]);
          resetMarkerLabel(marker);
          return false;
        }
        break;
      case "prefade":
        if (ms >= $.markers["mix"]) {
          markerCollision("prefade", $.markers["mix"]);
          resetMarkerLabel(marker);
          return false;
        }
        if (ms <= $.markers["in"]) {
          markerCollision("prefade", $.markers["in"]);
          resetMarkerLabel(marker);
          return false;
        }
        break;
      case "mix":
        if (ms <= $.markers["intro"])
          markerCollision("intro", ms);
        if (ms <= $.markers["outro"])
          markerCollision("outro", ms);
        if (ms <= $.markers["prefade"])
          markerCollision("prefade", ms);
        if (ms <= $.markers["ri"])
          markerCollision("ri", ms);
        if (ms <= $.markers["ro"])
          markerCollision("ro", ms);
        if (ms <= $.markers["in"]) {
          markerCollision("mix", $.markers["in"]);
          markerCollision("intro", $.markers["in"]);
          markerCollision("outro", $.markers["in"]);
          markerCollision("prefade", $.markers["in"]);
          markerCollision("ri", $.markers["in"]);
          markerCollision("ro", $.markers["in"]);
          resetMarkerLabel(marker);
          return false;
        }
        if (ms >= $.markers["out"]) {
          markerCollision("mix", $.markers["out"]);
          resetMarkerLabel(marker);
          return false;
        }
        break;
      case "out":
        if (ms >= $.duration || getMarkerObj("out").offsetLeft + getMarkerObj("out").offsetWidth >= $.floor.offsetWidth) {
          ms -= xToMs($.opt.markerLineWidth);
        }
        if (ms <= $.markers["mix"]) {
          markerCollision("out", $.markers["mix"]);
          resetMarkerLabel(marker);
          return false;
        }
        break;
    }
    markerCollision(markerName, ms);
  };
  $.setMarkerPositionStep = function(markerName, sign, step) {
    var pos = $.getMarkerPosition(markerName);
    if (sign === "+") {
      pos += step;
    } else {
      pos -= step;
    }
    $.setMarkerPosition(markerName, pos);
  };
  var msToX = function(ms) {
    var percentage = ms * 100 / $.duration;
    return parseInt(percentage * $.floor.offsetWidth / 100);
  };
  var xToMs = function(x) {
    var percentage = x * 100 / $.floor.offsetWidth;
    return parseInt(percentage * $.duration / 100);
  };
  var getMarkerObj = function(markerName, onlyVisible) {
    if (onlyVisible)
      return $.domNode.querySelector('[data-marker="' + markerName + '"]:not([data-hidden="true"])');
    else
      return $.domNode.querySelector('[data-marker="' + markerName + '"]');
  };
  var getMarkersObj = function(all) {
    if (all)
      return $.domNode.querySelectorAll("[data-marker])");
    else
      return $.domNode.querySelectorAll('[data-marker]:not([data-hidden="true"])');
  };
  var getMarkerLabelObj = function(marker) {
    return marker.getElementsByTagName("div")[0];
  };
  $.getMarkerPosition = function(markerName) {
    return $.markers[markerName];
  };
  var markerCollision = function(markerName, ms) {
    if (ms > $.duration || ms < 0)
      return false;
    var marker = getMarkerObj(markerName);
    if (marker === null)
      return false;
    var markerLabel = getMarkerLabelObj(marker);
    var x = msToX(ms);
    marker.style.left = x + "px";
    if (!$.opt.hideMarkerLabel) {
      markerLabel.style.marginLeft = 0;
      markerLabel.title = markerName.toUpperCase() + ": " + msToTime(ms, ms >= $._HOURSMS ? "HH:MM:SS" : "MM:SS.mmm");
      if (marker.offsetWidth + markerLabel.offsetWidth + x > $.floor.offsetWidth) {
        markerLabel.style.marginLeft = -markerLabel.offsetWidth + "px";
      }
    }
    if ($.markers[markerName] !== ms) {
      ms = Math.round(ms);
      $.markers[markerName] = ms;
      marker.dataset.ms = ms;
      $.fire("marker" + toTitleCase(markerName) + "Change", $.markers[markerName]);
    }
    $.fire("markersChange", $.markers);
  };
  var moveMarker = function(e) {
    var marker = $.dragElement;
    if (document.selection) {
      document.selection.empty();
    } else {
      window.getSelection().removeAllRanges();
    }
    e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    var offset = e.pageX - $.dragoffset.x;
    var ms = xToMs(offset);
    if (ms >= $.duration || ms <= 0) {
      return false;
    }
    var markerName = marker.dataset.marker;
    if (markerName === "out" && ms + xToMs($.opt.markerLineWidth) >= $.duration) {
      ms = $.duration - xToMs($.opt.markerLineWidth);
    }
    getMarkerLabelObj(marker).innerHTML = msToTime(ms, ms >= $._HOURSMS ? "HH:MM:SS" : "MM:SS.mmm");
    $.setMarkerPosition(markerName, ms);
  };
  var markerMouseUp = function() {
    if (!$.dragElement || $.opt.locked)
      return;
    resetMarkerLabel($.dragElement);
    var markerName = $.dragElement.dataset.marker;
    $.fire("markerMouseUp", markerName, $.markers[markerName]);
    $.dragElement = null;
    $.domNode.removeEventListener("mousemove", moveMarker, true);
  };
  var markerMouseDown = function(e) {
    if ($.opt.locked)
      return;
    var _this = this.parentNode;
    $.dragElement = _this;
    $.dragElement.style.zIndex = ++markerIndex;
    e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    $.dragoffset.x = e.pageX - _this.offsetLeft;
    $.dragoffset.y = e.pageY - _this.offsetTop;
    $.domNode.addEventListener("mousemove", moveMarker, true);
    var markerName = $.dragElement.dataset.marker;
    $.fire("markerMouseDown", markerName, $.markers[markerName]);
  };
  var toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  var resetMarkerLabel = function(marker) {
    if (!$.opt.hideMarkerLabel) {
      getMarkerLabelObj(marker).innerHTML = marker.dataset.marker.toUpperCase();
    }
  };
  var clearDom = function() {
    while ($.domNode.firstChild)
      $.domNode.removeChild($.domNode.firstChild);
  };
  var clearFloor = function() {
    while ($.floor.firstChild)
      $.floor.removeChild($.floor.firstChild);
  };
  var clearCanvas = function() {
    $.canvas.getContext("2d").clearRect(0, 0, $.canvas.width, $.canvas.height);
  };
  var clearAll = function() {
    clearDom();
  };
  var redrawAll = function() {
    clearAll();
    drawCanvas();
    drawWaveform();
  };
  $.redraw = function() {
    redrawAll();
  };
  $.clear = function() {
    clearAll();
  };
  $.drawPart = function(start, end) {
    clearAll();
    drawCanvas();
    $.domNode.style.overflowX = "hidden";
    $.domNode.style.overflowY = "hidden";
    $.floor.style.overflowX = "hidden";
    $.floor.style.overflowY = "hidden";
    $.floor.style.width = $.canvas.offsetWidth * $.canvas.offsetWidth / (end - start) + "px";
    $.floor.style.left = -($.canvas.offsetWidth * start) / (end - start) + "px";
    drawHighWaveformZoom(start, end);
  };
  $.redrawWave = function() {
    clearCanvas();
    drawHighWaveformZoom($.lastStart, $.lastEnd, true);
  };
  var init = function() {
    setDefault();
    stylizeDomNode();
    if (typeof $.peaks === "string") {
      showLoading();
      ajaxGet($.peaks, function(data) {
        if (data) {
          hideLoading();
          $.peaks = data;
          $.fire("peaksLoaded", data);
          drawCanvas();
          drawWaveform();
        } else {
          hideLoading();
        }
      });
    } else {
      drawCanvas();
      drawWaveform();
      $.fire("peaksLoaded", $.peaks);
    }
  };
  var ajaxGet = function(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          callback(JSON.parse(xmlhttp.responseText));
        } else
          callback(false);
      }
    };
    xmlhttp.send();
  };
  $.draw = function(duration2, peaks2, markers2, opt2) {
    $.duration = duration2 || 0;
    $.peaks = peaks2 || [];
    $.markers = markers2 || {};
    if (typeof opt2 === "object")
      $.opt = opt2;
    clearAll();
    setDefault();
    if (typeof $.peaks === "string") {
      showLoading();
      ajaxGet($.peaks, function(data) {
        if (data) {
          hideLoading();
          $.peaks = data;
          $.fire("peaksLoaded", data);
          drawCanvas();
          drawWaveform();
        } else {
          hideLoading();
        }
      });
    } else {
      drawCanvas();
      drawWaveform();
      $.fire("peaksLoaded", $.peaks);
    }
  };
  $.isHideMarker = function(markerName) {
    return Boolean($.opt.hideMarker.indexOf(markerName));
  };
  $.hideMarker = function(markerName) {
    if (typeof markerName === "string")
      markerName = [markerName];
    for (var m in markerName) {
      if ($.opt.hideMarker.indexOf(markerName[m]) === -1)
        $.opt.hideMarker.push(markerName[m]);
    }
    clearMarkes();
    drawMarkes();
    $.fire("hideMarker", markerName);
  };
  $.showMarker = function(markerName) {
    if (typeof markerName === "string")
      markerName = [markerName];
    for (var m in markerName) {
      if (markerName.hasOwnProperty(m)) {
        if ($.opt.hideMarker.indexOf(markerName[m]) !== -1)
          $.opt.hideMarker.splice($.opt.hideMarker.indexOf(markerName[m]), 1);
      }
    }
    clearMarkes();
    drawMarkes();
    $.fire("showMarker", markerName);
  };
  $.hideIntraMarker = function() {
    $.opt.intraMarker = false;
    clearFloor();
    drawWaveform();
    $.fire("hideIntraMarker");
  };
  $.showIntraMarker = function() {
    $.opt.intraMarker = true;
    clearFloor();
    drawWaveform();
    $.fire("showIntraMarker");
  };
  $.setLocked = function(state) {
    $.opt.locked = state;
    if (state)
      $.fire("locked");
    else
      $.fire("unlocked");
  };
  $.toggleLock = function() {
    var state = !$.opt.locked;
    $.setLocked(state);
    return state;
  };
  var hideLoading = function() {
    if ($.domNode.querySelector('[data-loading="true"]'))
      $.domNode.removeChild($.domNode.querySelector('[data-loading="true"]'));
  };
  var showLoading = function() {
    var loading = document.createElement("div");
    loading.style.position = "absolute";
    loading.style.margin = 0;
    loading.style.padding = 0;
    loading.style.top = 0;
    loading.style.left = 0;
    loading.style.width = $.domNode.style.width;
    loading.style.height = $.domNode.style.height;
    loading.style.textAlign = "center";
    loading.style.font = "9pt " + $.opt.fontFamily;
    loading.style.lineHeight = $.domNode.style.height;
    loading.style.color = $.opt.loadingColor;
    loading.style.zIndex = 99999999;
    loading.dataset.loading = true;
    loading.innerHTML = $.opt.loadingText;
    $.domNode.appendChild(loading);
  };
  var waveformClick = function(e, sender) {
    if ($.opt.locked)
      return false;
    var x;
    if (typeof e.target.dataset !== "undefined" && typeof e.target.dataset.markerLabel !== "undefined")
      return false;
    if (e.target !== sender) {
      x = e.clientX - e.target.parentNode.getBoundingClientRect().left;
    } else {
      x = e.clientX - e.target.getBoundingClientRect().left;
    }
    var ms = xToMs(x);
    var time = msToTime(ms, ms >= $._HOURSMS ? "HH:MM:SS" : "MM:SS.mmm");
    ms = Math.round(ms);
    $.fire("waveformClick", ms, time, x);
  };
  var waveformMouseMove = function(e) {
    var x;
    x = e.clientX - $.floor.getBoundingClientRect().left;
    var ms = xToMs(x);
    var time = msToTime(ms, ms >= $._HOURSMS ? "HH:MM:SS" : "MM:SS.mmm");
    ms = Math.round(ms);
    $.fire("waveformMouseMove", ms, time, x);
  };
  $.on("markerInChange", function(marker) {
    if (getIntraMarker("in")) {
      var intraIn = getIntraMarker("in");
      intraIn.style.left = 0;
      intraIn.style.width = getMarkerObj("in").offsetLeft + "px";
    }
  });
  $.on("markerOutChange", function(marker) {
    if (getIntraMarker("out")) {
      var intraOut = getIntraMarker("out");
      intraOut.style.left = getMarkerObj("out").offsetLeft + "px";
      intraOut.style.width = $.floor.offsetWidth - getMarkerObj("out").offsetLeft + "px";
    }
    if (getIntraMarker("mix")) {
      var intraMix = getIntraMarker("mix");
      intraMix.style.left = getMarkerObj("mix").offsetLeft + "px";
      intraMix.style.width = getMarkerObj("out").offsetLeft - getMarkerObj("mix").offsetLeft + "px";
    }
    setMixOutLine();
    setPrefadeOutLine();
  });
  $.on("markerMixChange", function(marker) {
    if (getIntraMarker("mix")) {
      var intraMix = getIntraMarker("mix");
      intraMix.style.left = getMarkerObj("mix").offsetLeft + "px";
      intraMix.style.width = getMarkerObj("out").offsetLeft - getMarkerObj("mix").offsetLeft + "px";
    }
    setMixOutLine();
  });
  $.on("markerPrefadeChange", function(marker) {
    setPrefadeOutLine();
  });
  $.on("markerRoChange", function(marker) {
    if (getIntraMarker("ref")) {
      var intraRef = getIntraMarker("ref");
      intraRef.style.left = getMarkerObj("ri").offsetLeft + "px";
      intraRef.style.width = getMarkerObj("ro").offsetLeft - getMarkerObj("ri").offsetLeft + "px";
    }
  });
  $.on("markerRiChange", function(marker) {
    if (getIntraMarker("ref")) {
      var intraRef = getIntraMarker("ref");
      intraRef.style.left = getMarkerObj("ri").offsetLeft + "px";
      intraRef.style.width = getMarkerObj("ro").offsetLeft - getMarkerObj("ri").offsetLeft + "px";
    }
  });
  $.on("waveformMouseMove", function(ms, time, x) {
    if (!$.opt.showTimeOnMouse)
      return;
    timeOnMouse.innerHTML = time;
    var middle = timeOnMouse.offsetWidth / 2;
    var min = x - middle > 0;
    var max = middle + x < $.floor.offsetWidth;
    timeOnMouse.style.marginLeft = -middle + "px";
    if (min && max) {
      timeOnMouse.style.left = x + "px";
    } else if (!min) {
      timeOnMouse.style.left = middle + "px";
    } else if (!max) {
      timeOnMouse.style.left = $.floor.offsetWidth - middle + "px";
    }
  });
  init();
}
function createWaveForm(config = {}) {
  if (!config.container)
    return;
  let waveFormInstance = new XWAVE(config.container, config.duration, config.peaks, null, {
    width: config.container.offsetWidth,
    height: 96,
    cursorType: "linefill",
    // line, linefill, none
    cursorLineColor: "rgba(255,255,255,.4)",
    cursorFillColor: "black",
    cursorFillOpacity: 0.05,
    cursorTimeColor: "black",
    cursorTimeFontSize: "9pt",
    cursorTimeFontShadow: "0 0 3px #ccc",
    cursorTimeNegativeColor: "black",
    cursorLineWidth: 2,
    hideMarker: ["prefade", "outro", "ri", "ro"],
    intraMarker: true,
    waveColor: "orange",
    lineBaseColor: "#blue",
    backgroundColor: "transparent",
    timelineBackgroundColor: "#fff",
    timelineTickerColor: "#555",
    timelineTimeColor: "#ccc",
    timelineBorderColor: "#fff",
    //'transparent',
    timeline: false,
    showCursorTime: false,
    showTimeOnMouse: true,
    zoomWheel: false,
    blockRender: true,
    hideTimeMilliseconds: true,
    fontFamily: "monospace",
    showQuickTime: true
  });
  waveFormInstance.on("waveformClick", (ms) => {
    config.player.seek(ms / 1e3);
  });
  return waveFormInstance;
}
function destroyWaveForm(waveFormInstance) {
  if (!waveFormInstance)
    return;
  waveFormInstance.domNode.style.cssText = "";
  waveFormInstance.domNode.innerHTML = "";
}
function WaveForm({ episode }) {
  let player = useMediaPlayer(episode);
  const waveCanvasContainerRef = useRef(null);
  const waveCanvasRef = useRef(null);
  function doWaveForm() {
    waveCanvasRef.current = createWaveForm({
      container: waveCanvasContainerRef.current,
      player,
      peaks: episode.wavePoints,
      duration: episode.duration
    });
    waveCanvasRef.current.setCursorTime(player.currentTime * 1e3);
  }
  useEffect(() => {
    if (!waveCanvasRef.current) {
      doWaveForm();
      window.addEventListener("resize", () => {
        destroyWaveForm(waveCanvasRef.current);
        doWaveForm();
      });
    }
  }, [waveCanvasContainerRef]);
  useEffect(() => {
    if (waveCanvasRef.current.setCursorTime && player.playing)
      waveCanvasRef.current.setCursorTime(player.currentTime * 1e3);
  }, [player]);
  if (!episode)
    return;
  return /* @__PURE__ */ jsx("div", { className: "h-24", ref: waveCanvasContainerRef });
}
WaveForm.propTypes = {
  episode: PropTypes.object
};
function AudioFrame({ episode }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-6 sm:mt-0 space-x-4", children: [
    /* @__PURE__ */ jsx(
      EpisodePlayButton,
      {
        episode,
        size: "lg"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 flex-shrink-0", children: /* @__PURE__ */ jsx(WaveForm, { episode }) })
  ] });
}
AudioFrame.propTypes = {
  episode: PropTypes.object
};
function EpisodePlayer({ episode }) {
  const [canShowVideoFrame, setCanShowVideoFrame] = useState(false);
  useEffect(() => {
    setCanShowVideoFrame(true);
  }, []);
  if (episode.contentType === "video") {
    if (canShowVideoFrame) {
      return /* @__PURE__ */ jsx(VideoFrame, { episode, isPrimary: true });
    } else {
      return null;
    }
  } else {
    return /* @__PURE__ */ jsx(AudioFrame, { episode });
  }
}
EpisodePlayer.propTypes = {
  episode: PropTypes.object
};
function Page(pageProps) {
  const { page, routeParams, episode, onDemandSeries } = pageProps;
  const { setBackdropImage } = useContext(PageBackdropContext);
  useEffect(() => {
    setBackdropImage(episode.episodeImageUrl || episode.seriesImageUrl);
    return () => {
      setBackdropImage(null);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-7xl p-6 sm:p-0 _lg:pt-6", children: [
    /* @__PURE__ */ jsxs(Breadcrumbs, { className: "mb-8", children: [
      /* @__PURE__ */ jsx(BreadcrumbItem, { onPress: () => navigate("/" + page.slug), children: page.title }),
      /* @__PURE__ */ jsx(BreadcrumbItem, { onPress: () => navigate(seriesLinkFunc({
        pageSlug: page.slug,
        seriesDerivatePermalink: episode.seriesDerivatePermalink
      })), children: episode.seriesTitle }),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: episode.episodeTitle })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex mb-6 items-center", children: [
        episode.contentType === "audio" && /* @__PURE__ */ jsx(
          Image,
          {
            className: "hidden sm:block object-cover object-center border-1 border-white/30 mr-6 sm:h-48 sm:w-48",
            alt: episode.episodeTitle || episode.originalFileName,
            src: episode.episodeImageUrl || episode.seriesImageUrl || page.logo
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-6 sm:mb-0 sm:block", children: [
            episode.contentType === "audio" && /* @__PURE__ */ jsx(
              Image,
              {
                className: "block sm:hidden object-cover object-center border-1 border-white/30 mr-6 h-24 w-24",
                alt: episode.episodeTitle || episode.originalFileName,
                src: episode.episodeImageUrl || episode.seriesImageUrl || page.logo
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-3xl text-white font-semibold", children: episode.episodeTitle || episode.originalFileName }),
              /* @__PURE__ */ jsx(SeriesLink, { item: episode, children: /* @__PURE__ */ jsx("h2", { className: "text-small text-white sm:text-base", children: episode.seriesTitle }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(ProfileSmall, { page, routeParams, children: /* @__PURE__ */ jsx("div", { className: "space-x-4 sm:space-x-2", children: /* @__PURE__ */ jsx(ShareButton, { enableEmbed: true, enableFeed: true }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(EpisodePlayer, { episode })
    ] }),
    (episode.episodeDescription || episode.episodeSubTitle) && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "text-white mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-base sm:text-xl font-semibold mb-4", children: "Descrizione" }),
      /* @__PURE__ */ jsx("h2", { className: "text-base", children: episode.episodeDescription || episode.episodeSubTitle })
    ] }) }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(Spacer, { y: "10" }),
    /* @__PURE__ */ jsx("div", { className: "text-white text-base sm:text-xl font-semibold mb-4", children: "Potrebbe interessarti anche" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4", children: onDemandSeries.map((item) => item.id !== episode.seriesId ? /* @__PURE__ */ jsx(
      Card1,
      {
        link: seriesLinkFunc({
          pageSlug: routeParams.pageSlug,
          seriesDerivatePermalink: item.seriesDerivatePermalink
        }),
        textBig: item.title,
        subText: "Episodi " + item.episodesCount,
        image: item.imageUrl
      },
      item.id
    ) : null) })
  ] });
}
Page.metaTags = (pageProps) => {
  const { page, episode } = pageProps;
  return {
    title: episode.episodeTitle,
    description: episode.episodeDescription,
    ogImage: episode.episodeImageUrl
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
    importPath: "/pages/profile/episodes/episode/+onBeforeRender.js",
    isValueFile: true,
    exportValues: import_1
  },
  {
    configName: "Page",
    importPath: "/pages/profile/episodes/episode/+Page.jsx",
    isValueFile: true,
    exportValues: import_2
  }
];
const configValuesSerialized = {
  ["passToClient"]: {
    definedAt: { "files": [{ "filePathToShowToUser": "/pages/profile/episodes/episode/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "/pages/profile/episodes/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "/pages/profile/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "/renderer/+config.h.js", "fileExportPathToShowToUser": ["default", "passToClient"] }] },
    valueSerialized: '["pageProps","documentProps","pageProps","documentProps","pageProps","documentProps","pageProps","documentProps","acceptsLanguages","locale"]'
  }
};
export {
  configValuesImported,
  configValuesSerialized
};
