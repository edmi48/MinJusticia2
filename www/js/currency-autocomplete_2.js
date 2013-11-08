$(function(){
  var currencies = [];
  var db;
     db = openDatabase("ejemplo3.db3", "1.0", "Ministerio de Justicia", 500000);

  	 db.transaction(function(tx) 
				    {				
            	  	 tx.executeSql("SELECT b.nombre_palabra_clave, a.programa, a.descripcion_tipo_informacion, a.entidad_encargada FROM informacion_programa a, palabra_clave b Where a.id_programa = b.id_programa Order by 1", [],
                  	 function(tx, result)
					 {
					  alert(result.rows.length);
					  contador = result.rows.length - 1; 
                   	  for(var i=0; i < result.rows.length; i++) 
					  {
						//alert(i);
					   currencies.push({value: result.rows.item(i)['nombre_palabra_clave'], data: result.rows.item(i)['programa'], data2: result.rows.item(i)['entidad_encargada'], data3: result.rows.item(i)['descripcion_tipo_informacion']});
					   //alert("tamaño"+currencies.length);
					   if (i == contador)
					   { alert("contador "+currencies.length);
  // setup autocomplete function pulling from currencies[] array
						$('#autocomplete').autocomplete(
						{
			             lookup: currencies,
						 onSelect: function (suggestion) 
						 {
						  if (suggestion.data == 'Casa de Justicia') icono = 'images/cj.png'
						  else icono = 'images/ccc.png'
					      //var thehtml = '<a href="#" onclick=\'abrir_opcion("mapa.html?Entidad='+suggestion.data+'");return false\'><img src="'+icono+'" height="42" width="42">&nbsp;&nbsp;' + suggestion.data + ' (Ver mapa)</a> <br> <strong>Entidad Encargada</strong> ' + suggestion.data2 + ' <br> <strong>Descripción Conflicto:</strong> ' + suggestion.data3;
						  //var thehtml = '<a href="mapa.html?Entidad='+suggestion.data+' target="_self"><img src="'+icono+'" height="42" width="42">&nbsp;&nbsp;' + suggestion.data + ' (Ver mapa)</a> <br> <strong>Entidad Encargada</strong> ' + suggestion.data2 + ' <br> <strong>Descripción Conflicto:</strong> ' + suggestion.data3;
						  var thehtml='milena';
						
					      $('#outputcontent').html(thehtml);
					     }
						});												
					   }
                   	  }
                  	 });
                 	});
});