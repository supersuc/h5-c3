window.onload = function(){
    // 搜索框
    var searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("focus",showKeyword,false);
    searchInput.addEventListener("blur",hideKeyword,false);
    searchInput.addEventListener("keyup",pressKeyword,false);



    function showKeyword(){
        if(searchInput.value !== ''){
            document.getElementById("suggest").style.display = "block";
        }
    }

    // 动态获取数据
    getData();
    function getData(){
        $.ajax("get","data.json",function(res){
            if(res.code == 0){
                var data = res.data;
                console.log(data);
            }
        },true)
    }


    function hideKeyword(){
        document.getElementById("suggest").style.display = "none";
    }

    function pressKeyword(){
        if(searchInput.value !== ""){
            document.getElementById("suggest").style.display = "block";
        }
    }

    // 轮播操作
    bannerWrap();
    function bannerWrap() {
        var swiper = document.getElementById("swiper"); //获取轮播图包裹层元素
        var swiperItem = swiper.getElementsByClassName("swiper-item"); //获取轮播图列表
        var prev = document.getElementsByClassName("prev")[0]; //获取上一张按钮
        var next = document.getElementsByClassName("next")[0]; //获取下一张按钮
        var indicators = document.getElementsByClassName("indicator"); //获取圆点列表
        var index = 0; //当前轮播图索引，默认第一章
        var timer = null; //定时器
    
        //设置轮播图的透明度和位移
        for (var i = 0; i < swiperItem.length; i++) {
          if (index === i) {
            swiperItem[i].style.opacity = 1;
          } else {
            swiperItem[i].style.opacity = 0;
          }
          swiperItem[i].style.transform = "translateX(" + (-i * swiperItem[0].offsetWidth) + "px)";
        }
    
        //给圆点添加点击事件
        for (var k = 0; k < indicators.length; k++) {
          indicators[k].onclick = function () {
            clearInterval(timer);
            var clickIndex = parseInt(this.getAttribute("data-index"));
            index = clickIndex;
            changeImg();
          }
        }
    
        prev.onclick = function () {
          clearInterval(timer);
          index--;
          changeImg();
        }
    
        next.onclick = function () {
          clearInterval(timer);
          index++;
          changeImg();
        }
        //鼠标经过停止播放
        swiper.addEventListener("mouseover", function () {
          clearInterval(timer);
        }, false);
        //鼠标移出后自动播放
        swiper.addEventListener("mouseout", function () {
          autoChange();
        }, false)
    
        //更换图片
        function changeImg() {
          if (index < 0) {
            index = swiperItem.length - 1;
          } else if (index > swiperItem.length - 1) {
            index = 0;
          }
          for (var j = 0; j < swiperItem.length; j++) {
            swiperItem[j].style.opacity = 0;
          }
          swiperItem[index].style.opacity = 1;
          setIndicatorOn();
        }
    
        //设置圆点激活状态
        function setIndicatorOn() {
          for (var i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove("on");
          }
          indicators[index].classList.add("on");
        }
    
        autoChange();
        //自动播放
        function autoChange() {
          timer = setInterval(function () {
            index++;
            changeImg();
          }, 3000);
        }
    
      }
      document.getElementById("loadMore").onclick = function () {
        var liNode = document.createElement("li");
        liNode.setAttribute("class", "like-item item");
        var liContent = `<a href="">
          <img src="img/good.jpg" alt="" class="item-img">
        </a>
        <p class="title">分布式无线路由器</p>
        <div class="line-3">
          <span class="strong">1100</span>
          <span class="sell">月销3000笔</span>
        </div>
        <a href="" class="item-more">发现更多相似的宝贝</a>`;
        liNode.innerHTML= liContent;
        document.getElementById("gl").appendChild(liNode);
      }

    //   倒计时
    var ms_time = 7200;
    var ms_timer = setInterval(function(){
        if(ms_time<0){
            clearInterval(ms_timer);
        }else{
            calTime(ms_time);
            ms_time--;
        }
    },1000);

    function calTime(time){
        var hours = Math.floor(time/60/60);
        var minutes = Math.floor(time/60%60);
        var seconds = Math.floor(time%60);

        hours = formatTime(hours);
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);

        document.getElementsByClassName("cd_hour")[0].innerHTML = hours;
        document.getElementsByClassName("cd_minute")[0].innerHTML = minutes;
        document.getElementsByClassName("cd_second")[0].innerHTML = seconds;
    }

    function formatTime(t){
        if(t<10){
            t="0"+t;
        }
        return t;
    }
}

// 滚动事件
window.onscroll = function(){
    scrollShowBtn();
    var winPos = document.documentElement.scrollTop || document.body.scrollTop;//获取滚动的距离
    var hotSale = document.getElementById("hotsale");//获取热卖专区元素
    var hotHeight = hotSale.offsetTop + hotSale.offsetHeight;//猜你喜欢之前的总高度
  
    if(winPos < hotSale.offsetTop){
      addOn(0);
    }else if(winPos >= hotSale.offsetTop && winPos < hotHeight){
      addOn(1)
    }else{
      addOn(2);
    }
  }
  
  //添加菜单激活状态
  function addOn(index){
    var tool = document.getElementsByClassName("tools")[0];
    var toolItem = tool.getElementsByTagName("a");
    for(var i =0;i < toolItem.length;i++){
      toolItem[i].classList.remove("on");
    }
    toolItem[index].classList.add("on");
  }
  
  //滚动一定距离显示返回顶部按钮
  function scrollShowBtn(){
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    if(top > 300) {
      document.getElementById("topnav").style.display = "block";
    }else{
      document.getElementById("topnav").style.display = "none";
    }
  }
  
  //返回顶部
  function goTop(){
    var topTimer = setInterval(function(){
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var iSpeed = Math.floor(-scrollTop/8);
      if(scrollTop == 0){
        clearInterval(topTimer);
      }
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
    },30)
    
  }
