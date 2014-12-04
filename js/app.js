$(document).ready(function(){
	//ensimmäinen versio: löydä parit! :D

	//aloitusruutu

	$('#game_screen').hide(); 				// piilottaa pelielementit- sisältävän divin
	
	
	function shuffle(array) {
		var l = array.length;
		while(l) {
			i = Math.floor(Math.random() * l--);
			t = array[l];
			array[l] = array[i];
			array[i] = t;
			}
		console.log(array);
		return array;
	}
	for(i=1; i<=16; i++){
		var random = [	'#kortti_' + i ];
	}
			/*					'#kortti_2', 
					'#kortti_3', 
					'#kortti_4', 
					'#kortti_5', 
					'#kortti_6', 
					'#kortti_7', 
					'#kortti_8',
					'#kortti_9', 
					'#kortti_10', 
					'#kortti_11', 
					'#kortti_12', 
					'#kortti_13', 
					'#kortti_14', 
					'#kortti_15', 
					'#kortti_16'];
			*/				
	var color = [	'keltainen',
					'harmaa',
					'lila',
					'pink',
					'punainen',
					'sininen',
					'tsininen',
					'vihrea',
					'keltainen',
					'harmaa',
					'lila',
					'pink',
					'punainen',
					'sininen',
					'tsininen',
					'vihrea'];
	
	
	// Fisher-Yates - "shuffle" funktiota kutsutaan "kysymykset"-arrayhin. Ja näin pakka on sekaisin!
	$('#play_button').click(
		function(){ 							// kun painetaan "play!"-painiketta
			$('#start_screen').hide();			// aloitusruutu-divi piiloutuu
			$('#game_screen').show();			// ja pelielementit sisältävä divi tulevat näkyviin
			s_time = 0;
			m_time = 0;
			shuffle(random);
			shuffle(color);
			for(i=0 ; i <= 15; i ++){
				$(random[i]).attr('src','kortit/kortti_' + color[i] +'.png');
			};
		 }
	); 
	shuffle(random);
	
	
	for(i=0 ; i <= 15; i ++){
		$(random[i]).hide();
		$(random[i]).attr('src','kortit/kortti_' + color[i] +'.png');
	};
	

	
	//peliruutu
	
	var s_time;								// määritellään muuttuja ajastimen sekunneille
	var m_time;								// määritellään muuttuja ajastimen minuuteille
	var timer = setInterval(				// määritellään ajastin kutsumaan funktiota sekunnin välein
		function(){							
			s_time ++;						// joka sekunti s_time kasvaa yhdellä
			if(s_time < 10 && m_time < 10){						// jos molemmat aikamuuttujat alle 10
				$('#timer').text("0" + m_time + ":0" + s_time);	// lisää kummankin eteen nollan
																// ja kirjoittaa ajastimen paikalle
			}else if(s_time < 60 && m_time < 10){				//jos s_time yli 10 ja alle 60 
				$('#timer').text("0" + m_time + ":" + s_time);	// lisää vain minuuteille nollan eteen
																// kirjoittaessaan arvot ajastimeen
			}else{							// kun sekunnit ylittävät 60  
				m_time ++;					// minuuttilaskuri kasvaa yhdellä
				s_time = 0;					// ja sekunttilaskuri nollataan
				if(m_time > 9){				// minuuttilaskurin saavuttaessa 10 
					clearInterval(timer);	// laskuri tyhjennetään
					$('#kortit').hide();	// peli katoaa näkyvistä
					$('#timer').text("Game over!");				// ajastimen tilalle "Game over!"
				}
			}
		}
	,
	1000);
	
	$('#back_button').click(function(){ 	// kun painetaan "back"-painiketta
		$('#game_screen').hide();			// pelin sisältävä divi piiloutuu
		$('#start_screen').show();			// ja aloitusruutu-divi palaa näkyviin
		$('#timer').text("00:00");			// asettaa näkyvän ajastimen nollaan
		s_time = 0;							// asettaa sekuntilaskurin nollaan
		m_time = 0;							// asettaa minuuttilaskurin nollaan
	});
	
	

	for(var i=1;i<=8;i++){ 				//välillä 1-8 
		$('#kortti_' + i).hide(); 		//piilottaa kaikki korttien etupuolen kuvat sisältävät divit
	}
	
	var pairs = 0;
	$('#kortit').click(
		function(){
			var open_cards = 0;
			var open_1;
			var open_2;
			var closed_1;
			var closed_2;
			
			for (var i = 1; i <= 16; i ++){
				if($('#kortti_' + i).is(':visible')){
					open_cards ++;
					if(open_cards == 1){
						open_1 = $('#kortti_' + i);
					}else{
						open_2 = $('#kortti_' + i);
					}					
				}
				if($('#kortti_takaa_' + i).is(':hidden')){
					if(open_cards == 1){
						closed_1 = $('#kortti_takaa_' + i);
					}else{
						closed_2 = $('#kortti_takaa_' + i);
					}					
				}
			}
			if(open_cards >= 2){
				open_cards = 0;
				if(open_1.attr('src') == open_2.attr('src')){
					pairs ++;
					var closer = setTimeout(function(){
						$('#points').html('<img id="pair_kuva" type="button" src="parit/parit_' + pairs + '.png">');
						open_1.removeAttr('src');
						open_2.removeAttr('src');
						closed_1.removeAttr('src');
						closed_2.removeAttr('src');
					}
					,
					700);
				}else{
					var closer = setTimeout(function(){
						for(var x = 1; x <= 8; x ++){
							$('#kortti_' + x).hide();
							$('#kortti_takaa_' + x).show();
						}
					}
					,
					700);
				}
			}
		
		}
	);
	
	// kortit ovat käännettävissä klikkaamalla:
	$('#kortti_takaa_1').click(function(){	// kun painetaan ensimmäisen kortin taustaa
		$('#kortti_takaa_1').hide();		// kortin tausta-kuva piiloutuu
		$('#kortti_1').show();				// kortin etupuoli näyttäytyy
		
	});
	$('#kortti_takaa_2').click(function(){	// toisen korttipaikan kohdalla samalla tavalla
		$('#kortti_takaa_2').hide();
		$('#kortti_2').show();
	});
	$('#kortti_takaa_3').click(function(){	//ja kolmannen
		$('#kortti_takaa_3').hide();
		$('#kortti_3').show();
	});
	$('#kortti_takaa_4').click(function(){	// -,,-
		$('#kortti_takaa_4').hide();
		$('#kortti_4').show();
	});
	$('#kortti_takaa_5').click(function(){	// -,,-
		$('#kortti_takaa_5').hide();
		$('#kortti_5').show();
	});
	$('#kortti_takaa_6').click(function(){	// -,,-
		$('#kortti_takaa_6').hide();
		$('#kortti_6').show();
	});
	$('#kortti_takaa_7').click(function(){	// -,,-
		$('#kortti_takaa_7').hide();
		$('#kortti_7').show();
	});
	$('#kortti_takaa_8').click(function(){	// -,,-
		$('#kortti_takaa_8').hide();
		$('#kortti_8').show();
	});

	$('#kortti_takaa_9').click(function(){
		$('#kortti_takaa_9').hide();
		$('#kortti_9').show();
	});
	$('#kortti_takaa_10').click(function(){
		$('#kortti_takaa_10').hide();
		$('#kortti_10').show();
	});
	$('#kortti_takaa_11').click(function(){
		$('#kortti_takaa_11').hide();
		$('#kortti_11').show();
	});
	$('#kortti_takaa_12').click(function(){
		$('#kortti_takaa_12').hide();
		$('#kortti_12').show();
	});
	$('#kortti_takaa_13').click(function(){
		$('#kortti_takaa_13').hide();
		$('#kortti_13').show();
	});
	$('#kortti_takaa_14').click(function(){
		$('#kortti_takaa_14').hide();
		$('#kortti_14').show();
	});
	$('#kortti_takaa_15').click(function(){
		$('#kortti_takaa_15').hide();
		$('#kortti_15').show();
	});
	$('#kortti_takaa_16').click(function(){
		$('#kortti_takaa_16').hide();
		$('#kortti_16').show();
	});

	
	$('#kortti_1').click(function(){		// ensimmäisen kortin etupuolta klikatessa
		$('#kortti_1').hide();				// etupuoli piiloutuu
		$('#kortti_takaa_1').show();		// taustakuva tulee esiin
	});
	$('#kortti_2').click(function(){
		$('#kortti_2').hide();
		$('#kortti_takaa_2').show();
	});
	$('#kortti_3').click(function(){
		$('#kortti_3').hide();
		$('#kortti_takaa_3').show();
	});
	$('#kortti_4').click(function(){
		$('#kortti_4').hide();
		$('#kortti_takaa_4').show();
	});
	$('#kortti_5').click(function(){
		$('#kortti_5').hide();
		$('#kortti_takaa_5').show();
	});
	$('#kortti_6').click(function(){
		$('#kortti_6').hide();
		$('#kortti_takaa_6').show();
	});
	$('#kortti_7').click(function(){
		$('#kortti_7').hide();
		$('#kortti_takaa_7').show();
	});
	$('#kortti_8').click(function(){
		$('#kortti_8').hide();
		$('#kortti_takaa_8').show();
	});
	$('#kortti_9').click(function(){
		$('#kortti_9').hide();
		$('#kortti_takaa_9').show();
	});
	$('#kortti_10').click(function(){
		$('#kortti_10').hide();
		$('#kortti_takaa_10').show();
	});
	$('#kortti_11').click(function(){
		$('#kortti_11').hide();
		$('#kortti_takaa_11').show();
	});
	$('#kortti_12').click(function(){
		$('#kortti_12').hide();
		$('#kortti_takaa_12').show();
	});
	$('#kortti_13').click(function(){
		$('#kortti_13').hide();
		$('#kortti_takaa_13').show();
	});
	$('#kortti_14').click(function(){
		$('#kortti_14').hide();
		$('#kortti_takaa_14').show();
	});
	$('#kortti_15').click(function(){
		$('#kortti_15').hide();
		$('#kortti_takaa_15').show();
	});
	$('#kortti_16').click(function(){
		$('#kortti_16').hide();
		$('#kortti_takaa_16').show();
	});
});