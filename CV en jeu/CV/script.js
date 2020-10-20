const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 700;
canvas.width = 1575;
//paramettres fixes
const raquetteLong = 100;
const largeurRaquette = 40;
const hauteur = 10;
const rayonBalle = 10;
let findeGame = false;
let toucheGauche = false;
let toucheDroite = false;
let toucheHaut = false;
let toucheBas = false;
let toucheEspace= false; 
let positionDuTireur = 202; 
let positionDuMur=0; 
const vitesse = 10; 
const arriereplan = new Image();
arriereplan.src = "./Assets/photos/photos/htlmjscssboot.png";

var balle = new Image() ;
balle.src = "./Assets/photos/photos/image2.1.jpg"; 
 



/*var Ballistique = function projo () {
    ctx.beginPath();
    ctx.arc(1000, 400, rayonBalle, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    return projo(); 
} 

Ballistique.display = "none"; */


    /*ctx.lineTo(150, 50);
    let triHeight = 50 * Math.tan(degToRad(60));
    ctx.lineTo(100, 50+triHeight);
    ctx.lineTo(50, 50);
    ctx.fill();*/



const Raquette = {
    x: canvas.width / 2 - raquetteLong / 2,
    y: canvas.height - largeurRaquette - hauteur,
    longueur: raquetteLong,
    largeur: largeurRaquette,
    vitesse: 10, 
    vecteurzenith: -1
    
}

/*const Balle = {
    x:canvas.width/2, 
    y: 675,
    rayon: rayonBalle,
    vitesse: 15,
    vecteurhorizon:0, 
    vecteurzenith: -1,
    
}*/

/*let dessinDeBalle = function dessinneLaBalle() {
    ctx.beginPath();
    ctx.arc(Balle.x, Balle.y, Balle.rayon, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}*/


//dessine la raquette 
function dessinneRaquette() {
    ctx.fillStyle = "blue"; 
    ctx.fillRect(Raquette.x, 660, Raquette.longueur, Raquette.largeur); 
}

//controle de la raquette 
document.addEventListener("keydown",function(event){
    if (event.keyCode == 37){
        toucheGauche = true ;
    
    } else if (event.keyCode == 39){
        toucheDroite = true; 

    } else if (event.keyCode == 32){
        toucheEspace = true;
         bastoss; 
        
    
    } else if (event.keyCode == 38 ) {
        toucheHaut = true; 
    } else if (event.keyCode == 40) {
        toucheBas = true; 
    }
});

document.addEventListener("keyup",function(event){
        if (event.keyCode == 37){
            toucheGauche = false ;
        } else if (event.keyCode == 39){
            toucheDroite = false; 
        } else if (event.keyCode == 32) {
            toucheEspace = false; 
            
        } else if (event.keyCode == 38 ) {
            toucheHaut = false; 
        } else if (event.keyCode == 40 ) {
            toucheBas = false; 
        }
});

const Balle = {
    x:canvas.width/2, 
    y: 675,
    rayon: rayonBalle,
    vitesse: 15,
    vecteurhorizon:0, 
    vecteurzenith: -1,
    
}
/*function carreViolet () {
    ctx.fillStyle = 'rgba(255, 0, 255, 0.75)';
    ctx.fillRect(canvas.width/2 -15, Raquette.y+10, 50, 50);
}
carreViolet(); 
var bastoss = carreViolet(); 
*/


    /*if(e.key == 37) {
        toucheGauche = true ;
    }else if (e.key== 39){
        toucheDroite = true; 
    
    } else if (e.key == 32){
            toucheEspace= true; 
        
    } else if (e.key == 38){
        toucheHaut = true; 
    } if (e.key ==32 ){
        Balle.display ="block"; 
    }
    }); */


        /*if (event.key == 37){
            toucheGauche = false ;
        }else if (e.key == 39){
            toucheDroite = false; 
        }  else if (e.key == 32){
            toucheEspace = false; 
        } else if (e.key == 38) {

        }
        });*/


