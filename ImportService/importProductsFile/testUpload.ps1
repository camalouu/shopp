$sendingFileName = "file" + (Get-Random -Maximum 50).ToString() + ".csv"

$url = "https://pwwgz6eu6e.execute-api.eu-north-1.amazonaws.com/dev/import?name=$sendingFileName"

$creds = "camalouu:TEST_PASSWORD"

$token = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($creds))

$headers = @{
  'Authorization' = 'Basic ' + $token
}

$putObjectUrl = Invoke-RestMethod -Uri $url -Headers $headers  

$sampleData = @{
  title       = "Xiaomi Mi Band 7";
  description = "Larger screen, always-on display";
  price       = 1200;
  count       = 30
}

$sampleData | ConvertTo-Csv > $sendingFileName

Invoke-RestMethod -Uri $putObjectUrl -Method Put -InFile $sendingFileName

Remove-Item $sendingFileName
