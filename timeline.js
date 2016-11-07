$(".right").css("width",document.documentElement.clientWidth-202 +"px");
var row = $(".layer").children().length;//层
var col = 0;//滑块
var bodyMargin = parseInt($("body").css("margin-left"));
var id=function(o){return document.getElementById(o) || o;}

//添加图层 和 时间条
var addLayer = function (){
	row = $(".layer").children().length;
	row++;
	var layerHide = '<span class="layerHide"></span>';
	var layerName = '<div class="layerName"><img src="" alt=""><span>'+'图层0'+row+'</span></div>';
	$(".layer").append('<div data-id="1'+row+'" class="layerBox" id="layer_'+row+'" onclick="clickLayer(this)">'+layerHide+layerName+'</div>');
	var slider = '<div data-id="2'+row+'" class="sliderBox" id="slider'+row+'"  onclick="clickLayer(this)"></div>';
	$(".slider").append(slider);
	$("#layer_"+row).addClass("active").siblings().removeClass('active');
	$("#slider"+row).addClass("active").siblings().removeClass('active');
}
//选择图层
function clickLayer(obj){
	var layerDataId = obj.dataset.id.substr(1);
	$("#layer_"+layerDataId).addClass("active").siblings().removeClass('active');
	$("#slider"+layerDataId).addClass("active").siblings().removeClass('active');
	row = layerDataId;
}
//添加滑块
var addBox = function (){
	col = $("#slider"+row).children().length;
	if(col==0){
		col = 0;
	}
	col++;
	var main = "<div data-id='"+row+"_"+col+"' id='main"+row+"_"+col+"'class='main' onmousedown='change(this,event)'></div>";
	var head = "<div data-id='"+row+"_"+col+"' id='head"+row+"_"+col+"'class='mea head' onmousedown='change(this,event)'></div>";
	var tail = "<div data-id='"+row+"_"+col+"' id='tail"+row+"_"+col+"'class='mea tail' onmousedown='change(this,event)'></div>";
	$("#slider"+row).append("<div data-id='"+row+"_"+col+"' id='box"+row+"_"+col+"' class='box'>"+head+main+tail+"</div>");
}

//移动滑块
var change=function(o,e){
	var boxDataId = o.dataset.id.substr(2);
	var boxId = o.dataset.id;
	console.log(boxId);
	var last=0;
	if(boxDataId ==1){
		last = 0;
	}
	else{
		lastId = boxDataId - 1;
		last = id('tail'+row +"_"+ lastId).offsetLeft+3;
		if(last == undefined || last == NaN){
			last = 0;
		}
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
				id('main'+boxId).style.width=r_x - l_x - 3 + 'px';
				if(d=='l')	{
					document.getElementById('v1').innerHTML =Math.round(len/10);
					id('head'+boxId).style.marginLeft= l_x + "px";
				}
				else	{
					document.getElementById('v2').innerHTML =Math.round(len/10);
				}
			}
		};
		function move2(){
			if(l_x>=0 ) {
				id('head'+boxId).style.marginLeft= l_x + "px";
				document.getElementById('v1').innerHTML =Math.round(l_x/10);
				document.getElementById('v2').innerHTML =Math.round(r_x/10);
			}
		};
	}
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}