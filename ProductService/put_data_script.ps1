function putItemToDynamoDB
{
  param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$tableName,
        
    [Parameter(Mandatory=$true, Position=1)]
    [string]$dynamoJSON
  )

  aws dynamodb put-item --table-name $tableName --item $dynamoJSON
  # Write-Host $dynamoJSON
}

$data = Get-Content ./data.json | ConvertFrom-Json 

foreach($elem in $data)
{
  $product = @{
    id=@{S=$elem.id};
    title=@{S=$elem.title};
    description=@{S=$elem.description};
    price=@{N=$elem.price.ToString()};
  } 

  putItemToDynamoDB "products" (ConvertTo-Json $product).replace('"', '\"')

  $stock = @{
    product_id=@{S=$elem.id};
    count=@{N=(Get-Random -Maximum 100).ToString()}
  }

  putItemToDynamoDB "stocks" (ConvertTo-Json $stock).replace('"', '\"')
}
