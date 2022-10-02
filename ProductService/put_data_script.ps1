
function putItemToDynamoDb
{
  param($dynamoJSON)
  aws dynamodb put-item --table-name products --item $dynamoJSON
  # Write-Host $dynamoJSON
}

$data = Get-Content ./data.json | ConvertFrom-Json 

foreach($elem in $data)
{
  $dynamoItem = @{
    id=@{S=$elem.id};
    title=@{S=$elem.title};
    description=@{S=$elem.description};
    price=@{N=$elem.price.ToString()};
  } 
  $item = ConvertTo-Json $dynamoItem 
  $item = $item.replace('"', '\"')
  putItemToDynamoDb($item)
}
