const API_URL = `${import.meta.env.VITE_API_URL}/roommates`

export async function getRoommates() {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Fehler beim Laden')
    return await res.json()
}

export async function addRoommate(person) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    })
    return await res.json()
}

export async function updateRoommate(id, person) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    })
    return await res.json()
}

export async function deleteRoommate(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
}