// bouger le truc
function bougerLaRaquette() {
    if (toucheDroite && Raquette.x + Raquette.longueur < canvas.width) {
        Raquette.x += Raquette.vitesse;
    } else if (toucheGauche && Raquette.x > 0) {
        Raquette.x -= Raquette.vitesse;
    }
    else if  (toucheHaut && Raquette.y + Raquette.largeur >  canvas.height) {
        Raquette.x -= Raquette.vitesse;
    } else if (toucheBas && Raquette.y + Raquette.largeur < canvas.height){
        Raquette.x += Raquette.vitesse; 
    }
}



const Brique = {
    x: 650,
    y: 200,
    long: 50, 
    larg: 50,
    colonnes: 4, 
    lignes: 4, 
    decalageHaut: 15, 
    decalageGauche: 15,
    ecartEntreBriques: 5
}

var murDeBriques = []; 
for (c=0; c < Brique.colonnes; c++) {
            murDeBriques[c]=[]; 
for (l =0; l < Brique.lignes; l++) {
    murDeBriques[c][l] = {x:10,y: 200}; 
            }
        }

function dessineLeMurdebriques() {

    for ( var c = 0; c < Brique.colonnes; c++) {
    for ( var l = 0; l < Brique.lignes; l++) {
         Brique.x = (c*(Brique.long + Brique.ecartEntreBriques)) + Brique.decalageGauche +670
         ; 
         Brique.y = (l*(Brique.larg + Brique.ecartEntreBriques)) + Brique.decalageHaut-40; 

            murDeBriques [c][l]= Brique.x
            murDeBriques [c][l]= Brique.y

    ctx.fillStyle = "red";
    ctx.fillRect(Brique.x, Brique.y, Brique.long, Brique.larg);
        }
    }
}

