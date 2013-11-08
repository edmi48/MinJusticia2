function actualiza_progressbar(por_ini,por_fin)
{		
 var capa = document.getElementById('progressbar');
 if (por_fin == '100%') mensaje = 'Actualización Exitosa';
 else mensaje = 'En progreso.. ';
 capa.innerHTML = '<span style="width: 0%; color:white;">'+mensaje+'</span>';
		
 $(".meter > span").each(function() {
   $(this)
   .data("origWidth", $(this).width())
   .width(por_ini)
   .animate({
   width: por_fin
   }, 2000);
  });		
}

function actualiza_set_datos()
{
 var db;
 var porc_ini = 0;
 var porc_fin = 20;
 db = openDatabase("ejemplo3.db3", "1.0", "Ministerio de Justicia", 500000);
 actualiza_progressbar(porc_ini+'%',porc_fin+'%');
 porc_ini = porc_fin;
 porc_fin = porc_fin + 20;
 $.Zebra_Dialog('<strong>Inicia proceso de actualización de información de click en aceptar y por favor espere un momento a que el proceso finalice...', {
    'type':     'information',
    'title':    'Actualización de Información',
    'buttons':  ['Aceptar'],
    'onClose':  function(caption) {
 db.transaction(function(tx) {
 				 tx.executeSql("SELECT valor_parametro, convencion_parametro FROM parametro where codigo_tparametro = 4", [],
                 function(tx, result)
				 {				 
                  for(var i=0; i < result.rows.length; i++) 
				  {
				   actualiza_informacion(result.rows.item(i)['convencion_parametro'],result.rows.item(i)['valor_parametro']);
				  }
				 }); 
            });
    }
});


function actualiza_informacion(tabla, url) 
{ 
 var sql_query = new Array();
 var actualizame = 0;
 var result = $.ajax({
                    url : url,
                    type : 'GET',
                    dataType : 'json',
                    error: function() { 
						 $.Zebra_Dialog('<strong>El catálogo de datos '+tabla+' no se encuentra disponible</strong>', {
							'type':     'error',
							'title':    'Actualización de Información'});
						   }
                });

		result.success(function(r) {
		    var id_registro = 1;
			var id_palabra = 1;
			actualizame = 1;
			//alert('Entra a actualizar '+tabla);
			actualiza_progressbar(porc_ini+'%',porc_fin+'%');
			porc_ini = porc_fin;
			porc_fin = porc_fin + 30;
			$.each(r.d, function(k, v) {
				if (tabla == 'informacion_programa') 
				{
				 sql_query.push("Insert into informacion_programa Values ("+id_registro+",'"+v.programa+"','"+v.caracterizacion_del_usuario+"','"+v.tipo_de_informacion+"','"+v.descripcion_tipo_de_informacion+"','"+v.entidad_encargada+"','"+v.tipo_de_entidad+"')");
				 palabra_clave =  v.palabras_clave.split(String.fromCharCode(59));
				 for (var j = 0; j < palabra_clave.length; j++) 
				 {
				  palabra_clave[j] = elimina_espacio(palabra_clave[j]);
				  sql_query.push("Insert into palabra_clave values ("+id_palabra+",'"+palabra_clave[j]+"',"+id_registro+")");
				  id_palabra++;
				 }				 
				} 
				else 
				{
				 sql_query.push("Insert into ubicacion_programa Values ("+id_registro+",'"+v.codigo_dane_departamento+"','"+v.departamento+"','"+v.codigo_dane_municipio+"','"+v.municipio+"','"+v.tipo+"','"+v.nombre+"','"+v.direccion+"','"+v.barrio+"','"+v.telefono_celular+"','"+v.email+"','"+v.latitud+"','"+v.longitud+"')");
				} 
				
				
				id_registro++;
			});
            actualiza_tabla(tabla);			 
		});  


    function elimina_espacio(info)
	{
			 for (var k = 0; k < info.length; k++) 
			 {
              var caracter = info.charAt(k);
             if( caracter != String.fromCharCode(32)) 
			 {
              campo = info.substring(k,info.length);
			  k = info.length;
             } 
            }
	 return campo;
	}
		
		function actualiza_tabla(tabla)
		{

 var db;
 db = openDatabase("ejemplo3.db3", "1.0", "Ministerio de Justicia", 500000);
 if (db) 
 {
        db.transaction( function(tx) {

			for(var i=0; i < sql_query.length; i++)
			{
			 if (i == 0) 
			 {
			  tx.executeSql("Delete from "+tabla);
			  if (tabla == 'informacion_programa') tx.executeSql("Delete from palabra_clave");
			 } 
			 tx.executeSql(sql_query[i]);
			 if (i == (sql_query.length - 1))
			 {
              tx.executeSql("Select count(*) as numero From "+tabla, [],
                 function(tx, result){
                     for(var i=0; i < result.rows.length; i++) var contador = [result.rows.item(i)['numero']];
					 //alert("Informacion "+tabla+": "+contador);
					 if (tabla == 'ubicacion_programa')
					 {						 
					  actualiza_progressbar('80%','100%');

			  $.Zebra_Dialog('<strong>Actualización de Información Finalizada exitósamente</strong>', {
							'type':     'information',
							'title':    'Actualización de Información'});
	  				}
                 });		
			 }
			}


        });			
 }		
		}   
		
}	
}