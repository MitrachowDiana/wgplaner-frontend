import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'

describe('TaskList.vue', () => {
    it('rendert ohne Fehler mit leeren Props', () => {
        const wrapper = mount(TaskList, {
            props: {
                tasks: []
            }
        })

        expect(wrapper.exists()).toBe(true)
        expect(wrapper.text()).toContain('Aufgabenliste')
    })

    it('zeigt Aufgaben an, wenn welche vorhanden sind', () => {
        const wrapper = mount(TaskList, {
            props: {
                tasks: [
                    { id: 1, description: 'Abwaschen', dueDate: null, roommate: null },
                    { id: 2, description: 'Staubsaugen', dueDate: null, roommate: null }
                ]
            }
        })

        const taskItems = wrapper.findAll('.task')
        expect(taskItems.length).toBe(2)
        expect(wrapper.text()).toContain('Abwaschen')
        expect(wrapper.text()).toContain('Staubsaugen')
    })
})

