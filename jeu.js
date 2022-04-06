function message(x, y) {

    // Phase de choix ?
    if (phase.action == 'choisir' && jeu[y][x].etat == 'possible') {

        // Mise à jour de la phase de jeu :
        phase.action = 'pousser'

        // Définition des états des blocs :
        for (jy in jeu) {
            for (jx in jeu) {
                jeu[jy][jx].etat = 'impossible';
            }
        }

        jeu[y][x].etat = 'choisi';

        if (x != 0) {
            jeu[y][0].etat = 'possible';
        }
        if (x != 4) {
            jeu[y][4].etat = 'possible';
        }
        if (y != 0) {
            jeu[0][x].etat = 'possible';
        }
        if (y != 4) {
            jeu[4][x].etat = 'possible';
        }

    // Phase de pousse ?
    } else if (phase.action == 'pousser' && jeu[y][x].etat == 'possible') {

        // Décalage des blocs poussés et apparition du symbole du joueur :
        let chx;
        let chy;
        for (jy in jeu) {
            for (jx in jeu) {
                if (jeu[jy][jx].etat == 'choisi') {
                    chx = jx
                    chy = jy;
                }
            }
        }
        let pousses;
        if (x == chx) {
            if (y > chy) {
                pousses = y - chy;
                while (pousses > 0) {
                    jeu[y - pousses][x].case = jeu[y - pousses + 1][x].case;
                    pousses -= 1;
                }
            } else if (y < chy) {
                pousses = chy - y;
                while (pousses > 0) {
                    jeu[y + pousses][x].case = jeu[y + pousses - 1][x].case;
                    pousses -= 1;
                }
            }
        } else if (y == chy) {
            if (x > chx) {
                pousses = x - chx;
                while (pousses > 0) {
                    jeu[y][x - pousses].case = jeu[y][x - pousses + 1].case;
                    pousses -= 1;
                }
            }else if (x < chx) {
                pousses = chx - x;
                while (pousses > 0) {
                    jeu[y][x + pousses].case = jeu[y][x + pousses - 1].case;
                    pousses -= 1;
                }

            }
        }
        jeu[y][x].case = phase.joueur

        // Mise à jour de la phase de jeu :
        phase.action = 'choisir'
        if (phase.joueur == 'X') {
            phase.joueur = 'O'
        } else if (phase.joueur == 'O') {
            phase.joueur = 'X'
        }


        // Calcul des cases possibles :
        for (jy in jeu) {
            for (jx in jeu) {
                if ((jx == 0 || jx == 4 || jy == 0 || jy == 4) && (jeu[jy][jx].case == ' ' || jeu[jy][jx].case == phase.joueur)) {
                    jeu[jy][jx].etat = 'possible';
                } else {
                    jeu[jy][jx].etat = 'impossible';
                }
            }
        }
    }

    // Formation du code HTML :
    document.getElementById('plateau').innerHTML = `<tr>
        <td id="aa" class="${jeu[0][0].etat}">${jeu[0][0].case}</td> <td id="ba" class="${jeu[0][1].etat}">${jeu[0][1].case}</td> <td id="ca" class="${jeu[0][2].etat}">${jeu[0][2].case}</td> <td id="da" class="${jeu[0][3].etat}">${jeu[0][3].case}</td> <td id="ea" class="${jeu[0][4].etat}">${jeu[0][4].case}</td>
    </tr>
    <tr>
        <td id="ab" class="${jeu[1][0].etat}">${jeu[1][0].case}</td> <td id="bb" class="${jeu[1][1].etat}">${jeu[1][1].case}</td> <td id="cb" class="${jeu[1][2].etat}">${jeu[1][2].case}</td> <td id="db" class="${jeu[1][3].etat}">${jeu[1][3].case}</td> <td id="eb" class="${jeu[1][4].etat}">${jeu[1][4].case}</td>
    </tr>
    <tr>
        <td id="ac" class="${jeu[2][0].etat}">${jeu[2][0].case}</td> <td id="bc" class="${jeu[2][1].etat}">${jeu[2][1].case}</td> <td id="cc" class="${jeu[2][2].etat}">${jeu[2][2].case}</td> <td id="dc" class="${jeu[2][3].etat}">${jeu[2][3].case}</td> <td id="ec" class="${jeu[2][4].etat}">${jeu[2][4].case}</td>
    </tr>
    <tr>
        <td id="ad" class="${jeu[3][0].etat}">${jeu[3][0].case}</td> <td id="bd" class="${jeu[3][1].etat}">${jeu[3][1].case}</td> <td id="cd" class="${jeu[3][2].etat}">${jeu[3][2].case}</td> <td id="dd" class="${jeu[3][3].etat}">${jeu[3][3].case}</td> <td id="ed" class="${jeu[3][4].etat}">${jeu[3][4].case}</td>
    </tr>
    <tr>
        <td id="ae" class="${jeu[4][0].etat}">${jeu[4][0].case}</td> <td id="be" class="${jeu[4][1].etat}">${jeu[4][1].case}</td> <td id="ce" class="${jeu[4][2].etat}">${jeu[4][2].case}</td> <td id="de" class="${jeu[4][3].etat}">${jeu[4][3].case}</td> <td id="ee" class="${jeu[4][4].etat}">${jeu[4][4].case}</td>
    </tr>`;

    if (phase.action == 'pousser') {
        document.getElementById('choix').className = "choisi";
        document.getElementById('choix').innerHTML = phase.joueur;
    } else {
        document.getElementById('choix').className = "non-choisi";
        document.getElementById('choix').innerHTML = '';
    }

    // Actualisation de la vérification des clics
    verification()
}

