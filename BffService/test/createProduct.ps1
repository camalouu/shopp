# $lamdaUrl = 'https://m3a8z91udj.execute-api.eu-north-1.amazonaws.com/dev/products'

$localUrl='http://localhost:3000/products'
# $ebUrl = 'http://camalouu-bff-service.eu-north-1.elasticbeanstalk.com/products'

$product = @{
  title="Alienware Gaming DDD"; 
  description="Unique laptop";
  price=1915;
  count=45
} | ConvertTo-Json 

$headers = @{
  'Content-Type'='application/json'
}

Invoke-RestMethod  `
  -Uri $localUrl `
  -Method Post `
  -Body $product `
  -Headers $headers
