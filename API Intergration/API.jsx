async function fetchEntityNameEntities() {
    try {
        const response = await fetch('https://app.base44.com/api/apps/6929714fa1233a63cc215edc/entities/EntityName', {
            headers: {
                'api_key': process.env.BASE44_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching entities:', error);
    }
}

async function updateEntityNameEntity(entityId, updateData) {
    try {
        const response = await fetch(`https://app.base44.com/api/apps/6929714fa1233a63cc215edc/entities/EntityName/${entityId}`, {
            method: 'PUT',
            headers: {
                'api_key': process.env.BASE44_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error updating entity:', error);
    }
}
