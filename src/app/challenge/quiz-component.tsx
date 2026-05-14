"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, XCircle, Trophy, Medal, Star, Target } from "lucide-react"
import { submitQuizScore, getLeaderboard } from "../courses/actions"
import { AnimatedPodium } from "@/components/podium"

const questions = [
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

export function GamifiedQuiz({ moduleId }: { moduleId: string }) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return
    const correct = selectedAnswer === questions[currentQuestion].correct
    setIsCorrect(correct)
    if (correct) {
      setScore(prev => prev + 100)
    }
  }

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
    } else {
      setCompleted(true)
      setIsSubmitting(true)
      await submitQuizScore(moduleId, score + (isCorrect ? 100 : 0))
      const leaders = await getLeaderboard(moduleId)
      setLeaderboard(leaders)
      setIsSubmitting(false)
    }
  }

  if (!showQuiz) {
    return (
      <div className="flex justify-center mt-12">
        <Button 
          onClick={() => setShowQuiz(true)} 
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-8 px-12 rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          <Target className="w-8 h-8 mr-3" />
          Empezar Reto Gamificado (10 Preguntas)
        </Button>
      </div>
    )
  }

  if (completed) {
    return (
      <Card className="border-none shadow-none bg-transparent" id="leaderboard-section">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black mb-2 text-zinc-900">¡Reto Completado!</h2>
          <p className="text-zinc-500 text-lg">Tu puntaje final ha sido registrado</p>
          <div className="text-6xl font-black mt-4 tracking-tighter text-primary">
            {score + (isCorrect ? 100 : 0)} <span className="text-2xl font-medium tracking-normal text-zinc-400">pts</span>
          </div>
        </div>

        {isSubmitting ? (
          <div className="text-center py-20 text-zinc-500 animate-pulse text-lg">Calculando posiciones en el podio...</div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <AnimatedPodium winners={leaderboard.slice(0, 3)} />

            <Card className="max-w-2xl mx-auto shadow-xl border-zinc-200 mt-8">
              <CardContent className="p-0">
                <div className="bg-zinc-100 p-4 border-b">
                  <h3 className="font-bold text-zinc-900 flex items-center justify-center">
                    <Medal className="w-5 h-5 mr-2 text-zinc-500" /> Leaderboard Global
                  </h3>
                </div>
                
                <div className="p-6 space-y-3">
                  {leaderboard.length === 0 ? (
                    <p className="text-center text-zinc-500">Aún no hay puntajes en este módulo. ¡Eres el primero!</p>
                  ) : (
                    leaderboard.slice(3).map((leader, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-white border-zinc-100 hover:border-zinc-300 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-zinc-100 text-zinc-500">
                            {leader.position}
                          </div>
                          <span className="font-semibold text-zinc-900">{leader.name}</span>
                        </div>
                        <div className="font-bold text-primary">{leader.score} pts</div>
                      </div>
                    ))
                  )}
                  {leaderboard.length <= 3 && (
                    <p className="text-center text-zinc-400 text-sm mt-4">Sé de los primeros en invitar a otros a superar tu puntaje.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>
    )
  }

  return (
    <Card className="border-primary/20 shadow-xl scroll-mt-20 relative overflow-hidden" id="quiz-section">
      {/* Barra de progreso */}
      <div className="absolute top-0 left-0 h-2 bg-primary/20 w-full">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
        />
      </div>

      <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10 pt-8">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500 fill-yellow-500" />
            Pregunta {currentQuestion + 1} de {questions.length}
          </CardTitle>
          <div className="bg-white px-5 py-2 rounded-full shadow-sm border font-black text-xl text-primary">
            {score} pts
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 md:p-10">
        <div className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
            {questions[currentQuestion].question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((opt, i) => (
              <button
                key={i}
                disabled={isCorrect !== null}
                onClick={() => setSelectedAnswer(i)}
                className={`w-full text-left p-6 rounded-xl border-4 transition-all flex items-center ${
                  selectedAnswer === i 
                    ? 'border-primary bg-primary/5 text-primary-foreground transform scale-[1.02] shadow-md' 
                    : 'border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 bg-white text-zinc-700'
                } ${isCorrect !== null && i === questions[currentQuestion].correct ? '!border-green-500 !bg-green-50 text-green-900 shadow-green-100' : ''}
                  ${isCorrect === false && selectedAnswer === i ? '!border-red-500 !bg-red-50 text-red-900 shadow-red-100' : ''}
                `}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 font-black shrink-0 ${selectedAnswer === i ? 'bg-primary text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="font-semibold text-lg leading-snug">{opt}</span>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {isCorrect !== null && (
            <div className={`p-6 rounded-xl flex items-start gap-4 border-2 ${isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'} animate-in fade-in slide-in-from-bottom-4`}>
              {isCorrect ? <CheckCircle2 className="w-8 h-8 shrink-0 text-green-600" /> : <XCircle className="w-8 h-8 shrink-0 text-red-600" />}
              <div>
                <p className="text-xl font-bold mb-1">{isCorrect ? '¡Excelente respuesta! +100 pts' : 'Respuesta Incorrecta'}</p>
                <p className="text-base font-medium opacity-90">{questions[currentQuestion].explanation}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-zinc-50 p-6 border-t flex justify-end">
        {isCorrect === null ? (
          <Button size="lg" onClick={handleAnswerSubmit} disabled={selectedAnswer === null} className="w-full md:w-auto px-8 text-lg py-6 rounded-full">
            Verificar Respuesta
          </Button>
        ) : (
          <Button size="lg" onClick={handleNext} className="w-full md:w-auto px-8 text-lg py-6 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg animate-pulse">
            {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar y Ver Ranking'} <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
