function setNavAffix () {
  $('#main-navbar').affix({offset: {
    top: $('#title-carousel').outerHeight(true) - $('#main-navbar').outerHeight(true)
  }});
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
  var allMods = $(".animate");

  win.scroll(function(event) {

    allMods.each(function(i, el) {
      var el = $(el);
      var offset = el.offset().top;
      var bottom = window.scrollY + window.outerHeight;
      el.toggleClass('come-in', offset < bottom);
    });

  });
//    $('#contact-form').bootstrapValidator({
//        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
//        feedbackIcons: {
//            valid: 'glyphicon glyphicon-ok',
//            invalid: 'glyphicon glyphicon-remove',
//            validating: 'glyphicon glyphicon-refresh'
//        },
//        fields: {
//            full_name: {
//                validators: {
//                        stringLength: {
//                        min: 2,
//                    },
//                        notEmpty: {
//                        message: 'Please supply your full name'
//                    }
//                }
//            },
//            email: {
//                validators: {
//                    notEmpty: {
//                        message: 'Please supply your email address'
//                    },
//                    emailAddress: {
//                        message: 'Please supply a valid email address'
//                    }
//                }
//            },
//            phone: {
//                validators: {
//                    notEmpty: {
//                        message: 'Please supply your phone number'
//                    },
//                    phone: {
//                        country: 'US',
//                        message: 'Please supply a vaild phone number with area code'
//                    }
//                }
//            },
//            address: {
//                validators: {
//                     stringLength: {
//                        min: 8,
//                    },
//                    notEmpty: {
//                        message: 'Please supply your street address'
//                    }
//                }
//            },
//            city: {
//                validators: {
//                     stringLength: {
//                        min: 4,
//                    },
//                    notEmpty: {
//                        message: 'Please supply your city'
//                    }
//                }
//            },
//            state: {
//                validators: {
//                    notEmpty: {
//                        message: 'Please select your state'
//                    }
//                }
//            },
//            zip: {
//                validators: {
//                    notEmpty: {
//                        message: 'Please supply your zip code'
//                    },
//                    zipCode: {
//                        country: 'US',
//                        message: 'Please supply a vaild zip code'
//                    }
//                }
//            },
//            comment: {
//                validators: {
//                      stringLength: {
//                        min: 10,
//                        max: 200,
//                        message:'Please enter at least 10 characters and no more than 200'
//                    },
//                    notEmpty: {
//                        message: 'Please supply a description of your project'
//                    }
//                    }
//                }
//            }
//        })
//        .on('success.form.bv', function(e) {
//            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
//                $('#contact_form').data('bootstrapValidator').resetForm();
//
//            // Prevent form submission
//            e.preventDefault();
//
//            // Get the form instance
//            var $form = $(e.target);
//
//            // Get the BootstrapValidator instance
//            var bv = $form.data('bootstrapValidator');
//
//            // Use Ajax to submit form data
//            $.post($form.attr('action'), $form.serialize(), function(result) {
//                console.log(result);
//            }, 'json');
//        });
});

