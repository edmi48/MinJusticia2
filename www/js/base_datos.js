function populateDB(tx) 
{

				 tx.executeSql("CREATE TABLE IF NOT EXISTS informacion_programa ( \
								id_programa INTEGER NOT NULL, \
								programa TEXT NOT NULL, \
								caracterizacion_usuario TEXT NOT NULL, \
								tipo_informacion TEXT NOT NULL, \
								descripcion_tipo_informacion TEXT NOT NULL, \
								entidad_encargada TEXT NOT NULL, \
								tipo_entidad TEXT NOT NULL, \
								PRIMARY KEY (id_programa))");

				 tx.executeSql("CREATE TABLE IF NOT EXISTS ubicacion_programa ( \
								id_ubicacion INTEGER NOT NULL, \
								codigo_dane_departamento TEXT NOT NULL, \
								departamento TEXT NOT NULL, \
								codigo_dane_municipio TEXT NOT NULL, \
								municipio TEXT NOT NULL, \
								tipo_programa TEXT NOT NULL, \
								nombre_lugar TEXT NOT NULL, \
								direccion_lugar TEXT NOT NULL, \
								barrio_lugar TEXT NOT NULL, \
								telefono_lugar TEXT NOT NULL, \
								email TEXT NOT NULL, \
								latitud TEXT NOT NULL, \
								longitud TEXT NOT NULL, \
								PRIMARY KEY (id_ubicacion))");
							
				 tx.executeSql("CREATE TABLE IF NOT EXISTS palabra_clave ( \
								id_palabra_clave INTEGER NOT NULL, \
								nombre_palabra_clave INTEGER NOT NULL, \
								id_programa INTEGER NOT NULL, \
								PRIMARY KEY (id_palabra_clave), \
								FOREIGN KEY (id_programa) REFERENCES informacion_programa (id_programa))");

				tx.executeSql("CREATE TABLE IF NOT EXISTS tipo_parametro(codigo_tparametro integer primary key, nombre_tparametro text)");

				tx.executeSql("CREATE TABLE IF NOT EXISTS parametro ( \
							   codigo_parametro INTEGER NOT NULL, \
							   valor_parametro TEXT NOT NULL, \
							   convencion_parametro TEXT NOT NULL, \
							   codigo_tparametro INTEGER NOT NULL, \
							   PRIMARY KEY (codigo_parametro, codigo_tparametro), \
							   FOREIGN KEY (codigo_tparametro) REFERENCES tipo_parametro (codigo_tparametro))");							   

tx.executeSql("Delete from tipo_parametro;")
	
tx.executeSql("insert into tipo_parametro values(1,'Correo Electrónico');")
tx.executeSql("insert into tipo_parametro values(2,'Cuenta Twitter');")
tx.executeSql("insert into tipo_parametro values(3,'Cuenta Youtube');")
tx.executeSql("insert into tipo_parametro values(4,'Set de Datos Abiertos');")
tx.executeSql("insert into tipo_parametro values(5,'Generar Mapa');")

tx.executeSql("Delete from parametro;")

tx.executeSql("insert into parametro values(1,'simonmoya@gmail.com','E-mail Justicia para Todos',1);")
tx.executeSql("insert into parametro values(2,'winnie54817@gmail.com','E-mail Justicia para Todos',1);")
tx.executeSql("insert into parametro values(3,'hmoreno@ospinternational.com','E-mail Justicia para Todos',1);")
tx.executeSql("insert into parametro values(4,'MinjusticiaCo','Justicia para Todos',2);")
tx.executeSql("insert into parametro values(5,'hC9tD_GTxNg','Casas de Justicia',3);")
tx.executeSql("insert into parametro values(6,'mcf8Wwqw4JQ','Centros de Convivencia Ciudadana',3);")
tx.executeSql("insert into parametro values(7,'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Justicia/informacionprogramas?$format=json','informacion_programa',4);")
tx.executeSql("insert into parametro values(8,'http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Justicia/ubicacionprogramas?$format=json','ubicacion_programa',4);")
tx.executeSql("insert into parametro values(9,'Casa de Justicia','Casa de Justicia',5);")

						   
}

function errorCB()
{
 alert('ERROR FATAL!');
}

function successCB()
{
}

function inicializa_db(conexion) 
{
 var db;
 db = window.openDatabase("justice_for_all.db3", "1.0", "Justicia para Todos", 500000);
 if (db) 
 {
db.transaction(populateDB,errorCB,successCB);	 
db.transaction( function(tx) {
tx.executeSql("Select count(*) as numero From palabra_clave", [],
                function(tx, result){
                    for(var i=0; i < result.rows.length; i++) 
                     if ([result.rows.item(i)['numero']] == 0)
                     {					 
					  if (conexion == 1) actualiza_set_datos();					
					  else
					   $.Zebra_Dialog('<strong>No hay conexión a Internet para actualizar la información, por favor intente más tarde!</strong>', 
					  {
							'type':     'error',
							'title':    'Actualización de Información'
					  });
					 }
                    });	


            });	 
 }
 
/* ---------------------------------------------------------------------- */
/* Cargue de Información paramétrica	                                  */
/* ---------------------------------------------------------------------- */





/* ---------------------------------------------------------------------- */
/* Fin Cargue de Información paramétrica	                              */
/* ---------------------------------------------------------------------- */
 
}