# PowerShell script to test Nx caching behavior for single app deployment (shell only)
Write-Host "Testing Nx Cache Behavior - Single App Deployment (shell only)" -ForegroundColor Cyan

Write-Host "`n1. Clearing Nx cache..." -ForegroundColor Yellow
npx nx reset

Write-Host "`n2. First build (should build shell + all dependencies from scratch)..." -ForegroundColor Yellow
$firstBuild = Measure-Command { npx nx build shell --skip-nx-cache }
Write-Host "First build took: $($firstBuild.TotalSeconds) seconds" -ForegroundColor Green

Write-Host "`n3. Second build (should use cache)..." -ForegroundColor Yellow
$secondBuildOutput = npx nx build shell 2>&1
$secondBuild = Measure-Command { npx nx build shell }
Write-Host "Second build took: $($secondBuild.TotalSeconds) seconds" -ForegroundColor Green

# Extract cache information
$cacheInfo = $secondBuildOutput | Select-String "read from cache|existing outputs match the cache"
if ($cacheInfo) {
    Write-Host "`nCache Information:" -ForegroundColor Cyan
    $cacheInfo | ForEach-Object { Write-Host "   $($_.Line)" -ForegroundColor Green }
} else {
    Write-Host "`nNo cache hits detected" -ForegroundColor Yellow
}

Write-Host "`n4. Making a small change to remote2..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "HH:mm:ss"
$content = Get-Content "module/remote2/src/app/app.tsx" -Raw
$newContent = $content -replace "Cache Test!", "Cache Test! Updated at $timestamp"
Set-Content "module/remote2/src/app/app.tsx" -Value $newContent

Write-Host "`n5. Building after change (shell should rebuild due to remote2 dependency)..." -ForegroundColor Yellow
$thirdBuildOutput = npx nx build shell --verbose 2>&1
$thirdBuild = Measure-Command { npx nx build shell --verbose }
Write-Host "Third build took: $($thirdBuild.TotalSeconds) seconds" -ForegroundColor Green

# Extract cache information for selective build
$selectiveCacheInfo = $thirdBuildOutput | Select-String "read from cache|existing outputs match the cache"
if ($selectiveCacheInfo) {
    Write-Host "`nSelective Build Cache Information:" -ForegroundColor Cyan
    $selectiveCacheInfo | ForEach-Object { Write-Host "   $($_.Line)" -ForegroundColor Green }
} else {
    Write-Host "`nNo cache hits in selective build" -ForegroundColor Yellow
}

Write-Host "`nCache Performance Summary:" -ForegroundColor Cyan
Write-Host '   First build (no cache):  ' $($firstBuild.TotalSeconds)'s' -ForegroundColor White
Write-Host '   Second build (cached):   ' $($secondBuild.TotalSeconds)'s' -ForegroundColor White  
Write-Host '   Third build (selective): ' $($thirdBuild.TotalSeconds)'s' -ForegroundColor White
Write-Host "   Cache speedup: $(($firstBuild.TotalSeconds / $secondBuild.TotalSeconds).ToString('F1'))x faster" -ForegroundColor Green

Write-Host "`nSingle App Deployment Analysis:" -ForegroundColor Cyan
Write-Host "   - Building 'shell' automatically builds all dependencies (remote1, remote2, ui)" -ForegroundColor Gray
Write-Host "   - Changes to remote2 will cause shell to rebuild (dependency tracking)" -ForegroundColor Gray
Write-Host "   - This simulates production deployment where only shell is deployed" -ForegroundColor Gray
Write-Host "   - Look for '[existing outputs match the cache, left as is]' for cache hits" -ForegroundColor Gray

Write-Host "`nTo see affected projects in CI/CD:" -ForegroundColor Cyan
Write-Host "   npx nx show projects --affected --target=build --base=origin/main" -ForegroundColor Gray
Write-Host "`nTo test individual project builds:" -ForegroundColor Cyan
Write-Host "   npx nx build remote1  # Build only remote1" -ForegroundColor Gray
Write-Host "   npx nx build remote2  # Build only remote2" -ForegroundColor Gray
Write-Host "   npx nx build shell    # Build shell + all dependencies" -ForegroundColor Gray