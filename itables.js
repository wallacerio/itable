/**
 * iTable v1.0 - 10/05/2016
 * makes responsive table tags and dynamic
 *
 * developed by Wallace Rio <wallrio@gmail.com>
 * wallrio.com
 * 
 * tested on firefox/chrome/opera/ie8/safari
 * 
 */




var itable = (function(){

	var Functions = {
		acts:[],		
		bind:function(id,event,callback){
			Functions.acts[id] = [];
			Functions.acts[id]['event'] = event;
			
			Functions.acts[id]['callback'] = callback;

		},
		addEvent:function(objs,event,callback,mode,elem2,table){
			
			if(mode == undefined)
				mode = true;

			if(objs == undefined)
				objs = window; 
			if(objs.addEventListener){ 				
				return objs.addEventListener(event,function(){
					if(callback)
						callback(objs,elem2,table);
				},mode); 
			}else if(objs.attachEvent){
				return objs.attachEvent('on'+event,function(){
					if(callback)
						callback(objs,elem2,table);
				}); 
			}
		},
		init:function(){

			var dataTitle = [];
			var itables = document.getElementsByClassName('itable');
			var index = 0;
			var dataTitleWidth = 0;
			for(var i = 0;i<itables.length;i++){
					
				if( itables[i].getAttribute('data-init') === 'true' )
					continue;

				itables[i].setAttribute('data-init','true');
				

				for(var i2 = 0;i2<itables[i].getElementsByTagName('th').length;i2++){
					 dataTitle[i2] = itables[i].getElementsByTagName('th')[i2].innerHTML;						
					
				}
				
				for(var i2 = 0;i2<itables[i].getElementsByTagName('tr').length;i2++){
						
						if( (i2 > 0 || itables[i].getAttribute('class').indexOf('horizontal') == -1) && itables[i].getAttribute('class').indexOf('selecting') !== -1){
						
							var dataRow;
							for(key in Functions.acts){
								
								if(typeof Functions.acts[key]['callback'] == 'function' && key == itables[i].id){
									var callback = Functions.acts[key]['callback'];
									var events = Functions.acts[key]['event'];
																	
									Functions.addEvent(itables[i].getElementsByTagName('tr')[i2],events,function(element,tr,table){

										for(var i = 0;i<tr.length;i++){
											tr[i].setAttribute('data-status','');
										}										
										element.setAttribute('data-status','active');	

										var ths = [];
										var tds = [];

										for(var i = 0;i<element.getElementsByTagName('th').length;i++){
											ths[i] = element.getElementsByTagName('th')[i].innerHTML;
										}

										for(var i = 0;i<element.getElementsByTagName('td').length;i++){
											tds[i] = element.getElementsByTagName('td')[i].innerHTML;
										}

									
										var trs = {
											ths:ths,
											tds:tds,
										}

									
										if(callback)
											callback(trs,element);							
									},null,itables[i].getElementsByTagName('tr'),itables[i]);


								}

							}


							
						}

						var countTd = itables[i].getElementsByTagName('tr').item(i2).getElementsByTagName('td').length;

					for(var i3 = 0;i3<countTd;i3++){
						
						

						if(dataTitle[i3] === undefined){
							itables[i].getElementsByTagName('tr').item(i2).getElementsByTagName('td')[i3].setAttribute('data-title','');				
						}else{
							itables[i].getElementsByTagName('tr').item(i2).getElementsByTagName('td')[i3].setAttribute('data-title',dataTitle[i3]);											
						}
	
						index++;					
					}
				}


				if(itables[i].getAttribute('class').indexOf('horizontal') != -1){
				
					itables[i].getElementsByTagName('tr')[0].style.position = 'absolute';
				

					itables[i].onscroll = function(){
						var scrollTop = this.scrollTop;
						this.getElementsByTagName('tr')[0].style.top = scrollTop + 'px';				
					}
				}
				
				

			}

			Functions.addEvent(window,'resize',function(){
					var itables = document.getElementsByClassName('itable horizontal');
					for(var i = 0;i<itables.length;i++){
						var firstTHHeight = itables[i].getElementsByTagName('tr')[0].offsetHeight;								
						itables[i].getElementsByTagName('tr')[1].style = 'margin-top:'+firstTHHeight+'px';
					}
				});
			var itables = document.getElementsByClassName('itable horizontal');
					for(var i = 0;i<itables.length;i++){
						var firstTHHeight = itables[i].getElementsByTagName('tr')[0].offsetHeight;								
						itables[i].getElementsByTagName('tr')[1].style = 'margin-top:'+firstTHHeight+'px';
					}

		},
		windowSize:function(){
				var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

				var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
				var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

			    D = document;
			    var y =  Math.max(
			        D.body.scrollHeight, D.documentElement.scrollHeight,
			        D.body.offsetHeight, D.documentElement.offsetHeight,
			        D.body.clientHeight, D.documentElement.clientHeight
			    );


			    var x =  Math.max(
			        D.body.scrollWidth, D.documentElement.scrollWidth,
			        D.body.offsetWidth, D.documentElement.offsetWidth,
			        D.body.clientWidth, D.documentElement.clientWidth
			    );

				var size = {
					document: {
						width: x,
						height: y
					},
					width: width,
					height: height,
					scrollLeft: scrollLeft,
					scrollTop: scrollTop,
					sizing: function(element){

						return {
							width:width-(document.querySelector(element).offsetLeft*2),
							height:height-(document.querySelector(element).offsetTop*2)
						}
					} 
				}

			return size;
		}
	}

	Functions.addEvent(window,'load',function(){
		Functions.init();	
		setInterval(function(){
			Functions.init();
		},1000);
	});

	return Functions;

})();



