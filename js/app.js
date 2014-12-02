$(document).ready(function(){
	//ensimm‰inen versio: lˆyd‰ parit! :D
	
	//aloitusruutu
	
	
	$('#game_screen').hide(); 				// piilottaa pelielementit- sis‰lt‰v‰n divin
	

	$('#play_button').click(function(){ 	// kun painetaan "play!"-painiketta
		$('#start_screen').hide();			// aloitusruutu-divi piiloutuu
		$('#game_screen').show();			// ja pelielementit sis‰lt‰v‰ divi tulevat n‰kyviin
		s_time = 0;
		m_time = 0;
	});
	
	//peliruutu
	
	var random = ['#kortti_1', '#kortti_2', '#kortti_3', '#kortti_4', '#kortti_5', '#kortti_6', '#kortti_7', '#kortti_8'];

	
	var s_time;								// m‰‰ritell‰‰n muuttuja ajastimen sekunneille
	var m_time;								// m‰‰ritell‰‰n muuttuja ajastimen minuuteille
	var timer = setInterval(				// m‰‰ritell‰‰n ajastin kutsumaan funktiota sekunnin v‰lein
		function(){							
			s_time ++;						// joka sekunti s_time kasvaa yhdell‰
			if(s_time < 10 && m_time < 10){						// jos molemmat aikamuuttujat alle 10
				$('#timer').text("0" + m_time + ":0" + s_time);	// lis‰‰ kummankin eteen nollan
																// ja kirjoittaa ajastimen paikalle
			}else if(s_time < 60 && m_time < 10){				//jos s_time yli 10 ja alle 60 
				$('#timer').text("0" + m_time + ":" + s_time);	// lis‰‰ vain minuuteille nollan eteen
																// kirjoittaessaan arvot ajastimeen
			}else{							// kun sekunnit ylitt‰v‰t 60  
				m_time ++;					// minuuttilaskuri kasvaa yhdell‰
				s_time = 0;					// ja sekunttilaskuri nollataan
				if(m_time > 9){				// minuuttilaskurin saavuttaessa 10 
					clearInterval(timer);	// laskuri tyhjennet‰‰n
					$('#kortit').hide();	// peli katoaa n‰kyvist‰
					$('#timer').text("Game over!");				// ajastimen tilalle "Game over!"
				}
			}
		}
	,
	1000);
	
	$('#back_button').click(function(){ 	// kun painetaan "back"-painiketta
		$('#game_screen').hide();			// pelin sis‰lt‰v‰ divi piiloutuu
		$('#start_screen').show();			// ja aloitusruutu-divi palaa n‰kyviin
		$('#timer').text("00:00");			// asettaa n‰kyv‰n ajastimen nollaan
		s_time = 0;							// asettaa sekuntilaskurin nollaan
		m_time = 0;							// asettaa minuuttilaskurin nollaan
	});
	
	

	for(var i=1;i<=8;i++){ 				//v‰lill‰ 1-8 
		$('#kortti_' + i).hide(); 		//piilottaa kaikki korttien etupuolen kuvat sis‰lt‰v‰t divit
	}
	
	var pairs = 0;
	$('#kortit').click(
		function(){
			var open_cards = 0;
			var open_1;
			var open_2;
			var closed_1;
			var closed_2;
			
			for (var i = 1; i <= 8; i ++){
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
						open_1.remove();
						open_2.remove();
						closed_1.remove();
						closed_2.remove();
					}
					,
					1500);
				}else{
					var closer = setTimeout(function(){
						for(var x = 1; x <= 8; x ++){
							$('#kortti_' + x).hide();
							$('#kortti_takaa_' + x).show();
						}
					}
					,
					1500);
				}
			}
		
		}
	);
	
	// kortit ovat k‰‰nnett‰viss‰ klikkaamalla:
	$('#kortti_takaa_1').click(function(){	// kun painetaan ensimm‰isen kortin taustaa
		$('#kortti_takaa_1').hide();		// kortin tausta-kuva piiloutuu
		$('#kortti_1').show();				// kortin etupuoli n‰ytt‰ytyy
		
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

	// kortit k‰‰ntyv‰t myˆs toiseen suuntaan:
	
	$('#kortti_1').click(function(){		// ensimm‰isen kortin etupuolta klikatessa
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

	
	
});