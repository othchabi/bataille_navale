
    const grille_joueur1 = document.querySelector('.grille1')
    const grille_joueur2 = document.querySelector('.grille2')

    const mes_bateaux = document.querySelectorAll('.bateau')
    const boutonrotation = document.querySelector('.rotation')
    const commencer = document.querySelector('.start')
    const monmessage = document.querySelector('.monmessage')
    const casejoueur1 = []
    const casejoueur2 = []
    const width = 10
  const player2 = {
    turn: false,
    ready:false
    
};
    createBoard(grille_joueur1, casejoueur1,1)
    createBoard(grille_joueur2, casejoueur2,2)


  //Cree le plateau de jeu

    function createBoard(grid, squares,num) {
        for (let i = 0; i < width*width; i++) {
          let square = document.createElement('div');
          square.dataset.id = i
          square.className = 'casejoueur'+num;
          grid.appendChild(square)
          squares.push(square)
        }
      }


//la classe bateau qui represente chaque bateau
   class boat{
      nom
      taille
      position=[]
      html
      flip=false
      validposition=false
      pose=false
      constructor(nom,taille,html){
        this.nom=nom
        this.taille=taille
        this.html=html
      }

get validposition(){
  return this.validposition
}
    get html(){
      return this.html
    }
      get taille(){
        return this.taille
      }
      get nom (){
        return this.nom
      }
  changeflip(){

    if(this.flip == false){this.flip=true}
    else {this.flip=false}
  }

     

       poser_le_bateau(c) {
         if(this.validposition){
        console.log("poser "+this.nom)  
        let temp=this.case_available(c)
      
         
       
       
        if (this.position.length != 0 ){
          
          for (let i=0  ; i < this.position.length;i++){
            casee[this.position[i]].classList.remove("case_"+this.nom)
            casee[this.position[i]].classList.add("casejoueur1")
          
              }
              this.position=[]
        
        
        
        
        
           
      


          }
          

      

     
        if (this.flip){
          console.log(temp)
        for (let i=0 ; i < this.taille; i++){
          
          casee[temp[i]].classList.remove("case2")
          casee[temp[i]].classList.add("case_"+this.nom)
          this.position.push(temp[i])
          
        }}
          else{
            
            for (let i=0  ; i < this.taille ; i++){
              
              casee[temp[i]].classList.remove("case2")
              casee[temp[i]].classList.add("case_"+this.nom)
              this.position.push(temp[i])
              
    
            }
          }
          this.pose=true

          bateau_choisi=new boat("null",0,null);
          this.html.classList.toggle('bateau-locked');


        }


         

       }
       position_est_valide(c){

        let prochaine_case=[]
        for(let i=0 ; i< this.taille;i++){
        if(this.flip)
        {prochaine_case.push(casee[c.dataset.id-i].className)}
        else{prochaine_case.push(casee[parseInt(c.dataset.id)+(i*width)].className)}
       
      
      }
      console.log(prochaine_case)

        if (this.flip){
          if((c.dataset.id) % 10 >= (this.taille-1)){
           this.validposition=true


          for(let i=0; i < prochaine_case.length ; i++){
            if( (prochaine_case[i].includes(" ")) && !(prochaine_case[i].includes(this.nom))){
                this.validposition=false
                
            }
          }

            
            c.classList.remove("casejoueur1")
            c.classList.add("case2")
            this.case_available(c)
             }

             }
        else{
          if(c.dataset.id < (width*width) - ((this.taille-1)*width)){

            this.validposition=true
            
            for(let i=0; i < prochaine_case.length ; i++){
              if( (prochaine_case[i].includes(" ")) && !(prochaine_case[i].includes(this.nom))){
                  this.validposition=false
                  console.log("ééfffffffffff")
              }
            }

                  
                    
                    c.classList.remove("casejoueur1")
                    c.classList.add("case2")
                    this.case_available(c)
             
           
           }
          }
      

            }




            case_available(c){
              console.log(this.flip)
              let mescases=[]

              if(this.flip){
                for (let i=0; i<this.taille;i++) {
                  mescases.push(parseInt(c.dataset.id - i))
                  casee[c.dataset.id - i].classList.remove("casejoueur1")
                  casee[c.dataset.id - i].classList.add("caseavailable")
          
                }


            }
            else{
           
                for (let i=0; i<this.taille;i++) {
                  mescases.push(parseInt(c.dataset.id)+(i*width))
                  casee[parseInt(c.dataset.id)+(i*width)].classList.remove("casejoueur1")
                  casee[parseInt(c.dataset.id)+(i*width)].classList.add("caseavailable")
            
                }
            }
           
            return mescases;

      }
    }

