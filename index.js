//Variable formulario
const formulario = document.querySelector('#formulario');
const tituloForm = document.querySelector('#titulo-formulario');
const task = document.querySelector(".tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas"); 

let tareas = []; //Array vacio
//console.log(formulario)

//Eventos
//Cuando se genere un evento submit que llame a la funcion validar formulario
//Modo 1 formulario.addEventListener("submit", validarFormulario);
//Modo 2Creando una funcion eventos y llamando a la funcion
// function eventos(){
//     formulario.addEventListener("submit", validarFormulario);    
// }
// eventos();

//Modo tres: abrir parentesis y enviar una funcion flecha. Creamos parentesis vacios. De este modo todos los eventos creados en este archivo, SOLO PODRAN UTILIZARSE EN ESTE ARCHIVO 
//Y NO PODRAN SER LLAMADOS DESDE OTRO ARCHIVO.
(()=>{
    formulario.addEventListener("submit", validarFormulario);
    task.addEventListener("click", eliminarTarea);
    task.addEventListener("click", tareaCompletada);
})()


//Funciones
function validarFormulario(e){
    //prevent default evitar los eventos por defecto de los formularios
    e.preventDefault();

    //1- VALIDAR LOS DATOS DEL FORMULARIO
    const tarea = document.querySelector("#tarea").value;
    //console.log(tarea); Para revisar que se tome el valor del input.

    /* Opcion 1: Alertar que hay un formulario vacio
    if(tarea.length < 1) {
        console.log('Formulario vacio');
    }*/

    if(!tarea.trim()) {
        console.log('No hay contenido en tu tarea'); //Si no hay nada escrito se aquí.
        tituloForm.textContent = "No hay contenido en tu tarea" //Si no hay texto cambia el titular a Formulario vacio;
        setTimeout(()=>{
            tituloForm.textContent = "Ingresa tu tarea"
        }, 2000 ) //Recibe un callback, una funcion dentro, y recibe como segundo parámetro 2000 ms de tiempo
        return //Si hay un texto lo guarda
    }

    //2- Crea un objeto
    const objTarea = {
        id: Date.now(), //Metodo Javascript para mostrar una fecha y los milisegundos que pasaron desde la fecha
        tarea: tarea,
        estado: false,
    }
    /*Se muestra el contenido del objeto
    console.log(objTarea);*/
    tareas = [...tareas , objTarea]; //Uso del spread. El arreglo inicialmente esta vacio. Una vez se agregan tareas, el spread hace que persistan las tareas anteriores y agrega una nueva tarea.
    console.log(tarea); //Se muestra el texto.
   // console.log(tareas) Se muestra lo que pasa en Tareas
   formulario.reset(); //Borra el contenido dentro del formulario 
    mostrarHTML(); //LLama a la funcion
    
}
function mostrarHTML() {
    task.innerHTML='';//Que inicie vacio
    if(tareas.length === 0) {
        const mensaje = document.createElement("h5");
        mensaje.textContent = "Sin tareas";
        task.appendChild(mensaje);
        total.textContent=`Total tareas: 0`;
        completadas.textContent=`Tareas completadas: 0`;
        return
    }
    
    /*For each recibe un callback 
    /*item hace referencia a cada objeto dentro del array tareas*/
    tareas.forEach((item)=>
    {
        const itemTarea = document.createElement("div"); //Crear un div
        itemTarea.classList.add("item-tarea") //Agregar al div la clase item-tarea
        /*
            -Item tarea original-
            <p>${item.tarea}</p>
            -Cambio: 
            --Agregar condicion con operador ternario en item.tarea
            Si item.estado es true entonces que ejecute agregar clase completa porque la tarea esta completada
            En caso contrario
            ${item.estado ? (
                `
                <p class="completada">${item.tarea}</p>
                `
            ):(
                <p>${item.tarea}</p>
            )}

        */
        itemTarea.innerHTML = `
        ${item.estado ? (
            `
            <p class="completa" >${item.tarea}</p>
            `
        ):(
            `
            <p>${item.tarea}</p>
            
            `
        )}
        <div class="botones">
            <button data-id="${item.id}" class="eliminar">x</button>
            <button data-id="${item.id}" class="completada">?</button>
        </div>
        `;
        task.appendChild(itemTarea) ;
        //console.log(item)

        //mostrar el total de tareas y las completadas
        //contar la extensión de la variable tareas y mostrar el total de tareas
        const totalTareas = tareas.length;
        total.textContent=`Total tareas: ${totalTareas}`;
        //Tareas completadas
        const tareasCompletadas = tareas.filter(item => item.estado===true).length
        //console.log(`tareas completadas ${tareasCompletadas}`);
        completadas.textContent=`Tareas completadas: ${tareasCompletadas}`;
    })
}

/*Eliminar tarea*/
function eliminarTarea(e) {
    /*target muestra lo que hay al hacer click*/
    /*e.target.classList.contains("eliminar") BUSCA DENTRO DEL ELEMENTO LA CLASE ELIMINAR*/
    //console.log(e.target.classList.contains("eliminar")) ;
    if (e.target.classList.contains("eliminar")) {
        // const tareaID = e.target.getAttribute("data-id"); Asi se trae el atributo como string
        const tareaID = Number(e.target.getAttribute("data-id")); //trae el atributo como numero
        console.log("diste click en eliminar");
        console.log(tareaID); //esta tomando el id como un string
        /*LLama al array tareas. 
        Utiliza el método filter que recibe una función callback.
        Item hace referencia a cada item del array tareas.
        item.id !==tareaID Retorna los ID distintos al tareaID que estamos seleccionado.*/
        const newTask = tareas.filter ((item)=>item.id !==tareaID);
        console.log (newTask);
        tareas = newTask; //Tareas toma el listado nuevo de tareas
        
        mostrarHTML();
    }
}

/*Tarea completada*/
function tareaCompletada(e){
    /*target muestra lo que hay al hacer click*/
    /*e.target.classList.contains("eliminar") BUSCA DENTRO DEL ELEMENTO LA CLASE ELIMINAR*/
    //console.log(e.target.classList.contains("eliminar")) ;
    if (e.target.classList.contains("completada")) {
        // const tareaID = e.target.getAttribute("data-id"); Asi se trae el atributo como string
        const tareaID = Number(e.target.getAttribute("data-id")); //trae el atributo como numero
        console.log("diste click en eliminar");
        console.log(tareaID); //esta tomando el id como un string
        
        /*Dar por completa la tarea*/
        /*Si el item.id tiene igualdad a tareaID entonces que el estado cambie del actual.
        Que luego retorne el item modificado.
        En caso contrario solo devuelva el item.
        */
        const newTask = tareas.map((item)=>{
            if(item.id === tareaID){
                item.estado = !item.estado; //si era false lo vuelve true e inverso.
                return item;
            }else {
                return item;
            }
        })
        mostrarHTML();
    }
}