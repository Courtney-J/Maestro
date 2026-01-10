// JavaScript Example: Reading Entities
// Filterable fields: 
async function fetchEntityNameEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/6929714fa1233a63cc215edc/entities/EntityName`, {
        headers: {
            'api_key': '9cb694a6d4f646fa915916f2f0731216', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: 
async function updateEntityNameEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/6929714fa1233a63cc215edc/entities/EntityName/${entityId}`, {
        method: 'PUT',
        headers: {
            'api_key': '9cb694a6d4f646fa915916f2f0731216', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
    const data = await response.json();
    console.log(data);
}