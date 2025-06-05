const API_URL = `${import.meta.env.VITE_API_URL}/tasks`

export async function getTasks() {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Fehler beim Laden der Aufgaben')
    return await res.json()
}

export async function addTask(task, flatId) {
    const res = await fetch(`${API_URL}/${flatId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
    if (!res.ok) throw new Error('Fehler beim Erstellen der Aufgabe')
    return await res.json()
}

export async function updateTask(id, task) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
    if (!res.ok) throw new Error('Fehler beim Aktualisieren der Aufgabe')
    return await res.json()
}

export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error('Fehler beim Löschen der Aufgabe')
}