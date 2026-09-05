import type { SubjectSeed } from './types'

export const technologie: SubjectSeed = {
  id: 'techno',
  name: 'Technologie',
  short: 'Tech.',
  tone: 'slate',
  emoji: '⚙️',
  coefficient: 1,
  chapters: [
    {
      id: 'tech-objets',
      title: 'Objets techniques et démarche de conception',
      intro: "Comprendre à quoi répond un objet technique et comment on le conçoit.",
      sections: [
        [
          'definition',
          'Besoin, fonction, contrainte',
          "Un **objet technique** est créé pour répondre à un **besoin**.\n\n**Fonction d'usage** : à quoi sert l'objet (« transporter une personne »).\n**Fonction d'estime** : ce qui plaît, le design, la marque.\n**Contraintes** : ce qui limite la conception (coût, sécurité, normes, environnement, ergonomie, durée de vie).\n\nLe **cahier des charges** rassemble les fonctions et les contraintes à respecter.",
        ],
        [
          'cours',
          'Cycle de vie et matériaux',
          "Le **cycle de vie** d'un produit : extraction des matières premières → fabrication → distribution → utilisation → fin de vie (recyclage, réemploi, déchet).\n\nFamilles de matériaux : **métaux**, **céramiques**, **organiques** (plastiques, bois), **composites**.\nOn les choisit selon leurs propriétés : résistance, masse volumique, conductivité, coût, recyclabilité.",
        ],
        [
          'cours',
          'Objets connectés et programmation',
          "Une **chaîne d'information** : capteur → traitement (microcontrôleur) → interface / actionneur.\nUne **chaîne d'énergie** : alimenter → distribuer → convertir → transmettre.\n\nUn objet connecté ajoute une communication (Wi-Fi, Bluetooth) vers un serveur ou une application.\nEn programmation par blocs, on utilise variables, tests et boucles, comme en maths.",
        ],
      ],
      essentiel: [
        'Fonction d’usage = à quoi ça sert ; fonction d’estime = ce qui plaît.',
        'Le cahier des charges liste fonctions et contraintes.',
        'Cycle de vie : extraction → fabrication → distribution → usage → fin de vie.',
        'Chaîne d’information : capteur → traitement → actionneur.',
      ],
      videos: [['technologie 3ème objet technique cahier des charges', 9, 'Techno collège']],
      quiz: [
        {
          q: 'La fonction d’usage d’un objet correspond à…',
          options: ['son design', 'ce à quoi il sert', 'son prix', 'sa marque'],
          answer: 1,
          why: 'La fonction d’estime, elle, concerne l’aspect et l’image.',
        },
        {
          q: 'Un capteur transforme une grandeur physique en signal.',
          kind: 'vraifaux',
          answer: true,
          why: 'C’est le premier maillon de la chaîne d’information.',
        },
        {
          q: 'Quel document rassemble les fonctions et les contraintes d’un projet ?',
          kind: 'texte',
          answer: ['cahier des charges', 'le cahier des charges'],
          why: 'Il sert de référence pendant toute la conception.',
        },
      ],
      exos: [],
    },
  ],
}

export const arts: SubjectSeed = {
  id: 'arts',
  name: 'Arts plastiques',
  short: 'Arts',
  tone: 'pink',
  emoji: '🎨',
  coefficient: 1,
  chapters: [
    {
      id: 'arts-representation',
      title: 'La représentation et ses moyens',
      intro: "Comment une œuvre représente le réel — ou s'en éloigne volontairement.",
      sections: [
        [
          'definition',
          'Le vocabulaire de l’analyse',
          "**Composition** : organisation des éléments dans l'espace de l'œuvre (lignes de force, points de fuite, cadrage).\n**Cadrage** : plan large, plan rapproché, gros plan ; plongée, contre-plongée.\n**Couleurs** : primaires (bleu, rouge, jaune), secondaires, complémentaires ; chaudes / froides.\n**Valeurs** : les nuances du clair au foncé, qui créent le volume.\n**Matérialité** : la matière visible (touche, épaisseur, support).",
        ],
        [
          'cours',
          'Représenter, du réalisme à l’abstraction',
          "La représentation peut être **mimétique** (imiter le réel : perspective, trompe-l'œil), **stylisée** (simplifier, schématiser), ou **abstraite** (renoncer au sujet identifiable).\n\nRepères : la perspective à la Renaissance, l'impressionnisme (la lumière plutôt que le contour), le cubisme (plusieurs points de vue simultanés), l'art abstrait (Kandinsky, Mondrian).",
        ],
        [
          'methode',
          'Analyser une œuvre en 4 étapes',
          "**1. Identifier** : titre, auteur, date, technique, dimensions, lieu de conservation.\n**2. Décrire** : ce que l'on voit, objectivement, sans interpréter.\n**3. Analyser** : composition, couleurs, lumière, techniques employées.\n**4. Interpréter** : quel sens, quel effet sur le spectateur, dans quel contexte historique.",
        ],
      ],
      essentiel: [
        'Couleurs primaires : bleu, rouge, jaune.',
        'Analyser une œuvre : identifier, décrire, analyser, interpréter.',
        'La représentation va du mimétisme à l’abstraction.',
      ],
      videos: [["analyse d'œuvre arts plastiques collège méthode", 8, 'Arts plastiques collège']],
      quiz: [
        {
          q: 'Quelles sont les trois couleurs primaires ?',
          options: ['Bleu, rouge, jaune', 'Bleu, vert, rouge', 'Rouge, vert, jaune', 'Bleu, orange, violet'],
          answer: 0,
          why: 'En synthèse soustractive (peinture) : bleu, rouge, jaune.',
        },
        {
          q: 'La première étape de l’analyse d’une œuvre est l’interprétation.',
          kind: 'vraifaux',
          answer: false,
          why: 'On identifie et on décrit d’abord ; l’interprétation vient en dernier.',
        },
      ],
      exos: [],
    },
  ],
}