//le bouton qui permet de changer la sens du bateau 
   function rotation() {

    for( let i=0 ; i<ma_flotte.length;i++){
       console.log("flippp")
        ma_flotte[i].html.classList.toggle(ma_flotte[i].nom+"-2")
        ma_flotte[i].changeflip()

    }


      }
//les differents elements html (boutons) qui representent chaque choix de bateau

     const cr=document.querySelector(".croiseur");
     const ct=document.querySelector(".contre-torpilleur");
     const sm=document.querySelector(".sous-marin");
     const t=document.querySelector(".torpilleur");
     const pa=document.querySelector(".porte-avion");
     
    
    
         
     const casee=document.querySelectorAll(".casejoueur1");
     const casee2=document.querySelectorAll(".casejoueur2");
     const player1=[]




//On cree les bateaux du joueur
bateau_choisi=new boat("null",0,null)
croiseur=new boat("croiseur",4,cr)
sous_marin=new boat("sous-marin",3,sm)
porte_avion=new boat("porte-avion",5,pa)
torpilleur=new boat("torpilleur",1,t)
contre_torpilleur=new boat("contre-torpilleur",3,ct)
ma_flotte=[croiseur,sous_marin,porte_avion,torpilleur,contre_torpilleur]

//pour chaque bouton bateau on rajoute un listener dans le cas ou un choix est fait
mes_bateaux.forEach(bateau => bateau.addEventListener("click", function() {
  
  if (bateau_choisi.nom == "null" )
  
 {if(bateau.classList.contains("torpilleur")){
    t.classList.toggle('bateau-locked')
    bateau_choisi=torpilleur
    console.log(bateau_choisi.nom)
  }
  else if(
    bateau.classList.contains("sous-marin")){
    sm.classList.toggle('bateau-locked')
    
    bateau_choisi=sous_marin}

else if(bateau.classList.contains("porte-avion")){
  pa.classList.toggle('bateau-locked')
  
  bateau_choisi=porte_avion}

else if(bateau.classList.contains("croiseur")){
  cr.classList.toggle('bateau-locked')
 
  bateau_choisi=croiseur}
else if(bateau.classList.contains("contre-torpilleur")){
  ct.classList.toggle('bateau-locked')
 
  bateau_choisi=contre_torpilleur}}

  else { bateau_choisi=new boat("null",0)
  bateau.classList.toggle('bateau-locked')}
  
 

}));

     boutonrotation.addEventListener('click',rotation);
     
     let begin=false    
     commencer.addEventListener('click',function(){
       
        begin=true
        for(let i=0;i<ma_flotte.length;i++){

           if(!(ma_flotte[i].pose)){
                alert("veuillez placer votre "+ma_flotte[i].nom)
                begin=false
           }


        }
        if(begin){
          player.ready=true
          commencer.remove()
          boutonrotation.remove()
          if (!(player2.ready))
            {
              monmessage.innerHTML=` Choix Position Confirmé`;
              monmessage.classList.toggle("d-none")
              
              
              socket.emit("Demande commencer",player)
            }else{

           monmessage.innerHTML=` La partie a commencé c'est au tour de votre adversaire`;
           
           socket.emit("Debut partie",player)
        }

        
        for ( const vide of casee){
          vide.removeEventListener('mouseover',mouseOver);
          
          vide.removeEventListener('mousedown',mouseclick);
         }



      



     }}
     )

     

