var a;//设定一个当前节点对象
//当鼠标松开之后，释放捕获
document.onmouseup=function(){
    if(!a)return;
    //判断是否是IE浏览器，来转换释放捕获的函数
    if(document.all) 
    a.releaseCapture();
    else
    window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
    a="";
};
//移动鼠标时改变图片位置
document.onmousemove=function (d){ 
    if(!a) return;
    if(!d) d=event;   //把鼠标的事件赋给d
    //用鼠标当前位置的x，y值减去鼠标在最开始点击图片的时候离图片边框的位置，确定图片拖动后的的位置
    a.style.left=(d.clientX-b)+"px";
    a.style.top=(d.clientY-c)+"px";
};
//移动图片函数
function move(o,e){//o表示当前的图片节点对象
    a=o;
    //根据判断是否为IE浏览器来转换建立捕获函数
    if(document.all)    
    a.setCapture();
    else
    window.captureEvents(Event.MOUSEMOVE);
    //计算出当前鼠标离图片的边框的位置（x方向和y方向），分别保存到b和c中
    b=e.clientX-parseInt(a.style.left);
    c=e.clientY-parseInt(a.style.top);
    o.style.zIndex=getMaxIndex()+1;//把当前拖拽的图片对象在z轴上设置成最上层
}
//习惯性用jQuery语法，写个通过id取文档节点的函数
function $(id){
	return document.getElementById(id);
}
//获取当前最上层的元素的层
function getMaxIndex(){
    var index=0;//设置一个变量用来保存最上层的值
    var ds=$('main').getElementsByTagName('div');
    var l=$('main').getElementsByTagName('div').length;
    for (i=0;i<l;i++)
    {
        if (ds[i].style.zIndex>index) 
        index=ds[i].style.zIndex;//把最外层的值赋给index
    }
    return index;
}
//实现图片放的的功能
var zooming=function(e){  
    e=window.event ||e;  
    //火狐向上转动一次滑轮是-3，其他的浏览器都是120，向下同理，因此对火狐的值进行一个转换
    var data=e.wheelDelta || -e.detail*40;
     var o=this,zoom,size;
    //对IE进行图片尺寸的调整
    if(document.all){//根据IE和其他浏览器对'document.all'的理解不同，判断出是IE浏览器  
    //设定初始的缩分比例（按百分比），如果img的style没有zoom属性，就赋给它图片原始的100%
        zoom = parseInt(o.style.zoom) || 100;  
        //把鼠标滚轮的滚动值,除以12换算成百分比
        zoom += data / 12;  
        if(zoom > 0)   
        //把计算后的放缩值赋给img的zoom属性
            o.style.zoom = zoom + '%';  
        e.returnValue=false;  
    }
    //非IE进行图片尺寸的调整
    else {
        size=o.getAttribute("zoomsize").split(",");  //取得zoomsize的值，分割为数组给size
        zoom=parseInt(o.getAttribute("ZOOM")) ||100;  //设定初始的缩分比例（按百分比），如果img没有ZOOM属性，就赋给它图片原始的100%
        zoom+=data/12;  //转换放缩比例，同上
        if(zoom>0){  
            o.setAttribute("ZOOM",zoom);  //创建ZOOM属性把zoom的值赋给它
            //根据鼠标滚轮转化后的放缩倍数乘以当前图片的大小转换后赋给图片的宽度和高度
            o.style.width=size[0]*zoom/100+"px";  
            o.style.height=size[1]*zoom/100+"px" 
        }  
    }  
};  
//放缩图片的函数
zooming.add=function(obj){
    obj.onmousewheel=zooming;  //为图片对象创建放缩方法
    if(/Firefox/.test(navigator.userAgent))// 如果是Firefox，因为Firefox监听的是DOMMouseScroll事件
        obj.addEventListener("DOMMouseScroll",zooming,false);  //添加对Firefox的监听事件
    if(!document.all){//if not IE  
        obj.setAttribute("zoomsize",obj.offsetWidth+","+obj.offsetHeight);  //把图片本身的尺寸赋给创建的zoomsize
    }  
};  
 //在窗口加载的时候执行放缩函数
window.onload=function(){
    zooming.add(document.getElementsByTagName("img")[0]);  
    zooming.add(document.getElementsByTagName("img")[1]);
    zooming.add(document.getElementsByTagName("img")[2]);
    zooming.add(document.getElementsByTagName("img")[3]);
    zooming.add(document.getElementsByTagName("img")[4]);
}
