Invoke-RestMethod  `
  -Uri  https://m3a8z91udj.execute-api.eu-north-1.amazonaws.com/dev/products `
  -Method Post `
  -Body (@{count=33;title="Acer Aspire 5"; description="budget laptop"; price=400} | ConvertTo-Json)
