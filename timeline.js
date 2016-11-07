		
		// var slider = document.getElementById('slider');
		// var doActive = function(){
		// 	slider.className = 'active';
		// }
		$(".right").css("width",document.documentElement.clientWidth-202 +"px");
		var row = 0;
		var col = 0;
		// var border = parseInt($("#slider").css("border-width"));
		var bodyMargin = parseInt($("body").css("margin-left"));
		// var left = parseInt($(".left").css("width"));
		var addBox = function(){//添加滑块
			col++;
			var main = "<div data-id='"+col+"' id='main_"+col+"'class='main' onmousedown='change(this,event)'></div>";
			var head = "<div data-id='"+col+"' id='head_"+col+"'class='mea head' onmousedown='change(this,event)'></div>";
			var tail = "<div data-id='"+col+"' id='tail_"+col+"'class='mea tail' onmousedown='change(this,event)'></div>";
			slider.innerHTML+="<div data-id='"+col+"' id='box_"+col+"' class='box'>"+head+main+tail+"</div>";
		}
		var id=function(o){return document.getElementById(o) || o;}
		var change=function(o,e){
			var dataId = o.dataset.id;
			var last=0;
			if(dataId !=1){
				lastId = dataId - 1;
				last = id('tail_'+lastId).offsetLeft+3;
				// border = 0;
				// left = 0;
			}
			var redundant = bodyMargin +last;
			console.log(redundant);
			var e = e ? e : window.event;
			if(!window.event) {e.preventDefault();}
			var init={
				mainX: o.offsetLeft-redundant,
				headX: id('head_'+dataId).offsetLeft-redundant,
				tailX: id('tail_'+dataId).offsetLeft-redundant,
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
                    case 'head_'+dataId:
                        l_x=init.headX + dist-redundant;
                        move('l');
                        break;
                    case 'tail_'+dataId:
                        r_x=init.tailX + dist-redundant;
                        move('r');
                        break;
                    case 'main_'+dataId:
                        l_x=init.headX + dist-redundant;
                        r_x=init.tailX + dist;
                        move2();
                        break;
                    default: break;
				}
				
				function move(d){
					if(r_x > l_x + 9 && len>=0 &&l_x>=0) {
						id('main_'+dataId).style.width=r_x - l_x - 3 + 'px';
						if(d=='l')	{
							document.getElementById('v1').innerHTML =Math.round(len/10);
							id('head_'+dataId).style.marginLeft= l_x + "px";
						}
						else	{
							document.getElementById('v2').innerHTML =Math.round(len/10);
						}
					}
				};
				function move2(){
					if(l_x>=0 ) {
						id('head_'+dataId).style.marginLeft= l_x + "px";
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