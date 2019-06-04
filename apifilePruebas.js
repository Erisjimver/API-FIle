function comenzar(){

	zonadatos = document.getElementById("zonadatos");
	
	var boton = document.getElementById("boton");
	//boton.addEventListener("click",crear,false);
	boton.addEventListener("click",crear,false);

	var boton1 = document.getElementById("boton1");
	boton1.addEventListener("click",modificar,false);
		
	var boton2 = document.getElementById("boton2");
	boton2.addEventListener("click",eliminar,false);


	navigator.webkitPersistentStorage.requestQuota(5*1024*1024,acceso);

}

//solicita permisos al sistema para poder crear lso directorios o archivos
function acceso(){

	window.webkitRequestFileSystem(PERSISTENT,5*1024*1024,crearsis,errores);

}

function crear_archivo(){

	var nombre_archivo=document.getElementById("entrada").value;

	espacio.getFile(nombre_archivo,{create:true,exclusive:false},function(entrada){
		entrada.createWriter(escribir_contenido,errores);
		},errores);
	
}

//funcion que permite escribir el contenido de los archivos que se crean 
function escribir_contenido(fileWriter){

	var texto = document.getElementById("texto").value;
	fileWriter.onwriteend=exito();
	var blob=new Blob([texto],{type:"text/html"});
	fileWriter.write(blob);

}


// Se recibe un objeto de tipo FileSystem
// El objeto se crea cuando abrimos o creamos un sistema de archivos
function crearsis(sistema){
 // Esa variable va a ser igual a la raíz de nuestro sistema de archivos
	espacio = sistema.root;
	ruta = "";
	mostrar();
}

function crear(){

	var nombre_archivo=document.getElementById("entrada").value;
	if(nombre_archivo!=""){
		//nombre_archivo=ruta+nombre_archivo;
		espacio.getFile(nombre_archivo,{create:true,exclusive:false},mostrar,errores);
		//espacio.getDirectory(nombre_archivo,{create:true,exclusive:false},mostrar,errores);

	espacio.getFile(nombre_archivo,{create:true,exclusive:false},function(entrada){
		entrada.createWriter(escribir_contenido,errores);
		},errores);
		}
}


function modificar(){

	var  origen = document.getElementById("archivo_origen").value;
	var destino = document.getElementById("directorio_destino").value;

	espacio.getFile(origen,null,function(archivo)
	{
		espacio.getDirectory(destino,null,function(directorio)
		{
			archivo.moveTo(directorio,null,exito,errores);
		}, errores);
	},errores );
}


function eliminar(){
	
	var  origen = document.getElementById("eliminar").value;
	
	origen=ruta+origen;
	
	espacio.getFile(origen,null,function(archivo)
	//espacio.getDirectory(origen,null,function(archivo)//para borrar directorios
	{
		archivo.remove(exito,errores);
		//archivo.removeRecursively(exito,errores);//para borrar directorios
	},errores);
}

function mostrar(){

	document.getElementById("entrada").value="";

	zonadatos.innerHTML="";

	espacio.getDirectory(ruta,null,leerdir,errores);

}

function leerdir(dir){

	lector = dir.createReader();
	leer();	
}

function leer(){
	lector.readEntries(function(archivos){
		if(archivos.length){
			listar(archivos);
		}
	},errores);
}

//lista todos los nombres de directorios o archivos, ademas de permitir acceder a los directorios cuando demos clic
function listar(archivos){
	for(var i=0;i<archivos.length;i++){
		if(archivos[i].isFile){
			zonadatos.innerHTML+=archivos[i].name+"<br>";
		}else if(archivos[i].isDirectory){
			//zonadatos.innerHTML+="<span class='directorio'>"+archivos[i].name+"</span><br>";
			zonadatos.innerHTML+="<span onclick='cambiardir(\""+archivos[i].name+"\")' class ='directorio'>"+archivos[i].name+"</span><br>";  
		}
	}
}

//cambia la direcion de la ruta y asi se  puede mover entre directorios creados
function cambiardir(nuevaruta){

	ruta=ruta+nuevaruta+"/";
	mostrar();
}

//volver uno o varios pasos atras cuando se esta en un directorio
function volver(){
	
	espacio.getDirectory(ruta,null,function(dir_actual)
	{
		dir_actual.getParent(function(dir_padre){
			ruta=dir_padre.fullPath;
			mostrar();
		},errores);		
	},errores);

}

//en teoria es la funcion borrar, limpia todo de las cajas de texto y actualiza la vista de los resultados con la funcion Mostrar()
function exito(){

		document.getElementById("entrada").value="";

		document.getElementById("texto").value="";

		document.getElementById("archivo_origen").value="";

		document.getElementById("directorio_destino").value="";	

		document.getElementById("eliminar").value="";	
	
		mostrar();	
}

function errores(e){

	alert("Ha habido un error: "+e.code);
}




window.addEventListener("load",comenzar,false);