export const musique: SubjectSeed = {
  id: 'musique',
  name: 'Éducation musicale',
  short: 'Mus.',
  tone: 'indigo',
  emoji: '🎵',
  coefficient: 1,
  chapters: [
    {
      id: 'mus-vocabulaire',
      title: 'Écouter et analyser une musique',
      intro: "Le vocabulaire pour décrire ce qu'on entend et situer une œuvre.",
      sections: [
        [
          'definition',
          'Les paramètres du son',
          "**Hauteur** : grave ou aigu (liée à la fréquence).\n**Intensité** : fort (*forte*) ou doux (*piano*), en décibels.\n**Timbre** : la « couleur » du son, ce qui distingue une flûte d'un violon.\n**Durée** : la longueur des notes, le rythme.\n**Tempo** : la vitesse (lento, andante, allegro, presto).",
        ],
        [
          'cours',
          'Formes et repères historiques',
          "**Formes** : couplet-refrain, thème et variations, forme rondo (ABACA), canon, fugue.\n**Textures** : monodie (une seule voix), polyphonie (plusieurs voix), homophonie (voix qui vont ensemble).\n\n**Grandes périodes** : Moyen Âge, Renaissance, Baroque (Bach, Vivaldi), Classique (Mozart, Haydn), Romantique (Chopin, Berlioz), XXᵉ siècle (Debussy, Stravinsky, jazz, musiques actuelles).",
        ],
        [
          'cours',
          'Musique et engagement',
          "La musique peut porter un message : chants de résistance, protest songs, rap engagé, hymnes.\nOn analyse alors le **texte**, le **contexte historique** et les **choix musicaux** qui renforcent le propos (rythme martial, voix parlée, sample historique).",
        ],
      ],
      essentiel: [
        'Paramètres du son : hauteur, intensité, timbre, durée.',
        'Le timbre distingue deux instruments jouant la même note.',
        'Polyphonie = plusieurs voix simultanées.',
        'Périodes : Moyen Âge, Renaissance, Baroque, Classique, Romantique, XXᵉ siècle.',
      ],
      videos: [['éducation musicale collège vocabulaire écoute', 8, 'Éducation musicale']],
      quiz: [
        {
          q: 'Qu’est-ce qui permet de distinguer une flûte d’un violon jouant la même note ?',
          options: ['La hauteur', 'L’intensité', 'Le timbre', 'Le tempo'],
          answer: 2,
          why: 'Le timbre est la « couleur » propre à chaque instrument.',
        },
        {
          q: 'Une polyphonie comporte plusieurs voix simultanées.',
          kind: 'vraifaux',
          answer: true,
          why: 'La monodie n’en comporte qu’une seule.',
        },
        {
          q: 'Associe le compositeur à sa période.',
          kind: 'associer',
          pairs: [
            ['Bach', 'Baroque'],
            ['Mozart', 'Classique'],
            ['Chopin', 'Romantique'],
            ['Debussy', 'XXᵉ siècle'],
          ],
        },
      ],
      exos: [],
    },
  ],
}

export const eps: SubjectSeed = {
  id: 'eps',
  name: 'EPS',
  short: 'EPS',
  tone: 'lime',
  emoji: '🏃',
  coefficient: 1,
  chapters: [
    {
      id: 'eps-sante',
      title: 'Activité physique et santé',
      intro: "Comprendre ce qui se passe dans le corps à l'effort et savoir s'échauffer.",
      sections: [
        [
          'cours',
          'Le corps à l’effort',
          "À l'effort, les muscles consomment plus de dioxygène et de nutriments : la **fréquence cardiaque** et la **fréquence respiratoire** augmentent.\n\n**Fréquence cardiaque maximale** ≈ 220 − âge.\nUne **récupération rapide** du rythme cardiaque après l'effort est un bon indicateur de condition physique.",
        ],
        [
          'methode',
          'S’échauffer et récupérer',
          "**Échauffement** (10 à 15 min) : montée progressive du rythme cardiaque, mobilisation articulaire, gestes spécifiques à l'activité. Il réduit le risque de blessure.\n**Récupération** : retour au calme progressif, étirements doux, hydratation.\n\nRecommandation officielle : au moins **60 minutes** d'activité physique modérée à intense par jour pour les adolescents.",
        ],
      ],
      essentiel: [
        'FC max ≈ 220 − âge.',
        'Échauffement progressif = moins de blessures.',
        '60 min d’activité physique par jour recommandées à l’adolescence.',
      ],
      quiz: [
        {
          q: 'Quelle est la fréquence cardiaque maximale théorique d’une personne de 15 ans ?',
          kind: 'calcul',
          answer: ['205'],
          why: '220 − 15 = 205 battements par minute.',
        },
        {
          q: 'L’échauffement réduit le risque de blessure.',
          kind: 'vraifaux',
          answer: true,
          why: 'Il prépare progressivement muscles, articulations et système cardiovasculaire.',
        },
      ],
      exos: [],
    },
  ],
}
