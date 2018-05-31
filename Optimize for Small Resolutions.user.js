// ==UserScript==
// @name         Optimize for Small Resolutions
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Remove unnecessary items in Eyewire (and make some things look prettier)
// @author       randompersonjci
// @match        https://eyewire.org/
// ==/UserScript==

(function() {
  'use strict';

  $('head').append(`<style>
    .sl-mystic.active.minimalButton.flat.translucent {border-color: #9666FF !important; color: #9666FF;}
    .sl-promotions.active.minimalButton.flat.translucent {border-color: #aaffaa !important; color: #aaffaa;}
    @media (max-height: 700px) {
      div#profileContainer {height: auto !important; width: 880px;}
      .profPane:not(#profBadges), #badgeCategories {overflow-y: auto; height: 450px !important;}
      #profBadges {overflow-y: hidden; height: 450px;}
      div#profChooseCrew {height: 430px;}
      div#badgeCategories {padding-right: 20px !important;}}
    div#acc ul li span {display: block; height: 100%; padding: 12px 4px 0; color: #dcdcdc; font-size: 10pt; box-sizing: border-box; cursor: default;}
    div#profChooseCrew {height: 570px;}
    div#nav ul {margin-left: 5px;}
    div#scoutsLogFloatingControls a {margin-right: 3px !important;}
    div#scoutsLogFloatingControls {padding: 1px !important;}
    div#scoutsLogFloatingControls img {margin: 1px 5px 0px 5px !important;}
    .filler {width: 0px !important;}
    div#activityTrackerContainer {padding: 0px;}
    div#acc {margin-left: 5px;}
    div#pageHeader {padding: 0px 6px 0px 10px;}
  </style>`);

  setInterval(function(){
    $("#scoutsLogFloatingControls > img").attr('src', 'https://cdn.rawgit.com/RandomGuyJCI/Optimize-EyeWire-SmallRes/ee3a4742/scoutslog_icon.png');
    $("#acc ul li:nth-of-type(2) a").replaceWith('<span id="HQtime"></span>');
    $("#scoutsLogButton").remove();
  }, 1000);

  $("#homelogo > img").attr('src', 'https://cdn.rawgit.com/RandomGuyJCI/Optimize-EyeWire-SmallRes/ee3a4742/eyewire_logo.png');

  $("#learn-about-neuroscience, .hqtime, #inspectPanelButton").remove();
})();
