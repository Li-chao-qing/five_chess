window.onload=function(){


var wuscene=document.getElementById('wu-scene');
var ROW=15;//行列

var bian=Math.floor((600-ROW)/ROW);//块的宽度

var hengxian,shuxian;

var zhe=document.createElement('div');
    wuscene.appendChild(zhe);
    zhe.setAttribute('class','zhe');
    zhe.innerHTML='game over!'

var re=document.createElement('div');
    re.setAttribute('class','re');
    re.innerHTML='replay';

var win=document.createElement('div');
    win.setAttribute('class','win');

    zhe.appendChild(win);
    zhe.appendChild(re);
//画线
for(var i=0;i<ROW;i++){
    hengxian=document.createElement('div');
    wuscene.appendChild(hengxian);
    hengxian.setAttribute('class','hengxian');
    hengxian.style.top=600/ROW/2+600/ROW*i+'px';
    shuxian=document.createElement('div');
    wuscene.appendChild(shuxian);
    shuxian.setAttribute('class','shuxian');
    shuxian.style.left=(600)/ROW/2+(600)/ROW*i+'px';
}
//画块
var kuai;
for(var i=0;i<ROW;i++){
    for(var j=0;j<ROW;j++){
        kuai=document.createElement('div');
        wuscene.appendChild(kuai);
        kuai.style.width=bian+'px';
        kuai.style.height=bian+'px';
        kuai.setAttribute('class','block1');
        kuai.setAttribute('id',i+'_'+j);
    }
}



var dict1={},dict2={};//两个字典分别放白棋和黑棋
//判断是否能赢
var pan=function(idd,dic){
    var x=Number(idd.split('_')[0]);
    var y=Number(idd.split('_')[1]);

    var tx,ty;
    var hang=1;
    tx=x;ty=y;
    while(dic[tx+'_'+(ty+1)]){hang++;ty++;}
    tx=x;ty=y;
    while(dic[tx+'_'+(ty-1)]){hang++;ty--;}

    var lie=1;
    tx=x;ty=y;
    while(dic[(tx-1)+'_'+ty]){lie++;tx--;}
    tx=x;ty=y;
    while(dic[(tx+1)+'_'+ty]){lie++;tx++;}

    var zx=1;
    tx=x;ty=y;
    while(dic[(tx-1)+'_'+(ty+1)]){zx++;tx--;ty++;}
    tx=x;ty=y;
    while(dic[(tx+1)+'_'+(ty-1)]){zx++;tx++;ty--;}

    var yx=1;
    tx=x;ty=y;
    while(dic[(tx-1)+'_'+(ty-1)]){yx++;tx--;ty--;}
    tx=x;ty=y;
    while(dic[(tx+1)+'_'+(ty+1)]){yx++;tx++;ty++;}

    if(hang==5||lie==5||zx==5||yx==5){
        return true;
    }
    return false;


};


var block1s=document.getElementsByClassName('block1');

var wustart=document.getElementById('wustart');
var wureplay=document.getElementById('wureplay');
wureplay.onclick=function(){
    location.reload();
}

var wukaiguan=true;//黑白棋交替出现
//点击放棋子
wustart.onclick=function(){

    for(var i=0;i<block1s.length;i++){
        block1s[i].onclick=function(){
            if(zhe.style.display=='block'){return;}//赢了就不可以在下棋了
            if(this.hasAttribute('hasColor')){return;}//这个位置有了棋子就不能再下棋在这个地方

            if(wukaiguan){
                this.style.background='url(./images/hei.png)';
                this.style.backgroundSize='cover';
                wukaiguan=false;
                dict1[this.getAttribute('id')]=true;
                if(pan(this.getAttribute('id'),dict1)){
                    zhe.style.display='block';
                    win.innerHTML='black is winner';
                    re.onclick=function(){
                        location.reload();
                   }; 
                }

            }else{
                this.style.background='url(./images/bai.png)';
                this.style.backgroundSize='cover';
                wukaiguan=true;
                dict2[this.getAttribute('id')]=true;
                console.log(dict2);
                if(pan(this.getAttribute('id'),dict2)){
                    zhe.style.display='block';
                    win.innerHTML='white is winner';
                    re.onclick=function(){
                        location.reload();
                    };
                }
            }
            this.setAttribute('hasColor',true);

        };
    }
}

};//最后