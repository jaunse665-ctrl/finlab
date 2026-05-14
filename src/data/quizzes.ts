export const QUIZ_DATA: Record<string, {
  title: string;
  description: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[]
}> = {
  "module-1": {
    title: "Reto: Desmitificando el Riesgo",
    description: "Demuestra tus conocimientos financieros y compite por el primer lugar del podio.",
    questions: [
      {
        question: "¿Cuál de estos eventos es considerado típicamente un Riesgo de Mercado?",
        options: [
          "Falla en los servidores de la empresa",
          "Caída inesperada en el precio de una acción o divisa",
          "Renuncia del gerente general",
          "Una demanda laboral de un ex-empleado"
        ],
        correct: 1,
        explanation: "El riesgo de mercado se refiere a las pérdidas potenciales debido a movimientos adversos en los precios de mercado."
      },
      {
        question: "En finanzas modernas, el riesgo se define ÚNICAMENTE como la probabilidad de tener pérdidas monetarias.",
        options: [
          "Verdadero",
          "Falso"
        ],
        correct: 1,
        explanation: "Falso. El riesgo también implica volatilidad, lo cual puede generar tanto pérdidas como ganancias u oportunidades."
      },
      {
        question: "¿Qué tipo de riesgo asume un banco principalmente al prestar dinero a una pequeña empresa?",
        options: [
          "Riesgo de Mercado",
          "Riesgo Operativo",
          "Riesgo de Crédito",
          "Riesgo de Liquidez"
        ],
        correct: 2,
        explanation: "Riesgo de Crédito es el riesgo de que la contraparte (la empresa) no cumpla con sus obligaciones de pago."
      },
      {
        question: "Una desviación estándar alta en los retornos históricos de un activo financiero indica...",
        options: [
          "Menor riesgo y mayor seguridad",
          "Mayor volatilidad y por ende, mayor riesgo",
          "Que el activo es inmune a las crisis económicas",
          "Que el activo tiene alta liquidez"
        ],
        correct: 1,
        explanation: "La desviación estándar es la medida estadística más común para representar la volatilidad o riesgo de un activo."
      },
      {
        question: "El objetivo principal de los Acuerdos Internacionales de Basilea es:",
        options: [
          "Fijar las tasas de interés globales",
          "Asegurar que los bancos tengan capital suficiente para absorber pérdidas",
          "Regular el precio de las criptomonedas",
          "Garantizar préstamos a estudiantes"
        ],
        correct: 1,
        explanation: "Basilea (I, II, III) busca fortalecer la regulación, supervisión y gestión de riesgos del sector bancario a nivel mundial."
      },
      {
        question: "¿Cuál de los siguientes es un ejemplo clásico de Riesgo Operativo?",
        options: [
          "Una caída en la bolsa de valores",
          "Fraude interno o falla en los sistemas informáticos",
          "El aumento de la inflación en el país",
          "Que un deudor no pague su hipoteca"
        ],
        correct: 1,
        explanation: "El riesgo operativo surge de fallas en procesos internos, personas, sistemas o eventos externos (como un hackeo)."
      },
      {
        question: "¿Qué efecto directo tiene una correcta 'Diversificación' en un portafolio de inversión?",
        options: [
          "Elimina por completo el riesgo de mercado",
          "Aumenta la volatilidad esperada",
          "Reduce el riesgo idiosincrático o no sistemático",
          "Garantiza retornos positivos siempre"
        ],
        correct: 2,
        explanation: "La diversificación reduce el riesgo específico de cada empresa, pero no puede eliminar el riesgo sistemático o del mercado general."
      },
      {
        question: "La métrica 'Value at Risk' (VaR) sirve para medir:",
        options: [
          "La ganancia máxima esperada en un año",
          "La pérdida máxima esperada en un tiempo determinado bajo un nivel de confianza",
          "El valor total de los activos de un banco",
          "El número de transacciones por segundo"
        ],
        correct: 1,
        explanation: "VaR es una técnica estadística utilizada para medir y cuantificar el nivel de riesgo financiero dentro de una firma o portafolio."
      },
      {
        question: "¿Cuándo se materializa principalmente el Riesgo de Liquidez?",
        options: [
          "Cuando las tasas de interés bajan",
          "Cuando una entidad no puede vender un activo rápidamente sin afectar drásticamente su precio",
          "Cuando el tipo de cambio favorece a las exportaciones",
          "Cuando un empleado comete un error contable"
        ],
        correct: 1,
        explanation: "El riesgo de liquidez impide a un inversor deshacerse de una posición a su valor justo de mercado con la suficiente rapidez."
      },
      {
        question: "El 'Apetito al Riesgo' de una organización se define como:",
        options: [
          "La cantidad de dinero que invierte en publicidad",
          "El nivel de riesgo que está dispuesta a aceptar para lograr sus objetivos",
          "Su calificación en buró de crédito",
          "La probabilidad matemática de ir a la quiebra"
        ],
        correct: 1,
        explanation: "Cada institución define su apetito al riesgo dependiendo de su estrategia, capital y las regulaciones a las que esté sujeta."
      }
    ]
  },
  "module-2": {
    title: "Reto: Riesgos de Mercado",
    description: "Pon a prueba tu conocimiento sobre VaR, Portafolios de Markowitz, y simulaciones.",
    questions: [
      {
        question: "Según la Teoría Moderna de Portafolios de Markowitz, la 'Frontera Eficiente' está conformada por los portafolios que:",
        options: [
          "Tienen el menor riesgo posible sin importar el retorno",
          "Ofrecen el mayor retorno esperado para un nivel dado de riesgo",
          "Están invertidos 100% en acciones tecnológicas",
          "Eliminan completamente todo tipo de riesgo"
        ],
        correct: 1,
        explanation: "La frontera eficiente representa el conjunto de portafolios óptimos que maximizan el retorno para cada nivel de volatilidad (riesgo)."
      },
      {
        question: "¿Qué indica un Ratio de Sharpe más alto al comparar dos fondos de inversión?",
        options: [
          "Mayor nivel de riesgo absoluto",
          "Que el fondo invierte exclusivamente en bonos",
          "Un mejor rendimiento histórico ajustado por el riesgo asumido",
          "Menores comisiones de administración"
        ],
        correct: 2,
        explanation: "El Ratio de Sharpe mide el exceso de retorno por unidad de riesgo (volatilidad). Entre mayor sea, mejor compensa el fondo por el riesgo que toma."
      },
      {
        question: "Para lograr la máxima reducción de riesgo mediante la diversificación, deberías combinar en tu portafolio activos que tengan una correlación:",
        options: [
          "Positiva o cercana a +1",
          "Negativa o cercana a -1",
          "Exactamente cero",
          "Mayor a 2"
        ],
        correct: 1,
        explanation: "Activos con correlación negativa se mueven en direcciones opuestas. Cuando uno cae, el otro sube, suavizando drásticamente la volatilidad del portafolio global."
      },
      {
        question: "Si el Value at Risk (VaR) diario al 95% de un portafolio es de $10,000, esto significa matemáticamente que:",
        options: [
          "Es imposible perder más de $10,000 en un día",
          "Existe un 5% de probabilidad de perder $10,000 o MÁS en un día",
          "Existe un 95% de probabilidad de ganar $10,000 al día",
          "El portafolio tiene un valor total de $10,000"
        ],
        correct: 1,
        explanation: "El VaR de $10,000 al 95% significa que estamos 95% seguros de que nuestras pérdidas no superarán los $10,000. Por ende, hay un 5% de riesgo de que la pérdida sea peor."
      },
      {
        question: "Una debilidad estructural importante del Value at Risk (VaR) como medida de riesgo es que:",
        options: [
          "No indica la magnitud de las pérdidas extremas (Tail Risk) una vez superado el umbral",
          "Solo funciona para portafolios menores a un millón de dólares",
          "Es una fórmula muy simple que se calcula en papel",
          "Asume que siempre ganaremos dinero"
        ],
        correct: 0,
        explanation: "El VaR no te dice QUÉ TAN MALAS pueden ser las cosas en ese 5% o 1% de peores escenarios. Para eso se suele usar el Conditional VaR (Expected Shortfall)."
      },
      {
        question: "¿Cuál es la principal ventaja de utilizar Simulaciones Monte Carlo para medir el riesgo de mercado?",
        options: [
          "Es un cálculo matemático exacto y sin margen de error",
          "Permite modelar distribuciones no normales y trayectorias complejas de precios usando miles de escenarios aleatorios",
          "No requiere computadoras ni software especializado",
          "Garantiza predecir el futuro del mercado de valores"
        ],
        correct: 1,
        explanation: "Monte Carlo genera miles de escenarios probabilísticos, lo que es invaluable cuando los activos no siguen una distribución normal o tienen derivadas financieras complejas (opciones)."
      },
      {
        question: "La diversificación inteligente (a lo Markowitz) ayuda a reducir la volatilidad del portafolio. Sin embargo, ¿qué tipo de riesgo NO puede ser eliminado por la diversificación?",
        options: [
          "El riesgo idiosincrático",
          "El riesgo no sistemático (de empresas específicas)",
          "El riesgo sistemático (del mercado global, como recesiones o guerras)",
          "El riesgo operativo"
        ],
        correct: 2,
        explanation: "El riesgo sistemático o de mercado afecta a toda la economía. Ni la mejor diversificación puede blindarte al 100% contra un colapso global."
      },
      {
        question: "¿Cuál es el supuesto principal detrás del cálculo del 'VaR Paramétrico' (también conocido como Método de Varianza-Covarianza)?",
        options: [
          "Que los retornos de los activos se distribuyen normalmente (campana de Gauss)",
          "Que el mercado no tiene memoria",
          "Que la volatilidad es siempre constante",
          "Que las simulaciones aleatorias son mejores que la estadística tradicional"
        ],
        correct: 0,
        explanation: "El VaR Paramétrico asume normalidad en la distribución de los rendimientos, lo cual facilita el cálculo usando la media y desviación estándar, pero puede subestimar las 'colas pesadas'."
      },
      {
        question: "El coeficiente 'Beta' de una acción mide:",
        options: [
          "Su rentabilidad por dividendo",
          "La sensibilidad de su rendimiento frente a los movimientos del mercado global (ej. S&P 500)",
          "El nivel de deuda de la compañía",
          "El número de transacciones diarias de la acción"
        ],
        correct: 1,
        explanation: "Un Beta de 1 significa que se mueve a la par que el mercado. Un Beta > 1 indica que es más volátil y reactiva que el mercado."
      },
      {
        question: "Al realizar 'Stress Testing' (Pruebas de Estrés) en un portafolio de inversión, el objetivo principal es:",
        options: [
          "Mejorar el ambiente de trabajo de los analistas",
          "Evaluar la resiliencia del portafolio ante eventos históricos extremos o crisis hipotéticas severas",
          "Reducir los impuestos pagados por el fondo",
          "Asegurar que el portafolio rinda un 10% mensual"
        ],
        correct: 1,
        explanation: "Las pruebas de estrés simulan shocks económicos (como la crisis de 2008 o la pandemia) para ver cuánto capital perdería la institución si ocurriera lo impensable."
      }
    ]
  }
}
