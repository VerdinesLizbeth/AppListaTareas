(function(){
    // variables
    var lista=document.getElementById("lista"),
    tareaInput=document.getElementById("tareaInput"),
       btnNuevaTarea=document.getElementById("btn-agregar");
    
   //funciones
 var agregarTarea=function(){
    var tarea = tareaInput.value, 
         nuevaTarea = document.createElement("li"),
        enlace = document.createElement("a"),
         contenido = document.createTextNode(tarea);
    if(tarea== ""){
        tareaInput.setAttribute("placeholder", "agregar una tarea valida");
        tareaInput.className = "error";
        return false;
    }
     //Agregamos el contenido al enlace
    enlace.appendChild(contenido);
     //Le establecemos un atributo href
     enlace.setAttribute("href", "#");
     // Agrefgamos el enlace a la nueva tarea (li)
     nuevaTarea.appendChild(enlace);
     //Agregamos la nueva tarea a  la lista
     lista.appendChild(nuevaTarea);
     
     tareaInput.value = "";
     
     for (var i=0; i<=lista.children.length -1; i++){
         lista.children[i].addEventListener("click", function(){
             this.parentNode.removeChild(this);
         });
     }
     
};

     var  comprobrarInput=function(){
  tareaInput.className="";
         tareaInput.setAttribute("placeholder", "Agregar tu tarea");
};

var  eliminarTarea=function(){
    this.parentNode.removeChild(this);
 
};

//eventos 

//Agregar Tarea
btnNuevaTarea.addEventListener("click", agregarTarea);

//comprobar Input
tareaInput.addEventListener("click", comprobrarInput);
    
 //borrrando elemetos de la lista
for(var i=0; i<=lista.children.length -1; i++){
    lista.children[i].addEventListener("click", eliminarTarea);
}
}());