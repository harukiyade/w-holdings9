$(function() {
    pageTop = function() {
        var t = $('.pagetop');
        t.hide(), t.click(function() { return $('body,html').animate({ scrollTop: 0 }, 400), !1 }), $(window).scroll(function() { $(this).scrollTop() > 400 ? t.fadeIn() : t.fadeOut() });
    }
    pageTop();

    $(window).on('load scroll', function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        var footHeight = $('#footer').innerHeight();
        if (scrollHeight - scrollPosition <= footHeight) {
            $('.pagetop').addClass('current');
        } else {
            $('.pagetop').removeClass('current');
        }
    });
});

// Set padding-top wrapper
$(function() {
    var setPaddingTop = function() {
        var heightHeader = $('#header').outerHeight();
        var $wrapper = $('#wrapper.p-sub');
        $wrapper.css('paddingTop', heightHeader);
    };
    $(window).on('load scroll resize', setPaddingTop);
});

$(function() {
    var smoothScroll = function() {
        var $nav = $('.header-nav');
        var $header = $('.header');
        var navHeight = $nav.innerHeight();
        var headerHeight = $header.innerHeight();
        var speed = 500;
        var smoothScrollC = {
            init: function() {
                var me = this;
                $('a[href^=#]').on('click', function(e) {
                    e.preventDefault();
                    me.targetScroll($(this));
                })
            },
            targetScroll: function($target) {
                var $hash = $($target.attr('href'));
                if ($hash.length) {
                    if ($('body').width() > 768) {
                        $('html, body').animate({
                            scrollTop: $hash.offset().top - headerHeight
                        }, speed, 'swing');
                    } else {
                        $('html, body').animate({
                            scrollTop: $hash.offset().top - headerHeight
                        }, speed, 'swing');
                    }
                }
            }
        };
        var smoothScrollParam = {
            location: location.pathname,
            init: function() {
                var me = this;

                if (!this.location.match('/admin/')) {
                    if (location.search.match('anc=')) {
                        me.anchor = location.search.split('anc=')[1];
                    } else {
                        me.anchor = location.search.split(/\?/)[1];
                    }
                    var hashP = '#' + this.anchor;
                    if ($('body').width() > 768) {
                        $('html, body').animate({
                            scrollTop: $(hashP).offset().top - headerHeight
                        }, speed, 'swing');
                    } else {
                        $('html, body').animate({
                            scrollTop: $(hashP).offset().top - headerHeight
                        }, speed, 'swing');
                    }
                }
            }
        }

        $(function() {
            smoothScrollC.init();
            if (location.href.match(/\?/)) {
                setTimeout(function() {
                    smoothScrollParam.init();
                }, 100)
            }
        });
    }
    smoothScroll();
});

// Image Auto
$(function() {
        $('.img-auto').parent().addClass('MissingWH__wrap');

        $('.img-auto').addClass('MissingWH').attr({
            'data-focus-x': 0,
            'data-focus-y': 0
        });
    $(window).on("load resize", function () {
        $('.MissingWH img').fadeIn();
        $('.MissingWH').focusPoint();
    });
});

$(function() {
    var $hamburgerBtn = $('.header-hambuger');
    var $header = $('.header');
    var $mv = $('.main-visual');
    var $headerNav = $('.header-nav');
    var $headerNavLink = $('.header-nav__link');

    $(window).on('load scroll resize', function() {
        var mvHeight = $mv.innerHeight() - $header.innerHeight() - $header.innerHeight();
        $(this).scrollTop() > mvHeight ? $header.addClass('is-fixed') : $header.removeClass('is-fixed');
    });

    $hamburgerBtn.click(function(e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $('body').stop().toggleClass('menu-active');
        $headerNav.stop().toggleClass('is-open');
    });

    // $headerNavLink.click(function(e) {
    //     e.preventDefault();
    //     $hamburgerBtn.removeClass('is-active');
    //     $('body').stop().removeClass('menu-active');
    //     $headerNav.stop().removeClass('is-open');
    // });
});

/* Loading
-------------------------------*/
$(document).ready(function() {
    wow = new WOW({
        boxClass: 'js-effect',
        offset: 50,
        mobile: true
    })
    var loadingFunc = function() {
        $(window).on("load", function(e) {
            setTimeout(function() {
                $('body,html').animate({
                    scrollTop: 0
                }, 100);
                $('#loading').fadeOut(500);
            }, 2000);
            setTimeout(function() {
                wow.init();
            }, 300);
        });
    };
    if ($.cookie('cookieLoading')) {
        $(window).on("load", function(e) {
            $('#loading').fadeOut(200);
            wow.init();
        });
    } else {
        $('#loading').addClass('is-show');
        $.cookie('cookieLoading', 'on', {
            path: '/'
        });
        loadingFunc();
    }

    /* SET Cookie
    -------------------------------*/
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }
    /* Get Cookie
    -------------------------------*/
    function getCookie(cname) {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
});

