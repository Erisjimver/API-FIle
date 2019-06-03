
function comenzar(){

	zonadatos = document.getElementById("zonadatos");
	
	var boton = document.getElementById("boton");
	boton.addEventListener("click",abrir_archivo,false);

	navigator.webkitPersistentStorage.requestQuota(5*1024*1024,acceso);

}


function acceso(){

	window.webkitRequestFileSystem(PERSISTENT,5*1024*1024,crearsis,errores);

}

function crearsis(sistema){
 // Esa variable va a ser igual a la raíz de nuestro sistema de archivos
	espacio = sistema.root;
}


function abrir_archivo(){

	var nombre_archivo=document.getElementById("entrada").value;

	espacio.getFile(nombre_archivo,{create:true,exclusive:false},function(entrada){
		entrada.file(leer_contenido,errores);
		},errores);	
}

function leer_contenido(archivo){

	zonadatos.innerHTML="Nombre: "+archivo.name+"<br>";
	zonadatos.innerHTML+="Tamaño: "+archivo.size+"<br>";

	var lector = new FileReader();

	lector.onload=otro_exito;
	lector.readAsText(archivo);

}

function otro_exito(e){
 var resultado = e.target.result;

 
 zonadatos.innerHTML+="Contenido: "+resultado;

}


function errores(e){

	alert("Ha habido un error: "+e.code);
}







window.addEventListener("load",comenzar,false);