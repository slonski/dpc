/***************************************************
 TOPNAV BLEND EFFECT JAVASCRIPT
 ***************************************************/
/*
 jQuery Blend v1.3
 (c) 2009 Jack Moore - www.colorpowered.com - jack@colorpowered.com
 Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
(function($){
    /*
     Blend creates a 2nd layer on top of the target element.
     This layer is faded in and out to create the effect.  The orignal, bottom layer
     has it's class set to 'hover' and remains that way for the duration to
     keep the CSS :hover state from being apparent when the object is moused-over.
     */

    $.fn.blend = function(options, callback) {
        // Disable Blend for FireFox 2 because of a bug that does not allow JavaScript
        // to retrieve the CSS background position.
        // More info: https://bugzilla.mozilla.org/show_bug.cgi?id=316981
        if ($.browser.mozilla && (parseFloat($.browser.version) < 1.9)) { return this; }

        var settings = $.extend({}, $.fn.blend.settings, options);
        $(this).each(function(){
            var $this = $(this),
                $target = $(settings.target ? settings.target : this),
                $hover,
                target = [],
                i,
                length,
                style = {},
                active = false,
                out = 0,
                opacity = settings.opacity,
                bg = 'background-',
                properties = [
                    bg+'color',
                    bg+'image',
                    bg+'repeat',
                    bg+'attachment',
                    bg+'position',
                    bg+'position-x',
                    bg+'position-y'
                ];

            length = properties.length;

            if($target[0].style.position !== 'absolute'){
                $target.css({position:'relative'});
            }

            if(!$target.hasClass('hover')){
                $target.wrapInner('<div style="position:relative" />');
            }

            for (i=0; i<length; i++){
                target[i] = $target.css(properties[i]);
            }

            $target.addClass("hover");

            style = {};
            style.position='absolute';
            style.top=0;
            style.left=0;
            style.width=$target.width();
            style.height=$target.height();
            for (i=0; i<length; i++){
                style[properties[i]] = $target.css(properties[i]);
            }

            //checks to see if blend has already been applied to an element.
            if($target.find(".jsblend").length === 0){
                $hover = $('<div class="jsblend" />').css(style);

                if(settings.top){
                    $hover.appendTo($target);
                } else {
                    $hover.prependTo($target);
                }
            } else {
                $hover = $target.find(".jsblend");
            }

            style = {};
            for (i=0; i<length; i++){
                style[properties[i]] = target[i];
            }

            $target.css(style);

            if(settings.reverse){
                out = settings.opacity;
                opacity = 0;
            }
            $hover.css({opacity:out});

            function pulse(o){
                if(active){
                    $hover.fadeTo(settings.speed, o, function(){
                        pulse(o===out?opacity:out);
                    });
                }
            }

            if(settings.pulse && settings.active){
                active = true;
                pulse(opacity);
            } else if(settings.pulse){
                $this.hover(function(){
                    active = true;
                    pulse(opacity);
                }, function(){
                    active = false;
                    $hover.stop(true).fadeTo(settings.speed, out);
                });
            } else {
                $this.hover(function(){
                    $hover.stop().fadeTo(settings.speed, opacity);
                }, function(){
                    $hover.stop().fadeTo(settings.speed, out);
                });
            }

        });
        return this;
    };

    $.fn.blend.settings = {
        speed : 300,
        opacity : 1,
        target : false,
        reverse : false,
        pulse : false,
        active : false,
        top : false
    };

}(jQuery));

/***************************************************
 ADDITIONAL CODE FOR TOPNAV
 ***************************************************/
$(document).ready(function(){
    $("ul#topnav li a").blend();
});





/***************************************************
 ANCHOR SCROLL JAVASCRIPT
 ***************************************************/
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);

/***************************************************
 ADDITIONAL CODE FOR ANCHOR SCROLL
 ***************************************************/
$(document).ready(function(){
    $.localScroll();
});






/***************************************************
 ADDITIONAL CODE FOR SLIDING TABS - SERVICES
 ***************************************************/
$(document).ready(function() {
    $('#tabMenu > li').click(function(){
        $('#tabMenu > li').removeClass('selected');
        $(this).addClass('selected');
        $('.boxBody div').slideUp('1500');
        $('.boxBody div:eq(' + $('#tabMenu > li').index(this) + ')').slideDown('1500');
    });
});





/***************************************************
 ADDITIONAL CODE FOR SLIDING TABS - NEWS
 ***************************************************/
$(document).ready(function() {
    $('#tab-nav > li').click(function(){
        $('#tab-nav > li').removeClass('selected');
        $(this).addClass('selected');
        $('.news div').slideUp('1500');
        $('.news div:eq(' + $('#tab-nav > li').index(this) + ')').slideDown('1500');
    });
});






/***************************************************
 FILTERABLE
 ***************************************************/
/*
 * Copyright (C) 2009 Joel Sutherland.
 * Liscenced under the MIT liscense
 */

