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
    $('.boxgrid.peek').hover(function(){
        $(".cover", this).stop().animate({top:'100px'},{queue:false,duration:160});
    }, function() {
        $(".cover", this).stop().animate({top:'0px'},{queue:false,duration:160});
    });
});







/***************************************************
 PRETTYPHOTO IMAGE PREVIEW JAVASCRIPT
 ***************************************************/
/* ------------------------------------------------------------------------
 * 	Class: prettyPhoto
 * 	Use: Lightbox clone for jQuery
 * 	Author: Stephane Caron (http://www.no-margin-for-errors.com)
 * 	Version: 2.5.6
 ------------------------------------------------------------------------- */

(function($){$.prettyPhoto={version:'2.5.6'};$.fn.prettyPhoto=function(settings){settings=jQuery.extend({animationSpeed:'normal',opacity:0.80,showTitle:true,allowresize:true,default_width:500,default_height:344,counter_separator_label:'/',theme:'facebook',hideflash:false,wmode:'opaque',autoplay:true,modal:false,changepicturecallback:function(){},callback:function(){},markup:'<div class="pp_pic_holder"> \
      <div class="pp_top"> \
       <div class="pp_left"></div> \
       <div class="pp_middle"></div> \
       <div class="pp_right"></div> \
      </div> \
      <div class="pp_content_container"> \
       <div class="pp_left"> \
       <div class="pp_right"> \
        <div class="pp_content"> \
         <div class="pp_loaderIcon"></div> \
         <div class="pp_fade"> \
          <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
          <div class="pp_hoverContainer"> \
           <a class="pp_next" href="#">next</a> \
           <a class="pp_previous" href="#">previous</a> \
          </div> \
          <div id="pp_full_res"></div> \
          <div class="pp_details clearfix"> \
           <a class="pp_close" href="#">Close</a> \
           <p class="pp_description"></p> \
           <div class="pp_nav"> \
            <a href="#" class="pp_arrow_previous">Previous</a> \
            <p class="currentTextHolder">0/0</p> \
            <a href="#" class="pp_arrow_next">Next</a> \
           </div> \
          </div> \
         </div> \
        </div> \
       </div> \
       </div> \
      </div> \
      <div class="pp_bottom"> \
       <div class="pp_left"></div> \
       <div class="pp_middle"></div> \
       <div class="pp_right"></div> \
      </div> \
     </div> \
     <div class="pp_overlay"></div> \
     <div class="ppt"></div>',image_markup:'<img id="fullResImage" src="" />',flash_markup:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',quicktime_markup:'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',iframe_markup:'<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',inline_markup:'<div class="pp_inline clearfix">{content}</div>'},settings);if($.browser.msie&&parseInt($.browser.version)==6){settings.theme="light_square";}
    if($('.pp_overlay').size()==0)_buildOverlay();var doresize=true,percentBased=false,correctSizes,$pp_pic_holder,$ppt,$pp_overlay,pp_contentHeight,pp_contentWidth,pp_containerHeight,pp_containerWidth,windowHeight=$(window).height(),windowWidth=$(window).width(),setPosition=0,scrollPos=_getScroll();$(window).scroll(function(){scrollPos=_getScroll();_centerOverlay();_resizeOverlay();});$(window).resize(function(){_centerOverlay();_resizeOverlay();});$(document).keydown(function(e){if($pp_pic_holder.is(':visible'))
        switch(e.keyCode){case 37:$.prettyPhoto.changePage('previous');break;case 39:$.prettyPhoto.changePage('next');break;case 27:if(!settings.modal)
            $.prettyPhoto.close();break;};});$(this).each(function(){$(this).bind('click',function(){_self=this;theRel=$(this).attr('rel');galleryRegExp=/\[(?:.*)\]/;theGallery=galleryRegExp.exec(theRel);var images=new Array(),titles=new Array(),descriptions=new Array();if(theGallery){$('a[rel*='+theGallery+']').each(function(i){if($(this)[0]===$(_self)[0])setPosition=i;images.push($(this).attr('href'));titles.push($(this).find('img').attr('alt'));descriptions.push($(this).attr('title'));});}else{images=$(this).attr('href');titles=($(this).find('img').attr('alt'))?$(this).find('img').attr('alt'):'';descriptions=($(this).attr('title'))?$(this).attr('title'):'';}
        $.prettyPhoto.open(images,titles,descriptions);return false;});});$.prettyPhoto.open=function(gallery_images,gallery_titles,gallery_descriptions){if($.browser.msie&&$.browser.version==6){$('select').css('visibility','hidden');};if(settings.hideflash)$('object,embed').css('visibility','hidden');images=$.makeArray(gallery_images);titles=$.makeArray(gallery_titles);descriptions=$.makeArray(gallery_descriptions);image_set=($(images).size()>0)?true:false;_checkPosition($(images).size());$('.pp_loaderIcon').show();$pp_overlay.show().fadeTo(settings.animationSpeed,settings.opacity);$pp_pic_holder.find('.currentTextHolder').text((setPosition+1)+settings.counter_separator_label+$(images).size());if(descriptions[setPosition]){$pp_pic_holder.find('.pp_description').show().html(unescape(descriptions[setPosition]));}else{$pp_pic_holder.find('.pp_description').hide().text('');};if(titles[setPosition]&&settings.showTitle){hasTitle=true;$ppt.html(unescape(titles[setPosition]));}else{hasTitle=false;};movie_width=(parseFloat(grab_param('width',images[setPosition])))?grab_param('width',images[setPosition]):settings.default_width.toString();movie_height=(parseFloat(grab_param('height',images[setPosition])))?grab_param('height',images[setPosition]):settings.default_height.toString();if(movie_width.indexOf('%')!=-1||movie_height.indexOf('%')!=-1){movie_height=parseFloat(($(window).height()*parseFloat(movie_height)/100)-100);movie_width=parseFloat(($(window).width()*parseFloat(movie_width)/100)-100);percentBased=true;}
        $pp_pic_holder.fadeIn(function(){imgPreloader="";switch(_getFileType(images[setPosition])){case'image':imgPreloader=new Image();nextImage=new Image();if(image_set&&setPosition>$(images).size())nextImage.src=images[setPosition+1];prevImage=new Image();if(image_set&&images[setPosition-1])prevImage.src=images[setPosition-1];$pp_pic_holder.find('#pp_full_res')[0].innerHTML=settings.image_markup;$pp_pic_holder.find('#fullResImage').attr('src',images[setPosition]);imgPreloader.onload=function(){correctSizes=_fitToViewport(imgPreloader.width,imgPreloader.height);_showContent();};imgPreloader.onerror=function(){alert('Image cannot be loaded. Make sure the path is correct and image exist.');$.prettyPhoto.close();};imgPreloader.src=images[setPosition];break;case'youtube':correctSizes=_fitToViewport(movie_width,movie_height);movie='http://www.youtube.com/v/'+grab_param('v',images[setPosition]);if(settings.autoplay)movie+="&autoplay=1";toInject=settings.flash_markup.replace(/{width}/g,correctSizes['width']).replace(/{height}/g,correctSizes['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);break;case'vimeo':correctSizes=_fitToViewport(movie_width,movie_height);movie_id=images[setPosition];movie='http://vimeo.com/moogaloop.swf?clip_id='+movie_id.replace('http://vimeo.com/','');if(settings.autoplay)movie+="&autoplay=1";toInject=settings.flash_markup.replace(/{width}/g,correctSizes['width']).replace(/{height}/g,correctSizes['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);break;case'quicktime':correctSizes=_fitToViewport(movie_width,movie_height);correctSizes['height']+=15;correctSizes['contentHeight']+=15;correctSizes['containerHeight']+=15;toInject=settings.quicktime_markup.replace(/{width}/g,correctSizes['width']).replace(/{height}/g,correctSizes['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,images[setPosition]).replace(/{autoplay}/g,settings.autoplay);break;case'flash':correctSizes=_fitToViewport(movie_width,movie_height);flash_vars=images[setPosition];flash_vars=flash_vars.substring(images[setPosition].indexOf('flashvars')+10,images[setPosition].length);filename=images[setPosition];filename=filename.substring(0,filename.indexOf('?'));toInject=settings.flash_markup.replace(/{width}/g,correctSizes['width']).replace(/{height}/g,correctSizes['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+'?'+flash_vars);break;case'iframe':correctSizes=_fitToViewport(movie_width,movie_height);frame_url=images[setPosition];frame_url=frame_url.substr(0,frame_url.indexOf('iframe')-1);toInject=settings.iframe_markup.replace(/{width}/g,correctSizes['width']).replace(/{height}/g,correctSizes['height']).replace(/{path}/g,frame_url);break;case'inline':myClone=$(images[setPosition]).clone().css({'width':settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline clearfix"></div></div>').appendTo($('body'));correctSizes=_fitToViewport($(myClone).width(),$(myClone).height());$(myClone).remove();toInject=settings.inline_markup.replace(/{content}/g,$(images[setPosition]).html());break;};if(!imgPreloader){$pp_pic_holder.find('#pp_full_res')[0].innerHTML=toInject;_showContent();};});};$.prettyPhoto.changePage=function(direction){if(direction=='previous'){setPosition--;if(setPosition<0){setPosition=0;return;};}else{if($('.pp_arrow_next').is('.disabled'))return;setPosition++;};if(!doresize)doresize=true;_hideContent(function(){$.prettyPhoto.open(images,titles,descriptions)});$('a.pp_expand,a.pp_contract').fadeOut(settings.animationSpeed);};$.prettyPhoto.close=function(){$pp_pic_holder.find('object,embed').css('visibility','hidden');$('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animationSpeed);$pp_overlay.fadeOut(settings.animationSpeed,function(){$('#pp_full_res').html('');$pp_pic_holder.attr('style','').find('div:not(.pp_hoverContainer)').attr('style','');_centerOverlay();if($.browser.msie&&$.browser.version==6){$('select').css('visibility','visible');};if(settings.hideflash)$('object,embed').css('visibility','visible');setPosition=0;settings.callback();});doresize=true;};_showContent=function(){$('.pp_loaderIcon').hide();projectedTop=scrollPos['scrollTop']+((windowHeight/2)-(correctSizes['containerHeight']/2));if(projectedTop<0)projectedTop=0+$ppt.height();$pp_pic_holder.find('.pp_content').animate({'height':correctSizes['contentHeight']},settings.animationSpeed);$pp_pic_holder.animate({'top':projectedTop,'left':(windowWidth/2)-(correctSizes['containerWidth']/2),'width':correctSizes['containerWidth']},settings.animationSpeed,function(){$pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(correctSizes['height']).width(correctSizes['width']);$pp_pic_holder.find('.pp_fade').fadeIn(settings.animationSpeed);if(image_set&&_getFileType(images[setPosition])=="image"){$pp_pic_holder.find('.pp_hoverContainer').show();}else{$pp_pic_holder.find('.pp_hoverContainer').hide();}
        if(settings.showTitle&&hasTitle){$ppt.css({'top':$pp_pic_holder.offset().top-25,'left':$pp_pic_holder.offset().left+20,'display':'none'});$ppt.fadeIn(settings.animationSpeed);};if(correctSizes['resized'])$('a.pp_expand,a.pp_contract').fadeIn(settings.animationSpeed);settings.changepicturecallback();});};function _hideContent(callback){$pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility','hidden');$pp_pic_holder.find('.pp_fade').fadeOut(settings.animationSpeed,function(){$('.pp_loaderIcon').show();if(callback)callback();});$ppt.fadeOut(settings.animationSpeed);}
    function _checkPosition(setCount){if(setPosition==setCount-1){$pp_pic_holder.find('a.pp_next').css('visibility','hidden');$pp_pic_holder.find('a.pp_arrow_next').addClass('disabled').unbind('click');}else{$pp_pic_holder.find('a.pp_next').css('visibility','visible');$pp_pic_holder.find('a.pp_arrow_next.disabled').removeClass('disabled').bind('click',function(){$.prettyPhoto.changePage('next');return false;});};if(setPosition==0){$pp_pic_holder.find('a.pp_previous').css('visibility','hidden');$pp_pic_holder.find('a.pp_arrow_previous').addClass('disabled').unbind('click');}else{$pp_pic_holder.find('a.pp_previous').css('visibility','visible');$pp_pic_holder.find('a.pp_arrow_previous.disabled').removeClass('disabled').bind('click',function(){$.prettyPhoto.changePage('previous');return false;});};if(setCount>1){$('.pp_nav').show();}else{$('.pp_nav').hide();}};function _fitToViewport(width,height){hasBeenResized=false;_getDimensions(width,height);imageWidth=width;imageHeight=height;if(((pp_containerWidth>windowWidth)||(pp_containerHeight>windowHeight))&&doresize&&settings.allowresize&&!percentBased){hasBeenResized=true;notFitting=true;while(notFitting){if((pp_containerWidth>windowWidth)){imageWidth=(windowWidth-200);imageHeight=(height/width)*imageWidth;}else if((pp_containerHeight>windowHeight)){imageHeight=(windowHeight-200);imageWidth=(width/height)*imageHeight;}else{notFitting=false;};pp_containerHeight=imageHeight;pp_containerWidth=imageWidth;};_getDimensions(imageWidth,imageHeight);};return{width:Math.floor(imageWidth),height:Math.floor(imageHeight),containerHeight:Math.floor(pp_containerHeight),containerWidth:Math.floor(pp_containerWidth)+40,contentHeight:Math.floor(pp_contentHeight),contentWidth:Math.floor(pp_contentWidth),resized:hasBeenResized};};function _getDimensions(width,height){width=parseFloat(width);height=parseFloat(height);$pp_details=$pp_pic_holder.find('.pp_details');$pp_details.width(width);detailsHeight=parseFloat($pp_details.css('marginTop'))+parseFloat($pp_details.css('marginBottom'));$pp_details=$pp_details.clone().appendTo($('body')).css({'position':'absolute','top':-10000});detailsHeight+=$pp_details.height();detailsHeight=(detailsHeight<=34)?36:detailsHeight;if($.browser.msie&&$.browser.version==7)detailsHeight+=8;$pp_details.remove();pp_contentHeight=height+detailsHeight;pp_contentWidth=width;pp_containerHeight=pp_contentHeight+$ppt.height()+$pp_pic_holder.find('.pp_top').height()+$pp_pic_holder.find('.pp_bottom').height();pp_containerWidth=width;}
    function _getFileType(itemSrc){if(itemSrc.match(/youtube\.com\/watch/i)){return'youtube';}else if(itemSrc.match(/vimeo\.com/i)){return'vimeo';}else if(itemSrc.indexOf('.mov')!=-1){return'quicktime';}else if(itemSrc.indexOf('.swf')!=-1){return'flash';}else if(itemSrc.indexOf('iframe')!=-1){return'iframe'}else if(itemSrc.substr(0,1)=='#'){return'inline';}else{return'image';};};function _centerOverlay(){if(doresize){titleHeight=$ppt.height();contentHeight=$pp_pic_holder.height();contentwidth=$pp_pic_holder.width();projectedTop=(windowHeight/2)+scrollPos['scrollTop']-((contentHeight+titleHeight)/2);$pp_pic_holder.css({'top':projectedTop,'left':(windowWidth/2)+scrollPos['scrollLeft']-(contentwidth/2)});$ppt.css({'top':projectedTop-titleHeight,'left':(windowWidth/2)+scrollPos['scrollLeft']-(contentwidth/2)+20});};};function _getScroll(){if(self.pageYOffset){return{scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset};}else if(document.documentElement&&document.documentElement.scrollTop){return{scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft};}else if(document.body){return{scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft};};};function _resizeOverlay(){windowHeight=$(window).height();windowWidth=$(window).width();$pp_overlay.css({'height':$(document).height()});};function _buildOverlay(){$('body').append(settings.markup);$pp_pic_holder=$('.pp_pic_holder');$ppt=$('.ppt');$pp_overlay=$('div.pp_overlay');$pp_pic_holder.attr('class','pp_pic_holder '+settings.theme);$pp_overlay.css({'opacity':0,'height':$(document).height()}).bind('click',function(){if(!settings.modal)
        $.prettyPhoto.close();});$('a.pp_close').bind('click',function(){$.prettyPhoto.close();return false;});$('a.pp_expand').bind('click',function(){$this=$(this);if($this.hasClass('pp_expand')){$this.removeClass('pp_expand').addClass('pp_contract');doresize=false;}else{$this.removeClass('pp_contract').addClass('pp_expand');doresize=true;};_hideContent(function(){$.prettyPhoto.open(images,titles,descriptions)});$pp_pic_holder.find('.pp_fade').fadeOut(settings.animationSpeed);return false;});$pp_pic_holder.find('.pp_previous, .pp_arrow_previous').bind('click',function(){$.prettyPhoto.changePage('previous');return false;});$pp_pic_holder.find('.pp_next, .pp_arrow_next').bind('click',function(){$.prettyPhoto.changePage('next');return false;});};_centerOverlay();};function grab_param(name,url){name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(url);if(results==null)
    return"";else
    return results[1];}})(jQuery);




/***************************************************
 ADDITIONAL CODE FOR PRETTYPHOTO
 ***************************************************/
$(document).ready(function(){
    $("a[rel='prettyPhoto[portfolio]']").prettyPhoto();
});





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
