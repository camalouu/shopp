$sendingFileName = "file" + (Get-Random -Maximum 50).ToString() + ".csv"

$putObjectUrl = Invoke-RestMethod -Uri  https://pwwgz6eu6e.execute-api.eu-north-1.amazonaws.com/dev/import?name=$sendingFileName

$sampleData = @{
    title       = "asus zenbook";
    description = "laptop with a good screen, suitable for design works";
    price       = 2300;
    count       = 20
}

$sampleData | ConvertTo-Csv > $sendingFileName

Invoke-RestMethod -Uri $putObjectUrl -Method Put -InFile .\handler.js

Remove-Item $sendingFileName