// Définitions des variables nécessaires :
phase = {joueur: 'X', action: 'choisir'}
jeu = [[{case: ' ', etat: 'possible'}, {case: ' ', etat: 'possible'},  {case: ' ', etat: 'possible'},  {case: ' ', etat: 'possible'},  {case: ' ', etat: 'possible'}],
       [{case: ' ', etat: 'possible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'possible'}],
       [{case: ' ', etat: 'possible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'possible'}],
       [{case: ' ', etat: 'possible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'impossible'}, {case: ' ', etat: 'possible'}],
       [{case: ' ', etat: 'possible'}, {case: ' ', etat: 'possible'},  {case: ' ', etat: 'possible'},  {case: ' ', etat: 'possible'},  {case: ' ', etat: 'possible'}]]

// Vérification des clics :
function verification(){
    let aa = document.getElementById('aa');
    aa.addEventListener("click", function(){message(0, 0)});

    let ab = document.getElementById('ab');
    ab.addEventListener("click", function(){message(0, 1)});

    let ac = document.getElementById('ac');
    ac.addEventListener("click", function(){message(0, 2)});

    let ad = document.getElementById('ad');
    ad.addEventListener("click", function(){message(0, 3)});

    let ae = document.getElementById('ae');
    ae.addEventListener("click", function(){message(0, 4)});

    let be = document.getElementById('be');
    be.addEventListener("click", function(){message(1, 4)});

    let ce = document.getElementById('ce');
    ce.addEventListener("click", function(){message(2, 4)});

    let de = document.getElementById('de');
    de.addEventListener("click", function(){message(3, 4)});

    let ee = document.getElementById('ee');
    ee.addEventListener("click", function(){message(4, 4)});

    let ed = document.getElementById('ed');
    ed.addEventListener("click", function(){message(4, 3)});

    let ec = document.getElementById('ec');
    ec.addEventListener("click", function(){message(4, 2)});

    let eb = document.getElementById('eb');
    eb.addEventListener("click", function(){message(4, 1)});

    let ea = document.getElementById('ea');
    ea.addEventListener("click", function(){message(4, 0)});

    let da = document.getElementById('da');
    da.addEventListener("click", function(){message(3, 0)});

    let ca = document.getElementById('ca');
    ca.addEventListener("click", function(){message(2, 0)});

    let ba = document.getElementById('ba');
    ba.addEventListener("click", function(){message(1, 0)});
}

// Initialisation de la partie :
message(2, 2)