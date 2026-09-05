import type { SubjectSeed } from './types'

export const francais: SubjectSeed = {
  id: 'francais',
  name: 'Français',
  short: 'Fr.',
  tone: 'rose',
  emoji: '📖',
  coefficient: 2,
  chapters: [
    {
      id: 'fr-grammaire',
      title: 'Grammaire : classes et fonctions',
      intro:
        "Savoir nommer les mots et leur rôle dans la phrase : c'est la base de la dictée, de la réécriture et des questions de langue.",
      sections: [
        [
          'definition',
          'Les classes grammaticales',
          "La classe (ou nature) d'un mot ne change **jamais** : elle est indiquée dans le dictionnaire.\n\n**Variables** : nom, déterminant, adjectif qualificatif, pronom, verbe.\n**Invariables** : adverbe, préposition, conjonction (de coordination ou de subordination), interjection.\n\nAstuce : les conjonctions de coordination se retiennent avec « **mais où et donc or ni car** ».",
        ],
        [
          'definition',
          'Les fonctions',
          "La fonction dépend de la **place du mot dans la phrase** : elle peut changer.\n\n**Autour du verbe** : sujet, COD, COI, complément d'agent, attribut du sujet.\n**Compléments circonstanciels** : temps, lieu, manière, cause, conséquence, but (déplaçables et souvent supprimables).\n**Autour du nom** : épithète, complément du nom, apposition.\n\n**Comment trouver le COD ?** On pose la question *qui ?* ou *quoi ?* après le verbe. Le COI répond à *à qui ? de quoi ?*",
        ],
        [
          'propriete',
          'Les propositions',
          "Une **proposition** s'organise autour d'un verbe conjugué.\n\n**Juxtaposition** : propositions séparées par une virgule, un point-virgule ou deux-points.\n**Coordination** : reliées par une conjonction de coordination.\n**Subordination** : une proposition dépend d'une autre.\n\nTrois grands types de subordonnées :\n- **relative** (introduite par qui, que, dont, où…) : elle complète un nom ;\n- **conjonctive complétive** (introduite par *que*) : souvent COD du verbe ;\n- **circonstancielle** (quand, parce que, si, bien que…) : elle indique les circonstances.",
        ],
        [
          'astuce',
          'La méthode qui marche',
          "Pour analyser un mot, pose-toi **deux questions dans cet ordre** :\n**1.** Quelle est sa classe ? (« c'est un nom »)\n**2.** Quelle est sa fonction ? (« il est sujet du verbe *courir* »)\nNe jamais mélanger les deux : « adjectif » est une classe, « épithète » est une fonction.",
        ],
      ],
      essentiel: [
        'La classe d’un mot ne change jamais, sa fonction dépend de la phrase.',
        'COD : qui ? quoi ? — COI : à qui ? de quoi ?',
        'Conjonctions de coordination : mais, ou, et, donc, or, ni, car.',
        'Trois subordonnées : relative, complétive, circonstancielle.',
        'Adjectif = classe ; épithète et attribut = fonctions.',
      ],
      pieges: [
        'Dire qu’un mot « est épithète » pour donner sa classe : épithète est une fonction.',
        'Confondre COD et attribut du sujet : après être, sembler, devenir, c’est un attribut.',
      ],
      videos: [
        ['classes grammaticales fonctions 3ème', 12, 'Les Bons Profs'],
        ['propositions subordonnées 3ème français', 11, 'Français collège'],
      ],
      quiz: [
        {
          q: 'Dans « Le chat noir dort », quelle est la fonction de « noir » ?',
          options: ['Attribut du sujet', 'Épithète', 'COD', 'Complément du nom'],
          answer: 1,
          why: 'Il est directement accolé au nom « chat », sans verbe d’état : c’est une épithète.',
        },
        {
          q: 'Dans « Elle semble fatiguée », « fatiguée » est…',
          options: ['COD', 'Épithète', 'Attribut du sujet', 'Complément circonstanciel'],
          answer: 2,
          why: '« sembler » est un verbe d’état : l’adjectif est attribut du sujet.',
        },
        {
          q: 'La classe grammaticale d’un mot peut changer selon la phrase.',
          kind: 'vraifaux',
          answer: false,
          why: 'C’est la fonction qui change ; la classe est fixe.',
        },
        {
          q: 'Dans « Je pense que tu as raison », la subordonnée est…',
          options: ['relative', 'complétive', 'circonstancielle de cause', 'juxtaposée'],
          answer: 1,
          why: 'Introduite par « que » et COD du verbe « penser » : c’est une complétive.',
        },
        {
          q: 'Associe chaque mot à sa classe.',
          kind: 'associer',
          pairs: [
            ['rapidement', 'adverbe'],
            ['sous', 'préposition'],
            ['celui-ci', 'pronom'],
            ['parce que', 'conjonction de subordination'],
          ],
        },
      ],
      exos: [
        {
          titre: 'Analyse de phrase',
          enonce:
            'Analyser (classe + fonction) les mots soulignés dans : « Hier, ma sœur a offert un livre passionnant à son amie. » — soulignés : Hier / livre / passionnant / à son amie.',
          niveau: 2,
          correction: [
            '« Hier » : adverbe — complément circonstanciel de temps.',
            '« livre » : nom commun — noyau du groupe nominal COD de « a offert ».',
            '« passionnant » : adjectif qualificatif — épithète du nom « livre ».',
            '« à son amie » : groupe nominal prépositionnel — COI de « a offert ».',
          ],
        },
      ],
    },
    {
      id: 'fr-conjugaison',
      title: 'Conjugaison et valeurs des temps',
      intro:
        "Bien choisir son temps et l'écrire correctement : c'est ce qui fait la différence en dictée et en rédaction.",
      sections: [
        [
          'propriete',
          'Les valeurs des temps du récit',
          "**Imparfait** : arrière-plan, description, habitude, action en cours. *Il pleuvait, les gens marchaient vite.*\n**Passé simple** : premier plan, action brève et achevée qui fait avancer le récit. *Soudain, il entra.*\n**Plus-que-parfait** : antériorité par rapport à un autre passé. *Il avait déjà mangé quand elle arriva.*\n\nDans un récit au présent, le **présent de narration** rend la scène plus vivante.",
        ],
        [
          'methode',
          'Le passé simple sans erreur',
          "1ᵉʳ groupe : **-ai, -as, -a, -âmes, -âtes, -èrent** (je chantai).\n2ᵉ groupe : **-is, -is, -it, -îmes, -îtes, -irent** (je finis).\n3ᵉ groupe : en **-is** (je pris), en **-us** (je voulus) ou en **-ins** (je vins).\n\nÀ connaître absolument : *être* (je fus), *avoir* (j'eus), *faire* (je fis), *venir* (je vins), *voir* (je vis), *prendre* (je pris), *pouvoir* (je pus).",
        ],
        [
          'propriete',
          'Le conditionnel et le subjonctif',
          "**Conditionnel présent** = radical du futur + terminaisons de l'imparfait (*je viendrais*). Il exprime l'hypothèse, la politesse, le futur dans le passé.\n\n**Subjonctif présent** : après *il faut que*, *bien que*, *pour que*, *avant que*, et après les verbes de volonté ou de sentiment. *Il faut que tu viennes.*\n\n**Attention à la concordance** : *Si + imparfait → conditionnel présent* (« Si j'avais le temps, je viendrais »). **Jamais de conditionnel après « si » d'hypothèse.**",
        ],
      ],
      essentiel: [
        'Imparfait = arrière-plan ; passé simple = actions de premier plan.',
        'Plus-que-parfait = antériorité dans le passé.',
        'Conditionnel = radical du futur + terminaisons de l’imparfait.',
        'Si + imparfait → conditionnel présent.',
        'Subjonctif après « il faut que », « bien que », « pour que ».',
      ],
      pieges: [
        '« Si j’aurais » : faux. On écrit « Si j’avais ».',
        'Confondre futur (je serai) et conditionnel (je serais) : remplace par « nous » pour entendre la différence.',
      ],
      videos: [
        ['valeurs des temps imparfait passé simple 3ème', 10, 'Les Bons Profs'],
        ['conditionnel subjonctif 3ème français', 11, 'Français collège'],
      ],
      quiz: [
        {
          q: 'Complète : « Si j’avais plus de temps, je ___ à la piscine. »',
          options: ['irai', 'irais', 'aurais allé', 'vais'],
          answer: 1,
          why: 'Si + imparfait → conditionnel présent : « j’irais ».',
        },
        {
          q: 'Quel temps sert à décrire l’arrière-plan d’un récit ?',
          options: ['Le passé simple', 'L’imparfait', 'Le futur', 'Le passé composé'],
          answer: 1,
          why: 'L’imparfait installe le décor et les actions en cours.',
        },
        {
          q: '« Il faut que tu viennes » est au subjonctif.',
          kind: 'vraifaux',
          answer: true,
          why: '« Il faut que » entraîne le subjonctif.',
        },
        {
          q: 'Conjugue « prendre » à la 3ᵉ personne du singulier du passé simple.',
          kind: 'texte',
          answer: ['il prit', 'prit', 'elle prit'],
          why: 'Passé simple en -is du 3ᵉ groupe.',
        },
      ],
      exos: [
        {
          titre: 'Réécriture',
          enonce:
            'Réécrire au passé (imparfait / passé simple) : « Il marche dans la rue quand soudain il aperçoit une silhouette. Il s’arrête et retient son souffle. »',
          niveau: 2,
          indice: 'Les actions de fond passent à l’imparfait, les actions brèves au passé simple.',
          correction: [
            '« Il marchait dans la rue quand soudain il aperçut une silhouette. »',
            '« Il s’arrêta et retint son souffle. »',
            'Remarque : « marchait » (action en cours, arrière-plan), « aperçut », « s’arrêta », « retint » (actions brèves, premier plan).',
          ],
        },
      ],
    },
    {
      id: 'fr-orthographe',
      title: 'Orthographe et accords',
      intro: "Les règles qui rapportent le plus de points en dictée, et leurs pièges classiques.",
      sections: [
        [
          'propriete',
          'L’accord du participe passé',
          "**Avec être** : il s'accorde avec le **sujet**. *Elles sont parties.*\n\n**Avec avoir** : il s'accorde avec le **COD seulement si celui-ci est placé avant** le verbe.\n*J'ai mangé les pommes* (pas d'accord, COD après).\n*Les pommes que j'ai mangées* (accord, COD avant).\n\n**Verbes pronominaux** : on applique la règle de « avoir » avec le pronom réfléchi. *Elle s'est lavée* (COD avant) mais *elle s'est lavé les mains* (COD après).",
        ],
        [
          'methode',
          'Les homophones à ne pas rater',
          "**a / à** : *a* = verbe avoir (remplace par *avait*).\n**et / est** : *est* = verbe être (remplace par *était*).\n**son / sont** : *sont* = verbe être (remplace par *étaient*).\n**ce / se** : *se* accompagne un verbe pronominal.\n**ces / ses** : *ses* = les siens ; *ces* = ceux-là.\n**on / ont** : *ont* = verbe avoir (remplace par *avaient*).\n**leur / leurs** : *leur* devant un verbe est invariable (pronom).\n**tout / tous** : *tout* adverbe est invariable (*tout étonnés*), *tous* déterminant s'accorde.",
        ],
        [
          'astuce',
          'La relecture en trois passages',
          "Relis ton texte **trois fois**, à chaque fois pour une seule chose :\n**1.** Les accords sujet-verbe (cherche chaque verbe, puis son sujet).\n**2.** Les accords dans les groupes nominaux (déterminant + nom + adjectif).\n**3.** Les participes passés et les homophones.\nUne relecture globale ne repère presque rien : une relecture ciblée repère tout.",
        ],
      ],
      essentiel: [
        'Participe passé avec être → accord avec le sujet.',
        'Participe passé avec avoir → accord avec le COD s’il est placé avant.',
        'a / à, et / est, son / sont, on / ont : remplace par l’imparfait pour trancher.',
        '« leur » devant un verbe ne prend jamais de s.',
        'Relire trois fois, chaque fois pour un seul type d’erreur.',
      ],
      pieges: [
        '« Les fleurs que j’ai cueilli » : il faut « cueillies » (COD avant).',
        '« Ils leurs ont dit » : faux, « leur » est ici pronom, donc invariable.',
      ],
      videos: [
        ['accord participe passé 3ème', 9, 'Les Bons Profs'],
        ['homophones grammaticaux brevet', 8, 'Français collège'],
      ],
      quiz: [
        {
          q: 'Complète : « Les lettres que j’ai ___ hier. »',
          options: ['écrit', 'écrits', 'écrites', 'écrite'],
          answer: 2,
          why: 'Le COD « les lettres » est placé avant l’auxiliaire avoir : accord au féminin pluriel.',
        },
        {
          q: 'Complète : « Ils ___ arrivés en retard. »',
          options: ['son', 'sont', 'sons', "s'ont"],
          answer: 1,
          why: 'On peut remplacer par « étaient » : c’est le verbe être.',
        },
        {
          q: '« Elle s’est lavé les mains » est correct.',
          kind: 'vraifaux',
          answer: true,
          why: 'Le COD « les mains » est placé après : pas d’accord.',
        },
        {
          q: 'Dans « Je leur ai parlé », « leur » prend un s.',
          kind: 'vraifaux',
          answer: false,
          why: 'Devant un verbe, « leur » est un pronom invariable.',
        },
        {
          q: 'Complète : « Elle ___ beaucoup travaillé. »',
          options: ['a', 'à', 'as', 'ah'],
          answer: 0,
          why: 'On peut remplacer par « avait » : c’est le verbe avoir.',
        },
      ],
      exos: [],
    },
    {
      id: 'fr-methode',
      title: 'Méthode : brevet de français',
      intro:
        "L'épreuve dure 3 h : questions de compréhension et de grammaire, dictée, réécriture, puis rédaction. Voici comment gérer chaque partie.",
      sections: [
        [
          'methode',
          'Les questions sur le texte',
          "**1.** Lis d'abord les questions, puis le texte : tu sauras quoi chercher.\n**2.** Repère toujours **qui parle**, **d'où** (point de vue), **quand** (temps du récit).\n**3.** Réponds par une **phrase complète** qui reprend les mots de la question.\n**4.** **Cite le texte** entre guillemets et donne la ligne.\n**5.** Le barème indique la longueur attendue : 2 points = 2 ou 3 phrases avec un exemple.",
        ],
        [
          'methode',
          'La dictée et la réécriture',
          "**Dictée** : concentre-toi sur les accords (sujet-verbe, groupe nominal, participe passé) plutôt que sur le lexique. Utilise le temps de relecture entièrement.\n\n**Réécriture** : repère d'abord **ce qui change** (personne, temps, nombre, genre), puis souligne dans le texte **tous les mots concernés** avant d'écrire. C'est un exercice mécanique : rien ne doit changer d'autre.",
        ],
        [
          'methode',
          'La rédaction',
          "Deux sujets au choix : **sujet d'imagination** ou **sujet de réflexion**.\n\n**Toujours** :\n**1.** 5 minutes de brouillon : plan en 3 parties ou trame narrative.\n**2.** Une introduction qui pose la situation, un développement en paragraphes, une conclusion.\n**3.** Des **connecteurs** (d'abord, ensuite, en revanche, ainsi).\n**4.** 10 minutes de relecture en fin d'épreuve — non négociable.\n\n**Sujet d'imagination** : respecte le narrateur, le temps et l'univers du texte de départ. Ajoute du dialogue et des descriptions sensorielles.\n**Sujet de réflexion** : une idée par paragraphe, chaque idée illustrée par un **exemple précis** (lecture, film, actualité, expérience personnelle).",
        ],
        [
          'astuce',
          'Gérer les 3 heures',
          "Questions : **1 h 10**. Dictée : **20 min**. Réécriture : **15 min**. Rédaction : **1 h 05**, dont 10 min de relecture.\nSi tu bloques sur une question, mets une croix et avance : tu y reviendras.",
        ],
      ],
      essentiel: [
        'Toujours répondre par une phrase complète en citant le texte.',
        'Réécriture : repérer d’abord tout ce qui change, ne rien modifier d’autre.',
        'Rédaction : brouillon 5 min, plan, connecteurs, relecture 10 min.',
        'Sujet de réflexion : une idée = un paragraphe = un exemple.',
      ],
      pieges: [
        'Répondre par un seul mot ou par « oui/non » sans justifier.',
        'Oublier la relecture faute de temps : garde-la, elle vaut plusieurs points.',
      ],
      videos: [
        ['méthode brevet français rédaction', 13, 'Les Bons Profs'],
        ['réussir la dictée du brevet', 8, 'Français collège'],
      ],
      quiz: [
        {
          q: 'Dans une réponse aux questions, il faut citer le texte.',
          kind: 'vraifaux',
          answer: true,
          why: 'La citation entre guillemets, avec le numéro de ligne, justifie la réponse.',
        },
        {
          q: 'Combien de temps dure l’épreuve de français du brevet ?',
          options: ['2 h', '2 h 30', '3 h', '4 h'],
          answer: 2,
          why: 'Trois heures, en deux parties.',
        },
        {
          q: 'Dans un sujet de réflexion, un exemple par paragraphe suffit largement.',
          kind: 'vraifaux',
          answer: true,
          why: 'Une idée, un développement, un exemple précis : c’est la structure attendue.',
        },
      ],
      exos: [
        {
          titre: 'Plan de rédaction',
          enonce:
            'Sujet de réflexion : « Selon vous, lire est-il encore utile aujourd’hui ? » Proposez un plan détaillé en trois parties avec un exemple par partie.',
          niveau: 3,
          correction: [
            'Introduction : reformuler la question, annoncer le plan.',
            '1) Lire développe l’imagination et l’esprit critique — exemple : un roman qui fait comprendre une époque (1984, Le Journal d’Anne Frank).',
            '2) Lire enrichit la langue et la réussite scolaire — exemple : le vocabulaire acquis en lecture se retrouve à l’écrit.',
            '3) Nuance : d’autres supports informent aussi (documentaires, podcasts), mais la lecture demande une attention plus longue et plus profonde.',
            'Conclusion : la lecture reste utile, à condition de la considérer comme complémentaire des autres médias.',
          ],
        },
      ],
    },
    {
      id: 'fr-litterature',
      title: 'Les œuvres et les genres',
      intro:
        "Se raconter, dénoncer, s'engager, rêver : les quatre grandes entrées du programme de 3ème, avec le vocabulaire d'analyse.",
      sections: [
        [
          'cours',
          'Se raconter, se représenter',
          "L'**autobiographie** est un récit rétrospectif qu'une personne réelle fait de sa propre existence : l'auteur, le narrateur et le personnage sont **la même personne** (pacte autobiographique).\n\nGenres voisins : **mémoires**, **journal intime**, **autoportrait**, **autofiction** (mélange de vécu et d'invention).\nAuteurs de référence : Rousseau (*Les Confessions*), Annie Ernaux, Anne Frank, Georges Perec.",
        ],
        [
          'cours',
          'Dénoncer les travers de la société',
          "Les auteurs utilisent des armes littéraires :\n- l'**ironie** (dire le contraire de ce que l'on pense) ;\n- la **satire** (moquerie critique) ;\n- l'**apologue** (fable, conte philosophique porteur d'une leçon) ;\n- l'**hyperbole** et la **caricature**.\n\nExemples : La Fontaine, Voltaire (*Candide*), Molière, Hugo, la presse satirique.",
        ],
        [
          'cours',
          'Agir dans la cité : individu et pouvoir',
          "La littérature engagée dénonce l'oppression et défend des valeurs. On y trouve le **témoignage** (récits de guerre, de camps), le **manifeste**, la **poésie de résistance** (Éluard, Aragon), le **théâtre engagé**.\n\nOn y étudie le rapport entre l'individu et l'Histoire : comment un être ordinaire est pris dans des événements qui le dépassent.",
        ],
        [
          'methode',
          'Les figures de style à connaître',
          "**Comparaison** : rapprochement avec un outil (*comme*, *tel que*).\n**Métaphore** : comparaison sans outil (*cet homme est un lion*).\n**Personnification** : un objet ou un animal se comporte comme un humain.\n**Hyperbole** : exagération.\n**Litote** : dire peu pour suggérer beaucoup (*ce n'est pas mauvais*).\n**Anaphore** : répétition en début de phrases ou de vers.\n**Antithèse** : deux idées opposées rapprochées.\n**Oxymore** : deux mots contradictoires côte à côte (*une obscure clarté*).",
        ],
      ],
      essentiel: [
        'Autobiographie : auteur = narrateur = personnage.',
        'Ironie, satire, apologue : les armes de la dénonciation.',
        'Métaphore = comparaison sans outil de comparaison.',
        'Litote : dire moins pour suggérer plus. Hyperbole : exagérer.',
        'Oxymore : deux mots contradictoires collés (« obscure clarté »).',
      ],
      pieges: [
        'Confondre comparaison et métaphore : la comparaison garde l’outil (« comme »).',
        'Confondre auteur et narrateur dans un roman : ils sont différents, sauf en autobiographie.',
      ],
      videos: [
        ['figures de style 3ème brevet', 11, 'Les Bons Profs'],
        ['autobiographie 3ème français', 9, 'Français collège'],
      ],
      quiz: [
        {
          q: '« Cet homme est un lion » est…',
          options: ['une comparaison', 'une métaphore', 'une litote', 'une anaphore'],
          answer: 1,
          why: 'Il n’y a pas d’outil de comparaison : c’est une métaphore.',
        },
        {
          q: '« Une obscure clarté » est un oxymore.',
          kind: 'vraifaux',
          answer: true,
          why: 'Deux mots de sens contradictoire sont juxtaposés.',
        },
        {
          q: 'Dans une autobiographie, l’auteur et le narrateur sont la même personne.',
          kind: 'vraifaux',
          answer: true,
          why: 'C’est le pacte autobiographique.',
        },
        {
          q: 'Quelle figure consiste à répéter un mot en début de phrases successives ?',
          kind: 'texte',
          answer: ['anaphore', "l'anaphore", 'une anaphore'],
          why: 'Très fréquente en poésie engagée (Éluard, « Liberté »).',
        },
        {
          q: 'Associe chaque figure à son exemple.',
          kind: 'associer',
          pairs: [
            ['Hyperbole', 'Je meurs de faim'],
            ['Litote', 'Ce n’est pas mauvais'],
            ['Personnification', 'Le vent murmure'],
            ['Antithèse', 'Il fait nuit le jour'],
          ],
        },
      ],
      exos: [],
    },
  ],
}
