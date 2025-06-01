const API_URL = `${import.meta.env.VITE_API_URL}/roommates`

// Alle Mitbewohner laden
export async function getRoommates() {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Fehler beim Laden der Mitbewohner')
    return await res.json()
}

// Mitbewohner erstellen (inkl. optionaler flatId)
export async function addRoommate(person, flatId) {
    const payload = {
        ...person,
        flat: flatId ? { id: flatId } : null
    }

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Fehler beim Erstellen des Mitbewohners')
    return await res.json()
}

// Mitbewohner aktualisieren (inkl. optionaler flatId)
export async function updateRoommate(id, person, flatId) {
    const payload = {
        ...person,
        flat: flatId ? { id: flatId } : null
    }

    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Fehler beim Aktualisieren des Mitbewohners')
    return await res.json()
}

// Mitbewohner löschen
export async function deleteRoommate(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Fehler beim Löschen des Mitbewohners')
}
