$(".right").css("width",document.documentElement.clientWidth-202 +"px");
var row = $(".layerBox").children().length;//层
var col = 0;//滑块
var bodyMargin = parseInt($("body").css("margin-left"));
var edgeWidth;
var id=function(o){return document.getElementById(o) || o;}

//添加图层
var addLayer = function (){
	row = $(".layerBox").children().length;
	row++;
	var layerHide = '<span class="layerHide"></span>';
	var layerName = '<div class="layerName"><img src="" alt=""><span>'+'图层0'+row+'</span></div>';
	$(".layerBox").append('<div data-id="1'+row+'" class="layer" id="layer'+row+'" onmousedown="clickLayer(this)">'+layerHide+layerName+'</div>');
	$(".sliderBox").append('<div data-id="2'+row+'" class="slider" id="slider'+row+'"  onmousedown="clickLayer(this)"></div>');
	$("#layer"+row).addClass("active").siblings().removeClass('active');
	$("#slider"+row).addClass("active").siblings().removeClass('active');
}
//选择图层
function clickLayer(obj){
	var layerDataId = obj.dataset.id.substr(1);
	row = layerDataId;
	$("#layer"+row).addClass("active").siblings().removeClass('active');
	$("#slider"+row).addClass("active").siblings().removeClass('active');
}
//添加滑块
var addBox = function (){
	col = $("#slider"+row).children().length;
	col++;
	var main = "<div data-id='"+row+"_"+col+"' id='main"+row+"_"+col+"'class='main' onmousedown='change(this,event)'></div>";
	var head = "<div data-id='"+row+"_"+col+"' id='head"+row+"_"+col+"'class='edge head' onmousedown='change(this,event)'></div>";
	var tail = "<div data-id='"+row+"_"+col+"' id='tail"+row+"_"+col+"'class='edge tail' onmousedown='change(this,event)'></div>";
	$("#slider"+row).append("<div data-id='"+row+"_"+col+"' id='box"+row+"_"+col+"' class='box'>"+head+main+tail+"</div>");
	edgeWidth = parseInt($(".edge").css("width"));
}
//移动滑块
var change=function(o,e){
	var boxId = o.dataset.id;
	$('#main'+boxId).addClass("active").parent().siblings().children().removeClass('active');
	$('#main'+boxId).addClass("active").parent().parent().siblings().children().children().removeClass('active');
	var boxDataId = boxId.substr(2);
	var last=0;
	if(boxDataId ==1){
		last = 0;
	}
	else{
		lastId = boxDataId - 1;
		last = id('tail'+row +"_"+ lastId).offsetLeft+edgeWidth;
		console.log(last);
	}
	var redundant = bodyMargin +last;
	var e = e ? e : window.event;
	if(!window.event) {e.preventDefault();}
	var init={
		mainX: o.offsetLeft-redundant,
		headX: id('head'+boxId).offsetLeft-redundant,
		tailX: id('tail'+boxId).offsetLeft-redundant,
		dX: e.clientX-redundant
	};
	console.log(init);
	document.onmousemove=function(e){
		var e = e ? e : window.event;
		var dist=e.clientX-init.dX,
			len=init.mainX + dist,
			l_x=init.headX,
			r_x=init.tailX;
		switch (id(o).id){
            case 'head'+boxId:
                l_x=init.headX + dist-redundant;
                move('l');
                break;
            case 'tail'+boxId:
                r_x=init.tailX + dist-redundant;
                move('r');
                break;
            case 'main'+boxId:
                l_x=init.headX + dist-redundant;
                r_x=init.tailX + dist;
                move2();
                break;
            default: break;
		}
		function move(d){
			if(r_x > l_x + 9 && len>=0 &&l_x>=0) {
				id('main'+boxId).style.width=r_x - l_x - edgeWidth + 'px';
				if(d=='l')	{
					document.getElementById('v1').innerHTML =len/10;
					id('head'+boxId).style.marginLeft= l_x + "px";
				}
				else	{
					document.getElementById('v2').innerHTML =(len+edgeWidth)/10;
				}
			}
		};
		function move2(){
			if(l_x>=0 ) {
				id('head'+boxId).style.marginLeft= l_x + "px";
				document.getElementById('v1').innerHTML =l_x/10;
				document.getElementById('v2').innerHTML =(r_x+edgeWidth)/10;
			}
		};
	}
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}