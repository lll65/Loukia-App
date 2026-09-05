import type { SubjectSeed } from './types'

export const physique: SubjectSeed = {
  id: 'physique',
  name: 'Physique-Chimie',
  short: 'Phys.',
  tone: 'sky',
  emoji: '⚗️',
  coefficient: 1,
  chapters: [
    {
      id: 'phys-matiere',
      title: 'Organisation et transformations de la matière',
      intro:
        "De quoi tout est fait : atomes, molécules, ions. Et comment la matière se réorganise lors d'une réaction chimique.",
      sections: [
        [
          'definition',
          'Atomes, molécules, ions',
          "L'**atome** est constitué d'un **noyau** (protons + neutrons) autour duquel gravitent des **électrons**. Il est électriquement **neutre** : autant de protons (+) que d'électrons (−).\n\nUne **molécule** est un assemblage d'atomes liés entre eux (H₂O, CO₂, O₂).\n\nUn **ion** est un atome (ou groupe d'atomes) qui a gagné ou perdu des électrons :\n- **cation** = charge positive (Na⁺, Cu²⁺, H⁺) : il a perdu des électrons ;\n- **anion** = charge négative (Cl⁻, OH⁻, SO₄²⁻) : il a gagné des électrons.",
        ],
        [
          'propriete',
          'Conservation lors d’une transformation',
          "Au cours d'une réaction chimique :\n- les **atomes se conservent** (ils se réorganisent, ils ne disparaissent pas) ;\n- la **masse totale se conserve** ;\n- la **charge électrique totale se conserve**.\n\nC'est pourquoi une équation de réaction doit être **équilibrée** : autant d'atomes de chaque élément à gauche et à droite.",
        ],
        [
          'methode',
          'Équilibrer une équation',
          "**1.** Écrire les formules des réactifs et des produits.\n**2.** Compter les atomes de chaque élément de chaque côté.\n**3.** Ajouter des **nombres devant les formules** (jamais dans les formules !) jusqu'à l'égalité.\n\nExemple : CH₄ + O₂ → CO₂ + H₂O\nCarbone : 1 = 1 ✔ ; Hydrogène : 4 à gauche, 2 à droite → on met 2 H₂O.\nOxygène : 2 à gauche, 2 + 2 = 4 à droite → on met 2 O₂.\n**CH₄ + 2 O₂ → CO₂ + 2 H₂O**",
        ],
        [
          'definition',
          'Acides, bases et pH',
          "Le **pH** mesure l'acidité d'une solution, de 0 à 14 :\n- pH < 7 : solution **acide** (beaucoup d'ions H⁺) ;\n- pH = 7 : **neutre** ;\n- pH > 7 : solution **basique** (beaucoup d'ions HO⁻).\n\nDiluer une solution acide **rapproche son pH de 7**.\nTests d'identification : ions chlorure → précipité blanc avec le nitrate d'argent ; ions cuivre II → précipité bleu avec la soude ; ions fer II → précipité vert ; ions fer III → précipité rouille.",
        ],
      ],
      essentiel: [
        'Atome = noyau (protons + neutrons) + électrons, électriquement neutre.',
        'Cation = a perdu des électrons (+) ; anion = a gagné des électrons (−).',
        'Lors d’une réaction, les atomes et la masse se conservent.',
        'Une équation s’équilibre avec des nombres DEVANT les formules.',
        'pH < 7 acide, = 7 neutre, > 7 basique.',
      ],
      formules: ['Conservation de la masse : m(réactifs) = m(produits)', 'CH₄ + 2 O₂ → CO₂ + 2 H₂O'],
      pieges: [
        'Modifier les indices dans une formule chimique pour équilibrer : interdit, ça change la molécule.',
        'Confondre H₂O (2 atomes d’hydrogène) et 2 H₂O (2 molécules d’eau).',
      ],
      videos: [
        ['atomes ions molécules 3ème physique chimie', 11, 'Physique-Chimie collège'],
        ['équilibrer une équation chimique 3ème', 9, 'Les Bons Profs'],
      ],
      quiz: [
        {
          q: 'Un ion Cu²⁺ a…',
          options: ['gagné 2 électrons', 'perdu 2 électrons', 'gagné 2 protons', 'perdu 2 neutrons'],
          answer: 1,
          why: 'Une charge positive signifie une perte d’électrons.',
        },
        {
          q: 'Lors d’une réaction chimique, la masse totale se conserve.',
          kind: 'vraifaux',
          answer: true,
          why: 'Les atomes se réorganisent mais ne disparaissent pas.',
        },
        {
          q: 'Une solution de pH = 3 est…',
          options: ['basique', 'neutre', 'acide', 'impossible'],
          answer: 2,
          why: 'pH < 7 : la solution est acide.',
        },
        {
          q: 'Équilibrer : ... H₂ + O₂ → 2 H₂O. Quel nombre manque devant H₂ ?',
          kind: 'calcul',
          answer: ['2'],
          why: '2 H₂ + O₂ → 2 H₂O : 4 H et 2 O de chaque côté.',
        },
        {
          q: 'Associe l’ion à son test caractéristique.',
          kind: 'associer',
          pairs: [
            ['Ion chlorure', 'précipité blanc (nitrate d’argent)'],
            ['Ion cuivre II', 'précipité bleu (soude)'],
            ['Ion fer II', 'précipité vert (soude)'],
            ['Ion fer III', 'précipité rouille (soude)'],
          ],
        },
      ],
      exos: [
        {
          titre: 'Combustion du méthane',
          enonce:
            'On brûle 8 g de méthane avec 32 g de dioxygène. On obtient 22 g de dioxyde de carbone. Quelle masse d’eau a été produite ?',
          niveau: 2,
          indice: 'Utilise la conservation de la masse.',
          correction: [
            'Masse des réactifs : 8 + 32 = 40 g.',
            'Masse des produits = masse des réactifs = 40 g.',
            'Masse d’eau = 40 − 22 = 18 g.',
          ],
        },
      ],
    },
    {
      id: 'phys-electricite',
      title: 'Électricité',
      intro:
        "Circuits, tension, intensité, puissance et énergie : le chapitre le plus « calcul » de la physique de 3ème.",
      sections: [
        [
          'definition',
          'Les grandeurs électriques',
          "**Intensité I** : débit des électrons, en **ampères (A)**, mesurée avec un **ampèremètre en série**.\n**Tension U** : différence d'état électrique entre deux points, en **volts (V)**, mesurée avec un **voltmètre en dérivation**.\n**Résistance R** : freine le courant, en **ohms (Ω)**.",
        ],
        [
          'propriete',
          'Lois des circuits',
          "**En série** :\n- l'intensité est la **même** partout : I = I₁ = I₂ ;\n- les tensions **s'additionnent** : U = U₁ + U₂ (loi d'additivité).\n\n**En dérivation** :\n- la tension est la **même** aux bornes de chaque branche : U = U₁ = U₂ ;\n- les intensités **s'additionnent** : I = I₁ + I₂ (loi des nœuds).",
        ],
        [
          'propriete',
          'Loi d’Ohm',
          "Pour un conducteur ohmique : **U = R × I**\nU en volts (V), R en ohms (Ω), I en ampères (A).\n\nOn en déduit R = U/I et I = U/R.",
        ],
        [
          'propriete',
          'Puissance et énergie',
          "**P = U × I** : puissance en watts (W).\n**E = P × t** : énergie en joules (J) si t est en secondes ; en **watt-heures (Wh)** si P est en watts et t en heures.\n\n1 kWh = 1 000 Wh = 3,6 × 10⁶ J.\nLa facture d'électricité se calcule en kWh.",
        ],
        [
          'attention',
          'Sécurité',
          "Un **court-circuit** est un chemin de très faible résistance : l'intensité devient énorme, les fils chauffent, il y a risque d'incendie.\nLe **disjoncteur** coupe le circuit en cas de surintensité ; le **fusible** fond.\nLa **prise de terre** évacue le courant vers le sol en cas de défaut.",
        ],
      ],
      essentiel: [
        'Ampèremètre en série, voltmètre en dérivation.',
        'Série : I identique, U s’additionnent. Dérivation : U identique, I s’additionnent.',
        'Loi d’Ohm : U = R × I.',
        'P = U × I et E = P × t.',
        '1 kWh = 3,6 × 10⁶ J.',
      ],
      formules: ['U = R × I', 'P = U × I', 'E = P × t', '1 kWh = 3,6 MJ'],
      pieges: [
        'Brancher un ampèremètre en dérivation : c’est un court-circuit.',
        'Mélanger les unités : il faut des volts, des ampères et des ohms (pas des mA sans conversion).',
        'Oublier de convertir les minutes en heures pour les kWh.',
      ],
      videos: [
        ['loi d’Ohm 3ème', 8, 'Les Bons Profs'],
        ['circuit série dérivation 3ème', 10, 'Physique-Chimie collège'],
        ['puissance énergie électrique 3ème', 9, 'Les Bons Profs'],
      ],
      quiz: [
        {
          q: 'Comment branche-t-on un voltmètre ?',
          options: ['En série', 'En dérivation', 'Peu importe', 'À la place du générateur'],
          answer: 1,
          why: 'Le voltmètre se branche en dérivation aux bornes du dipôle.',
        },
        {
          q: 'Dans un circuit série, l’intensité est la même en tout point.',
          kind: 'vraifaux',
          answer: true,
          why: 'C’est la loi d’unicité de l’intensité dans un circuit série.',
        },
        {
          q: 'Une résistance de 50 Ω est traversée par un courant de 0,2 A. Quelle est la tension à ses bornes (en V) ?',
          kind: 'calcul',
          answer: ['10', '10V', '10 V'],
          why: 'U = R × I = 50 × 0,2 = 10 V.',
        },
        {
          q: 'Un appareil de 2 000 W fonctionne 3 h. Quelle énergie consomme-t-il, en kWh ?',
          kind: 'calcul',
          answer: ['6', '6kWh', '6 kWh'],
          why: 'E = P × t = 2 kW × 3 h = 6 kWh.',
        },
        {
          q: 'Que fait un disjoncteur en cas de court-circuit ?',
          options: [
            'Il augmente la tension',
            'Il coupe le circuit',
            'Il diminue la résistance',
            'Il stocke l’énergie',
          ],
          answer: 1,
          why: 'Il coupe le circuit pour éviter la surchauffe et l’incendie.',
        },
      ],
      exos: [
        {
          titre: 'Circuit en dérivation',
          enonce:
            'Dans un circuit en dérivation, le générateur délivre 6 V. La première branche est traversée par 0,15 A, la seconde par 0,25 A. Quelle est l’intensité délivrée par le générateur ? Quelle est la tension aux bornes de chaque branche ?',
          niveau: 1,
          correction: [
            'Loi des nœuds : I = I₁ + I₂ = 0,15 + 0,25 = 0,40 A.',
            'En dérivation, la tension est la même partout : chaque branche est sous 6 V.',
          ],
        },
        {
          titre: 'Coût d’un appareil',
          enonce:
            'Un radiateur de 1 500 W fonctionne 5 h par jour pendant 30 jours. Le kWh coûte 0,20 €. Quel est le coût mensuel ?',
          niveau: 2,
          correction: [
            'Énergie par jour : 1,5 kW × 5 h = 7,5 kWh.',
            'Sur 30 jours : 7,5 × 30 = 225 kWh.',
            'Coût : 225 × 0,20 = 45 €.',
          ],
        },
      ],
    },
    {
      id: 'phys-mouvement',
      title: 'Mouvements et vitesse',
      intro: "Décrire un mouvement, calculer une vitesse, comprendre la relativité du mouvement.",
      sections: [
        [
          'definition',
          'Décrire un mouvement',
          "Un mouvement se décrit toujours **par rapport à un référentiel** (un objet de référence). C'est la **relativité du mouvement** : un passager assis est immobile par rapport au train, mais en mouvement par rapport au sol.\n\n**Trajectoire** : ligne décrite par l'objet.\n- rectiligne (droite), circulaire (cercle), curviligne (courbe quelconque).\n\n**Vitesse** :\n- uniforme (constante), accélérée (augmente), ralentie (diminue).",
        ],
        [
          'propriete',
          'Calculer une vitesse',
          "**v = d / t**\nv : vitesse, d : distance parcourue, t : durée.\n\nUnités cohérentes : m et s → m/s ; km et h → km/h.\n**Conversion** : diviser par 3,6 pour passer de km/h à m/s, multiplier par 3,6 dans l'autre sens.\n\nOn en déduit d = v × t et t = d / v.",
        ],
        [
          'methode',
          'Lire une chronophotographie',
          "Des positions **régulièrement espacées** dans le temps :\n- écarts **égaux** → mouvement uniforme ;\n- écarts qui **augmentent** → mouvement accéléré ;\n- écarts qui **diminuent** → mouvement ralenti.",
        ],
      ],
      essentiel: [
        'Un mouvement se décrit toujours par rapport à un référentiel.',
        'v = d/t ; d = v×t ; t = d/v.',
        'km/h → m/s : diviser par 3,6.',
        'Chronophotographie : écarts égaux = mouvement uniforme.',
      ],
      formules: ['v = d / t', 'd = v × t', 't = d / v', 'km/h ÷ 3,6 = m/s'],
      pieges: [
        'Mélanger les unités : 90 km en 30 min ne donne pas 3 km/h mais 180 km/h.',
        'Oublier de préciser le référentiel dans une justification.',
      ],
      videos: [
        ['mouvement vitesse relativité 3ème', 9, 'Les Bons Profs'],
        ['calcul de vitesse conversion km/h m/s', 7, 'Physique-Chimie collège'],
      ],
      quiz: [
        {
          q: 'Une voiture parcourt 150 km en 2 h. Quelle est sa vitesse moyenne en km/h ?',
          kind: 'calcul',
          answer: ['75', '75km/h', '75 km/h'],
          why: 'v = 150/2 = 75 km/h.',
        },
        {
          q: '108 km/h correspond à combien de m/s ?',
          options: ['30', '36', '3', '300'],
          answer: 0,
          why: '108 ÷ 3,6 = 30 m/s.',
        },
        {
          q: 'Le mouvement d’un objet dépend du référentiel choisi.',
          kind: 'vraifaux',
          answer: true,
          why: 'C’est la relativité du mouvement.',
        },
        {
          q: 'Sur une chronophotographie, des positions de plus en plus espacées indiquent…',
          options: ['un mouvement uniforme', 'un mouvement accéléré', 'un mouvement ralenti', 'un objet immobile'],
          answer: 1,
          why: 'L’objet parcourt plus de distance pendant la même durée : il accélère.',
        },
      ],
      exos: [
        {
          titre: 'Durée d’un trajet',
          enonce: 'Un train roule à 120 km/h. Combien de temps met-il pour parcourir 300 km ? Donner le résultat en heures et minutes.',
          niveau: 1,
          correction: ['t = d/v = 300/120 = 2,5 h.', '0,5 h = 30 min.', 'Le trajet dure 2 h 30.'],
        },
      ],
    },
    {
      id: 'phys-energie',
      title: 'Énergie, forces et signaux',
      intro:
        "Les formes d'énergie et leurs conversions, la gravitation, et la façon dont lumière et son transportent l'information.",
      sections: [
        [
          'definition',
          'Les formes d’énergie',
          "**Énergie cinétique** : liée au mouvement. Ec = ½ × m × v² (m en kg, v en m/s, Ec en joules).\n**Énergie de position (potentielle de pesanteur)** : liée à l'altitude.\n**Énergie mécanique** = cinétique + de position.\nAutres formes : thermique, électrique, chimique, lumineuse, nucléaire.\n\nL'énergie ne se crée pas et ne disparaît pas : elle se **convertit** et se **transfère**. Une partie est toujours perdue sous forme thermique.",
        ],
        [
          'propriete',
          'Poids et masse',
          "La **masse** (en kg) est la quantité de matière : elle ne change pas selon le lieu.\nLe **poids** (en newtons, N) est la force d'attraction gravitationnelle : il dépend du lieu.\n\n**P = m × g**\nSur Terre, g ≈ 9,8 N/kg (souvent arrondi à 10). Sur la Lune, g ≈ 1,6 N/kg.",
        ],
        [
          'definition',
          'Les forces',
          "Une force modélise une action. On la représente par une **flèche** caractérisée par :\n- son **point d'application** ;\n- sa **direction** ;\n- son **sens** ;\n- sa **valeur** (en newtons, mesurée au dynamomètre).\n\nDeux corps s'attirent d'autant plus qu'ils sont massifs et proches : c'est la **gravitation universelle**.",
        ],
        [
          'definition',
          'Lumière et son',
          "**Lumière** : onde électromagnétique, se propage dans le vide à c ≈ 300 000 km/s (3 × 10⁸ m/s).\n**Son** : onde mécanique, a besoin d'un **milieu matériel** (il ne se propage pas dans le vide). Dans l'air, v ≈ 340 m/s.\n\nUn son est caractérisé par sa **fréquence** (en hertz : aigu ou grave) et son **niveau sonore** (en décibels : fort ou faible).\nAu-delà de 85 dB de façon prolongée, il y a risque pour l'audition.",
        ],
      ],
      essentiel: [
        'Ec = ½ m v² : l’énergie cinétique dépend du CARRÉ de la vitesse.',
        'P = m × g, avec g ≈ 9,8 N/kg sur Terre.',
        'La masse est en kg, le poids en newtons.',
        'L’énergie se conserve : elle se convertit, elle ne disparaît pas.',
        'Le son a besoin d’un milieu matériel, pas la lumière.',
      ],
      formules: ['Ec = ½ × m × v²', 'P = m × g', 'v(lumière) ≈ 3 × 10⁸ m/s', 'v(son dans l’air) ≈ 340 m/s'],
      pieges: [
        'Dire qu’un objet « pèse 60 kg » : il a une masse de 60 kg et un poids d’environ 600 N.',
        'Doubler la vitesse ne double pas l’énergie cinétique : elle est multipliée par 4.',
      ],
      videos: [
        ['énergie cinétique 3ème', 9, 'Les Bons Profs'],
        ['poids et masse 3ème gravitation', 10, 'Physique-Chimie collège'],
        ['son fréquence décibels 3ème', 8, 'Les Bons Profs'],
      ],
      quiz: [
        {
          q: 'Si la vitesse d’un véhicule double, son énergie cinétique est multipliée par…',
          options: ['2', '3', '4', '8'],
          answer: 2,
          why: 'Ec = ½mv² dépend du carré de la vitesse : 2² = 4.',
        },
        {
          q: 'Le poids d’un objet est le même sur Terre et sur la Lune.',
          kind: 'vraifaux',
          answer: false,
          why: 'La masse ne change pas, mais le poids dépend de g, qui vaut environ 1,6 N/kg sur la Lune.',
        },
        {
          q: 'Quel est le poids d’un objet de 5 kg sur Terre (g = 10 N/kg), en newtons ?',
          kind: 'calcul',
          answer: ['50', '50N', '50 N'],
          why: 'P = m × g = 5 × 10 = 50 N.',
        },
        {
          q: 'Le son se propage dans le vide.',
          kind: 'vraifaux',
          answer: false,
          why: 'Le son est une onde mécanique : il lui faut un milieu matériel.',
        },
        {
          q: 'L’unité du niveau sonore est…',
          options: ['le hertz', 'le newton', 'le décibel', 'le joule'],
          answer: 2,
          why: 'Le hertz mesure la fréquence, le décibel le niveau sonore.',
        },
      ],
      exos: [
        {
          titre: 'Énergie cinétique et sécurité routière',
          enonce:
            'Une voiture de 1 200 kg roule à 90 km/h. Calculer son énergie cinétique. Que devient-elle si la voiture roule à 130 km/h ?',
          niveau: 3,
          indice: 'Convertis d’abord les vitesses en m/s.',
          correction: [
            '90 km/h = 90/3,6 = 25 m/s.',
            'Ec = ½ × 1200 × 25² = 600 × 625 = 375 000 J = 375 kJ.',
            '130 km/h ≈ 36,1 m/s ; Ec = ½ × 1200 × 36,1² ≈ 782 000 J ≈ 782 kJ.',
            'L’énergie est plus que doublée : c’est pourquoi la distance d’arrêt augmente fortement avec la vitesse.',
          ],
        },
      ],
    },
  ],
}
