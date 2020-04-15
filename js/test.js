(function(){
    var hintText={user_email:{right:"√邮箱格式正确",wrong:"×邮箱格式有误，请重新输入"},
        user_name:{right:"√用户名格式正确",wrong:"×请输入3-16个字符的用户名（包括汉字/字母/数字/下划线）"},
        phone:{right:"√电话号码输入正确",wrong:"×电话号码输入有误，请重新输入"},
        password:{right:"√密码格式正确",wrong:"×请输入6位以上符合格式的密码"},
        repassword:{right:"√再次输入密码正确",wrong:"×两次输入不一致或密码格式不正确，请重新输入或密码格式不正确"}};
    var regEvent=function(node, event, func){
        if (!node.addEventListener) {
            if (node.attachEvent)
                node.attachEvent("on" + event, func);
            else
                node["on" + event] = func;
        } else {
            node.addEventListener(event, func);
        }
    };
    function regValue(id,i){
        var flag=false,
            input=document.getElementById(id),
            value=input.value;
        switch (id){
            case "user_name":
                flag=/^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5]{3,16}$/.test(value);
                id="user_name";
                break;
            case "password":
                flag=/^\S{6,16}$/.test(value);
                id="password";
                break;
            case "repassword":
                flag=document.getElementById("password").value==value && value !="" && value !=null && (/^\S{6,16}$/.test(value));
                break;
            case "user_email":
                flag=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
                id="user_email";
                break;
            case "phone":
                flag=/^1[3578]\d{9}$/.test(value);
                id="phone";
                break;
            default:
                break;
        }
        if(flag) {
            index=0;
            input.className="right input";
            hint[i].className="hint hint_right";
            hint[i].innerHTML=hintText[id].right;
        }else{
            input.className="wrong input";
            hint[i].className="hint hint_wrong";
            hint[i].innerHTML=hintText[id].wrong;
            index=1;
        }
    };
    var inputs=document.getElementsByClassName("input"),
        id,
        hint=document.getElementsByClassName("hint"),
        index=0;
    for(var j=0;j<inputs.length;j++){
        (function(i){
            regEvent(inputs[i],"focus",function(){
                hint[i].style.visibility="visible";
                id=inputs[i].id;
            });
            regEvent(inputs[i],"blur",function(){
                regValue(id,i);
            });
        })(j)
    }
    regEvent(document.getElementById("submit"),"click",function(e){
        if(index!==0){
            alert(index)
            e.preventDefault();
            alert("您的输入有误，请检查并重新输入！");
            return false;
        }
    });
    regEvent(document.getElementById("button"),"click",function(e){
        if(index!==0){
            e.preventDefault();
            alert("您的输入有误，请检查并重新输入！");
            return false;
        }
    });
})();