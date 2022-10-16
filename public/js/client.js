

const socket= io();


const player = {
    host: false,
    roomId: null,
    username: "",
    socketId: "",
    turn: false,
    win: false,
    ready:false
    
};

const zonepseud = document.querySelector(".zone-pseudo");
const zoneserv = document.querySelector(".zone-serveur");
const zonecreateserv = document.querySelector(".zone-cree-serveur");
const zonedejeu = document.querySelector(".zonedejeu");
//const zonejoinserv = document.querySelector(".zone-rejoindre-serveur");
const form = document.querySelector(".pseudo");
const roomsList = document.getElementById('rooms-list');
const boutoncreeserv = document.querySelector(".createserv");
//const  boutonjoinserv = document.querySelector(".joinserv");
const  return1 = document.querySelector(".return1");
const  return2 = document.querySelector(".return2");

const startgame= document.querySelector(".startgame")
const adversairenom= document.querySelector(".adversairenom")


let pseudo





socket.on('has_joined', (joueur) => {

    html =` ${joueur.username} A rejoint ma partie 
                                                   
     <span class="sr-only"> ${joueur.username}  </span></div>
    
      `;
    
    adversairenom.innerHTML=html
    
    startgame.classList.toggle("d-none");
    
    
    
    
    })



socket.on("Info 2eme joueur",(player)=>{

    if (player.ready){
        alert("La partie peut commencer")

    }
    else{
        alert("Attendez le 2 eme joueur")
    }
})

socket.on('joining', (joueur) => {

html =` Vous avez rejoint la partie de ${joueur.username}
                                               
 <span class="sr-only"> ${joueur.username}  </span></div>

  `;

adversairenom.innerHTML=html
console.log(joueur.username +" A rejoint ")
socket.emit("Salon complet",(joueur.roomId))




})

socket.emit('lister les salons');
socket.on('liste salons', (salons) => {
    let html = "";
    console.log(salons.length +" salons disponibles")
    if (salons.length > 0) {
        salons.forEach(room => {
            if (room.joueurs.length !== 2) {
                html += `<li class="list-group-item d-flex justify-content-between">
                            <p class="p-0 m-0 flex-grow-1 fw-bold">Salon de ${room.joueurs[0].username} - ${room.id}</p>
                            <button class="btn btn-sm btn-success join-room" data-room="${room.id}">Rejoindre</button>
                        </li>`;
            }
        });
    }
    else{

        html=`<li class="list-group-item d-flex justify-content-between">
                            <p class="p-0 m-0 flex-grow-1  fw-bold">Aucun Salon Disponible</p>
                           
                        </li>`;
    }

    if (html !== "") {
       // zoneserv.classList.remove('d-none');
        roomsList.innerHTML = html;

        for (const element of document.getElementsByClassName('join-room')) {
            element.addEventListener('click', joinRoom, false)
        }
    }
});

socket.on('join room', (roomId) => {
    player.roomId = roomId;
    linkToShare.innerHTML = `<a href="${window.location.href}?room=${player.roomId}" target="_blank">${window.location.href}?room=${player.roomId}</a>`;
});


socket.on('commencer',function() {
    zonecreateserv.classList.toggle("d-none");
    zonedejeu.classList.toggle("d-none");

});

socket.on('monserv',(rid) => {
    player.roomId= rid;
});



startgame.addEventListener("click", function (){
    console.log("debut partie")
    socket.emit("Partie commence",player);
     
     



})

form.addEventListener("submit", function (event) {
	// stop form submission
    console.log("dezdze")
    

    event.preventDefault();
    
    pseudo=form.elements.mypseudo.value
    sessionStorage.setItem("pseudosession",pseudo)
    player.username=pseudo
    player.socketId=socket.id
    zonepseud.classList.toggle("d-none")
    zoneserv.classList.toggle("d-none")
    document.getElementById("monpseudo").innerHTML = pseudo;

  

})


boutoncreeserv.addEventListener("click",function(){

 
   zoneserv.classList.toggle("d-none")
   player.host=true
   
   zonecreateserv.classList.toggle("d-none")

   socket.emit("Cree Salon",player)


   
})

return1.addEventListener("click",function(){
   
    zonecreateserv.classList.toggle("d-none")
    zoneserv.classList.toggle("d-none")
    
        socket.emit("Deconnexion Hote",player)
    }


)

const joinRoom = function () {
  
        player.roomId = this.dataset.room;

        socket.emit("Rejoindre partie",player)
        zoneserv.classList.toggle("d-none")
        zonecreateserv.classList.toggle("d-none")


    }
