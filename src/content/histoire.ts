import type { SubjectSeed } from './types'

export const histoire: SubjectSeed = {
  id: 'histoire',
  name: 'Histoire-Géographie-EMC',
  short: 'H-G',
  tone: 'amber',
  emoji: '🌍',
  coefficient: 2,
  chapters: [
    {
      id: 'hist-14-18',
      title: 'Civils et militaires dans la Première Guerre mondiale',
      intro:
        "1914-1918 : la première guerre totale. Trois phases, une violence de masse inédite, et des sociétés entières mobilisées.",
      sections: [
        [
          'cours',
          'Les trois phases de la guerre',
          "**1914 — la guerre de mouvement.** Après l'attentat de Sarajevo (28 juin 1914), le jeu des alliances embrase l'Europe. Les armées avancent vite ; la France stoppe l'offensive allemande à la **bataille de la Marne** (septembre 1914).\n\n**1915-1917 — la guerre de position.** Le front se fige sur 700 km de tranchées. **Verdun** (1916) devient le symbole de l'enlisement et de la violence extrême : 300 000 morts en dix mois.\n\n**1918 — le retour du mouvement.** L'entrée en guerre des **États-Unis** (1917) et la sortie de la Russie (révolution bolchevique) rebattent les cartes. L'**armistice** est signé le **11 novembre 1918**.",
        ],
        [
          'cours',
          'Une guerre totale',
          "La guerre mobilise **toute la société** :\n- l'**économie** est réorientée vers l'armement ;\n- les **femmes** remplacent les hommes dans les usines et les champs ;\n- les **colonies** fournissent hommes et matières premières ;\n- la **propagande** (« bourrage de crâne ») entretient le moral et diabolise l'ennemi ;\n- l'**emprunt** finance l'effort de guerre.\n\nLes civils sont directement touchés : bombardements, occupation, restrictions, réfugiés.",
        ],
        [
          'cours',
          'Violences de masse et génocide',
          "L'armement industriel (mitrailleuses, artillerie lourde, gaz de combat) provoque une **violence de masse**.\n\nEn 1915, le gouvernement **jeune-turc** organise l'extermination des **Arméniens** de l'Empire ottoman : environ **1,2 million de morts**. C'est le premier **génocide** du XXᵉ siècle.\n\nBilan global : environ **10 millions de morts** militaires, 8 millions d'invalides (« gueules cassées »), des sociétés traumatisées.",
        ],
        [
          'cours',
          'Les traités de paix',
          "Le **traité de Versailles** (28 juin 1919) est signé sans négociation avec l'Allemagne, qui le vit comme un **diktat** :\n- elle est déclarée responsable de la guerre (article 231) ;\n- elle perd l'Alsace-Lorraine et ses colonies ;\n- son armée est limitée à 100 000 hommes ;\n- elle doit payer de lourdes **réparations**.\n\nLa **Société des Nations (SDN)** est créée pour garantir la paix, mais elle est affaiblie dès le départ (les États-Unis n'y adhèrent pas). L'Europe sort de la guerre remodelée, avec de nouveaux États et de fortes rancœurs.",
        ],
      ],
      essentiel: [
        '28 juin 1914 : attentat de Sarajevo. 11 novembre 1918 : armistice.',
        'Trois phases : guerre de mouvement (1914), de position (1915-1917), de mouvement (1918).',
        'Verdun (1916) = symbole de la guerre de tranchées.',
        'Guerre totale : économie, femmes, colonies, propagande mobilisées.',
        '1915 : génocide des Arméniens (~1,2 million de morts).',
        '1919 : traité de Versailles, vécu comme un « diktat » par l’Allemagne.',
      ],
      pieges: [
        'Confondre armistice (11 novembre 1918, arrêt des combats) et traité de Versailles (28 juin 1919, la paix signée).',
        'Oublier que les États-Unis entrent en guerre en 1917, pas en 1914.',
      ],
      videos: [
        ['Première Guerre mondiale 3ème résumé brevet', 14, 'Les Bons Profs'],
        ['guerre totale Verdun 3ème histoire', 10, 'Histoire collège'],
      ],
      quiz: [
        {
          q: 'En quelle année a lieu la bataille de Verdun ?',
          options: ['1914', '1915', '1916', '1918'],
          answer: 2,
          why: 'Verdun se déroule de février à décembre 1916.',
        },
        {
          q: 'À quelle date est signé l’armistice ?',
          kind: 'texte',
          answer: ['11 novembre 1918', '11/11/1918', '11 nov 1918', '11 novembre 1918.'],
          why: 'L’armistice met fin aux combats ; la paix sera signée en 1919.',
        },
        {
          q: 'Le traité de Versailles est signé en 1918.',
          kind: 'vraifaux',
          answer: false,
          why: 'Il est signé le 28 juin 1919.',
        },
        {
          q: 'Qu’appelle-t-on une « guerre totale » ?',
          options: [
            'Une guerre qui se déroule partout dans le monde',
            'Une guerre qui mobilise toutes les ressources d’un pays',
            'Une guerre sans armistice',
            'Une guerre uniquement aérienne',
          ],
          answer: 1,
          why: 'Économie, population, colonies, propagande : tout est mis au service du conflit.',
        },
        {
          q: 'Quel peuple est victime d’un génocide en 1915 ?',
          options: ['Les Juifs', 'Les Arméniens', 'Les Tziganes', 'Les Kurdes'],
          answer: 1,
          why: 'Le génocide arménien est organisé par le gouvernement jeune-turc.',
        },
        {
          q: 'Associe chaque date à son événement.',
          kind: 'associer',
          pairs: [
            ['28 juin 1914', 'attentat de Sarajevo'],
            ['1916', 'bataille de Verdun'],
            ['1917', 'entrée en guerre des États-Unis'],
            ['11 novembre 1918', 'armistice'],
          ],
        },
      ],
      exos: [
        {
          titre: 'Développement construit',
          enonce:
            'En une vingtaine de lignes, montrez que la Première Guerre mondiale est une guerre totale qui touche aussi les civils.',
          niveau: 3,
          indice: 'Plan possible : 1) une mobilisation de toute la société ; 2) des civils victimes ; 3) des violences extrêmes.',
          correction: [
            'Introduction : rappeler les dates (1914-1918) et annoncer que le conflit mobilise sociétés entières.',
            '1) La mobilisation totale : économies de guerre, femmes dans les usines (« munitionnettes »), colonies mises à contribution, emprunts, propagande.',
            '2) Les civils victimes : bombardements, occupation du Nord-Est de la France, réquisitions, pénuries, réfugiés.',
            '3) Des violences extrêmes : armement industriel, gaz, et le génocide arménien de 1915 (~1,2 million de morts).',
            'Conclusion : environ 10 millions de morts, des sociétés durablement traumatisées, une paix fragile en 1919.',
          ],
        },
      ],
    },
    {
      id: 'hist-totalitarismes',
      title: 'Démocraties fragilisées et expériences totalitaires',
      intro:
        "L'entre-deux-guerres : crise économique, régimes totalitaires et fragilisation des démocraties européennes.",
      sections: [
        [
          'cours',
          'L’URSS de Staline',
          "Après la révolution de 1917, **Staline** impose à partir de 1928 un régime totalitaire :\n- **collectivisation forcée** des terres et **planification** de l'économie (plans quinquennaux) ;\n- **terreur de masse** : procès de Moscou, **Goulag** (camps de travail), grandes purges de 1937-1938 ;\n- **culte de la personnalité** et propagande omniprésente ;\n- parti unique, police politique (NKVD).\n\nLa famine organisée en Ukraine (**Holodomor**, 1932-1933) fait plusieurs millions de morts.",
        ],
        [
          'cours',
          'L’Allemagne nazie',
          "**Hitler** devient chancelier le **30 janvier 1933**. En quelques mois, il supprime les libertés et instaure une dictature :\n- parti unique (NSDAP), Gestapo, camps de concentration dès 1933 (Dachau) ;\n- encadrement de la jeunesse (Jeunesses hitlériennes), propagande (Goebbels) ;\n- idéologie raciste et antisémite : **lois de Nuremberg (1935)** excluant les Juifs de la communauté nationale, **Nuit de Cristal (1938)** ;\n- réarmement et politique expansionniste (« espace vital »).",
        ],
        [
          'cours',
          'La France des années 1930',
          "La **crise économique de 1929** touche la France à partir de 1931 : chômage, faillites, montée des ligues d'extrême droite (émeute du 6 février 1934).\n\nEn réaction, les partis de gauche s'unissent : le **Front populaire** gagne les élections de **1936**. Léon Blum met en place les **accords de Matignon** :\n- **congés payés** (deux semaines) ;\n- **semaine de 40 heures** ;\n- hausse des salaires, conventions collectives.\n\nL'expérience s'essouffle dès 1938, mais elle marque durablement la société française.",
        ],
      ],
      essentiel: [
        '1929 : krach de Wall Street, crise économique mondiale.',
        '30 janvier 1933 : Hitler chancelier.',
        '1935 : lois de Nuremberg. 1938 : Nuit de Cristal.',
        'Régime totalitaire = parti unique, terreur, propagande, embrigadement, culte du chef.',
        '1936 : Front populaire en France — congés payés et semaine de 40 h.',
      ],
      pieges: [
        'Confondre autoritaire et totalitaire : le totalitarisme veut contrôler TOUTE la société, y compris les esprits.',
        'Dater le Front populaire de 1934 : c’est 1936.',
      ],
      videos: [
        ['régimes totalitaires 3ème URSS Staline Hitler', 15, 'Les Bons Profs'],
        ['Front populaire 1936 3ème', 9, 'Histoire collège'],
      ],
      quiz: [
        {
          q: 'En quelle année Hitler devient-il chancelier ?',
          options: ['1929', '1933', '1935', '1939'],
          answer: 1,
          why: 'Le 30 janvier 1933.',
        },
        {
          q: 'Quelle mesure emblématique le Front populaire instaure-t-il ?',
          options: ['La retraite à 60 ans', 'Les congés payés', 'Le droit de vote des femmes', 'La Sécurité sociale'],
          answer: 1,
          why: 'Deux semaines de congés payés, avec la semaine de 40 heures.',
        },
        {
          q: 'Le Goulag désigne le système de camps de travail soviétique.',
          kind: 'vraifaux',
          answer: true,
          why: 'Des millions de personnes y sont déportées sous Staline.',
        },
        {
          q: 'Les lois de Nuremberg datent de…',
          kind: 'calcul',
          answer: ['1935'],
          why: 'Elles privent les Juifs allemands de leur citoyenneté.',
        },
        {
          q: 'Quel est le point commun des régimes totalitaires ?',
          options: [
            'Le multipartisme',
            'Le contrôle total de la société par un parti unique',
            'La séparation des pouvoirs',
            'La liberté de la presse',
          ],
          answer: 1,
          why: 'Parti unique, terreur, propagande et embrigadement caractérisent le totalitarisme.',
        },
      ],
      exos: [],
    },
    {
      id: 'hist-39-45',
      title: 'La Seconde Guerre mondiale et la France occupée',
      intro:
        "Une guerre d'anéantissement, la France entre Vichy et Résistance, et le génocide des Juifs et des Tziganes.",
      sections: [
        [
          'cours',
          'Une guerre d’anéantissement',
          "La guerre éclate le **1er septembre 1939** (invasion de la Pologne) et se termine le **8 mai 1945** en Europe, le **2 septembre 1945** en Asie.\n\nC'est une **guerre d'anéantissement** : il ne s'agit plus seulement de vaincre l'ennemi, mais de le détruire.\nDates clés : **1941** (invasion de l'URSS, Pearl Harbor), **Stalingrad** (hiver 1942-1943, tournant du conflit), **6 juin 1944** (débarquement de Normandie), **août 1945** (bombes atomiques sur Hiroshima et Nagasaki).",
        ],
        [
          'cours',
          'Le génocide des Juifs et des Tziganes',
          "L'extermination se déroule en deux temps :\n**1.** Les **Einsatzgruppen** fusillent massivement à l'Est à partir de 1941 (« Shoah par balles »).\n**2.** À partir de 1942 (conférence de Wannsee), la **« solution finale »** industrialise le meurtre dans les **camps d'extermination** (Auschwitz-Birkenau, Treblinka…), avec les chambres à gaz.\n\nBilan : environ **6 millions de Juifs** et **200 000 Tziganes** assassinés.\nIl faut distinguer le **camp de concentration** (travail forcé, mortalité élevée) du **camp d'extermination** (mise à mort immédiate et systématique).",
        ],
        [
          'cours',
          'Vichy, collaboration et Résistance',
          "Après la défaite de mai-juin 1940, **Pétain** signe l'armistice et obtient les pleins pouvoirs le 10 juillet 1940. Le **régime de Vichy** remplace la devise républicaine par « Travail, Famille, Patrie » :\n- **collaboration** avec l'Allemagne (entrevue de Montoire, octobre 1940) ;\n- **STO** (Service du travail obligatoire, 1943) ;\n- antisémitisme d'État : statut des Juifs (octobre 1940), **rafle du Vél' d'Hiv'** (16-17 juillet 1942), participation de la police française aux déportations.\n\nFace à cela, la **Résistance** :\n- **De Gaulle** lance l'**appel du 18 juin 1940** depuis Londres (France libre) ;\n- **Jean Moulin** unifie les mouvements dans le **CNR** (Conseil national de la Résistance, mai 1943) ;\n- maquis, réseaux de renseignement, presse clandestine.\n\nÀ la Libération, le programme du CNR inspire de grandes réformes : **Sécurité sociale (1945)** et **droit de vote des femmes (ordonnance du 21 avril 1944, premier vote en 1945)**.",
        ],
      ],
      essentiel: [
        '1er septembre 1939 – 8 mai 1945 en Europe.',
        'Stalingrad (1942-1943) = tournant de la guerre. 6 juin 1944 = débarquement de Normandie.',
        'Camp de concentration ≠ camp d’extermination.',
        '~6 millions de Juifs assassinés, ~200 000 Tziganes.',
        '18 juin 1940 : appel du général de Gaulle.',
        '16-17 juillet 1942 : rafle du Vél’ d’Hiv’.',
        '1944 : droit de vote des femmes ; 1945 : Sécurité sociale.',
      ],
      pieges: [
        'Confondre camp de concentration et camp d’extermination.',
        'Croire que les femmes votent en France dès 1944 : l’ordonnance date d’avril 1944, le premier vote a lieu en 1945.',
      ],
      videos: [
        ['Seconde Guerre mondiale 3ème résumé brevet', 16, 'Les Bons Profs'],
        ['régime de Vichy Résistance 3ème', 12, 'Histoire collège'],
        ['génocide Juifs Tziganes 3ème', 11, 'Les Bons Profs'],
      ],
      quiz: [
        {
          q: 'Quelle bataille marque le tournant de la guerre sur le front de l’Est ?',
          options: ['Verdun', 'Stalingrad', 'Dunkerque', 'El-Alamein'],
          answer: 1,
          why: 'La capitulation allemande à Stalingrad (février 1943) inverse le rapport de forces.',
        },
        {
          q: 'À quelle date a lieu le débarquement de Normandie ?',
          kind: 'texte',
          answer: ['6 juin 1944', '06/06/1944', '6 juin 44'],
          why: 'Opération Overlord.',
        },
        {
          q: 'Un camp de concentration et un camp d’extermination sont la même chose.',
          kind: 'vraifaux',
          answer: false,
          why: 'Le camp de concentration repose sur le travail forcé ; le camp d’extermination sur la mise à mort immédiate.',
        },
        {
          q: 'Qui unifie les mouvements de Résistance au sein du CNR ?',
          options: ['Charles de Gaulle', 'Jean Moulin', 'Philippe Pétain', 'Pierre Laval'],
          answer: 1,
          why: 'Jean Moulin crée le Conseil national de la Résistance en mai 1943.',
        },
        {
          q: 'La devise du régime de Vichy est…',
          options: [
            'Liberté, Égalité, Fraternité',
            'Travail, Famille, Patrie',
            'Un peuple, un empire, un chef',
            'Honneur et Patrie',
          ],
          answer: 1,
          why: 'Elle remplace la devise républicaine dès 1940.',
        },
        {
          q: 'En quelle année les femmes obtiennent-elles le droit de vote en France (ordonnance) ?',
          kind: 'calcul',
          answer: ['1944'],
          why: 'Ordonnance du 21 avril 1944 ; premier vote en avril 1945.',
        },
      ],
      exos: [
        {
          titre: 'Développement construit',
          enonce:
            'Décrivez la vie des Français sous l’Occupation et montrez qu’ils font des choix différents face à l’occupant.',
          niveau: 3,
          indice: 'Trois axes : le quotidien, la collaboration, la Résistance.',
          correction: [
            'Introduction : la France est vaincue en juin 1940 et divisée en zones ; Pétain instaure le régime de Vichy.',
            '1) Le quotidien : rationnement, tickets, marché noir, couvre-feu, propagande, STO à partir de 1943.',
            '2) La collaboration : État français, entrevue de Montoire, milice, statut des Juifs, rafle du Vél’ d’Hiv’ (juillet 1942).',
            '3) La Résistance : appel du 18 juin 1940, réseaux, maquis, presse clandestine, unification par Jean Moulin (CNR, 1943).',
            'Conclusion : à la Libération, le programme du CNR inspire des réformes majeures (Sécurité sociale, vote des femmes).',
          ],
        },
      ],
    },
    {
      id: 'hist-republique',
      title: 'Françaises et Français dans une République repensée',
      intro:
        "De 1944 à nos jours : refondation de la République, Vᵉ République, et conquête progressive de l'égalité.",
      sections: [
        [
          'cours',
          'La refondation républicaine (1944-1947)',
          "Le **Gouvernement provisoire** dirigé par de Gaulle applique le programme du CNR :\n- **droit de vote des femmes** (1944) ;\n- **nationalisations** (Renault, banques, EDF) ;\n- création de la **Sécurité sociale** (1945).\n\nLa **IVᵉ République** (1946) accorde de nouveaux droits sociaux mais souffre d'une grande **instabilité gouvernementale**.",
        ],
        [
          'cours',
          'La Vᵉ République',
          "La crise algérienne de **1958** ramène de Gaulle au pouvoir. Il fonde la **Vᵉ République** avec une nouvelle Constitution :\n- pouvoir exécutif renforcé ;\n- **élection du président au suffrage universel direct** (réforme de 1962) ;\n- recours au **référendum**.\n\nÉvolutions majeures depuis : mai 1968, alternance politique de 1981, quinquennat (2000), décentralisation, construction européenne.",
        ],
        [
          'cours',
          'Vers l’égalité femmes-hommes',
          "Grandes étapes :\n- **1944** : droit de vote ;\n- **1965** : les femmes peuvent travailler et ouvrir un compte bancaire sans l'autorisation de leur mari ;\n- **1967** : loi Neuwirth (contraception) ;\n- **1975** : loi Veil (IVG) ;\n- **1975** : divorce par consentement mutuel ;\n- **2000** : loi sur la parité en politique ;\n- **2013** : mariage pour tous.",
        ],
      ],
      essentiel: [
        '1944 : droit de vote des femmes. 1945 : Sécurité sociale.',
        '1958 : fondation de la Vᵉ République par de Gaulle.',
        '1962 : élection du président au suffrage universel direct.',
        '1967 : loi Neuwirth (contraception). 1975 : loi Veil (IVG).',
        '2000 : loi sur la parité.',
      ],
      videos: [['Ve République 3ème histoire brevet', 12, 'Les Bons Profs']],
      quiz: [
        {
          q: 'En quelle année est fondée la Vᵉ République ?',
          kind: 'calcul',
          answer: ['1958'],
          why: 'Constitution adoptée par référendum en septembre 1958.',
        },
        {
          q: 'La loi Veil de 1975 concerne…',
          options: ['la contraception', "l'IVG", 'le divorce', 'la parité'],
          answer: 1,
          why: 'Elle dépénalise l’interruption volontaire de grossesse. La contraception, c’est la loi Neuwirth (1967).',
        },
        {
          q: 'La Sécurité sociale est créée en 1945.',
          kind: 'vraifaux',
          answer: true,
          why: 'Elle découle du programme du Conseil national de la Résistance.',
        },
      ],
      exos: [],
    },
    {
      id: 'geo-urbain',
      title: 'Géographie : aires urbaines et espaces productifs',
      intro: "Comment les Français habitent et produisent : villes, campagnes, industries, tourisme.",
      sections: [
        [
          'definition',
          'L’organisation du territoire français',
          "Une **aire urbaine** est composée d'un **pôle urbain** (ville-centre + banlieue) et d'une **couronne périurbaine** dont au moins 40 % des actifs travaillent dans le pôle.\n\n**Métropolisation** : concentration croissante des populations, des richesses et des fonctions de commandement dans les grandes villes. **Paris** est la seule métropole française de rang mondial.\n\n**Périurbanisation** : extension des villes vers les campagnes, liée à l'usage de la voiture et au coût du logement. Elle provoque un **étalement urbain** et une forte mobilité quotidienne.",
        ],
        [
          'cours',
          'Les espaces productifs',
          "**Espaces agricoles** : productifs et spécialisés (céréales en Beauce, vigne en Bourgogne, élevage en Bretagne). Ils sont ouverts sur le marché mondial mais confrontés à des enjeux environnementaux.\n\n**Espaces industriels** : concentrés près des façades maritimes, des grands axes et des métropoles ; recul des anciennes régions industrielles (Nord, Lorraine) et essor des technopôles (Toulouse, Grenoble, Sophia-Antipolis).\n\n**Espaces de services** : le tourisme fait de la France la **première destination touristique mondiale** (littoraux, montagnes, Paris).",
        ],
        [
          'cours',
          'Espaces de faible densité et Union européenne',
          "Les **espaces de faible densité** (montagnes, diagonale des faibles densités) cherchent de nouvelles ressources : tourisme vert, énergies renouvelables, télétravail, néo-ruraux.\n\nLa **France dans l'Union européenne** : membre fondateur, elle bénéficie du marché unique, de l'euro et des fonds européens. Les **régions transfrontalières** sont dynamiques. L'UE réduit les inégalités entre territoires grâce à sa politique de cohésion.\n\nLa France est aussi présente sur tous les océans grâce à ses **territoires ultramarins**, qui lui donnent le **deuxième domaine maritime mondial**.",
        ],
      ],
      essentiel: [
        'Aire urbaine = pôle urbain + couronne périurbaine.',
        'Métropolisation = concentration des richesses et des fonctions dans les grandes villes.',
        'Paris est la seule métropole française de rang mondial.',
        'La France est la 1ʳᵉ destination touristique mondiale.',
        'Grâce à l’outre-mer, la France a le 2ᵉ domaine maritime mondial.',
      ],
      pieges: [
        'Confondre ville et aire urbaine : l’aire urbaine inclut la couronne périurbaine.',
        'Croire que les espaces de faible densité sont « vides » : ils ont des dynamiques propres.',
      ],
      videos: [
        ['aires urbaines France 3ème géographie', 11, 'Les Bons Profs'],
        ['espaces productifs France 3ème', 10, 'Géographie collège'],
      ],
      quiz: [
        {
          q: 'Une aire urbaine est composée d’un pôle urbain et…',
          options: [
            'd’une zone industrielle',
            'd’une couronne périurbaine',
            'd’un espace agricole',
            'd’une métropole mondiale',
          ],
          answer: 1,
          why: 'La couronne périurbaine regroupe les communes dont les actifs travaillent majoritairement dans le pôle.',
        },
        {
          q: 'La France est la première destination touristique mondiale.',
          kind: 'vraifaux',
          answer: true,
          why: 'En nombre de visiteurs internationaux.',
        },
        {
          q: 'Quelle est la seule métropole française de rang mondial ?',
          kind: 'texte',
          answer: ['paris'],
          why: 'Par ses fonctions de commandement économiques, politiques et culturelles.',
        },
        {
          q: 'La périurbanisation désigne le retour des habitants vers les centres-villes.',
          kind: 'vraifaux',
          answer: false,
          why: 'C’est l’inverse : l’extension des villes vers les espaces ruraux proches.',
        },
      ],
      exos: [],
    },
    {
      id: 'emc',
      title: 'EMC : République, citoyenneté et défense',
      intro: "Les valeurs et principes de la République, les droits et devoirs du citoyen.",
      sections: [
        [
          'definition',
          'Les valeurs et principes de la République',
          "**Devise** : Liberté, Égalité, Fraternité.\n**Principes** (article 1 de la Constitution) : la France est une République **indivisible, laïque, démocratique et sociale**.\n\nLa **laïcité** (loi de 1905) garantit la liberté de conscience, sépare l'État des religions et assure l'égalité de tous devant la loi. À l'école publique, les signes religieux ostensibles sont interdits (loi de 2004).",
        ],
        [
          'cours',
          'Droits et devoirs du citoyen',
          "**Droits** : voter et être élu (à partir de 18 ans), s'exprimer, se réunir, s'associer, être protégé par la loi.\n**Devoirs** : respecter la loi, payer ses impôts, participer à la défense (JDC), être juré d'assises, respecter autrui.\n\n**Parcours citoyen** : recensement à 16 ans → **Journée défense et citoyenneté (JDC)** → inscription automatique sur les listes électorales.",
        ],
        [
          'cours',
          'La justice et la défense',
          "La justice française distingue :\n- la **justice civile** (conflits entre particuliers) ;\n- la **justice pénale** (infractions : contraventions, délits, crimes).\nLes mineurs relèvent d'une justice spécifique, avec le juge des enfants.\n\nLa **défense nationale** protège le territoire et les citoyens ; la France participe aussi à des opérations internationales (ONU, OTAN, UE) et à la sécurité collective.",
        ],
      ],
      essentiel: [
        'République indivisible, laïque, démocratique et sociale.',
        'Loi de 1905 : séparation des Églises et de l’État.',
        'Recensement à 16 ans, puis JDC, puis inscription automatique sur les listes électorales.',
        'Justice civile = conflits entre particuliers ; justice pénale = infractions.',
      ],
      videos: [['EMC 3ème valeurs République laïcité', 9, 'Les Bons Profs']],
      quiz: [
        {
          q: 'De quelle année date la loi de séparation des Églises et de l’État ?',
          kind: 'calcul',
          answer: ['1905'],
          why: 'Elle fonde la laïcité française.',
        },
        {
          q: 'À quel âge se fait le recensement citoyen ?',
          options: ['15 ans', '16 ans', '18 ans', '20 ans'],
          answer: 1,
          why: 'Puis vient la Journée défense et citoyenneté.',
        },
        {
          q: 'La justice pénale règle les conflits entre particuliers.',
          kind: 'vraifaux',
          answer: false,
          why: 'C’est la justice civile ; la justice pénale sanctionne les infractions.',
        },
      ],
      exos: [],
    },
  ],
}
