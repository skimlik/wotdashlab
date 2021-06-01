$scriptDir = $(Split-Path -Parent $PSCommandPath)
$dockerFile = Join-Path $scriptDir "WotDashLab.App\Dockerfile"

. docker build -f $dockerFile --force-rm -t wotdashlabapp:dev --target base  --label "dev" --label "com.microsoft.visual-studio.project-name=WotDashLab.App" $scriptDir
