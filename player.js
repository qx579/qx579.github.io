(function(window){
    function player($audio){
        return new player.prototype.init($audio);

    }
    player.prototype={
        constructor:player,
        init: function($audio){
            this.$audio=$audio;
            this.audio=$audio.get(0)

        },
        musiclist:[],
        current:-1,
        //播放
        playmusic:function(index,music){
            if(this.current==index
                ){
                if(this.audio.paused){
                    this.audio.play();
                }
                else{
                    this.audio.pause();
                }
            }
            else{
                    this.$audio.attr('src',music.link_url);
                    this.audio.play();
                    this.current=index;
                }
        },
        //删除
        deletemusic:function(index){
            this.musiclist.splice(index,1);
            if(index<this.current){
                this.current=this.current-1;
               
            }
        },
       //时间进度条
        musictime:function(Ismove){
            var $this=this;
           this.$audio.on('timeupdate',function(Ismove){
                var all=$this.audio.duration;
                var now=$this.audio.currentTime;
                var change=$this.Change(now,all);
                $('.ing-time').text(change);
                var value=now/all*100;
                if(Ismove=false){
                    return;}
               
               
                $('.ing-line').css('width',value+"%")
                $('.ing-point').css('left',value+"%")
                
            })
        },
        Change:function(now,all){
            var allmin=parseInt(all/60);
            var allsec=parseInt(all%60);
            var nowmin=parseInt(now/60);
            var nowsec=parseInt(now%60);
            if(allmin<10){
                allmin="0"+allmin;
            }
            if(allsec<10){
                allsec="0"+allsec;
            }
            if(nowmin<10){
                nowmin="0"+nowmin;
            }
            if(nowsec<10){
                nowsec="0"+nowsec;
            }
            return nowmin+":"+nowsec+"/"+allmin+":"+allsec;
        },
        musicseek:function(value){
            if(isNaN(value)) return;
            this.audio.currentTime=this.audio.duration*value;
        },
        //s声音
        viocechange:function(value){
            if(isNaN(value)) return;
            if(value>=0&&value<=1){
            this.audio.volume=value;}
           
        }
     
    
 }
    player.prototype.init.prototype=player.prototype;
    window.player=player;
})(window )
   