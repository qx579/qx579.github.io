(function(window){
    function progress($ingbuttom,$ingline,$ingpoint){
        return new progress.prototype.init($ingbuttom,$ingline,$ingpoint);
    }
    progress.prototype={
        constructor:progress,
        init: function($ingbuttom,$ingline,$ingpoint){
            this.$ingbuttom=$ingbuttom;
            this.$ingpoint=$ingpoint;
            this.$ingline=$ingline;
        },
        ismove:true,
        progressclick:function(callback){      
            //监听背景点击
            var $this=this;
            this.$ingbuttom.click(
                function(eve){
                    var buttomleft=$(this).offset().left;
                    var nowleft=eve.pageX;
                    var truleft=nowleft-buttomleft;
                    $this.$ingpoint.css('left', truleft);
                    $this.$ingline.css('width', truleft);
                    var value=truleft/$(this).width();
                    callback(value); 
                    
                }
            )
        },
        progressmove:function(callback){
            //鼠标按下
            var buttomleft=this.$ingbuttom.offset().left;//背景左距
            var nowleft;
           var  $this=this;
           var buttomwidth=this.$ingbuttom.width();
           this.$ingbuttom.mousedown(function(){
            $this.ismove=false;
           
               $(document).mousemove(function(eve)
               {
                    nowleft=eve.pageX;//now左距
                    var truleft=nowleft-buttomleft;
                    if(truleft>=0&&truleft<=buttomwidth){
                    $this.$ingpoint.css('left', truleft);
                    $this.$ingline.css('width', truleft);
                    
                 }
               })
           
               
           })
           if(this.finish=true){ alert(0)
           $(document).mouseup(function (eve){  
            $(document).off('mousemove');
            $this.ismove=true;
            var value=(nowleft-buttomleft)/$this.$ingbuttom.width();        
            callback(value);
            
           
           })
        }
        },
       
 }
 progress.prototype.init.prototype=progress.prototype;
    window.progress=progress;
})(window )
   