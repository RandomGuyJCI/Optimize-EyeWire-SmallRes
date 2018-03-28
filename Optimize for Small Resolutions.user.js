// ==UserScript==
// @name         Optimize for Small Resolutions
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove unnecessary items in Eyewire (and make some things look prettier)
// @author       randompersonjci
// @match        https://*.eyewire.org/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("head").append(`<style>
    div#acc ul li:nth-of-type(2) a {font-size: 0px; padding: 0px;}
    .sl-mystic.active.minimalButton.flat.translucent {border-color: #9666FF !important; color: #9666FF;}
    .sl-promotions.active.minimalButton.flat.translucent {border-color: #aaffaa !important; color: #aaffaa;}
    div#nav ul {margin-left: 5px;}
    div#scoutsLogFloatingControls a {margin-right: 3px !important;}
    div#scoutsLogFloatingControls {padding: 1px !important;}
    div#scoutsLogFloatingControls img {margin: 1px 5px 0px 5px !important;}
    .filler {width: 0px !important;}
    div#activityTrackerContainer {padding: 0px;}
    div#acc {margin-left: 5px;}
    div#pageHeader {padding: 0px 6px 0px 10px;}
    div#profChooseCrew {height: 570px;}
    @media (max-height: 700px) {div#profileContainer {height: auto !important; width: 880px;} .profPane:not(#profBadges), #badgeCategories {overflow-y: auto; height: 450px !important;} #profBadges {overflow-y: hidden; height: 450px;} div#profChooseCrew {height: 430px;} div#badgeCategories {padding-right: 20px !important;}}
    </style>`);

    $("#homelogo > img").attr('src', 'https://rawgit.com/RandomGuyJCI/Optimize-EyeWire-SmallRes/master/eyewire_logo.png');

    setInterval(function () {
        $("#scoutsLogFloatingControls > img").attr('src', 'https://rawgit.com/RandomGuyJCI/Optimize-EyeWire-SmallRes/master/scoutslog_icon.png');
    }, 1000);

    $("#learn-about-neuroscience").remove();
})();
