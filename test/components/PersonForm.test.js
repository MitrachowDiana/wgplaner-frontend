import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonForm from '@/components/PersonForm.vue'

describe('PersonForm.vue', () => {
    it('emittiert submit mit eingegebenem Namen', async () => {
        const wrapper = mount(PersonForm)
        const input = wrapper.find('input')
        const testName = 'Anna'

        await input.setValue(testName)
        await wrapper.find('form').trigger('submit.prevent')

        const emitted = wrapper.emitted()
        expect(emitted).toHaveProperty('submit')
        expect(emitted.submit[0]).toEqual([{ name: testName }])
    })
})
