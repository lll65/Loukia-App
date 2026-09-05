import type { SubjectSeed } from './types'

export const anglais: SubjectSeed = {
  id: 'anglais',
  name: 'Anglais',
  short: 'Angl.',
  tone: 'teal',
  emoji: '🇬🇧',
  coefficient: 2,
  chapters: [
    {
      id: 'ang-present',
      title: 'Present simple et present continuous',
      intro: "Deux présents, deux emplois : les habitudes d'un côté, ce qui se passe maintenant de l'autre.",
      sections: [
        [
          'propriete',
          'Present simple',
          "**Emploi** : habitudes, vérités générales, goûts, programmes fixes.\n**Forme** : base verbale, + **s** à la 3ᵉ personne du singulier.\n*I play / He plays.*\n**Négation** : don't / doesn't + base verbale. *He doesn't play.*\n**Question** : Do / Does + sujet + base verbale. *Does she play?*\n\nMots-clés : *always, often, usually, sometimes, never, every day, on Mondays*.",
        ],
        [
          'propriete',
          'Present continuous (BE + V-ing)',
          "**Emploi** : action en cours au moment où l'on parle, ou situation temporaire, ou projet déjà organisé.\n**Forme** : am / is / are + verbe-ing. *I am watching a film.*\n**Négation** : am not / isn't / aren't + V-ing.\n\nMots-clés : *now, right now, at the moment, look!, listen!*\n\nCertains verbes ne s'emploient pas au continu : *know, want, like, believe, need, understand*.",
        ],
        [
          'astuce',
          'Comment choisir ?',
          "Pose-toi la question : *est-ce que ça se passe **maintenant**, sous mes yeux ?*\n→ Oui : present continuous.\n→ Non, c'est une habitude ou un fait : present simple.\n\n*She works in a bank* (habitude) vs *She is working late tonight* (maintenant, exceptionnel).",
        ],
      ],
      essentiel: [
        'Present simple = habitudes, vérités générales. + s à la 3ᵉ personne.',
        'Present continuous = BE + V-ing, action en cours ou temporaire.',
        'Négation : don’t / doesn’t + base verbale (jamais de s après doesn’t).',
        'Verbes d’état (know, want, like) : pas de forme en -ing.',
      ],
      pieges: [
        '« He doesn’t plays » : faux, on écrit « He doesn’t play ».',
        '« I am knowing » : faux, on dit « I know ».',
      ],
      videos: [
        ['present simple present continuous 3ème anglais', 10, 'Anglais collège'],
        ['présent en anglais différence brevet', 8, 'Les Bons Profs'],
      ],
      quiz: [
        {
          q: 'Choisis la forme correcte : « She ___ tennis every Saturday. »',
          options: ['play', 'plays', 'is playing', 'playing'],
          answer: 1,
          why: 'Habitude → present simple, 3ᵉ personne du singulier → plays.',
        },
        {
          q: 'Choisis : « Look! It ___ . »',
          options: ['rains', 'is raining', 'rain', 'rained'],
          answer: 1,
          why: '« Look! » signale une action en cours → present continuous.',
        },
        {
          q: '« He doesn’t plays football » est correct.',
          kind: 'vraifaux',
          answer: false,
          why: 'Après « doesn’t », on utilise la base verbale : « doesn’t play ».',
        },
        {
          q: 'Traduis : « Je suis en train de lire. »',
          kind: 'texte',
          answer: ['i am reading', "i'm reading", 'i am reading.'],
          why: 'Action en cours → BE + V-ing.',
        },
      ],
      exos: [],
    },
    {
      id: 'ang-passe',
      title: 'Prétérit et present perfect',
      intro: "Le point de grammaire le plus discriminant en 3ᵉ : quand le passé est-il « coupé » du présent ?",
      sections: [
        [
          'propriete',
          'Le prétérit simple',
          "**Emploi** : action **terminée**, à un moment **précis et révolu** du passé.\n**Forme** : verbe + **-ed** (réguliers) ou 2ᵉ colonne des verbes irréguliers.\n*I watched a film. / I saw a film.*\n**Négation** : didn't + base verbale.\n**Question** : Did + sujet + base verbale.\n\nMots-clés : *yesterday, last week, in 2019, two days ago, when I was ten*.",
        ],
        [
          'propriete',
          'Le present perfect',
          "**Forme** : have / has + participe passé (3ᵉ colonne).\n**Emploi** : le passé garde un **lien avec le présent** :\n- bilan, expérience de vie : *I have visited London.*\n- action qui continue : *I have lived here for five years.*\n- résultat visible maintenant : *She has broken her arm.*\n\nMots-clés : *ever, never, already, yet, just, since, for, so far*.\n\n**for** + durée (*for three years*), **since** + point de départ (*since 2020*).",
        ],
        [
          'astuce',
          'Le test qui tranche',
          "Y a-t-il un **repère de temps passé et fini** dans la phrase (*yesterday*, *last year*, *in 2018*) ?\n→ **Oui** : prétérit, obligatoirement.\n→ **Non**, et ça compte encore maintenant : present perfect.\n\n*I saw her yesterday.* (fini) / *I have seen her.* (bilan, sans date)",
        ],
      ],
      essentiel: [
        'Prétérit = action finie à un moment précis du passé.',
        'Present perfect = have/has + participe passé, lien avec le présent.',
        'for + durée, since + point de départ.',
        'Un repère de temps passé et fini impose le prétérit.',
      ],
      pieges: [
        '« I have seen him yesterday » : faux, il faut « I saw him yesterday ».',
        'Après « didn’t », on ne met jamais le verbe au prétérit : « I didn’t went » est faux.',
      ],
      videos: [
        ['prétérit present perfect différence 3ème', 12, 'Anglais collège'],
        ['for since present perfect anglais', 7, 'Les Bons Profs'],
      ],
      quiz: [
        {
          q: 'Choisis : « I ___ my homework yesterday. »',
          options: ['have finished', 'finished', 'finish', 'am finishing'],
          answer: 1,
          why: '« yesterday » impose le prétérit.',
        },
        {
          q: 'Choisis : « She has lived in Paris ___ 2019. »',
          options: ['for', 'since', 'during', 'ago'],
          answer: 1,
          why: '2019 est un point de départ → since.',
        },
        {
          q: '« I have seen him last week » est correct.',
          kind: 'vraifaux',
          answer: false,
          why: '« last week » est un repère passé fini : il faut le prétérit, « I saw him last week ».',
        },
        {
          q: 'Donne le prétérit du verbe « go ».',
          kind: 'texte',
          answer: ['went'],
          why: 'Verbe irrégulier : go / went / gone.',
        },
        {
          q: 'Associe chaque verbe irrégulier à son prétérit.',
          kind: 'associer',
          pairs: [
            ['take', 'took'],
            ['buy', 'bought'],
            ['write', 'wrote'],
            ['think', 'thought'],
          ],
        },
      ],
      exos: [],
    },
    {
      id: 'ang-modaux',
      title: 'Modaux, futur et comparatifs',
      intro: "Exprimer la capacité, l'obligation, le conseil, le futur, et comparer.",
      sections: [
        [
          'propriete',
          'Les modaux',
          "Un modal est **toujours suivi de la base verbale**, ne prend jamais de **s**, et forme sa négation avec **not**.\n\n**can** : capacité, permission (*I can swim*).\n**must** : obligation forte, souvent personnelle (*You must study*).\n**have to** : obligation extérieure (*I have to wear a uniform*).\n**should** : conseil (*You should sleep more*).\n**may / might** : possibilité (*It might rain*).\n**mustn't** = interdiction ; **don't have to** = ce n'est pas obligatoire (attention, ce n'est pas la même chose !).",
        ],
        [
          'propriete',
          'Parler du futur',
          "**will** + base verbale : décision spontanée, prédiction, promesse. *I'll help you.*\n**be going to** + base verbale : intention, projet déjà décidé, ou prédiction fondée sur un indice. *I'm going to study medicine.*\n**Present continuous** : rendez-vous déjà organisé. *I'm meeting her at 6.*",
        ],
        [
          'propriete',
          'Comparatifs et superlatifs',
          "**Adjectif court** (1 syllabe, ou 2 se terminant par -y) :\n- comparatif : adjectif + **-er than** (*taller than*) ;\n- superlatif : **the** + adjectif + **-est** (*the tallest*).\n\n**Adjectif long** :\n- comparatif : **more** + adjectif + **than** (*more interesting than*) ;\n- superlatif : **the most** + adjectif.\n\n**Irréguliers** : good → better → the best ; bad → worse → the worst ; far → further.\n**Égalité** : as + adjectif + as (*as tall as*).",
        ],
      ],
      essentiel: [
        'Un modal est suivi de la base verbale, sans « to » et sans « s ».',
        'mustn’t = interdiction ; don’t have to = ce n’est pas obligatoire.',
        'will = spontané ; be going to = projet décidé.',
        'Adjectif court : -er / the -est. Adjectif long : more / the most.',
        'good → better → the best.',
      ],
      pieges: [
        '« He cans swim » : faux, un modal ne prend jamais de s.',
        '« more taller » : faux, on ne cumule jamais more et -er.',
      ],
      videos: [
        ['modaux anglais 3ème can must should', 10, 'Anglais collège'],
        ['comparatif superlatif anglais 3ème', 8, 'Les Bons Profs'],
      ],
      quiz: [
        {
          q: 'Choisis : « You ___ smoke here, it’s forbidden. »',
          options: ['mustn’t', 'don’t have to', 'should', 'can'],
          answer: 0,
          why: '« mustn’t » exprime l’interdiction ; « don’t have to » signifie « ce n’est pas obligatoire ».',
        },
        {
          q: 'Comparatif de « big » : ',
          kind: 'texte',
          answer: ['bigger', 'bigger than'],
          why: 'Adjectif court : on double la consonne finale et on ajoute -er.',
        },
        {
          q: 'Superlatif de « good » : ',
          options: ['the goodest', 'the better', 'the best', 'the most good'],
          answer: 2,
          why: 'good → better → the best (irrégulier).',
        },
        {
          q: '« I’m going to visit my grandma tomorrow » exprime un projet déjà décidé.',
          kind: 'vraifaux',
          answer: true,
          why: '« be going to » marque l’intention.',
        },
      ],
      exos: [],
    },
  ],
}

