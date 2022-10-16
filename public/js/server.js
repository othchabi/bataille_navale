
const form = document.querySelector("#pseudo");
const boutoncreeserv = document.querySelector(".createserv");






if (form != null){let pseudo
form.addEventListener("submit", function (event) {
	// stop form submission
    event.preventDefault();
    
    pseudo=form.elements.mypseudo.value
    sessionStorage.setItem("pseudosession",pseudo)
    location.href = 'serveur'

})}

if((String(location.href).match("serveur"))!= null){
    
    ps=sessionStorage.getItem('pseudosession');
    document.getElementById("monpseudo").innerHTML = ps;

}

