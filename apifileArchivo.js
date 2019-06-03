
function comenzar(){

	zonadatos = document.getElementById("zonadatos")
	var archivos = document.getElementById("archivos")

	archivos.addEventListener("change",procesar,false)



}


function procesar(e){

	var archivos=e.target.files;

	var mi_archivo=archivos[0];

	var lector = new FileReader();

	lector.readAsText(mi_archivo, "iso-8859-1");
	//

	lector.addEventListener("load",mostrar_en_web,false);




}

function mostrar_en_web(e){

	var resultado =e.target.result;

	zonadatos.innerHTML = resultado;

}




window.addEventListener("load",comenzar,false);