// ==UserScript==
// @name         Optimize for Small Resolutions
// @namespace    http://tampermonkey.net/
// @version      1.2 (beta)
// @description  Remove unnecessary items in Eyewire (and make some things look prettier)
// @author       randompersonjci
// @match        https://*.eyewire.org/
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  'esversion: 6';

  function decreaseMarginsPaddings() {
    $("head").append(`<style>
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
      @media (max-height: 700px) {
          div#profileContainer {height: auto !important; width: 880px;}
          .profPane:not(#profBadges), #badgeCategories {overflow-y: auto; height: 450px !important;}
          #profBadges {overflow-y: hidden; height: 450px;}
          div#profChooseCrew {height: 430px;}
          div#badgeCategories {padding-right: 20px !important;}}
      div#acc ul li span {display: block; height: 100%; padding: 12px 4px 0; color: #dcdcdc; font-size: 10pt; box-sizing: border-box; cursor: default;}
      </style>`);

  }

  let K = {
    gid: function(id) {
      return document.getElementById(id);
    },

    ls: {
      get: function(key) {
        return localStorage.getItem(account.account.uid + '-ews-' + key);
      },

      set: function(key, val) {
        localStorage.setItem(account.account.uid + '-ews-' + key, val);
      },

      remove: function(key) {
        localStorage.removeItem(account.account.uid + '-ews-' + key);
      }
    }
  };

  function Settings() {

    let target;

    this.setTarget = function(selector) {
      target = selector;
    };

    this.getTarget = function() {
      return target;
    };

    this.addCategory = function(id = 'ews-optimize-smallres-settings-group', name = 'Optimize for Low Res', mainTarget = 'settingsMenu') {
      if (!K.gid(id)) {
        $('#' + mainTarget).append(`
                <div id="${id}" class="settings-group ews-settings-group invisible">
                    <h1>${name}</h1>
                </div>
                `);
      }

      this.setTarget($('#' + id));
    };


    this.addOption = function(options) {
      let settings = {
        name: '',
        id: '',
        defaultState: false,
        indented: false
      };


      $.extend(settings, options);
      let storedState = K.ls.get(settings.id);
      let state = storedState === null ? settings.defaultState : storedState.toLowerCase() === 'true';


      target.append(`
            <div class="setting" id="${settings.id}-wrapper">
                <span>${settings.name}</span>
                <div class="checkbox ${state ? 'on' : 'off'}">
                    <div class="checkbox-handle"></div>
                    <input type="checkbox" id="${settings.id}" style="display: none;" ${state ? ' checked' : ''}>
                </div>
            </div>
            `);

      if (settings.indented) {
        K.gid(settings.id).parentNode.parentNode.style.marginLeft = '30px';
      }

      $(`#${settings.id}-wrapper`).click(function(evt) {
        evt.stopPropagation();


        let $elem = $(this).find('input');
        let elem = $elem[0];
        let newState = !elem.checked;


        K.ls.set(settings.id, newState);
        elem.checked = newState;


        $elem.add($elem.closest('.checkbox')).removeClass(newState ? 'off' : 'on').addClass(newState ? 'on' : 'off');
        $(document).trigger('ews-setting-changed', {
          setting: settings.id,
          state: newState
        });
      });

      $(document).trigger('ews-setting-changed', {
        setting: settings.id,
        state: state
      });
    };

    this.getValue = function(optionId) {
      let val = K.ls.get(optionId);

      if (val === null) {
        return undefined;
      }
      if (val.toLowerCase() === 'true') {
        return true;
      }
      if (val.toLowerCase() === 'false') {
        return false;
      }


      return val;
    };
  }
  let settings;
  settings = new Settings();
  settings.addCategory();

  if (account.can('scout scythe mystics admin')) {
    settings.addOption({
      name: 'Less Compact Scout\'s Log',
      id: 'less-compact-scouts-log'
    });
  }
  settings.addOption({
    name: 'Decrease margins and paddings',
    id: 'decrease-margins-paddings'
  });

  $(document).on('ews-setting-changed', function(evt, data) {
    switch (data.setting) {
      case 'decrease-margins-paddings':
        decreaseMarginsPaddings();
        break;
    }
  });


  $("#homelogo > img").attr('src', 'https://cdn.rawgit.com/RandomGuyJCI/Optimize-EyeWire-SmallRes/ee3a4742/eyewire_logo.png');

  $("#scoutsLogFloatingControls > img").attr('src', 'https://cdn.rawgit.com/RandomGuyJCI/Optimize-EyeWire-SmallRes/ee3a4742/scoutslog_icon.png');

  $("#acc ul li:nth-of-type(2) a").replaceWith('<span id="HQtime"></span>');

  $("#learn-about-neuroscience, .hqtime, #inspectPanelButton, #scoutsLogButton").remove();

  $(".sl-cell-list").text("C");

  $(".sl-mystic").text("M");

  $(".sl-open").text("O");

  $(".sl-need-admin").text("A");

  $(".sl-need-scythe").text("S");

  $(".sl-watch").text("W");

  $(".sl-history").text("H");

  $(".sl-promotions").text("P");

  $(".sl-task-details").text("D");

  $(".sl-task").text("N");

  console.log("Loaded Optimize for Small Resolutions.");
})();
