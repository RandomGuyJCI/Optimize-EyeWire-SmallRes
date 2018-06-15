// ==UserScript==
// @name         Optimize for Small Resolutions
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Remove unnecessary items in Eyewire (and make some things look prettier)
// @author       randompersonjci
// @match        https://eyewire.org/
// ==/UserScript==

(function() {
  'use strict';

  $('head').append(`<style>
    .sl-mystic.active.minimalButton.flat.translucent {border-color: #9666FF !important; color: #9666FF;}
    .sl-promotions.active.minimalButton.flat.translucent {border-color: #aaffaa !important; color: #aaffaa;}
    #profChooseCrew {height: 570px;}
    #scoutsLogFloatingControls {background: rgba(20, 21, 24, .91);}
    #scoutsLogFloatingControls img {margin-top: 1px !important;}
    #scoutsLogFloatingControls a {margin: 3px 4px 0px 0px !important;}
    .filler {width: 0px !important;}
    #homelogo {margin-bottom: 3px;}
  </style>`);

  setInterval(function(){
    $("#scoutsLogFloatingControls > img").attr('src', 'https://cdn.rawgit.com/RandomGuyJCI/Optimize-EyeWire-SmallRes/ee3a4742/scoutslog_icon.png');
    $("#scoutsLogButton").remove();
  }, 1000);

  $("#learn-about-neuroscience, #inspectPanelButton").remove();
})();
