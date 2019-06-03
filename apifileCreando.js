
function comenzar(){

	zonadatos = document.getElementById("zonadatos")
	var boton = document.getElementById("boton")

	boton.addEventListener("click",crear,false)

	navigator.webkitPersistentStorage.requestQuota(5*1024*1024,acceso);


}


function acceso(){

	window.webkitRequestFileSystem(PERSISTENT,5*1024*1024,crearsis,errores);


}

function crearsis(sistema){

	espacio=sistema.root;

}

function errores() {



}

function crear(){

	var nombre_archivo=document.getElementById("entrada").value;
	if(nombre_archivo!=""){
		//espacio.getFile(nombre_archivo,{create:true,exclusive:false},mostrar,errores);
		espacio.getDirectory(nombre_archivo,{create:true,exclusive:false},mostrar,errores);
	}
}

function mostrar(entrada){

	document.getElementById("entrada").value="";
	zonadatos.innerHTML="Exito en la creacion de espacion y archivo! <br>";
	zonadatos.innerHTML+="Nombre: "+entrada.name+"<br>";
	zonadatos.innerHTML+="Ruta: "+entrada.fullPath+"<br>";

}

function errores(e){

	alert("Ha habido un error: "+e.code);
}





window.addEventListener("load",comenzar,false);