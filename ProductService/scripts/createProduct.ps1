Invoke-RestMethod  `
  -Uri  https://m3a8z91udj.execute-api.eu-north-1.amazonaws.com/dev/products `
  -Method Post `
  -Body (@{count=27;title="HP Victus Gaming"; description="Gaming laptop"; price=700} | ConvertTo-Json)
