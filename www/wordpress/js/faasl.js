function setNavAffix() {
  $('#main-navbar').affix({offset: {
    top: $('#title-carousel').outerHeight(true) - $('#main-navbar').outerHeight(true)
  }});
}

function validContact() {
  var ret = true;
  var nameRegX = /\S{2}/;
  var emailRegX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var phoneRegX = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
  $name = $("input[name=full_name]");
  $email = $("input[name=email]");
  $phone = $("input[name=phone]");
  $message = $("textarea[name=message]");
  
  function check($el, regx, msg, errSel) {
    var val = $el.val();
    if (!regx.test(val)) {
      $(errSel).text(msg);
      ret = false;
    }
  }
  
  var checks = [
    [$name, nameRegX, 'A name is required', '#name_error'],
    [$email, emailRegX, 'A valid email address is required.', '#email_error'],
    [$message, nameRegX, 'A message is required', '#message_error']
  ];
  
  if ($phone.val().trim().length) {
    checks.push([$phone, phoneRegX, 'This is not a valid phone number.', '#phone_error'])
  }

  // TODO checks.reduce();
  for (var i = 0; i < checks.length; i++) {
    check.apply(null, checks[i]);
  }
  
  return ret;
}

function submitForm() {
  // TODO after handler is writter
}

function clearFormErrors() {
  $('#name_error').text('');
  $('#email_error').text('');
  $('#phone_error').text('');
  $('#message_error').text('');
}

function toggleFormMessage(selector, show) {
  if (!!show) {
    $(selector).slideDown({ opacity: "show" }, "slow");
  } else {
    $(selector).slideUp({ opacity: "hide" }, "fast");
  }
}

function hideAllMessages() {
  var arr = ['#contact-success-message', '#contact-warning-message', '#contact-failure-message'];
  arr.forEach(function (sel) {
    toggleFormMessage(sel);
  });
}

function toggleFormPending(bool) {
  var $span = $('#contact-submit span');
  if (bool) {
    $('#contact-submit').attr("disabled", "disabled");
    $span.removeClass() && $span.addClass('fa fa-spinner fa-pulse');
  } else {
    $('#contact-submit').removeAttr("disabled");
    $span.removeClass() && $span.addClass('fa fa-send');
  }
}

function formSuccess() {
  toggleFormMessage('#contact-success-message', true);
  $('#contact-submit').hide();
}

function formInvalid() {
  toggleFormMessage('#contact-warning-message', true);
  toggleFormPending(false);
}

function formFailure() {
  toggleFormMessage('#contact-failure-message', true);
  toggleFormPending(false);
}

$(document).ready(function() {
  setNavAffix();
  $(document).resize(setNavAffix);

  $.fn.matchHeight._throttle = 2220;
  $('.row-eq-height').matchHeight({
    byRow: false,
    property: 'height',
    target: null,
    remove: false
  });
  
  // SOURCE https://css-tricks.com/slide-in-as-you-scroll-down-boxes/
  var win = $(window);
  var allAnim = $(".animate");

  win.scroll(function(event) {

    allAnim.each(function(i, el) {
      var el = $(el);
      var offset = el.offset().top;
      var bottom = window.scrollY + window.outerHeight;
      el.toggleClass('come-in', offset < bottom);
    });

  });
  
  $('form#contact-form').submit(function(ev){
    ev.preventDefault();
    clearFormErrors();
    hideAllMessages();
    toggleFormPending(true);
    if (!validContact()) {
      formInvalid();
      return false;
    }
    formSuccess(); // DEBUG until  form handler is written
//      $.post( 'some-url', $('form#myForm').serialize(), function(data) {
//         ... do something with response from server
//       },
//       'json' // I expect a JSON response
//    );
  });
});

