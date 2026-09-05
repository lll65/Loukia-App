import type { SubjectSeed } from './types'

export const svt: SubjectSeed = {
  id: 'svt',
  name: 'SVT',
  short: 'SVT',
  tone: 'emerald',
  emoji: '🧬',
  coefficient: 1,
  chapters: [
    {
      id: 'svt-genetique',
      title: 'Génétique : de l’ADN aux caractères',
      intro:
        "Comment l'information génétique est stockée, transmise et exprimée. Un chapitre très demandé au brevet.",
      sections: [
        [
          'definition',
          'Chromosomes, gènes, allèles',
          "Chaque cellule humaine contient **23 paires de chromosomes** (46 au total), situés dans le **noyau**.\nUn chromosome est constitué d'**ADN**, une molécule en double hélice.\n\nUn **gène** est un segment d'ADN qui porte l'information pour un caractère.\nUn gène existe en plusieurs versions appelées **allèles**.\n\nPour chaque gène, on possède deux allèles (un de chaque parent) :\n- deux allèles identiques → individu **homozygote** ;\n- deux allèles différents → individu **hétérozygote**.\nUn allèle **dominant** s'exprime même s'il est seul ; un allèle **récessif** ne s'exprime que s'il est en double.",
        ],
        [
          'propriete',
          'Mitose et méiose',
          "**Mitose** : division cellulaire qui produit **deux cellules identiques** à la cellule mère (46 chromosomes chacune). Elle assure la croissance et le renouvellement des cellules.\n\n**Méiose** : division qui produit les **cellules reproductrices** (gamètes) avec **23 chromosomes** seulement. Lors de la fécondation, deux gamètes fusionnent et la cellule-œuf retrouve 46 chromosomes.",
        ],
        [
          'definition',
          'Origine de la diversité',
          "La diversité des individus vient de :\n- le **brassage** des chromosomes lors de la méiose (chaque gamète est unique) ;\n- le **hasard de la fécondation** (quel spermatozoïde rencontre quel ovule) ;\n- les **mutations** : modifications accidentelles de l'ADN, source de nouveaux allèles. Elles peuvent être spontanées ou provoquées par des agents mutagènes (UV, tabac, certaines substances chimiques).",
        ],
        [
          'attention',
          'Anomalies chromosomiques',
          "Une erreur lors de la méiose peut donner un chromosome en trop ou en moins.\nExemple : la **trisomie 21** correspond à trois chromosomes 21 au lieu de deux.",
        ],
      ],
      essentiel: [
        '46 chromosomes (23 paires) dans chaque cellule humaine, 23 dans un gamète.',
        'Gène = portion d’ADN ; allèle = version d’un gène.',
        'Homozygote = 2 allèles identiques ; hétérozygote = 2 allèles différents.',
        'Mitose = 2 cellules identiques ; méiose = cellules reproductrices à 23 chromosomes.',
        'Mutations, brassage et hasard de la fécondation expliquent la diversité.',
      ],
      pieges: [
        'Confondre gène (le caractère) et allèle (la version).',
        'Croire que la mitose réduit le nombre de chromosomes : c’est la méiose.',
      ],
      videos: [
        ['génétique 3ème chromosomes gènes allèles', 12, 'SVT collège'],
        ['mitose méiose 3ème', 10, 'Les Bons Profs'],
      ],
      quiz: [
        {
          q: 'Combien de chromosomes contient une cellule humaine ordinaire ?',
          options: ['23', '46', '92', '21'],
          answer: 1,
          why: '23 paires, soit 46 chromosomes.',
        },
        {
          q: 'Un individu hétérozygote possède deux allèles identiques.',
          kind: 'vraifaux',
          answer: false,
          why: 'Hétérozygote = deux allèles DIFFÉRENTS. Identiques = homozygote.',
        },
        {
          q: 'Une cellule reproductrice humaine contient…',
          options: ['46 chromosomes', '23 chromosomes', '2 chromosomes', '92 chromosomes'],
          answer: 1,
          why: 'La méiose divise par deux le nombre de chromosomes.',
        },
        {
          q: 'Une mutation est une modification de l’ADN.',
          kind: 'vraifaux',
          answer: true,
          why: 'Elle peut créer un nouvel allèle.',
        },
        {
          q: 'Associe chaque terme à sa définition.',
          kind: 'associer',
          pairs: [
            ['Gène', 'portion d’ADN portant une information'],
            ['Allèle', 'version d’un gène'],
            ['Mitose', 'division en deux cellules identiques'],
            ['Méiose', 'formation des gamètes'],
          ],
        },
      ],
      exos: [
        {
          titre: 'Croisement génétique',
          enonce:
            'Chez une plante, l’allèle « fleur rouge » (R) est dominant sur l’allèle « fleur blanche » (b). On croise deux plantes hétérozygotes (R//b). Quelle proportion de descendants aura des fleurs blanches ?',
          niveau: 2,
          indice: 'Fais un tableau de croisement avec les gamètes R et b de chaque parent.',
          correction: [
            'Chaque parent produit deux types de gamètes : R et b.',
            'Tableau de croisement : R//R, R//b, b//R, b//b.',
            'Seul b//b donne des fleurs blanches (l’allèle récessif doit être en double).',
            'Soit 1 cas sur 4, donc 25 % des descendants.',
          ],
        },
      ],
    },
    {
      id: 'svt-corps',
      title: 'Le corps humain et la santé',
      intro:
        "Système nerveux, hormones, immunité et hygiène de vie : comprendre comment le corps se régule et se défend.",
      sections: [
        [
          'definition',
          'Le système nerveux',
          "Le message nerveux circule ainsi : **récepteur sensoriel → nerf sensitif → centre nerveux (cerveau ou moelle épinière) → nerf moteur → muscle (organe effecteur)**.\n\nLe **neurone** est la cellule du système nerveux : corps cellulaire, dendrites (réception) et axone (transmission). La communication entre deux neurones se fait au niveau d'une **synapse**, par des molécules chimiques.\n\nFatigue, alcool, drogues et manque de sommeil perturbent la transmission et allongent le **temps de réaction**.",
        ],
        [
          'definition',
          'Le système immunitaire',
          "Trois lignes de défense :\n**1.** Les **barrières naturelles** : peau, muqueuses, larmes.\n**2.** La **réaction inflammatoire** (rapide, non spécifique) : les **phagocytes** englobent et digèrent les micro-organismes (phagocytose).\n**3.** La **réaction spécifique** (plus lente) : les **lymphocytes B** produisent des **anticorps**, les **lymphocytes T** détruisent les cellules infectées.\n\nAprès une infection, des **cellules mémoire** subsistent : la réponse sera plus rapide la fois suivante. C'est le principe de la **vaccination** (on introduit un agent inoffensif pour créer la mémoire immunitaire).\nUn **antibiotique** agit sur les **bactéries**, jamais sur les virus.",
        ],
        [
          'definition',
          'Hormones et reproduction',
          "Une **hormone** est une molécule fabriquée par une glande, transportée par le sang, et qui agit sur un organe cible.\n\nÀ la puberté, le cerveau (hypophyse) déclenche la production d'hormones sexuelles : **testostérone** (testicules) et **œstrogènes / progestérone** (ovaires).\n\n**Contraception** : la pilule empêche l'ovulation ; le préservatif est le seul moyen qui protège aussi des **infections sexuellement transmissibles (IST)**.\n**Contraception d'urgence** : la pilule du lendemain, à prendre le plus tôt possible.",
        ],
      ],
      essentiel: [
        'Trajet du message nerveux : récepteur → nerf sensitif → centre nerveux → nerf moteur → muscle.',
        'Synapse = zone de communication entre deux neurones.',
        'Phagocytose = défense rapide et non spécifique ; anticorps et lymphocytes = défense spécifique.',
        'Vaccination = création d’une mémoire immunitaire.',
        'Les antibiotiques sont inefficaces contre les virus.',
        'Seul le préservatif protège des IST.',
      ],
      pieges: [
        'Prendre des antibiotiques pour une grippe : c’est un virus, ça ne sert à rien.',
        'Confondre vaccin (préventif, avant l’infection) et sérum (curatif, anticorps directement injectés).',
      ],
      videos: [
        ['système nerveux 3ème SVT', 11, 'SVT collège'],
        ['système immunitaire 3ème vaccination', 13, 'Les Bons Profs'],
        ['hormones puberté contraception 3ème', 10, 'SVT collège'],
      ],
      quiz: [
        {
          q: 'Quelle cellule réalise la phagocytose ?',
          options: ['Le lymphocyte B', 'Le phagocyte', 'Le neurone', 'L’anticorps'],
          answer: 1,
          why: 'Le phagocyte englobe et digère les micro-organismes.',
        },
        {
          q: 'Les antibiotiques sont efficaces contre les virus.',
          kind: 'vraifaux',
          answer: false,
          why: 'Ils n’agissent que sur les bactéries.',
        },
        {
          q: 'Quel moyen de contraception protège aussi des IST ?',
          options: ['La pilule', 'Le stérilet', 'Le préservatif', 'L’implant'],
          answer: 2,
          why: 'Le préservatif est le seul à faire barrière aux agents infectieux.',
        },
        {
          q: 'La zone de communication entre deux neurones s’appelle…',
          kind: 'texte',
          answer: ['synapse', 'la synapse', 'une synapse'],
          why: 'La transmission s’y fait par des molécules chimiques.',
        },
        {
          q: 'La vaccination crée une mémoire immunitaire.',
          kind: 'vraifaux',
          answer: true,
          why: 'Des cellules mémoire permettent une réponse plus rapide lors d’un futur contact.',
        },
      ],
      exos: [
        {
          titre: 'Temps de réaction',
          enonce:
            'Une expérience mesure le temps de réaction d’un élève : 0,22 s à jeun, 0,35 s après une nuit de 4 h de sommeil. Expliquer ce résultat et en tirer une conséquence pour la sécurité routière.',
          niveau: 2,
          correction: [
            'Le manque de sommeil perturbe la transmission du message nerveux au niveau des synapses.',
            'Le temps de réaction augmente de 0,13 s.',
            'À 130 km/h (≈36 m/s), cela représente environ 4,7 m parcourus en plus avant de freiner.',
            'La fatigue augmente donc fortement la distance d’arrêt et le risque d’accident.',
          ],
        },
      ],
    },
    {
      id: 'svt-terre',
      title: 'La planète Terre et les risques',
      intro: "Séismes, volcans, tectonique des plaques, météo et climat : comprendre et se protéger.",
      sections: [
        [
          'definition',
          'La tectonique des plaques',
          "La surface de la Terre est découpée en **plaques lithosphériques** rigides qui se déplacent de quelques centimètres par an sur l'asthénosphère.\n\nAux **dorsales océaniques**, les plaques **s'écartent** : du magma remonte et crée de la nouvelle croûte.\nAux **zones de subduction**, une plaque **plonge** sous une autre : séismes profonds et volcanisme explosif.\nAux **zones de collision**, les plaques se heurtent : formation de chaînes de montagnes (Alpes, Himalaya).",
        ],
        [
          'definition',
          'Séismes et volcans',
          "Un **séisme** résulte de la rupture brutale de roches en profondeur, au niveau du **foyer**. L'**épicentre** est le point de la surface situé à la verticale du foyer. Les **ondes sismiques** se propagent dans toutes les directions.\n\n**Volcanisme effusif** : lave fluide, coulées, cônes larges (Hawaï).\n**Volcanisme explosif** : lave visqueuse, nuées ardentes, explosions (Montagne Pelée).",
        ],
        [
          'methode',
          'Risque, aléa, vulnérabilité',
          "**Aléa** : probabilité qu'un phénomène naturel se produise.\n**Enjeux** : ce qui peut être touché (population, bâtiments).\n**Vulnérabilité** : fragilité des enjeux face au phénomène.\n**Risque = aléa × enjeux × vulnérabilité**\n\nOn ne peut pas réduire l'aléa, mais on peut réduire la vulnérabilité : normes de construction parasismique, plans d'évacuation, éducation, surveillance.",
        ],
        [
          'definition',
          'Météo et climat',
          "La **météo** décrit le temps qu'il fait à un endroit donné à court terme.\nLe **climat** est la moyenne des conditions météorologiques sur au moins 30 ans.\n\nLes activités humaines augmentent la concentration de **gaz à effet de serre** (CO₂, méthane), ce qui renforce l'effet de serre et provoque le **réchauffement climatique** : hausse des températures, montée du niveau des mers, événements extrêmes plus fréquents.",
        ],
      ],
      essentiel: [
        'Les plaques s’écartent aux dorsales, plongent en subduction, se heurtent en collision.',
        'Foyer = en profondeur, épicentre = à la surface, à sa verticale.',
        'Risque = aléa × enjeux × vulnérabilité.',
        'Météo = court terme et local ; climat = moyenne sur 30 ans minimum.',
        'Les gaz à effet de serre d’origine humaine renforcent le réchauffement.',
      ],
      pieges: [
        'Confondre foyer et épicentre.',
        'Confondre météo et climat : un hiver froid ne contredit pas le réchauffement climatique.',
      ],
      videos: [
        ['tectonique des plaques 3ème', 12, 'SVT collège'],
        ['séismes volcans risques 3ème', 11, 'Les Bons Profs'],
        ['réchauffement climatique effet de serre 3ème', 10, 'SVT collège'],
      ],
      quiz: [
        {
          q: 'Le point de la surface situé à la verticale du foyer s’appelle…',
          kind: 'texte',
          answer: ['epicentre', "l'epicentre", 'epicentre du seisme'],
          why: 'Le foyer est en profondeur, l’épicentre en surface.',
        },
        {
          q: 'Aux dorsales océaniques, les plaques…',
          options: ['se rapprochent', 's’écartent', 'restent immobiles', 'fondent entièrement'],
          answer: 1,
          why: 'Du magma remonte et forme de la nouvelle croûte océanique.',
        },
        {
          q: 'Le climat se mesure sur au moins 30 ans.',
          kind: 'vraifaux',
          answer: true,
          why: 'La météo, elle, décrit le temps à court terme.',
        },
        {
          q: 'On peut réduire l’aléa sismique d’une région.',
          kind: 'vraifaux',
          answer: false,
          why: 'On ne peut pas empêcher les séismes ; on agit sur la vulnérabilité (constructions, prévention).',
        },
      ],
      exos: [],
    },
    {
      id: 'svt-ecosystemes',
      title: 'Écosystèmes et activités humaines',
      intro: "Comprendre les liens entre les êtres vivants et leur milieu, et l'impact de nos activités.",
      sections: [
        [
          'definition',
          'Un écosystème',
          "Un **écosystème** = une **biocénose** (l'ensemble des êtres vivants) + un **biotope** (le milieu physique : sol, eau, climat).\n\nLes êtres vivants sont reliés par des **relations alimentaires** :\n- **producteurs primaires** (végétaux : ils font la photosynthèse) ;\n- **consommateurs** (herbivores, carnivores) ;\n- **décomposeurs** (bactéries, champignons) qui recyclent la matière organique en matière minérale.",
        ],
        [
          'propriete',
          'Impacts humains et solutions',
          "**Impacts négatifs** : déforestation, pollution, surpêche, artificialisation des sols, introduction d'espèces invasives, réchauffement climatique → perte de **biodiversité**.\n\n**Solutions** : aires protégées, agriculture raisonnée, corridors écologiques, recyclage, énergies renouvelables, réduction de la consommation.\n\nUn écosystème riche en espèces est plus **résilient** : il résiste mieux aux perturbations.",
        ],
      ],
      essentiel: [
        'Écosystème = biocénose (vivants) + biotope (milieu).',
        'Producteurs → consommateurs → décomposeurs : la matière est recyclée.',
        'La biodiversité rend un écosystème plus résilient.',
      ],
      videos: [['écosystème biodiversité 3ème SVT', 10, 'SVT collège']],
      quiz: [
        {
          q: 'Les décomposeurs transforment la matière organique en…',
          options: ['matière minérale', 'énergie lumineuse', 'oxygène pur', 'matière vivante'],
          answer: 0,
          why: 'Ils recyclent la matière et permettent aux végétaux de la réutiliser.',
        },
        {
          q: 'Un écosystème plus riche en espèces est généralement plus résilient.',
          kind: 'vraifaux',
          answer: true,
          why: 'La diversité offre plus de possibilités de compensation face à une perturbation.',
        },
      ],
      exos: [],
    },
  ],
}