(function($) {
    $.fn.filterable = function(settings) {
        settings = $.extend({
            useHash: true,
            animationSpeed: 800,
            show: { width: 'show', opacity: 'show' },
            hide: { width: 'hide', opacity: 'hide' },
            useTags: true,
            tagSelector: '#portfolio-filter a',
            selectedTagClass: 'current',
            allTag: 'all'
        }, settings);

        return $(this).each(function(){

            /* FILTER: select a tag and filter */
            $(this).bind("filter", function( e, tagToShow ){
                if(settings.useTags){
                    $(settings.tagSelector).removeClass(settings.selectedTagClass);
                    $(settings.tagSelector + '[href=' + tagToShow + ']').addClass(settings.selectedTagClass);
                }
                $(this).trigger("filterportfolio", [ tagToShow.substr(1) ]);
            });

            /* FILTERPORTFOLIO: pass in a class to show, all others will be hidden */
            $(this).bind("filterportfolio", function( e, classToShow ){
                if(classToShow == settings.allTag){
                    $(this).trigger("show");
                }else{
                    $(this).trigger("show", [ '.' + classToShow ] );
                    $(this).trigger("hide", [ ':not(.' + classToShow + ')' ] );
                }
                if(settings.useHash){
                    location.hash = '#' + classToShow;
                }
            });

            /* SHOW: show a single class*/
            $(this).bind("show", function( e, selectorToShow ){
                $(this).children(selectorToShow).animate(settings.show, settings.animationSpeed);
            });

            /* SHOW: hide a single class*/
            $(this).bind("hide", function( e, selectorToHide ){
                $(this).children(selectorToHide).animate(settings.hide, settings.animationSpeed);
            });

            /* ============ Check URL Hash ====================*/
            if(settings.useHash){
                if(location.hash != '')
                    $(this).trigger("filter", [ location.hash ]);
                else
                    $(this).trigger("filter", [ '#' + settings.allTag ]);
            }

            /* ============ Setup Tags ====================*/
            if(settings.useTags){
                $(settings.tagSelector).click(function(){
                    $('.portfolio-tiles-gallery').trigger("filter", [ $(this).attr('href') ]);

                    $(settings.tagSelector).removeClass('current');
                    $(this).addClass('current');
                });
            }
        });
    }
})(jQuery);


$(document).ready(function(){

    $('.portfolio-tiles-gallery').filterable();

});






/***************************************************
 SLIDING BOXES
 ***************************************************/
$(document).ready(function(){
    //To switch directions up/down and left/right just place a "-" in front of the top/left attribute
    //Vertical Sliding
    $('.boxgrid.slidedown').hover(function(){
        $(".cover", this).stop().animate({top:'260px'},{queue:false,duration:450});
    }, function() {
        $(".cover", this).stop().animate({top:'0px'},{queue:false,duration:450});
    });
    //Full Caption Sliding (Hidden to Visible)
    $('.boxgrid.slideup').hover(function(){
        $(".cover", this).stop().animate({top:'-260px'},{queue:false,duration:450});
    }, function() {
        $(".cover", this).stop().animate({top:'0px'},{queue:false,duration:450});
    });
    //Horizontal Sliding right
    $('.boxgrid.slideright').hover(function(){
        $(".cover", this).stop().animate({left:'325px'},{queue:false,duration:450});
    }, function() {
        $(".cover", this).stop().animate({left:'0px'},{queue:false,duration:450});
    });
    //Horizontal Sliding left
    $('.boxgrid.slideleft').hover(function(){
        $(".cover", this).stop().animate({left:'-325px'},{queue:false,duration:450});
    }, function() {
        $(".cover", this).stop().animate({left:'0px'},{queue:false,duration:450});
    });
    //Diagnal Sliding
    $('.boxgrid.thecombo').hover(function(){
        $(".cover", this).stop().animate({top:'260px', left:'325px'},{queue:false,duration:450});
    }, function() {
        $(".cover", this).stop().animate({top:'0px', left:'0px'},{queue:false,duration:450});
    });
    //Partial Sliding (Only show some of background)
    $('.portfolio li').hover(function(){
        var _this = $(this);
        $(".info-button", this).slideDown(300).click(function(){
            $(this).slideUp(300);
            _this.find(".cover").stop().animate({opacity:'0.3'},{queue:false,duration:300});
            _this.find(".info").slideDown(1000, "easeOutBounce");
        });
    }, function() {
        $(".info-button", this).slideUp(300);
        $(".cover", this).stop().animate({opacity:'1'},{queue:false,duration:300});
        $(".info", this).slideUp(300);
    });
});



//
//










/***************************************************
 FORM VALIDATION JAVASCRIPT
 ***************************************************/
$(document).ready(function() {
    $('form#contact_form').submit(function() {
        $('form#contact_form .error').remove();
        var hasError = false;
        $('.requiredField').each(function() {
            if(jQuery.trim($(this).val()) == '') {
                var labelText = $(this).prev('label').text();
                $(this).parent().append('<span class="error">You forgot to enter your '+labelText+'.</span>');
                $(this).addClass('inputError');
                hasError = true;
            } else if($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(!emailReg.test(jQuery.trim($(this).val()))) {
                    var labelText = $(this).prev('label').text();
                    $(this).parent().append('<span class="error">You entered an invalid '+labelText+'.</span>');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });
        if(!hasError) {
            $('form#contact_form input.submit').fadeOut('normal', function() {
                $(this).parent().append('');
            });
            var formInput = $(this).serialize();
            $.post($(this).attr('action'),formInput, function(data){
                $('form#contact_form').slideUp("fast", function() {
                    $(this).before('<p class="success"><strong>Thanks!</strong> Your email was successfully sent. We will contact you as soon as possible.</p>');
                });
            });
        }

        return false;

    });
});
