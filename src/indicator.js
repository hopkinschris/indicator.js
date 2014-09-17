/*!
 * indicator.js
 * A visual password strength indicator inspired by Stripe and Strength.js
 * Author: @hopkinschris
 * Licensed under the MIT license
 */
;
(function($, window, document, undefined) {

  var pluginName = "indicator"

  function Plugin(element, options) {
    this.element = element;
    this.$elem = $(this.element);
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {

    init: function() {

      var characters = 0;
      var capitalletters = 0;
      var loweletters = 0;
      var number = 0;
      var special = 0;

      var upperCase = new RegExp('[A-Z]');
      var lowerCase = new RegExp('[a-z]');
      var numbers = new RegExp('[0-9]');
      var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');

      function GetPercentage(a, b) {
        return ((b / a) * 100);
      }

      function check_strength(thisval, thisid) {
        if (thisval.length > 8) {
          characters = 1;
        } else {
          characters = 0;
        };
        if (thisval.match(upperCase)) {
          capitalletters = 1
        } else {
          capitalletters = 0;
        };
        if (thisval.match(lowerCase)) {
          loweletters = 1
        } else {
          loweletters = 0;
        };
        if (thisval.match(numbers)) {
          number = 1
        } else {
          number = 0;
        };

        var total = characters + capitalletters + loweletters + number + special;
        var totalpercent = GetPercentage(7, total).toFixed(0);
        get_total(total, thisid);
      }

      function get_total(total, thisid) {
        var thismeter = $('.form__indicator');

        if (total == 0) {
          thismeter.removeClass();
          thismeter.addClass('form__indicator');
          thismeter.find('.form__indicator--popover li:first-child').text('Must be at least 8 characters.');
        } else if (total == 1) {
          thismeter.removeClass();
          thismeter.addClass('form__indicator level-1');
          thismeter.find('.form__indicator--popover li:first-child').text('Must be at least 8 characters.');
        } else if (total == 2) {
          thismeter.removeClass();
          thismeter.addClass('form__indicator level-2');
          thismeter.find('.form__indicator--popover li:first-child').text('That\'s alright.');
        } else if (total == 3) {
          thismeter.removeClass();
          thismeter.addClass('form__indicator level-3');
          thismeter.find('.form__indicator--popover li:first-child').text('That\'s good.');
        } else {
          thismeter.removeClass();
          thismeter.addClass('form__indicator level-4');
          thismeter.find('.form__indicator--popover li:first-child').text('That\'s great!');
        }
      }

      thisid = this.$elem.attr('id');
      this.$elem.css('padding-right', '20px').before("<span class='form__indicator'><span></span><span></span><span></span><span></span><ul class='form__indicator--popover'><li>Must be at least 8 characters.</li><li>Good passwords are hard to guess. Try using a multi-word phrase, uncommon words, numbers or symbols.</li></ul></span>");

      $('.form__indicator').hover(function() {
        $('.form__indicator--popover').toggleClass('visible');
      });

      this.$elem.bind('keyup keydown', function(event) {
        thisval = $('#' + thisid).val();
        $('input[type="text"][data-password="' + thisid + '"]').val(thisval);
        check_strength(thisval, thisid);
      });

      $('input[type="text"][data-password="' + thisid + '"]').bind('keyup keydown', function(event) {
        thisval = $('input[type="text"][data-password="' + thisid + '"]').val();
        console.log(thisval);
        $('input[type="password"][data-password="' + thisid + '"]').val(thisval);
        check_strength(thisval, thisid);
      });
    },
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
