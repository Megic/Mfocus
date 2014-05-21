//通用轮换插件v0.01  by：Megic  Released under the MIT License. 
(function($){
  $.fn.Mfocus=function(options){
  var defaults = {      
         button: '.button',    //按钮父标签  
       pre: '.pre', //向前
       next: '.next',//向后
       unlimited: false,//是否不限制前后按钮父节点范围
       item: 'ul',//展示项父标签
       effect:'slide',//转换方式:slide/slideup/fade 三种切换形式
       scroll:'true',//是否自动滚动
       seamless:false,//是否无缝滚动
       sctime:'4000',//滚动间隔
       moveef:'swing',//动画效果
       speed:'500'  //动画时间
       };  
  var opts = $.extend(defaults, options);  
  var obj = $(this); 
  var obit=$(opts.item,obj);
  var len =obit.children().length;
  var fchild=obit.children().first();
  var sWidth =fchild.width();
  var sHeight =fchild.height();
  var button=$(opts.button,obj).children();
  var index=0;
  var picTimer;
  var ys=0;
  var preBtn=opts.unlimited?$(opts.pre):$(opts.pre,obj);
  var nextBtn=opts.unlimited?$(opts.next):$(opts.next,obj);
if(opts.effect=='slide'){
      var uwidth=opts.seamless?sWidth * 2*(len):sWidth * (len);
      obit.css("width",uwidth);
      if(opts.seamless){obit.append(obit.children().clone())}
      }
    if(opts.effect=='slideup'){
    obit.css({"height":sHeight * (len),"top":-sHeight * (len-1)});
    for(i=1;i<len;i++){
      obit.children().first().insertAfter(obit.children().eq(len-i));
    }}
  if(button.length>0){
    button.mouseenter(function() {
    index = button.index(this);
    showPics(index);
    index++;
    if(index == len) {index = 0;}
  }).eq(0).trigger("mouseenter");
}else{showPics(index);}
  //上一页按钮
  preBtn.click(function() {
    index -= 1;
    if(index == -1) {index = len - 1;}
    showPics(index);
    return false;
  });
  //下一页按钮
  nextBtn.click(function() {
    index += 1;
    if(index==len&&opts.seamless){showPics(index);index=0;}else{
    if(index >= len) {index = 0;}
    showPics(index);
    }
    return false;
  });
  
  //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
  if(opts.scroll=='true'){
  obj.hover(function() {
    clearInterval(picTimer);
  },function() {
      picTimer = setInterval(function() {
        if(index==len&&opts.seamless){showPics(index);index=0;}else{
      if(index >= len) {index = 0;}
      showPics(index);
      index++;
    }
    },opts.sctime); //此4000代表自动播放的间隔，单位：毫秒
  }).trigger("mouseleave");
  }
  function showPics(index) { //普通切换
    if(button.length>0){
          button.removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
      }
    if(opts.effect=='slide'){
    var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
    obit.stop(true,false).animate({"left":nowLeft},opts.speed*1.0,opts.moveef,function(){if(index==len&&opts.seamless){obit.css("left",0);}}); //通过animate()调整ul元素滚动到计算出的position
    return;
    }
    if(opts.effect=='slideup'){
    var nowtop = -(len-1-index)*sHeight; //根据index值计算ul元素的top值
    obit.stop(true,false).animate({"top":nowtop},opts.speed*1.0,opts.moveef); //通过animate()调整ul元素滚动到计算出的position
    return;
    }
    var m_eq=obit.children().hide().stop(true,true).eq(index);
    if(opts.effect=='fade'){
      m_eq.fadeIn(opts.speed*1.0);
    }else{
      m_eq.show();
     }
    }//为当前的按钮切换到选中的效果
}
})(jQuery); 

jQuery.extend( jQuery.easing,
{ 
easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  },
easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
});