// JavaScript Example: Fetching Entities
// This function fetches entities of a specific type from the API.
async function fetchEntityNameEntities() {
    try {
        const response = await fetch(https://app.base44.com/api/apps/6929714fa1233a63cc215edc/entities/EntityName, {
            headers: {
                'api_key': process.env.API_KEY || '9cb694a6d4f646fa915916f2f0731216', // Use environment variable or fallback
                'Content-Type': 'application/json'
            }
        });

        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
            throw new Error(HTTP error! status: <span class="hljs-subst">${response.status}</span>);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching entities:', error);
    }
}

// JavaScript Example: Updating an Entity
// This function updates the specified entity with new data.
async function updateEntityNameEntity(entityId, updateData) {
    try {
        const response = await fetch(https://app.base44.com/api/apps/6929714fa1233a63cc215edc/entities/EntityName/<span class="hljs-subst">${entityId}</span>, {
            method: 'PUT',
            headers: {
                'api_key': process.env.API_KEY || '9cb694a6d4f646fa915916f2f0731216', // Use environment variable or fallback
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
            throw new Error(HTTP error! status: <span class="hljs-subst">${response.status}</span>);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error updating entity:', error);
    }
}
