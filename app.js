const { Socket } = require('socket.io');


const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');
const port = 8080;

/**
 * @type {Socket}
 */
const io = require('socket.io')(http);


app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname ,'template/index.html'))
})
app.get('/serveur',(req,res)=>{
    res.sendFile(path.join(__dirname ,'template/serveur.html'))
})
app.get('/monserveur',(req,res)=>{
    res.sendFile(path.join(__dirname ,'template/monserveur.html'))
})

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

let salons =[]
io.on('connection',(socket)=>{
    socket.on("Cree Salon",(joueur)=>{

        let salon=creesalon(joueur)
        //console.log("["+joueur.username+"] A créer un salon public avec un room id "+salon.id)
        io.to(joueur.socketId).emit('monserv',salon.id)


     
    })

  socket.on("Partie commence", (j) => {

     
    salons.forEach(s => {
            
        if (s.id === j.roomId) {
            let temp1=s.joueurs[0].socketId;
            let temp2=s.joueurs[1].socketId;
            io.to(temp1).emit('commencer')
           

            io.to(temp2).emit('commencer')
            

        }

    })

  })
    socket.on("Salon complet", (r) => {
   
        salons.forEach(s => {
            
            if (s.id == r) {
                temp=s.joueurs[0].socketId
                io.to(temp).emit('has_joined',s.joueurs[1])
                
            }
    
        })
         

    })
    socket.on("Demande commencer",(joueur)=>{

        salons.forEach(s => {
            
            if (s.id == joueur.roomId) {
                if(s.joueurs[0]!=joueur){
                    temp=s.joueurs[1].socketId
                    io.to(temp).emit('Info 2eme joueur',s.joueurs[0])
 
                }
                else{ 
                    temp=s.joueurs[0].socketId
                    io.to(temp).emit('Info 2eme joueur',s.joueurs[1])

                }
                
            }
    
        })

    })



    socket.on("tour de l'adversaire",(joueur)=>{

        salons.forEach(s => {
            
            if (s.id == joueur.roomId) {
                if(s.joueurs[0].username!=joueur.username){
                    temp=s.joueurs[0].socketId
                    io.to(temp).emit('je joue')
 
                }
                else{ 
                    temp=s.joueurs[1].socketId
                    io.to(temp).emit('je joue')

                }
                
            }
    
        })

    })

    

    socket.on("serveur case reveal",(j,c)=>{

        salons.forEach(s => {
            
            if (s.id == j.roomId) {
                if(s.joueurs[0].username!=j.username){
                    temp=s.joueurs[0].socketId
                    console.log(j.username +" a attaquer "+c)
                    io.to(temp).emit('joueur case reveal',c)
 
                }
                else{ console.log(j.username +" a attaquer "+c)
                    temp=s.joueurs[1].socketId
                    io.to(temp).emit('joueur case reveal',c)

                }
                
            }
    
        })

    })

    socket.on("renvoie serveur case",(c,j)=>{

        salons.forEach(s => {
            
            if (s.id == j.roomId) {
                if(s.joueurs[0].username!=j.username){
                    console.log(j.username +" a envoyé "+ c)
                    temp=s.joueurs[0].socketId
                    io.to(temp).emit('contenu case',c)
 
                }
                else{ console.log(j.username +" a envoyé "+ c)
                    temp=s.joueurs[1].socketId
                    io.to(temp).emit('contenu case',c)

                }
                
            }
    
        })

    })

    

    socket.on("Debut partie",(joueur)=>{

        salons.forEach(s => {
            
            if (s.id == joueur.roomId) {
                if(s.joueurs[0]!=joueur){
                    temp=s.joueurs[0].socketId
                   
                    io.to(temp).emit('a mon tour de commencer',s.joueurs[1])
 
                }
                else{ 
                    temp=s.joueurs[1].socketId
                    io.to(temp).emit('a mon tour de commencer',s.joueurs[0])

                }
                
            }
    
        })

    })


    socket.on("Rejoindre partie",(joueur)=>{
       
        
        salons.forEach(s => {
            
                if (s.id == joueur.roomId) {
                    s.joueurs.push(joueur)
                   
                    console.log("["+(s.joueurs[1]).username+"] "+ "A rejoint la partie de "+(s.joueurs[0]).username)
                    io.to(socket.id).emit('joining',s.joueurs[0])
                }
        
            }
            )})

            
     
            socket.on("Check Other Players",function(){

            })


    socket.on("disconnect",function(){

        console.log("il y a eu deconnexion")
        
        let salon= null
        salons.forEach(s => {
            s.joueurs.forEach(j => {
                if (j.socketId === socket.id && j.host) {
                    
                    salon = s;
                    salons = salons.filter(s => s !== salon);
                    console.log(salons)
                }
        
            }
            )})
    })

    socket.on("Deconnexion Hote",(joueur)=>{

      
        //console.log("["+joueur.username+"] A quitter le salon public qu'il a créer " + joueur.roomId)
        //console.log("[disconnect] "+socket.id);
        let salon = null;

        salons.forEach(s => {
            s.joueurs.forEach(j => {
                if (j.socketId === socket.id && j.host) {
                    salon = s;
                    salons = salons.filter(s => s !== salon);
                }
        
            }
            )})

        })
    socket.on("lister les salons", () =>{

        //console.log("fzroifn")
        io.to(socket.id).emit('liste salons',salons)
        
       
    })

})

function creesalon(joueur){

    const salon = {id:roomId(),joueurs:[]}
    joueur.roomId=salon.id
    salon.joueurs.push(joueur);
    salons.push(salon)
    return salon;
}
function roomId(){

    return Math.random().toString(36).substring(2,9);
}