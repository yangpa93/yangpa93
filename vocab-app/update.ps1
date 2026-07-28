# 최신 코드로 업데이트 (윈도우)
#
#   PowerShell에서:  .\update.ps1
#
# Expo는 실행할 때마다 tsconfig.json을 자기 형식으로 다시 씁니다.
# 그 상태로 git pull을 하면 "local changes would be overwritten"으로 막히는데,
# 그 파일은 자동 생성물이라 버려도 안전합니다. 이 스크립트가 그 처리를 대신합니다.

$ErrorActionPreference = 'Stop'
$Branch = 'claude/english-vocab-learning-app-pfy9yg'

# 스크립트가 있는 폴더(vocab-app)로 이동
Set-Location -Path $PSScriptRoot

Write-Host "1/3  Expo가 손댄 tsconfig.json 되돌리는 중..." -ForegroundColor Cyan
git checkout -- tsconfig.json 2>$null

Write-Host "2/3  최신 코드 받는 중..." -ForegroundColor Cyan
git pull origin $Branch
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "받기에 실패했습니다." -ForegroundColor Red
  Write-Host "  · 'Could not resolve host'  -> 인터넷/방화벽 문제입니다. 다른 네트워크에서 시도해 보세요."
  Write-Host "  · 'local changes'           -> git status 로 어떤 파일인지 확인하고 알려 주세요."
  exit 1
}

Write-Host "3/3  패키지 확인 중..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "완료. 지금 버전:" -ForegroundColor Green
git log --oneline -1
Write-Host ""
Write-Host "브라우저에서 바로 보려면:  npm run web" -ForegroundColor Yellow
