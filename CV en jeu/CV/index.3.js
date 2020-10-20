
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
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
let toucheEspace = false;
let positionDuTireur = 202;
let positionDuMur = 0;
const vitesse = 10;
const arriereplan = new Image();
arriereplan.src = "./Assets/photos/photos/htlmjscssboot.png";

var balle = new Image();
balle.src = "./Assets/photos/photos/image2.1.jpg";



const Raquette = {
  x: canvas.width / 2 - raquetteLong / 2,
  y: canvas.height - largeurRaquette - hauteur,
  longueur: raquetteLong,
  largeur: largeurRaquette,
  vitesse: 10,
  vecteurzenith: -1,
};



//dessine la raquette
function dessinneRaquette() {
  ctx.fillStyle = "blue";
  ctx.fillRect(Raquette.x, 660, Raquette.longueur, Raquette.largeur);
}

//controle de la raquette
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    toucheGauche = true;
  } else if (event.keyCode == 39) {
    toucheDroite = true;
  } else if (event.keyCode == 32) {
    toucheEspace = true;
    declencherTir();
  } else if (event.keyCode == 38) {
    toucheHaut = true;
  } else if (event.keyCode == 40) {
    toucheBas = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 37) {
    toucheGauche = false;
  } else if (event.keyCode == 39) {
    toucheDroite = false;
  } else if (event.keyCode == 32) {
    toucheEspace = false;
  } else if (event.keyCode == 38) {
    toucheHaut = false;
  } else if (event.keyCode == 40) {
    toucheBas = false;
  }
});

const Balle = {
  x: canvas.width / 2,
  y: 675,
  rayon: rayonBalle,
  vitesse: 15,
  vecteurhorizon: 0,
  vecteurzenith: -1,
};


// bouger le truc
function bougerLaRaquette() {
  if (toucheDroite && Raquette.x + Raquette.longueur < canvas.width) {
    Raquette.x += Raquette.vitesse;
  } else if (toucheGauche && Raquette.x > 0) {
    Raquette.x -= Raquette.vitesse;
  } else if (toucheHaut && Raquette.y + Raquette.largeur > canvas.height) {
    Raquette.x -= Raquette.vitesse;
  } else if (toucheBas && Raquette.y + Raquette.largeur < canvas.height) {
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
  ecartEntreBriques: 5,
};

var murDeBriques = [];
for (c = 0; c < Brique.colonnes; c++) {
  murDeBriques[c] = [];
  for (l = 0; l < Brique.lignes; l++) {
    murDeBriques[c][l] = { x: 10, y: 200 };
  }
}

function dessineLeMurdebriques() {
  for (var c = 0; c < Brique.colonnes; c++) {
    for (var l = 0; l < Brique.lignes; l++) {
      Brique.x =
        c * (Brique.long + Brique.ecartEntreBriques) +
        Brique.decalageGauche +
        660;
      Brique.y =
        l * (Brique.larg + Brique.ecartEntreBriques) + Brique.decalageHaut -5;

      murDeBriques[c][l] = {x:Brique.x,y: Brique.y};

      ctx.fillStyle = "red";
      ctx.fillRect(Brique.x, Brique.y, Brique.long, Brique.larg);
    }
  }
}

function dessinneLaBalle() {
  ctx.beginPath();
  ctx.arc(Raquette.x + 50, Raquette.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  //ctx.closePath();
}


//fonction dessin
function dessinne() {
  dessinneRaquette();
  //dessineLeMurdebriques();


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
  //raquetteQuiBouge();
  //collisionsBalleMur();
}

//repetition
function repetition() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 500, canvas.width, 300);
  requestAnimationFrame(repetition);
  dessinne();
  //maj();
}
dessineLeMurdebriques();
repetition();
//dessinne();
//remiseEnJeu();

//////
var prochainCarre = 1;

function prochainCarreLibre() {
  return prochainCarre++;
}

function declencherTir() {
  console.log("tir déclenché");
  tirerVers(prochainCarreLibre());
}

Raquette.x = 650;
arriereplan.x = 0;

var carreSize = 50;

function tirerVers(prochainCarre) {
  if (prochainCarre <= 16) {
    //deplacer la raquette
    console.log("dep");
    Raquette.x = 650 + (prochainCarre % 4) * 50;

    
    var col = (prochainCarre - 1) % 4;
    var ligne = 3 - Math.floor((prochainCarre - 1) / 4);
    var brique = murDeBriques[col][ligne];
   // console.log(brique);
    //tirer
    bougerLaBalle(Raquette.y,brique.x, brique.y)
    //eclater le carré
    ctx.clearRect(brique.x, brique.y, 50, 50);
  }
}
//var arcY  = Raquette.y
function bougerLaBalle(arcY,x,y) {
    var arcX  = Raquette.x + 50;    
    if(arcY > y){
        console.log(arcY,y)
        ctx.clearRect(arcX-10, arcY-10, 20, 20);
        ctx.beginPath();    
        ctx.arc(arcX+500,arcY+100 , 10, 0, Math.PI * 2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
       // setTimeout(() => {bougerLaBalle(arcY+50,x,y),3000});
    }
  }