$(function() {
  var _scope_ = null;
  function uiAccordion(element) {
    var accContent = $(element,_scope_);
    var slideBtn = accContent.children(':first-child');
    var slideContent = slideBtn.next();

    $.each(slideBtn, function(element){
      if(!$(this,_scope_).hasClass('is-open')){
        $(this,_scope_).next().hide();
      } else {
        $(this,_scope_).next().show();
      }
    });

    slideBtn.off("click");
    slideBtn.click(function(){
      if($(this,_scope_).hasClass('is-open')){
        $(this,_scope_).removeClass('is-open');
        $(this,_scope_).next().slideUp('fast');
      } else {
        $(this,_scope_).addClass('is-open');
        $(this,_scope_).next().slideDown('fast');
      }
      return false;
    });
    slideContent.find('a').click(function(){
      slideContent.hide();
      slideBtn.removeClass('is-open');
    });
  }
  uiAccordion('.js-accordion',_scope_);
});

// $(function() {
//   $('a[href*=#]:not([href=#])').click(function() 
//   {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
//         || location.hostname == this.hostname) 
//     {
//       if ($('body').width() > 752) {
//         if ($('header').hasClass('is-fixed')) {
//           //alert('aaa');
//           var $header = $('.header');
//           var headerTopHeight = $header.innerHeight();
//           var target = $(this.hash),
//           headerHeight = $(".header").outerHeight(); // Get fixed header height
//         }else {
//           //alert('bbb');
//           var target = $(this.hash),
//           headerHeight = $(".header").outerHeight(); // Get fixed header height
//         }
//       } else {
//         var target = $(this.hash),
//         headerHeight = $(".header").outerHeight(); // Get fixed header height
//       } 
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              
//       if (target.length) 
//       {
//         $('html,body').animate({
//           scrollTop: target.offset().top - headerHeight
//         }, 500);
//         return false;
//       }
//     }
//   });
// });

$(function() {
    var navPage = function() {
        $(window).on('scroll', function() {
            var st = $(window).scrollTop();
            var h = $('#header').outerHeight();
            var p = st + h;
            var ww = $(window).width();
            $('.js-pager-target').each(function(i) {
                if ($(this).position().top <= p) {
                    $('#l-navi__pager li').removeClass('is-current');
                    $('#l-navi__pager li').eq(i).addClass('is-current');
                } else if (st <= h) {
                    if (ww >= 768) {
                        $('#l-navi__pager li').removeClass('is-current');
                    }
                }
            });
        }).scroll();

        $('#l-navi__pager li').on('click', function() {
            var h = $('#header').outerHeight();
            var ds = $(this).attr('data-section');
            var t = $(ds == "#" || ds == "" ? 'body' : ds);
            var s = t.offset().top - h + 10;
            $('html,body').animate({
                scrollTop: s
            }, 500);
            $('#l-navi__pager li').removeClass('is-current');
            $(this).addClass('is-current');
            return false;
        });
    };
    $(window).on('load resize', navPage);

    /* Smooth Scroll
    -------------------------------*/
    var smoothScroll = function() {
        $('a[href^="#"]').on('click', function() {
            var h = $('#header').outerHeight();
            var hr = $(this).attr('href');
            var t = $(hr == "#" || hr == "" ? 'body' : hr);
            var p = t.offset().top - h;
            $('html,body').animate({
                scrollTop: p
            }, 500);
            return false;
        });
    };
    // $(window).on('load resize', smoothScroll);
});

$(function(){
    var setElm = $('.loopSlider'),
    slideSpeed = 5000;
 
    setElm.each(function(){
        var self = $(this),
        selfWidth = self.innerWidth(),
        findUl = self.find('ul'),
        findLi = findUl.find('li'),
        listWidth = findLi.outerWidth(),
        listCount = findLi.length,
        loopWidth = listWidth * listCount;
 
        findUl.wrapAll('<div class="loopSliderWrap" />');
        var selfWrap = self.find('.loopSliderWrap');
 
        if(loopWidth > selfWidth){
            findUl.css({width:loopWidth}).clone().appendTo(selfWrap);
 
            selfWrap.css({width:loopWidth*2});
 
            function loopMove(){
                selfWrap.animate({left:'-' + (loopWidth) + 'px'},slideSpeed*listCount,'linear',function(){
                    selfWrap.css({left:'0'});
                    loopMove();
                });
            };
            loopMove();

        }
    });
});

$(function() {
    $('.salespoint__sttl').matchHeight();
    $('.service__sttl').matchHeight();
});

// Tab Category
$(function() {
    $('.c-category__item').click(function() {
        $(this).stop().siblings().removeClass('is-focus');
        $(this).stop().addClass('is-focus');

        category = $(this).attr('data-cat');
        var timeOut = 300;
        var timeIn = 300;

        if (category == "all") {
            $('.c-card__item').fadeOut(timeOut);
            setTimeout(function() {
                $('.c-card__item').fadeIn();
            }, timeIn);
        } else {
            $('.c-card__item').fadeOut(timeOut);
            setTimeout(function() {
                $('.' + category).fadeIn(timeOut);
            }, timeIn);
        }
    });
});