//pour chaque case on doit pouvoir savoir si la souris est sur la case et si un click a ete fait
     for ( const vide of casee){
       vide.addEventListener('mouseover',mouseOver);
       
       vide.addEventListener('mousedown',mouseclick);
      }

     
      
      function mouseOver(){
        clear()
       // console.log(bateau_choisi)
        
        

        if ( (bateau_choisi.nom != "null")) {
          
         bateau_choisi.position_est_valide(this)
        }
          else {
        clear()
       }
       //console.log("position of "+bateau_choisi," is "+valid_position,flip,this.dataset.id)
       return bateau_choisi;
      }


//fonction qui permet de reinitialiser toute la grille en changeant les proprietes css

      function clear(){
      for (let i = 0; i < width*width; i++) {
        if(casee[i].classList.contains("case2")){casee[i].classList.remove("case2")}
        if(casee[i].classList.contains("caseavailable")){casee[i].classList.remove("caseavailable")}
        casee[i].classList.add("casejoueur1")
      }}



//si un click a ete fait      
      function mouseclick(e){

     
        
//dans le cas ou aucun bateau n'est choisit rien n'est fait
        if(bateau_choisi.nom != "null" ) {
          //si 
        if( (bateau_choisi.validposition) ){
          
          

          bateau_choisi.poser_le_bateau(this)
        

        }

       
       
         }
        }
      
        socket.on("Info 2eme joueur",(p)=>{
   console.log("le joueur "+p.username+p.ready)
   console.log("le joueur "+player.username+p.ready)
          if (!(player.ready)) {
            player2.ready=true;
            monmessage.classList.toggle("d-none")
            monmessage.innerHTML=` L'adversaire a confirmé sa position faites de meme`;
           
      
          }

      

      })

      socket.on("a mon tour de commencer",(p)=>{

                
                 monmessage.innerHTML=`C'est mon tour de frapper`;
                 player.turn=true;
                 
                 for ( const vide of casee2){
    
    
                  vide.addEventListener('mousedown',attack_case);
                 }
                
           
               }
     
           
     
           )

socket.on("je joue", ()=>{
  monmessage.innerHTML=`C'est mon tour de frapper`;

  for ( const vide of casee2){
    
    
    vide.addEventListener('mousedown',attack_case);
   }

})

socket.on("joueur case reveal", (c) => {
  console.log(" On a attacker la case "+ c)

  socket.emit('renvoie serveur case',casee[c].className,player,c)

})

let bateauattacke={
  croiseur:0,
  contre_torpilleur:0,
  porte_avion:0,
  torpilleur:0,
  sous_marin:0

}
function JaiGagne(){

  if ((bateauattacke.croiseur==4)&&(bateauattacke.contre_torpilleur==3)&(bateauattacke.sous_marin==3)&(bateauattacke.porte_avion==5)&(bateauattacke.torpilleur==1)){
    return true;

  }
  else return false;


}
socket.on("contenu case", (n)=>{
  let k= case_attacke[case_attacke.length-1]
  console.log("la case "+k+" possede "+n)

  if (n.includes("croiseur")){

       bateauattacke.croiseur++;
       casee2[k].classList.add("caseavecbateau")


  }
  if (n.includes("sous_marin")){
       bateauattacke.sous_marin++;
       casee2[k].classList.add("caseavecbateau")
  }
  if (n.includes("porte_avion")){
        bateauattacke.porte_avion++;
        casee2[k].classList.add("caseavecbateau")
  }
  if (n.includes("contre_torpilleur")){
       bateauattacke.contre_torpilleur++;
       casee2[k].classList.add("caseavecbateau")
  }
  if (n.includes("torpilleur")){
       bateauattacke.torpilleur++;
       casee2[k].classList.add("caseavecbateau")
  }
  else{
    casee2[k].classList.add("casesansbateau")
  }


 console.log(bateauattacke)

})


let case_attacke=[]
function attack_case(){

  if (!(case_attacke.includes(this))) {
     case_attacke.push(this);
     socket.emit("serveur case reveal",player,this.dataset.id)
     console.log(case_attacke[0].dataset.id)
     console.log("Le joueur "+player.username+"a attaque la case "+this.dataset.id )
     console.log(case_attacke)


 for ( const vide of casee2){
    
    
  vide.removeEventListener('mousedown',attack_case);
 }
 player.turn=false
 monmessage.innerHTML=`C'est au tour de mon adversaire`;
 socket.emit("tour de l'adversaire",player);}

}

