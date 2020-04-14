$(function(){
    var $audio=$('audio');
    var Player=new player($audio);
    var $ingbuttom=$('.ing-buttom');
    var $ingline=$('.ing-line');
    var $ingpoint=$('.ing-point') ;
    var Progress=new progress($ingbuttom,$ingline,$ingpoint);
    var Ismove=Progress.ismove;
    Progress.progressclick(function(value){
        Player.musicseek(value);
    }); 
    Progress.progressmove(function(value){
        Player.musicseek(value);
    });
    var $buttom=$('.vioce-buttom');
    var $line=$('.vioce-line');
    var $point=$('.vioce-point');
    var vioce=new progress($buttom,$line,$point);
    vioce.progressclick(function(value){
        Player.viocechange(value);
    }); 
    vioce.progressmove(function(value){
        Player.viocechange(value);
    });

    


   //滚动条
    $(".conter-in-buttom").mCustomScrollbar();
    //移入移出
    $('.mu').delegate('.music-list','mouseenter',
    function(){
        $(this).find('.list-menu').stop().show();
        $(this).find('.time>img').stop().show();
        $(this).find('.time>span').stop().hide();
        
    });
    $('.mu').delegate('.music-list','mouseleave',
    function(){
        $(this).find('.list-menu').stop().hide();
        $(this).find('.time>img').stop().hide();
        $(this).find('.time>span').stop().show();
      
    })
    //选择><未选
    $('.mu').delegate('.ico','click',
    function(){
        $(this).toggleClass('icon')
    })
    //音乐播放 上
    $('.mu').delegate('.bofang','click',
    function(){
        
        $('.zanting').hide()
        $('.bofang').show()
        $(this).hide()
        $(this).next().show()
       
        $('.repalce').hide();
        $('.repalces').show();
        var $item=$(this).parents('.music-list')
        Player.playmusic($item.get(0).index,$item.get(0).music);
        initmusic($item.get(0).music);
       
    //音乐暂停  上
    })
    $('.mu').delegate('.zanting','click',
    function(){
        $(this).hide()
        $(this).prev().show()
        $('.repalces').hide();
        $('.repalce').show();
        var $item=$(this).parents('.music-list')
        Player.playmusic($item.get(0).index,$item.get(0).music);
    })

    $('.music-list-top .ico').click(
        function(){
            $('.ico').toggleClass('icon')
            $(this).toggleClass('icon')
        }
    )
    //音乐播放 下部
    $('.repalce').click(
        function(){
            $(this).hide();
            $('.repalces').show()
            //判断是否播放过音乐
            if(Player.current==-1){
                $('.music-list').eq(0
                    ).find('.bofang').trigger('click');
                
            }
            else{
                $('.music-list').eq(Player.current).find('.bofang').trigger('click');

            }
        }
    )
    //音乐暂停 下部分
    $('.repalces').click(
        function(){
            $(this).hide();
            $('.repalce').show()
            $('.music-list').eq(Player.current).find('.zanting').trigger('click');
        }
    )
    //上一首
    $('.last').click(
        function(){
            $('.music-list').eq(Player.current-1).find('.bofang').trigger('click');

        })
    //下一首
    $('.next').click(
        function(){
            $('.music-list').eq(Player.current+1).find('.bofang').trigger('click');

        })
    //播放进度
    
    Player.musictime(Ismove);
    //删除音乐
    $('.mu').delegate('.delete','click',
        function(){
            var $item=$(this).parents('.music-list');
            if($item.get(0).index==Player.current){
                $('.next').trigger('click');
            }
            $item.remove();
            Player.deletemusic($item.get(0).index);
            
            $('.music-list').each(function(index,ele){
                ele.index=index;
               $(ele).find('.number').text(index+1)
                

            })

        }
    )
    //加载歌曲列表
 
    $.ajax({
        url:"./music/music.json",
        type: "GET",
        dataType:"json",
        success:function(data){
            //遍历数据
            Player.musiclist=data;
            $.each(data,function(index,ele){
                var $item=creatmusic(index,ele);
                var $musiclist=$(".conter-in-buttom .mu").append($item)
            });

            initmusic(data[0]);
           
        },
        error:function(e){
            console.log(e);
        }
    })
    //初始化歌曲信息
    function initmusic(music){
        $('.songname').text(music.name);
        $('.singername').text(music.singer);
        $('.song-photo>img').attr('src',music.cover);
        $('.ing-message').text(music.name+"-"+music.singer);
        $('.ing-time').text("00:00"+"/"+music.time);
        $('.bg').css('background',"url('"+music.cover+"')")
        
      

    }
    $('.vioce-img').click(function(){
        $(this).hide();
        $('.vioce-imgno').show();
        Player.viocechange(0)
    })
    $('.vioce-imgno').click(function(){
        $(this).hide();
        $('.vioce-img').show();
        Player.viocechange(0.8)
    })

   
   function creatmusic(index,music){
    var $item=$(" <li  class=\"music-list\" >\n  "+
    "                          <div class=\"ico\"></div>\n      " +
    "                   <div class=\"song\"><span class=\"number\">"+(index+1)+"</span>"+music.name+"\n  "+
    "                              <div class=\"list-menu\">\n    "+
    "                                <img class=\"bofang\" src=\"./img/bofang.png\" alt=\"\">\n     "+
    " <img class=\"zanting\" src=\"./img/zanting.png\" alt=\"\">\n     "+
    "                               <img src=\"./img/icon_add.png\" alt=\"\">\n     "+
    
    "                               <img src=\"./img/fenxiang.png\" alt=\"\">\n     "+
    "                       </div>\n      </div>\n  \n     <div class=\"singer\">"+music.singer+"</div>\n "+
    "          <div class=\"time\">\n    <span>"+music.time+"</span>\n   "+
    "   <img class=\"delete\" src=\"./img/changyonggoupiaorenshanchu.png\" alt=\"\">\n      </div>\n      </li>")
    $item.get(0).index=index;
    $item.get(0).music=music;
    return $item;
    
   }
   
       
   
})