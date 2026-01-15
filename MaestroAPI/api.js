async function fetchEntityNameEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/6929714fa1233a63cc215edc/entities/EntityName`, {
        headers: {
            'api_key': process.env.BASE44_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

async function updateEntityNameEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/6929714fa1233a63cc215edc/entities/EntityName/${entityId}`, {
        method: 'PUT',
        headers: {
            'api_key': process.env.BASE44_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
    const data = await response.json();
    console.log(data);
}
