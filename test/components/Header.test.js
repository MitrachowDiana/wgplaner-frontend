import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import Header from '@/components/Header.vue'



// Dummy-Routen für Testumgebung
const routes = [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/tasks', component: { template: '<div>Tasks</div>' } },
    { path: '/persons', component: { template: '<div>Persons</div>' } },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

describe('Header.vue', () => {
    it('zeigt den Titel und Links an', async () => {
        router.push('/')
        await router.isReady()

        const wrapper = mount(Header, {
            global: {
                plugins: [router],
            },
        })

        // Erwartet, dass "WG-Planer" gerendert wird
        expect(wrapper.text()).toContain('WG-Planer')

        // Erwartet, dass mindestens ein Link vorhanden ist
        const links = wrapper.findAll('a')
        expect(links.length).toBeGreaterThan(0)
    })
})
