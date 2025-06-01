const API_URL = `${import.meta.env.VITE_API_URL}/api/flats`


export async function getFlats() {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Fehler beim Laden der Wohnungen')
    return await res.json()
}

export async function createFlat(flat) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flat)
    })
    if (!res.ok) throw new Error('Fehler beim Erstellen der Wohnung')
    return await res.json()
}

export async function updateFlat(id, flat) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flat)
    })
    if (!res.ok) throw new Error('Fehler beim Aktualisieren der Wohnung')
    return await res.json()
}
