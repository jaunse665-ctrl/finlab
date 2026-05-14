const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No users found to author the post");
    return;
  }
  
  await prisma.forumPost.create({
    data: {
      title: "Introducción al VaR",
      content: `Introducción al Value at Risk (VaR)
¿Qué es el VaR?
El Value at Risk (VaR) es una medida estadística utilizada para cuantificar el nivel de riesgo financiero dentro de una empresa o cartera de inversiones en un marco de tiempo específico.

Básicamente, responde a la pregunta:
"¿Cuánto es lo máximo que puedo esperar perder con un nivel de confianza dado (por ejemplo, 95%) en un periodo determinado?"

VaR Univariado vs. VaR de Portafolio
VaR Univariado: Se calcula para un solo activo. Analiza la distribución de rendimientos de ese activo individual.
VaR de Portafolio: Considera múltiples activos. Aquí es crucial la correlación entre activos. Si los activos no están perfectamente correlacionados, el riesgo del portafolio (diversificado) suele ser menor que la suma de los riesgos individuales.

La Burbuja Inmobiliaria 2007–2008
La crisis financiera de 2007-2008 fue desatada por el colapso de la burbuja inmobiliaria en Estados Unidos. Los bancos habían otorgado hipotecas de alto riesgo (subprime) que luego empaquetaron en productos financieros complejos.

Cuando los precios de las viviendas cayeron y los impagos aumentaron, estos activos se volvieron tóxicos, llevando a la quiebra a grandes instituciones como Lehman Brothers y afectando severamente a bancos como Bank of America (BAC) y JP Morgan (JPM), así como al sector inmobiliario (VNQ).`,
      authorId: user.id
    }
  });
  console.log("Post seeded successfully");
}

main().catch(console.error).finally(() => prisma.$disconnect());
