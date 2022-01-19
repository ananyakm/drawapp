$(function(){
   
    var paint=false;
    var paint_erase="paint";
    var trialsleft=3;
    $("#trialno").html(trialsleft);

    var topics=['apple','tree','woman','helicopter','banana','car','pencil',
    'cap','house','book','strawberry','computer','chair','charger','snake',
    'dog','cat','pond','sea','boat','chappal','table','furniture','bag',
    'envelope','postcard','umbrella','milk','tomato','keys','birds'];
    var random=Math.round(31*Math.random());
    console.log(random,topics[random]);
    var theword=topics[random];
    $("#yourword").html(topics[random]);
    $("#yourword").delay(5000).fadeOut("slow");
   /*  addHearts();
    function addHearts(){
        $("#trialsleft").empty();
        for(i=0;i<trialsleft;i++){
            $("#trialsleft").append('<img src="images/heart.png" class="life">');
        }
    } */

    $("#submitbtn").click(function(){
        if($("#guessword").val()==theword && trialsleft>1){
            $(".resultmsg").html("Your Guess is correct");
            $("#trialno").html(trialsleft);

        }
        else{
            $(".resultmsg").html("Your Guess is wrong");
            trialsleft--;
            $("#trialno").html(trialsleft);
           /*  trialsleft--;
            $("#trialsleft").hide();
            addHearts(); */
        }
    })
    var canvas=document.getElementById("paint");
    var context=canvas.getContext('2d');
    var container=$("#container");
    var mouse={x:0,y:0};
   if(localStorage.getItem("imgCanvas")!=null){
       var img=new Image();
       img.onload=function(){
           context.drawImage(img,0,0);
       }
       img.src=localStorage.getItem("imgCanvas");
   };
    context.lineWidth=3;
    context.lineCap='round';


    container.mousedown(function(e){
        paint=true;
        context.beginPath();
        mouse.x=e.pageX - this.offsetLeft;
        mouse.y=e.pageY - this.offsetTop;

        context.moveTo(mouse.x,mouse.y);

    })
    
    container.mousemove(function(e){
       
        mouse.x=e.pageX - this.offsetLeft;
        mouse.y=e.pageY - this.offsetTop;
        if(paint==true){
           if(paint_erase=="paint"){
            context.strokeStyle=$("#paintcolor").val();

           } else{
            context.strokeStyle='white';

           
        }
        context.lineTo(mouse.x,mouse.y);
        context.stroke();
        }


    });


    container.mouseup(function(){
        paint=false;

    });
    container.mouseleave(function(){
        paint=false;

    });

    $("#reset").click(function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        paint_erase="paint";
        $("#erase").removeClass("erasemode");
       
    });
    
    $("#save").click(function(){
        if(typeof(localStorage)!=null){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
            window.alert(localStorage.getItem("imgCanvas"));
           
        }
        else{
            window.alert("Your browser doesn't spport localStorage");
        }
    });


    $("#erase").click(function(){
        if(paint_erase=="paint"){
            paint_erase="erase";
        }
        else{
            paint_erase='paint';
        }
        $(this).toggleClass("erasemode")
    });
    $("#paintcolor").change(function(){
      $("#circle").css("background-color",$(this).val()); 
    });
    
    $("#slider").slider({
        min:3,
        max:30,slide:function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth=ui.value;
        }
    });
    /*context.beginPath();
    context.lineWidth=40;
    context.strokeStyle='#42E565';
    context.lineCap='round';
    context.lineJoin='round';
    context.moveTo(50,50);
    context.lineTo(200,200);
    context.lineTo(400,100);
    context.stroke();*/
});