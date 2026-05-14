Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "        Iniciando Entorno Local FinLab University" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Limpiar cache
Write-Host "[1/3] Limpiando memoria cache de Next.js..." -ForegroundColor Magenta
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "Cache eliminada exitosamente." -ForegroundColor Green
} else {
    Write-Host "No se encontro cache previa." -ForegroundColor Gray
}
Write-Host ""

# Iniciar Backend (Base de datos / Prisma Studio) en una nueva ventana
Write-Host "[2/3] Iniciando Base de Datos (Prisma Studio)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `"npx prisma studio`""

# Iniciar Frontend/API (Next.js) en una nueva ventana
Write-Host "[3/3] Iniciando Aplicacion (Next.js) en el puerto 3005..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `"npm run dev -- -p 3005`""

Write-Host ""
Write-Host "¡Listo! Se han abierto los servidores." -ForegroundColor Green
Write-Host "Esperando 5 segundos para abrir la plataforma en tu navegador..." -ForegroundColor Gray
Start-Sleep -Seconds 5
Start-Process "http://localhost:3005"

Write-Host ""
Write-Host "Si Prisma Studio (la base de datos) se abrio en tu navegador, es normal." -ForegroundColor Gray
Write-Host "Tu plataforma educativa esta cargando en http://localhost:3005" -ForegroundColor Gray
Write-Host ""
