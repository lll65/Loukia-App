import type { SubjectSeed } from './types'

export const maths: SubjectSeed = {
  id: 'maths',
  name: 'Mathématiques',
  short: 'Maths',
  tone: 'violet',
  emoji: '📐',
  coefficient: 2,
  chapters: [
    {
      id: 'maths-nombres',
      title: 'Nombres et calculs',
      intro:
        "Tout part de là : fractions, puissances, racines et arithmétique. Ce chapitre sert dans tous les autres, alors autant l'avoir vraiment solide.",
      sections: [
        [
          'definition',
          'Les ensembles de nombres',
          "**Entiers naturels** : 0, 1, 2, 3… (les nombres pour compter).\n**Entiers relatifs** : les entiers avec un signe, comme −5 ou +12.\n**Décimaux** : les nombres qui s'écrivent avec un nombre fini de chiffres après la virgule (3,25).\n**Rationnels** : tous les nombres qui s'écrivent sous forme de fraction a/b (2/3, −7/4).\nCertains nombres, comme √2 ou π, ne sont pas rationnels : on les appelle **irrationnels**.",
        ],
        [
          'propriete',
          'Calculer avec les fractions',
          "**Addition / soustraction** : il faut le **même dénominateur**.\na/c + b/c = (a + b)/c\nSinon on réduit au même dénominateur avant.\n\n**Multiplication** : on multiplie les numérateurs entre eux et les dénominateurs entre eux.\n(a/b) × (c/d) = (a×c)/(b×d)\n\n**Division** : diviser, c'est multiplier par l'inverse.\n(a/b) ÷ (c/d) = (a/b) × (d/c)",
        ],
        [
          'exemple',
          'Exemple guidé',
          "Calculer 3/4 + 5/6.\n**1.** Dénominateur commun : 12 (car 4×3 = 12 et 6×2 = 12).\n**2.** 3/4 = 9/12 et 5/6 = 10/12.\n**3.** 9/12 + 10/12 = **19/12**.\nOn vérifie que la fraction est irréductible : 19 est premier, donc oui.",
        ],
        [
          'propriete',
          'Les puissances',
          "aⁿ = a × a × … × a (n facteurs), avec a⁰ = 1 et a⁻ⁿ = 1/aⁿ.\n\n**Règles à connaître par cœur :**\naᵐ × aⁿ = aᵐ⁺ⁿ\naᵐ ÷ aⁿ = aᵐ⁻ⁿ\n(aᵐ)ⁿ = aᵐˣⁿ\n(a × b)ⁿ = aⁿ × bⁿ\n\n**Écriture scientifique** : un nombre s'écrit a × 10ⁿ avec 1 ≤ a < 10.\nExemple : 45 200 = 4,52 × 10⁴ et 0,0031 = 3,1 × 10⁻³.",
        ],
        [
          'methode',
          'Arithmétique : PGCD et fractions irréductibles',
          "**Diviseur** : b divise a si le reste de a ÷ b vaut 0.\n**Nombre premier** : il a exactement deux diviseurs, 1 et lui-même (2, 3, 5, 7, 11, 13, 17, 19, 23…).\n\n**Méthode pour rendre une fraction irréductible :**\n**1.** Décomposer le numérateur et le dénominateur en produits de facteurs premiers.\n**2.** Simplifier les facteurs communs.\nExemple : 84/126 → 84 = 2²×3×7, 126 = 2×3²×7 → on simplifie par 2×3×7 = 42 → **2/3**.\n\nLe **PGCD** est le plus grand diviseur commun : on peut l'obtenir avec l'algorithme d'Euclide (on remplace le grand nombre par le reste, jusqu'à tomber sur 0).",
        ],
        [
          'astuce',
          'Le réflexe des priorités',
          "Ordre des opérations : **parenthèses → puissances → × et ÷ → + et −**.\nÀ gauche vers la droite pour les opérations de même priorité.\nMoyen mnémotechnique : *Parce Que Ma Divine Amie Sourit*.",
        ],
      ],
      essentiel: [
        'Additionner des fractions demande le même dénominateur ; multiplier n’en demande pas.',
        'Diviser par une fraction = multiplier par son inverse.',
        'aᵐ × aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐˣⁿ, a⁻ⁿ = 1/aⁿ, a⁰ = 1.',
        'Écriture scientifique : a × 10ⁿ avec 1 ≤ a < 10.',
        'Un nombre premier a exactement deux diviseurs : 1 et lui-même.',
        'Pour simplifier une fraction : décomposer en facteurs premiers puis barrer les facteurs communs.',
      ],
      formules: [
        'a/b + c/b = (a+c)/b',
        '(a/b) × (c/d) = ac/bd',
        '(a/b) ÷ (c/d) = (a/b) × (d/c)',
        'aᵐ × aⁿ = aᵐ⁺ⁿ',
        'aᵐ / aⁿ = aᵐ⁻ⁿ',
        '(aᵐ)ⁿ = aᵐⁿ',
      ],
      pieges: [
        'a/b + c/d ≠ (a+c)/(b+d) — c’est l’erreur la plus fréquente.',
        '(−3)² = 9 mais −3² = −9 : les parenthèses changent tout.',
        '2³ ≠ 2 × 3 : c’est 2 × 2 × 2 = 8.',
        'En écriture scientifique, 12 × 10³ n’est pas correct : il faut 1,2 × 10⁴.',
      ],
      videos: [
        ['fractions troisième cours Yvan Monka', 12, 'Yvan Monka'],
        ['puissances 3ème écriture scientifique', 10, 'Maths et tiques'],
        ['PGCD algorithme Euclide 3ème', 9, 'Yvan Monka'],
      ],
      quiz: [
        {
          q: 'Combien vaut 3/4 + 5/6 ?',
          options: ['8/10', '19/12', '15/24', '4/5'],
          answer: 1,
          why: 'On réduit au dénominateur 12 : 9/12 + 10/12 = 19/12.',
        },
        {
          q: 'Simplifier (2/3) ÷ (4/5).',
          options: ['8/15', '5/6', '10/12', '3/10'],
          answer: 1,
          why: 'Diviser par 4/5 revient à multiplier par 5/4 : (2×5)/(3×4) = 10/12 = 5/6.',
        },
        {
          q: 'Écris 0,000 42 en écriture scientifique.',
          kind: 'texte',
          answer: ['4,2 × 10^-4', '4,2 x 10^-4', '4.2 × 10^-4', '4.2*10^-4', '4,2.10^-4', '4,2 10^-4'],
          why: 'On déplace la virgule de 4 rangs vers la droite : 4,2 × 10⁻⁴.',
        },
        {
          q: '2⁵ × 2³ = 2⁸',
          kind: 'vraifaux',
          answer: true,
          why: 'Même base : on additionne les exposants, 5 + 3 = 8.',
        },
        {
          q: '17 est un nombre premier.',
          kind: 'vraifaux',
          answer: true,
          why: '17 n’est divisible que par 1 et 17.',
        },
        {
          q: 'Quel est le PGCD de 84 et 126 ?',
          kind: 'calcul',
          answer: ['42'],
          why: '84 = 2²×3×7 et 126 = 2×3²×7 → PGCD = 2×3×7 = 42.',
        },
        {
          q: 'Associe chaque écriture à sa valeur.',
          kind: 'associer',
          pairs: [
            ['3⁻²', '1/9'],
            ['(−2)⁴', '16'],
            ['10⁰', '1'],
            ['5² × 5', '125'],
          ],
        },
        {
          q: 'Combien vaut −3² ?',
          options: ['9', '−9', '6', '−6'],
          answer: 1,
          why: 'Sans parenthèses, on calcule 3² = 9 puis on applique le signe moins : −9.',
        },
      ],
      exos: [
        {
          titre: 'Calcul de fractions',
          enonce: 'Calculer A = 5/6 − 2/9 et donner le résultat sous forme irréductible.',
          niveau: 1,
          indice: 'Le plus petit dénominateur commun à 6 et 9 est 18.',
          correction: [
            '5/6 = 15/18 et 2/9 = 4/18.',
            'A = 15/18 − 4/18 = 11/18.',
            '11 est premier et ne divise pas 18 : la fraction est déjà irréductible. A = 11/18.',
          ],
        },
        {
          titre: 'Écriture scientifique',
          enonce:
            'La masse d’un électron est d’environ 0,000 000 000 000 000 000 000 000 000 000 911 kg. Donner cette masse en écriture scientifique.',
          niveau: 2,
          indice: 'Compte le nombre de rangs dont la virgule doit se déplacer.',
          correction: [
            'On veut un nombre a tel que 1 ≤ a < 10 : ici a = 9,11.',
            'La virgule se déplace de 31 rangs vers la droite, donc l’exposant est −31.',
            'Masse ≈ 9,11 × 10⁻³¹ kg.',
          ],
        },
        {
          titre: 'Fraction irréductible',
          enonce: 'Rendre irréductible la fraction 630/924.',
          niveau: 3,
          indice: 'Décompose les deux nombres en facteurs premiers.',
          correction: [
            '630 = 2 × 3² × 5 × 7.',
            '924 = 2² × 3 × 7 × 11.',
            'Facteurs communs : 2 × 3 × 7 = 42 (c’est le PGCD).',
            '630/924 = 15/22.',
          ],
        },
      ],
    },
    {
      id: 'maths-expressions',
      title: 'Expressions algébriques',
      intro:
        "Développer, factoriser, reconnaître les identités remarquables : c'est la boîte à outils qui sert ensuite pour les équations.",
      sections: [
        [
          'definition',
          'Développer et factoriser',
          "**Développer** : transformer un produit en somme.\n**Factoriser** : transformer une somme en produit.\nCe sont deux opérations inverses.\n\n**Simple distributivité** : k(a + b) = ka + kb\n**Double distributivité** : (a + b)(c + d) = ac + ad + bc + bd",
        ],
        [
          'propriete',
          'Les trois identités remarquables',
          "(a + b)² = a² + 2ab + b²\n(a − b)² = a² − 2ab + b²\n(a + b)(a − b) = a² − b²\n\nElles se lisent dans les deux sens : de gauche à droite pour développer, de droite à gauche pour factoriser.",
        ],
        [
          'methode',
          'Comment factoriser ?',
          "**1.** Y a-t-il un **facteur commun** visible ? → on le met en facteur.\nExemple : 6x² + 9x = 3x(2x + 3).\n**2.** Sinon, est-ce une **identité remarquable** ?\n- Trois termes dont deux carrés → (a ± b)².\n- Deux carrés séparés par un « moins » → (a + b)(a − b).\n**3.** Parfois le facteur commun est une parenthèse entière :\n(x + 1)(x − 3) + (x + 1)(2x) = (x + 1)(x − 3 + 2x) = (x + 1)(3x − 3).",
        ],
        [
          'exemple',
          'Exemple complet',
          "Factoriser B = 9x² − 25.\nOn reconnaît a² − b² avec a = 3x et b = 5.\nDonc B = **(3x + 5)(3x − 5)**.\n\nFactoriser C = x² + 10x + 25.\nOn reconnaît a² + 2ab + b² avec a = x et b = 5 (car 2×x×5 = 10x).\nDonc C = **(x + 5)²**.",
        ],
        [
          'attention',
          'Vérifier son résultat',
          "Après une factorisation, **redéveloppe mentalement** : tu dois retrouver l'expression de départ. C'est le meilleur moyen d'éviter une erreur bête le jour du brevet.",
        ],
      ],
      essentiel: [
        'Développer = produit → somme. Factoriser = somme → produit.',
        'k(a + b) = ka + kb ; (a+b)(c+d) = ac + ad + bc + bd.',
        'Les trois identités remarquables se lisent dans les deux sens.',
        'Pour factoriser : chercher un facteur commun, sinon une identité remarquable.',
        'Toujours vérifier en redéveloppant.',
      ],
      formules: ['(a+b)² = a² + 2ab + b²', '(a−b)² = a² − 2ab + b²', '(a+b)(a−b) = a² − b²'],
      pieges: [
        '(a + b)² ≠ a² + b² : il ne faut pas oublier le double produit 2ab.',
        '−(x − 3) = −x + 3 : le signe moins s’applique à toute la parenthèse.',
        'a² − b² se factorise, mais a² + b² ne se factorise pas.',
      ],
      videos: [
        ['développer factoriser 3ème identités remarquables', 14, 'Yvan Monka'],
        ['factorisation exercices type brevet 3ème', 11, 'Maths et tiques'],
      ],
      quiz: [
        {
          q: 'Développer (x + 4)².',
          options: ['x² + 16', 'x² + 8x + 16', 'x² + 4x + 16', 'x² + 8x + 8'],
          answer: 1,
          why: '(a+b)² = a² + 2ab + b² avec a = x et b = 4 → x² + 8x + 16.',
        },
        {
          q: 'Factoriser 49 − x².',
          options: ['(7 − x)²', '(7 + x)(7 − x)', '(x − 7)²', 'Impossible'],
          answer: 1,
          why: 'C’est a² − b² avec a = 7 et b = x.',
        },
        {
          q: 'Factoriser 12x² + 18x.',
          kind: 'texte',
          answer: ['6x(2x+3)', '6x(2x + 3)', '6x*(2x+3)', '(2x+3)6x', '6x (2x+3)'],
          why: 'Le facteur commun est 6x : 12x² + 18x = 6x(2x + 3).',
        },
        {
          q: 'x² + 9 se factorise en (x + 3)².',
          kind: 'vraifaux',
          answer: false,
          why: '(x + 3)² = x² + 6x + 9. Une somme de deux carrés ne se factorise pas.',
        },
        {
          q: 'Développer (2x − 5)(2x + 5).',
          options: ['4x² − 25', '4x² + 25', '2x² − 25', '4x² − 20x − 25'],
          answer: 0,
          why: 'C’est (a−b)(a+b) = a² − b² avec a = 2x et b = 5.',
        },
        {
          q: 'Associe l’expression à sa forme factorisée.',
          kind: 'associer',
          pairs: [
            ['x² − 16', '(x−4)(x+4)'],
            ['x² + 6x + 9', '(x+3)²'],
            ['x² − 10x + 25', '(x−5)²'],
            ['5x² − 15x', '5x(x−3)'],
          ],
        },
      ],
      exos: [
        {
          titre: 'Développer puis réduire',
          enonce: 'Développer et réduire D = (3x − 2)² − (x + 1)(x − 4).',
          niveau: 2,
          indice: 'Traite les deux morceaux séparément, puis soustrais en faisant attention aux signes.',
          correction: [
            '(3x − 2)² = 9x² − 12x + 4.',
            '(x + 1)(x − 4) = x² − 4x + x − 4 = x² − 3x − 4.',
            'D = 9x² − 12x + 4 − (x² − 3x − 4) = 9x² − 12x + 4 − x² + 3x + 4.',
            'D = 8x² − 9x + 8.',
          ],
        },
        {
          titre: 'Factorisation avec parenthèse commune',
          enonce: 'Factoriser E = (2x + 1)(x − 5) + (2x + 1)².',
          niveau: 2,
          indice: 'Le facteur commun est la parenthèse (2x + 1).',
          correction: [
            'E = (2x + 1)[(x − 5) + (2x + 1)].',
            'E = (2x + 1)(x − 5 + 2x + 1).',
            'E = (2x + 1)(3x − 4).',
          ],
        },
        {
          titre: 'Programme de calcul (type brevet)',
          enonce:
            'Choisir un nombre, lui ajouter 3, élever le résultat au carré, puis soustraire 9. Prouver que le résultat est toujours égal au produit du nombre de départ par ce nombre augmenté de 6.',
          niveau: 3,
          indice: 'Appelle x le nombre de départ et écris l’expression, puis factorise.',
          correction: [
            'Soit x le nombre choisi. Le programme donne (x + 3)² − 9.',
            'On développe : x² + 6x + 9 − 9 = x² + 6x.',
            'On factorise : x² + 6x = x(x + 6).',
            'C’est bien le produit du nombre de départ par ce nombre augmenté de 6, quel que soit x.',
          ],
        },
      ],
    },
    {
      id: 'maths-equations',
      title: 'Équations et inéquations',
      intro:
        "Résoudre une équation, c'est trouver toutes les valeurs de x qui rendent l'égalité vraie. Les inéquations suivent les mêmes règles, avec un piège de signe.",
      sections: [
        [
          'propriete',
          'Les règles de résolution',
          "On ne change pas les solutions d'une équation si on :\n- ajoute ou soustrait le **même** nombre aux deux membres ;\n- multiplie ou divise les deux membres par le **même nombre non nul**.\n\nPour une **inéquation**, tout fonctionne pareil sauf : **multiplier ou diviser par un nombre négatif inverse le sens de l'inégalité**.",
        ],
        [
          'methode',
          'Résoudre une équation du premier degré',
          "**1.** Développer et réduire chaque membre.\n**2.** Regrouper les x d'un côté, les nombres de l'autre.\n**3.** Diviser par le coefficient de x.\n**4.** Vérifier en remplaçant dans l'équation de départ.\n\nExemple : 5x − 7 = 2x + 8\n5x − 2x = 8 + 7\n3x = 15\nx = 5 ✔ (5×5 − 7 = 18 et 2×5 + 8 = 18)",
        ],
        [
          'propriete',
          'Équation produit nul',
          "Un produit est nul **si et seulement si** l'un au moins de ses facteurs est nul.\nA × B = 0 ⟺ A = 0 **ou** B = 0.\n\nExemple : (2x − 6)(x + 4) = 0\n2x − 6 = 0 → x = 3\nx + 4 = 0 → x = −4\nLes solutions sont **3 et −4**.",
        ],
        [
          'methode',
          'Résoudre x² = a',
          "- Si a > 0 : deux solutions, x = √a et x = −√a.\n- Si a = 0 : une seule solution, x = 0.\n- Si a < 0 : aucune solution (un carré n'est jamais négatif).",
        ],
        [
          'exemple',
          'Une inéquation',
          "Résoudre −3x + 5 ≤ 11.\n−3x ≤ 6\nOn divise par −3 : **on retourne le symbole**.\nx ≥ −2.\nLes solutions sont tous les nombres supérieurs ou égaux à −2.",
        ],
      ],
      essentiel: [
        'On peut ajouter, soustraire, multiplier ou diviser les deux membres par le même nombre (non nul pour × et ÷).',
        'Inéquation : multiplier ou diviser par un négatif inverse le sens de l’inégalité.',
        'A × B = 0 ⟺ A = 0 ou B = 0.',
        'x² = a a deux solutions si a > 0, une si a = 0, aucune si a < 0.',
        'Toujours vérifier sa solution en la remplaçant dans l’équation de départ.',
      ],
      formules: ['ax + b = 0 ⟺ x = −b/a (a ≠ 0)', 'A×B = 0 ⟺ A = 0 ou B = 0', 'x² = a ⟺ x = √a ou x = −√a (a > 0)'],
      pieges: [
        'Oublier de retourner le symbole quand on divise une inéquation par un nombre négatif.',
        'Développer une équation produit nul au lieu de l’utiliser telle quelle : on perd tout l’intérêt.',
        'x² = 16 a DEUX solutions : 4 et −4.',
      ],
      videos: [
        ['résoudre une équation 3ème', 10, 'Yvan Monka'],
        ['équation produit nul 3ème', 8, 'Maths et tiques'],
        ['inéquation 3ème résoudre', 9, 'Yvan Monka'],
      ],
      quiz: [
        {
          q: 'Résoudre 4x − 9 = x + 6.',
          kind: 'calcul',
          answer: ['5', 'x=5', 'x = 5'],
          why: '4x − x = 6 + 9 donc 3x = 15 et x = 5.',
        },
        {
          q: 'Quelles sont les solutions de (x − 7)(3x + 12) = 0 ?',
          options: ['7 et 4', '7 et −4', '−7 et 4', '−7 et −4'],
          answer: 1,
          why: 'x − 7 = 0 → x = 7 ; 3x + 12 = 0 → x = −4.',
        },
        {
          q: 'L’équation x² = −25 admet deux solutions.',
          kind: 'vraifaux',
          answer: false,
          why: 'Un carré est toujours positif ou nul : cette équation n’a aucune solution.',
        },
        {
          q: 'Résoudre −2x > 8.',
          options: ['x > −4', 'x < −4', 'x > 4', 'x < 4'],
          answer: 1,
          why: 'On divise par −2 et on retourne le symbole : x < −4.',
        },
        {
          q: 'Combien de solutions a l’équation x² = 49 ?',
          options: ['0', '1', '2', 'Une infinité'],
          answer: 2,
          why: 'x = 7 ou x = −7.',
        },
        {
          q: 'Pour résoudre 3(x + 2) = 5x − 4, la première étape est de développer le membre de gauche.',
          kind: 'vraifaux',
          answer: true,
          why: '3(x + 2) = 3x + 6, puis on regroupe.',
        },
      ],
      exos: [
        {
          titre: 'Équation à mise en équation',
          enonce:
            'Le périmètre d’un rectangle est de 46 cm. Sa longueur mesure 5 cm de plus que sa largeur. Quelles sont ses dimensions ?',
          niveau: 2,
          indice: 'Appelle x la largeur et exprime la longueur en fonction de x.',
          correction: [
            'Soit x la largeur en cm. La longueur vaut x + 5.',
            'Périmètre : 2(x + x + 5) = 46, donc 2(2x + 5) = 46.',
            '4x + 10 = 46 → 4x = 36 → x = 9.',
            'La largeur est 9 cm et la longueur 14 cm. Vérification : 2(9 + 14) = 46 ✔',
          ],
        },
        {
          titre: 'Équation produit',
          enonce: 'Résoudre (2x − 3)² − 16 = 0.',
          niveau: 3,
          indice: 'Reconnais une différence de deux carrés avant de résoudre.',
          correction: [
            '(2x − 3)² − 16 = (2x − 3)² − 4² : c’est a² − b².',
            'On factorise : (2x − 3 − 4)(2x − 3 + 4) = (2x − 7)(2x + 1).',
            '2x − 7 = 0 → x = 3,5 ; 2x + 1 = 0 → x = −0,5.',
            'Les solutions sont 3,5 et −0,5.',
          ],
        },
        {
          titre: 'Inéquation et interprétation',
          enonce:
            'Un abonnement de cinéma coûte 18 € par mois, puis 4 € la place. Une place seule coûte 10 €. À partir de combien de séances par mois l’abonnement est-il plus avantageux ?',
          niveau: 2,
          indice: 'Écris l’inéquation 18 + 4x < 10x.',
          correction: [
            'Soit x le nombre de séances. Avec abonnement : 18 + 4x. Sans : 10x.',
            'On résout 18 + 4x < 10x.',
            '18 < 6x, donc x > 3.',
            'À partir de 4 séances par mois, l’abonnement devient plus avantageux.',
          ],
        },
      ],
    },
    {
      id: 'maths-fonctions',
      title: 'Fonctions',
      intro:
        "Une fonction, c'est une machine : tu entres un nombre, elle en ressort un autre. Lire un graphique et calculer une image ou un antécédent, c'est l'essentiel du chapitre.",
      sections: [
        [
          'definition',
          'Fonction, image, antécédent',
          "Une **fonction** f associe à chaque nombre x un **unique** nombre noté f(x).\nOn écrit f : x ↦ f(x).\n\n- f(x) est l'**image** de x par f.\n- Si f(a) = b, alors a est un **antécédent** de b par f.\n\nUn nombre a **toujours une seule image**, mais il peut avoir **plusieurs antécédents** (ou aucun).",
        ],
        [
          'exemple',
          'Calculer une image',
          "Soit f(x) = 2x + 3.\nf(4) = 2 × 4 + 3 = 11. L'image de 4 est 11.\nf(−1) = 2 × (−1) + 3 = 1.\n\nPour trouver l'antécédent de 17, on résout 2x + 3 = 17 → 2x = 14 → x = 7.",
        ],
        [
          'propriete',
          'Fonctions linéaires et affines',
          "**Fonction linéaire** : f(x) = ax. Sa représentation est une **droite passant par l'origine**. Elle modélise les situations de **proportionnalité** (a est le coefficient).\n\n**Fonction affine** : f(x) = ax + b.\n- a est le **coefficient directeur** (la pente) ;\n- b est l'**ordonnée à l'origine** (là où la droite coupe l'axe des ordonnées).\nSa représentation est une droite.\n\nUne fonction linéaire est une fonction affine particulière (avec b = 0).",
        ],
        [
          'methode',
          'Déterminer une fonction affine à partir de deux points',
          "Si on connaît f(x₁) = y₁ et f(x₂) = y₂ :\n**1.** a = (y₂ − y₁) / (x₂ − x₁).\n**2.** On remplace dans f(x) = ax + b pour trouver b.\n\nExemple : f(2) = 7 et f(5) = 16.\na = (16 − 7)/(5 − 2) = 9/3 = 3.\n7 = 3×2 + b → b = 1.\nDonc f(x) = 3x + 1.",
        ],
        [
          'methode',
          'Lire un graphique',
          "**Image de a** : on part de a sur l'axe des abscisses, on monte jusqu'à la courbe, on lit sur l'axe des ordonnées.\n**Antécédent de b** : on part de b sur l'axe des ordonnées, on va horizontalement jusqu'à la courbe, on lit sur l'axe des abscisses.\n\nAstuce : *abscisse = horizontal*, *ordonnée = vertical*.",
        ],
        [
          'astuce',
          'Pourcentages et fonctions linéaires',
          "Augmenter de 15 % revient à multiplier par 1,15 : c'est la fonction linéaire x ↦ 1,15x.\nDiminuer de 20 % revient à multiplier par 0,80.\nDeux évolutions successives se **multiplient** : +10 % puis −10 % donne ×1,1 × 0,9 = ×0,99, soit une baisse de 1 %.",
        ],
      ],
      essentiel: [
        'Chaque x a une seule image, mais un nombre peut avoir plusieurs antécédents.',
        'f(x) = ax est linéaire (droite par l’origine) ; f(x) = ax + b est affine.',
        'a = coefficient directeur, b = ordonnée à l’origine.',
        'a = (y₂ − y₁)/(x₂ − x₁) pour deux points connus.',
        'Augmenter de t % = multiplier par (1 + t/100).',
      ],
      formules: [
        'f(x) = ax + b',
        'a = (y₂ − y₁) / (x₂ − x₁)',
        'Augmentation de t % : ×(1 + t/100)',
        'Diminution de t % : ×(1 − t/100)',
      ],
      pieges: [
        'Confondre image et antécédent : « image de 3 » = f(3), « antécédent de 3 » = on résout f(x) = 3.',
        'Une fonction affine n’est proportionnelle que si b = 0.',
        'Deux baisses de 10 % ne font pas une baisse de 20 % mais de 19 %.',
      ],
      videos: [
        ['fonctions 3ème image antécédent', 12, 'Yvan Monka'],
        ['fonction affine linéaire 3ème', 13, 'Maths et tiques'],
        ['lire un graphique fonction brevet', 8, 'Yvan Monka'],
      ],
      quiz: [
        {
          q: 'Soit f(x) = 2x + 3. Quelle est l’image de 4 ?',
          options: ['5', '8', '11', '14'],
          answer: 2,
          why: 'f(4) = 2 × 4 + 3 = 11.',
        },
        {
          q: 'Soit f(x) = 3x − 6. Quel est l’antécédent de 0 ?',
          kind: 'calcul',
          answer: ['2', 'x=2', 'x = 2'],
          why: 'On résout 3x − 6 = 0 → x = 2.',
        },
        {
          q: 'La fonction f(x) = 5x est linéaire.',
          kind: 'vraifaux',
          answer: true,
          why: 'Elle est de la forme ax, donc linéaire (et sa droite passe par l’origine).',
        },
        {
          q: 'Dans f(x) = −2x + 7, que représente 7 ?',
          options: [
            'Le coefficient directeur',
            'L’ordonnée à l’origine',
            'L’image de 7',
            'L’antécédent de 0',
          ],
          answer: 1,
          why: 'Dans ax + b, b = 7 est l’ordonnée à l’origine : la droite coupe l’axe des ordonnées en 7.',
        },
        {
          q: 'Augmenter un prix de 25 % revient à le multiplier par…',
          options: ['0,25', '1,25', '25', '0,75'],
          answer: 1,
          why: '1 + 25/100 = 1,25.',
        },
        {
          q: 'Un nombre peut avoir deux images différentes par une même fonction.',
          kind: 'vraifaux',
          answer: false,
          why: 'C’est justement la définition d’une fonction : une seule image par nombre.',
        },
        {
          q: 'Associe chaque fonction à sa nature.',
          kind: 'associer',
          pairs: [
            ['f(x) = 4x', 'linéaire'],
            ['f(x) = 4x − 1', 'affine non linéaire'],
            ['f(x) = −3', 'constante'],
            ['f(x) = x²', 'ni linéaire ni affine'],
          ],
        },
      ],
      exos: [
        {
          titre: 'Déterminer une fonction affine',
          enonce: 'Une fonction affine g vérifie g(1) = 5 et g(4) = 14. Déterminer g(x), puis calculer g(10).',
          niveau: 2,
          indice: 'Commence par le coefficient directeur a.',
          correction: [
            'a = (14 − 5)/(4 − 1) = 9/3 = 3.',
            'g(x) = 3x + b et g(1) = 5 donne 3 + b = 5, donc b = 2.',
            'g(x) = 3x + 2.',
            'g(10) = 3 × 10 + 2 = 32.',
          ],
        },
        {
          titre: 'Comparer deux tarifs',
          enonce:
            'Tarif A : 12 € par mois sans supplément. Tarif B : 3 € par mois plus 1,50 € par séance. Exprimer le prix en fonction du nombre x de séances, puis dire à partir de quand le tarif A devient plus intéressant.',
          niveau: 2,
          correction: [
            'Tarif A : f(x) = 12 (fonction constante).',
            'Tarif B : g(x) = 1,5x + 3 (fonction affine).',
            'On résout 1,5x + 3 > 12 → 1,5x > 9 → x > 6.',
            'À partir de 7 séances par mois, le tarif A est plus avantageux.',
          ],
        },
        {
          titre: 'Évolutions en pourcentage',
          enonce:
            'Le prix d’un article augmente de 20 % puis baisse de 15 %. De quel pourcentage a-t-il varié au total ?',
          niveau: 3,
          indice: 'Multiplie les coefficients multiplicateurs.',
          correction: [
            'Augmentation de 20 % : coefficient ×1,20.',
            'Baisse de 15 % : coefficient ×0,85.',
            'Coefficient global : 1,20 × 0,85 = 1,02.',
            'Le prix a donc augmenté de 2 % au total.',
          ],
        },
      ],
    },
    {
      id: 'maths-geometrie',
      title: 'Géométrie',
      intro:
        "Pythagore, Thalès, trigonométrie, transformations et volumes : le chapitre le plus « boîte à outils » du programme. Le réflexe : identifier la bonne configuration.",
      sections: [
        [
          'propriete',
          'Théorème de Pythagore',
          "Dans un triangle **rectangle** en A :\nBC² = AB² + AC²\n(l'hypoténuse BC est le côté opposé à l'angle droit, c'est toujours le plus long).\n\n**Réciproque** : si BC² = AB² + AC², alors le triangle est rectangle en A.\n**Contraposée** : si BC² ≠ AB² + AC², le triangle n'est pas rectangle.",
        ],
        [
          'propriete',
          'Théorème de Thalès',
          "Si les droites (BM) et (CN) sont sécantes en A, et si (MN) est **parallèle** à (BC), alors :\nAM/AB = AN/AC = MN/BC\n\n**Réciproque** : si AM/AB = AN/AC **et** si les points sont dans le même ordre, alors (MN) est parallèle à (BC).\n\nDeux configurations existent : le « triangle emboîté » et le « papillon » (points de part et d'autre de A).",
        ],
        [
          'propriete',
          'Trigonométrie dans le triangle rectangle',
          "Dans un triangle rectangle, pour un angle aigu :\n**cos = adjacent / hypoténuse**\n**sin = opposé / hypoténuse**\n**tan = opposé / adjacent**\n\nMoyen mnémotechnique : **CAH – SOH – TOA**.\n\nPour retrouver un angle, on utilise les touches cos⁻¹, sin⁻¹ ou tan⁻¹ de la calculatrice (en mode degré !).",
        ],
        [
          'propriete',
          'Agrandissement et réduction',
          "Si une figure est agrandie ou réduite dans un rapport k :\n- les **longueurs** sont multipliées par **k** ;\n- les **aires** sont multipliées par **k²** ;\n- les **volumes** sont multipliés par **k³** ;\n- les **angles** ne changent pas.",
        ],
        [
          'definition',
          'Les transformations',
          "**Translation** : on glisse la figure selon une direction, un sens et une longueur.\n**Rotation** : on tourne la figure autour d'un centre, d'un angle donné, dans un sens donné.\n**Symétrie axiale** : réflexion par rapport à une droite.\n**Symétrie centrale** : demi-tour autour d'un point.\n**Homothétie** : agrandissement ou réduction depuis un centre, de rapport k.\n\nToutes conservent les angles et l'alignement. Seule l'homothétie (k ≠ ±1) change les longueurs.",
        ],
        [
          'methode',
          'Volumes à connaître',
          "Prisme / cylindre : V = aire de la base × hauteur\nPyramide / cône : V = (aire de la base × hauteur) / 3\nBoule : V = (4/3) × π × r³\nSphère (aire) : A = 4 × π × r²\n\nAttention aux unités : 1 L = 1 dm³ et 1 m³ = 1 000 L.",
        ],
      ],
      essentiel: [
        'Pythagore : uniquement dans un triangle rectangle, BC² = AB² + AC².',
        'Sa réciproque sert à PROUVER qu’un triangle est rectangle.',
        'Thalès a besoin de droites parallèles et de points alignés.',
        'CAH – SOH – TOA pour la trigonométrie.',
        'Agrandissement de rapport k : longueurs ×k, aires ×k², volumes ×k³.',
        'Pyramide et cône : on divise par 3.',
      ],
      formules: [
        'BC² = AB² + AC² (triangle rectangle en A)',
        'AM/AB = AN/AC = MN/BC (Thalès)',
        'cos = adj/hyp, sin = opp/hyp, tan = opp/adj',
        'V(pyramide) = B × h / 3',
        'V(boule) = 4πr³/3',
      ],
      pieges: [
        'Utiliser Pythagore sans avoir vérifié que le triangle est rectangle.',
        'Placer l’hypoténuse au mauvais endroit : c’est TOUJOURS le côté opposé à l’angle droit.',
        'Oublier de mettre la calculatrice en mode degré.',
        'Multiplier une aire par k au lieu de k² lors d’un agrandissement.',
      ],
      videos: [
        ['théorème de Thalès 3ème', 12, 'Yvan Monka'],
        ['trigonométrie 3ème cos sin tan', 14, 'Maths et tiques'],
        ['agrandissement réduction volumes 3ème', 9, 'Yvan Monka'],
      ],
      quiz: [
        {
          q: 'Dans un triangle rectangle en A, quelle égalité est vraie ?',
          options: ['AB² = BC² + AC²', 'BC² = AB² + AC²', 'AC² = AB² + BC²', 'AB = AC + BC'],
          answer: 1,
          why: 'L’hypoténuse est BC (opposée à l’angle droit en A).',
        },
        {
          q: 'Le théorème de Thalès nécessite deux droites parallèles.',
          kind: 'vraifaux',
          answer: true,
          why: 'Sans parallélisme, l’égalité des rapports n’est pas garantie.',
        },
        {
          q: 'Dans un triangle rectangle, cos d’un angle aigu vaut…',
          options: ['opposé/hypoténuse', 'adjacent/hypoténuse', 'opposé/adjacent', 'hypoténuse/adjacent'],
          answer: 1,
          why: 'CAH : Cosinus = Adjacent / Hypoténuse.',
        },
        {
          q: 'Une figure est agrandie de rapport 3. Son aire est multipliée par…',
          options: ['3', '6', '9', '27'],
          answer: 2,
          why: 'Les aires sont multipliées par k² = 3² = 9.',
        },
        {
          q: 'Calculer le volume d’un cône de rayon 3 cm et de hauteur 10 cm (arrondi à l’unité, en cm³).',
          kind: 'calcul',
          answer: ['94', '94.2', '94,2', '30π'],
          why: 'V = π × 3² × 10 / 3 = 30π ≈ 94 cm³.',
        },
        {
          q: 'Une rotation conserve les longueurs.',
          kind: 'vraifaux',
          answer: true,
          why: 'Translation, rotation et symétries conservent les longueurs ; seule l’homothétie de rapport ≠ ±1 les modifie.',
        },
        {
          q: 'Associe chaque transformation à sa description.',
          kind: 'associer',
          pairs: [
            ['Translation', 'glissement selon un vecteur'],
            ['Rotation', 'tour autour d’un centre'],
            ['Symétrie centrale', 'demi-tour autour d’un point'],
            ['Homothétie', 'agrandissement depuis un centre'],
          ],
        },
      ],
      exos: [
        {
          titre: 'Réciproque de Pythagore',
          enonce:
            'Un triangle ABC a pour côtés AB = 7,5 cm, AC = 4 cm et BC = 8,5 cm. Ce triangle est-il rectangle ? Justifier.',
          niveau: 1,
          indice: 'Compare le carré du plus grand côté à la somme des carrés des deux autres.',
          correction: [
            'Le plus grand côté est BC : BC² = 8,5² = 72,25.',
            'AB² + AC² = 7,5² + 4² = 56,25 + 16 = 72,25.',
            'Les deux résultats sont égaux, donc d’après la réciproque du théorème de Pythagore, ABC est rectangle en A.',
          ],
        },
        {
          titre: 'Thalès et longueur manquante',
          enonce:
            'Les points A, M, B sont alignés ainsi que A, N, C. On a AM = 3 cm, AB = 7,5 cm, AN = 4 cm et (MN) // (BC). Calculer AC.',
          niveau: 2,
          correction: [
            'D’après le théorème de Thalès : AM/AB = AN/AC.',
            '3/7,5 = 4/AC.',
            'AC = (4 × 7,5)/3 = 30/3 = 10.',
            'AC = 10 cm.',
          ],
        },
        {
          titre: 'Trigonométrie appliquée',
          enonce:
            'Une échelle de 4 m est appuyée contre un mur ; son pied est à 1,2 m du mur. Quel angle fait-elle avec le sol ? (arrondir au degré)',
          niveau: 2,
          indice: 'Tu connais l’hypoténuse et le côté adjacent à l’angle cherché.',
          correction: [
            'Le côté adjacent mesure 1,2 m, l’hypoténuse 4 m.',
            'cos(angle) = 1,2/4 = 0,3.',
            'angle = cos⁻¹(0,3) ≈ 72,5°.',
            'L’échelle fait un angle d’environ 73° avec le sol.',
          ],
        },
      ],
    },
    {
      id: 'maths-stats',
      title: 'Statistiques et probabilités',
      intro:
        "Résumer une série de données par un nombre, et mesurer la chance qu'un événement se produise. Deux chapitres courts mais très rentables au brevet.",
      sections: [
        [
          'definition',
          'Les indicateurs statistiques',
          "**Moyenne** : somme des valeurs ÷ effectif total. Pour des données pondérées : Σ(valeur × effectif) ÷ effectif total.\n**Médiane** : la valeur qui partage la série ordonnée en deux moitiés de même effectif.\n**Étendue** : valeur maximale − valeur minimale. Elle mesure la dispersion.\n**Quartiles** : Q1 laisse au moins 25 % des valeurs en dessous, Q3 au moins 75 %.",
        ],
        [
          'methode',
          'Trouver la médiane',
          "**1.** Ranger les valeurs dans l'ordre croissant.\n**2.** Si l'effectif N est **impair**, la médiane est la valeur de rang (N+1)/2.\n**3.** Si N est **pair**, la médiane est la moyenne des valeurs de rang N/2 et N/2 + 1.\n\nExemple : 4 – 7 – 9 – 12 – 15 (N = 5) → médiane = 9.\nExemple : 4 – 7 – 9 – 12 (N = 4) → médiane = (7 + 9)/2 = 8.",
        ],
        [
          'definition',
          'Probabilités',
          "Une **expérience aléatoire** a plusieurs **issues** possibles.\nLa **probabilité** d'un événement est un nombre entre 0 et 1 :\nP(A) = nombre d'issues favorables / nombre d'issues possibles (situation d'équiprobabilité).\n\nP = 0 : événement impossible. P = 1 : événement certain.\nLa somme des probabilités de toutes les issues vaut 1.\n**Événement contraire** : P(non A) = 1 − P(A).",
        ],
        [
          'methode',
          'Expériences à deux épreuves',
          "On utilise un **arbre de probabilités** ou un **tableau à double entrée**.\nSur un arbre :\n- on **multiplie** les probabilités le long d'une branche ;\n- on **additionne** les probabilités des branches qui mènent au même résultat.",
        ],
        [
          'exemple',
          'Exemple',
          "Une urne contient 3 boules rouges et 5 boules vertes.\nP(rouge) = 3/8 = 0,375.\nP(pas rouge) = 1 − 3/8 = 5/8.\n\nOn tire deux boules avec remise : P(deux rouges) = (3/8) × (3/8) = 9/64.",
        ],
      ],
      essentiel: [
        'Moyenne = somme ÷ effectif ; avec des effectifs, on pondère.',
        'Médiane = valeur du milieu de la série ORDONNÉE.',
        'Étendue = max − min.',
        'P(A) = issues favorables / issues possibles, toujours entre 0 et 1.',
        'P(non A) = 1 − P(A).',
        'Sur un arbre : × le long d’une branche, + entre les branches.',
      ],
      formules: [
        'Moyenne = Σ(xᵢ × nᵢ) / Σnᵢ',
        'Étendue = max − min',
        'P(A) = favorables / possibles',
        'P(Ā) = 1 − P(A)',
      ],
      pieges: [
        'Calculer la médiane sans avoir rangé les valeurs dans l’ordre.',
        'Confondre moyenne et médiane : une valeur extrême déplace la moyenne, pas la médiane.',
        'Donner une probabilité supérieure à 1.',
      ],
      videos: [
        ['statistiques moyenne médiane étendue 3ème', 11, 'Yvan Monka'],
        ['probabilités 3ème arbre', 12, 'Maths et tiques'],
      ],
      quiz: [
        {
          q: 'Quelle est la médiane de la série 4 ; 7 ; 9 ; 12 ; 15 ?',
          options: ['7', '9', '9,4', '12'],
          answer: 1,
          why: 'La série est ordonnée et comporte 5 valeurs : la 3ᵉ, soit 9.',
        },
        {
          q: 'L’étendue de la série 3 ; 8 ; 14 ; 21 vaut…',
          kind: 'calcul',
          answer: ['18'],
          why: '21 − 3 = 18.',
        },
        {
          q: 'Une probabilité peut valoir 1,4.',
          kind: 'vraifaux',
          answer: false,
          why: 'Une probabilité est toujours comprise entre 0 et 1.',
        },
        {
          q: 'On lance un dé équilibré à 6 faces. Quelle est la probabilité d’obtenir un nombre pair ?',
          options: ['1/6', '1/3', '1/2', '2/3'],
          answer: 2,
          why: '3 issues favorables (2, 4, 6) sur 6 possibles : 3/6 = 1/2.',
        },
        {
          q: 'Dans un sac de 12 jetons dont 4 bleus, P(pas bleu) vaut…',
          options: ['1/3', '2/3', '4/12', '8/4'],
          answer: 1,
          why: 'P(bleu) = 4/12 = 1/3 donc P(pas bleu) = 1 − 1/3 = 2/3.',
        },
        {
          q: 'Sur un arbre de probabilités, on multiplie les probabilités le long d’une branche.',
          kind: 'vraifaux',
          answer: true,
          why: 'Et on additionne les résultats des différentes branches menant au même événement.',
        },
      ],
      exos: [
        {
          titre: 'Série statistique',
          enonce:
            'Voici les notes d’un contrôle : 8 ; 12 ; 15 ; 12 ; 9 ; 17 ; 12 ; 14 ; 6 ; 15. Calculer la moyenne, la médiane et l’étendue.',
          niveau: 2,
          indice: 'Commence par ranger les notes dans l’ordre croissant.',
          correction: [
            'Somme : 8+12+15+12+9+17+12+14+6+15 = 120. Moyenne = 120/10 = 12.',
            'Série ordonnée : 6 ; 8 ; 9 ; 12 ; 12 ; 12 ; 14 ; 15 ; 15 ; 17.',
            'N = 10 (pair) : médiane = (5ᵉ + 6ᵉ)/2 = (12 + 12)/2 = 12.',
            'Étendue = 17 − 6 = 11.',
          ],
        },
        {
          titre: 'Probabilité à deux tirages',
          enonce:
            'Une urne contient 2 boules rouges et 3 boules bleues. On tire une boule, on la remet, puis on en tire une seconde. Quelle est la probabilité d’obtenir deux boules de la même couleur ?',
          niveau: 3,
          indice: 'Il y a deux cas favorables : « deux rouges » et « deux bleues ».',
          correction: [
            'P(rouge) = 2/5 et P(bleue) = 3/5.',
            'P(deux rouges) = (2/5) × (2/5) = 4/25.',
            'P(deux bleues) = (3/5) × (3/5) = 9/25.',
            'Les deux cas s’excluent, on additionne : 4/25 + 9/25 = 13/25 = 0,52.',
          ],
        },
      ],
    },
    {
      id: 'maths-algo',
      title: 'Algorithmique et programmation',
      intro:
        "Lire et compléter un programme en blocs (Scratch) : c'est presque toujours un exercice du brevet, et il est facile à gagner.",
      sections: [
        [
          'definition',
          'Le vocabulaire',
          "**Algorithme** : suite d'instructions pour résoudre un problème.\n**Variable** : une case mémoire qui porte un nom et contient une valeur.\n**Boucle** : on répète des instructions (« répéter 10 fois », « répéter jusqu'à… »).\n**Test / condition** : « si … alors … sinon … ».\n**Instruction conditionnelle imbriquée** : un test à l'intérieur d'un autre.",
        ],
        [
          'methode',
          'Lire un script pas à pas',
          "**1.** Note la valeur de chaque variable au départ.\n**2.** Exécute les instructions **une par une**, en mettant à jour un tableau des variables.\n**3.** Pour une boucle, fais un tour puis un autre : le motif apparaît vite.\n\nC'est lent mais c'est la seule méthode fiable. Un tableau de suivi vaut tous les points.",
        ],
        [
          'exemple',
          'Déplacements et repérage',
          "Dans Scratch, le lutin est repéré par (x ; y). Le centre de la scène est (0 ; 0).\n« ajouter 50 à x » déplace vers la droite, « ajouter −30 à y » déplace vers le bas.\n« s'orienter à 90 » = vers la droite, « 0 » = vers le haut, « −90 » = vers la gauche, « 180 » = vers le bas.\n« tourner de 90 degrés à droite » modifie l'orientation, pas la position.",
        ],
        [
          'astuce',
          'Dessiner un polygone régulier',
          "Pour un polygone régulier à n côtés, la boucle est :\nrépéter n fois [ avancer de L ; tourner de 360/n degrés ]\nCarré : 4 fois, 90°. Triangle équilatéral : 3 fois, 120°. Hexagone : 6 fois, 60°.",
        ],
      ],
      essentiel: [
        'Une variable stocke une valeur qui peut changer au fil du programme.',
        'Pour lire un script : tableau de suivi des variables, instruction par instruction.',
        'Polygone régulier à n côtés : tourner de 360/n degrés.',
        'Dans Scratch, x augmente vers la droite et y augmente vers le haut.',
      ],
      formules: ['Angle de rotation d’un polygone régulier = 360/n'],
      pieges: [
        'Confondre « mettre x à 5 » (affectation) et « ajouter 5 à x » (incrément).',
        'Oublier que la boucle recommence avec les valeurs mises à jour.',
      ],
      videos: [
        ['Scratch brevet 3ème exercice type', 12, 'Yvan Monka'],
        ['algorithmique programmation brevet maths', 10, 'Maths et tiques'],
      ],
      quiz: [
        {
          q: 'Pour dessiner un hexagone régulier, de combien de degrés faut-il tourner à chaque étape ?',
          kind: 'calcul',
          answer: ['60', '60°'],
          why: '360/6 = 60°.',
        },
        {
          q: 'Dans Scratch, « ajouter 40 à y » déplace le lutin…',
          options: ['vers la droite', 'vers la gauche', 'vers le haut', 'vers le bas'],
          answer: 2,
          why: 'L’axe des ordonnées est orienté vers le haut.',
        },
        {
          q: 'Une variable peut changer de valeur pendant l’exécution du programme.',
          kind: 'vraifaux',
          answer: true,
          why: 'C’est même sa raison d’être.',
        },
        {
          q: 'Un script part de x = 2, puis répète 3 fois « mettre x à 2×x + 1 ». Que vaut x à la fin ?',
          options: ['7', '11', '23', '15'],
          answer: 2,
          why: '2 → 5 → 11 → 23.',
        },
      ],
      exos: [
        {
          titre: 'Suivre un script',
          enonce:
            'Un programme démarre avec a = 3 et b = 0. Il répète 4 fois : « ajouter a à b » puis « mettre a à a + 2 ». Quelles sont les valeurs finales de a et b ?',
          niveau: 2,
          indice: 'Fais un tableau avec une ligne par tour de boucle.',
          correction: [
            'Tour 1 : b = 0 + 3 = 3, puis a = 5.',
            'Tour 2 : b = 3 + 5 = 8, puis a = 7.',
            'Tour 3 : b = 8 + 7 = 15, puis a = 9.',
            'Tour 4 : b = 15 + 9 = 24, puis a = 11.',
            'À la fin : a = 11 et b = 24.',
          ],
        },
      ],
    },
  ],
}