function dessinneLaBalle() {
    ctx.beginPath();
    ctx.arc(Raquette.x + 50, Raquette.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();  
    
}
 



/*const Brique = {
    colonnes: 4,
    rangees: 7,
    longueur: 50,
    largeur: 50,
    decalageHaut: 15, 
    decalageGauche: 15,
    ecartEntreBriques: 5

}

var murDeBriques = []; 
for (c=0; c < Brique.colonnes; c++) {
            murDeBriques[c]=[]; 
for (l =0; l < Brique.lignes; l++) {
    murDeBriques[c][l] = {x:1200,y: 100}; 
            }
        }

function dessineLeMurdebriques() {

            for ( var c = 0; c < Brique.colonnes; c++) {
            for ( var l = 0; l < Brique.lignes; l++) {
                 Brique.x = (c*(Brique.long + Brique.ecartEntreBriques)) + Brique.decalageGauche; 
                 Brique.y = (l*(Brique.larg + Brique.ecartEntreBriques)) + Brique.decalageHaut; 
        
                    murDeBriques [c][l]= Brique.x
                    murDeBriques [c][l]= Brique.y
        
            ctx.fillStyle = "red";
            ctx.fillRect(Brique.x, Brique.y, Brique.long, Brique.larg);
                }
            }
        }*/

//fonction tir 
//on dessinne la balle
/*function dessinneLaBalle() {
    ctx.beginPath();
    ctx.arc(Balle.x, Balle.y, Balle.rayon, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}*/




/*const Brique = {
    x: 1500,
    y:10,
    long: 50, 
    larg: 50,
    colonnes: 4, 
    lignes: 4, 
    decalageHaut: 30, 
    decalageGauche: 30,
    ecartEntreBriques: 10
}

var murDeBriques = []; 
for (c=0; c < Brique.colonnes; c++) {
            murDeBriques[c]=[]; 
for (l =0; l < Brique.lignes; l++) {
    murDeBriques[c][l] = {x:1200,y: 10}; 
            }
        }

function dessineLeMurdebriques() {

    for ( var c = 0; c < Brique.colonnes; c++) {
    for ( var l = 0; l < Brique.lignes; l++) {
         Brique.x = (c*(Brique.long + Brique.ecartEntreBriques)) + Brique.decalageGauche; 
         Brique.y = (l*(Brique.larg + Brique.ecartEntreBriques)) + Brique.decalageHaut; 

            murDeBriques [c][l]= Brique.x
            murDeBriques [c][l]= Brique.y

    ctx.fillStyle = "red";
    ctx.fillRect(Brique.x, Brique.y, Brique.long, Brique.larg);
        }
    }
}*/


/*function raquetteQuiBouge () {
    Raquette.y -= Raquette.vecteurzenith; 
}*/


 

/*function collisionsBalleMur() {
    if (Balle.x + Balle.rayon > canvas.width || Balle.x - Balle.rayon < 0) {
        Balle.vecteurhorizon = -Balle.vecteurhorizon;
    }
    if (Balle.y - Balle.rayon < 0) {
        Balle.vecteurzenith = -Balle.vecteurzenith;
    }
    if (Balle.y + Balle.rayon > canvas.height) {
    

    }
}*/

/*function colisionBalleEtRaquette() {

    if (Balle.x < Raquette.x + Raquette.longueur && Balle.x > Raquette.x &&
        Raquette.y < Raquette.y + Raquette.largeur && Balle.y > Raquette.y) {

        let lieuxDeCollision = Balle.x - (Raquette.x + Raquette.longueur / 2);

        lieuxDeCollision = lieuxDeCollision / (Raquette.longueur / 2);

        let angleDeRenvoi = lieuxDeCollision * (Math.PI / 3);


        Balle.vecteurhorizon = Balle.vitesse * Math.sin(angleDeRenvoi);
        Balle.vecteurzenith = -Balle.vitesse * Math.cos(angleDeRenvoi);

    }

}*/

/*const Brique = {
    colonnes: 4,
    rangees: 7,
    longueur: 50,
    largeur: 50,
    offSetLeft: 15,
    offSetTop: 15,
    marginTop: 5,
    fillColor: "red"

}

var briques = [];

function fabriques() {
    for ( let i = 0; i < Brique.rangees; i++) {
        for (let d = 0 ; d < Brique.colonnes ; d++){
            briques.push({
            x: (i *(Brique.offSetLeft + Brique.longueur)) + Brique.offSetLeft,
            y: (d * (Brique.offSetTop + Brique.longueur)) + Brique.offSetTop + Brique.marginTop,
            statut: true
            });
        }
    }
}
fabriques(); 

        
    /*constructionDesBriques();
    for (let r = 0; r < Brique.rangees; r++) {
            briques[r] = [];
            for (let c = 0; c < Brique.colonnes; c++) {
                briques[r][c] = {
                    x: c * (Brique.offSetLeft + Brique.longueur) + Brique.offSetLeft,
                    y: r * (Brique.offSetTop + Brique.largeur) + Brique.offSetTop + Brique.marginTop,
                    etat: true
                }
            }
        }

    }
    constructionDesBriques();

    function dessinBriques() {
        briques.forEach(function(brick) {
            if (!Brique.status) return; 

            ctx.beginPath();
            ctx.rect(Brique.x, Brique.y, brique.longueur, brique.largeur); 
            ctx.fillStyle = "red"; 
            ctx.fillRect(); 
            ctx.closePath(); 
        });
    }
dessinBriques();

    function collision() {
        briques.forEach(function(b) {
            if (!Brique.status) return; 

            var colonnesDeBriques = x > b.x && x < b.x + brique.longueur,
                rangeesDeBriques = y > b.y && y < b.y + brique.largeur; 

            if (colonnesDeBriques && rangeesDeBriques) {
                dy = -dy;
                b.status = 0; 
            }
        })
    }*/
    
    //fonction dessin
    function dessinne() {
        dessinneRaquette();
     dessineLeMurdebriques(); 
    
     //dessinneLaBalle(); 
     
     
    
}

    //on crée la remise en jeu 
    /*function remiseEnJeu() {
        Balle.x = canvas.width / 2;
        Balle.y = 640 - rayonBalle;
        Balle.vecteurhorizon = 3 * (Math.random() * 2 - 1);
        Balle.vecteurzenith = -3;
    }
*/

    function maj() {
        bougerLaRaquette(); 
        raquetteQuiBouge(); 
        //collisionsBalleMur(); 
    
    

    }


    //repetition
    function repetition() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(repetition)
        dessinne();
        maj(); 
    }
    repetition();
    //remiseEnJeu();