export const espagnol: SubjectSeed = {
  id: 'espagnol',
  name: 'Espagnol',
  short: 'Esp.',
  tone: 'yellow',
  emoji: '🇪🇸',
  coefficient: 1,
  chapters: [
    {
      id: 'esp-present',
      title: 'Presente, ser / estar y hay',
      intro: "Le présent de l'indicatif et les trois verbes qui posent le plus de problèmes.",
      sections: [
        [
          'propriete',
          'Le présent régulier',
          "**-AR** (hablar) : hablo, hablas, habla, hablamos, habláis, hablan.\n**-ER** (comer) : como, comes, come, comemos, coméis, comen.\n**-IR** (vivir) : vivo, vives, vive, vivimos, vivís, viven.\n\n**Diphtongues** (verbes à alternance) : e → ie (querer : quiero), o → ue (poder : puedo), e → i (pedir : pido).\nElles se produisent partout **sauf** à *nosotros* et *vosotros*.",
        ],
        [
          'propriete',
          'Ser, estar et hay',
          "**SER** : caractéristiques permanentes, identité, origine, profession, heure.\n*Soy francesa. Es alta. Son las tres.*\n\n**ESTAR** : état passager, localisation, humeur.\n*Estoy cansada. Madrid está en España.*\n\n**HAY** (forme unique du verbe *haber*) : existence, « il y a ».\n*Hay un libro. Hay muchos alumnos.*\n\nRègle simple : **ESTAR** pour ce qui peut changer, **SER** pour ce qui définit.",
        ],
        [
          'astuce',
          'Estar ou hay ?',
          "**Hay** est suivi d'un article **indéfini** ou de rien : *Hay una silla*.\n**Estar** est suivi d'un article **défini** ou d'un nom propre : *La silla está aquí*.",
        ],
      ],
      essentiel: [
        'Terminaisons -AR : o, as, a, amos, áis, an.',
        'Ser = permanent, estar = passager ou localisation.',
        'Hay = il y a, forme unique et invariable.',
        'Les diphtongues disparaissent à nosotros et vosotros.',
      ],
      pieges: [
        '« Yo soy cansado » : il faut « estoy cansado » (état passager).',
        'Accorder « hay » : il ne varie jamais.',
      ],
      videos: [['ser estar espagnol 3ème', 9, 'Espagnol collège']],
      quiz: [
        {
          q: 'Complète : « Yo ___ cansada. »',
          options: ['soy', 'estoy', 'hay', 'es'],
          answer: 1,
          why: 'La fatigue est un état passager → estar.',
        },
        {
          q: 'Complète : « ___ muchos libros en la mesa. »',
          options: ['Son', 'Están', 'Hay', 'Es'],
          answer: 2,
          why: '« Il y a » se dit hay, forme unique.',
        },
        {
          q: 'Conjugue « poder » à la 1ʳᵉ personne du singulier.',
          kind: 'texte',
          answer: ['puedo', 'yo puedo'],
          why: 'Diphtongue o → ue.',
        },
        {
          q: '« Ser » sert à indiquer la localisation.',
          kind: 'vraifaux',
          answer: false,
          why: 'La localisation utilise estar : « Madrid está en España ».',
        },
      ],
      exos: [],
    },
    {
      id: 'esp-passe',
      title: 'Les temps du passé',
      intro: "Indefinido, imperfecto, perfecto : trois passés, trois emplois.",
      sections: [
        [
          'propriete',
          'Pretérito indefinido',
          "**Emploi** : action ponctuelle, terminée, dans un passé coupé du présent (*ayer, el año pasado, en 2019*).\n**-AR** : hablé, hablaste, habló, hablamos, hablasteis, hablaron.\n**-ER / -IR** : comí, comiste, comió, comimos, comisteis, comieron.\n\nIrréguliers fréquents : ser/ir → fui ; tener → tuve ; hacer → hice ; estar → estuve ; poder → pude ; decir → dije.",
        ],
        [
          'propriete',
          'Pretérito imperfecto',
          "**Emploi** : description dans le passé, habitude, action en cours (*antes, siempre, todos los días*).\n**-AR** : hablaba, hablabas, hablaba, hablábamos, hablabais, hablaban.\n**-ER / -IR** : comía, comías, comía, comíamos, comíais, comían.\n\nSeulement **trois irréguliers** : *ser* (era), *ir* (iba), *ver* (veía).",
        ],
        [
          'propriete',
          'Pretérito perfecto',
          "**Forme** : haber au présent (he, has, ha, hemos, habéis, han) + participe passé (-ado / -ido).\n**Emploi** : passé récent, ou passé lié au présent (*hoy, esta semana, ya, nunca*).\n*Hoy he comido paella.*\n\nParticipes irréguliers : hecho (hacer), dicho (decir), visto (ver), escrito (escribir), vuelto (volver), puesto (poner).",
        ],
      ],
      essentiel: [
        'Indefinido = action ponctuelle terminée (ayer, el año pasado).',
        'Imperfecto = description, habitude (antes, siempre).',
        'Perfecto = passé récent ou lié au présent (hoy, esta semana).',
        'Imperfecto : seulement 3 irréguliers (era, iba, veía).',
      ],
      pieges: [
        'Utiliser l’imperfecto pour une action ponctuelle datée : c’est l’indefinido.',
        'Oublier l’accent écrit : « hablo » (présent) ≠ « habló » (indefinido).',
      ],
      videos: [['indefinido imperfecto espagnol 3ème', 11, 'Espagnol collège']],
      quiz: [
        {
          q: 'Complète : « Ayer ___ al cine. » (ir, yo)',
          kind: 'texte',
          answer: ['fui', 'yo fui'],
          why: 'Action ponctuelle datée → indefinido, ir → fui.',
        },
        {
          q: 'Complète : « Cuando era pequeña, ___ mucho. » (jugar, yo)',
          options: ['jugué', 'jugaba', 'he jugado', 'juego'],
          answer: 1,
          why: 'Habitude dans le passé → imperfecto.',
        },
        {
          q: 'Le participe passé de « hacer » est « hacido ».',
          kind: 'vraifaux',
          answer: false,
          why: 'C’est « hecho », un participe irrégulier.',
        },
        {
          q: 'Combien de verbes sont irréguliers à l’imparfait espagnol ?',
          options: ['1', '3', '7', 'Une dizaine'],
          answer: 1,
          why: 'Seulement ser (era), ir (iba) et ver (veía).',
        },
      ],
      exos: [],
    },
  ],
}
