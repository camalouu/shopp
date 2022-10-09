$putObjectUrl = Invoke-RestMethod -Uri  https://pwwgz6eu6e.execute-api.eu-north-1.amazonaws.com/dev/import?name=file.csv
Write-Host $putObjectUrl