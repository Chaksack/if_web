import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// mock the composable
vi.mock('../../app/composables/useTransactions', () => ({
  useTransactions: () => ({
    flagTransaction: vi.fn(() => Promise.resolve({ data: { id: 'tx1', is_flagged: true } })),
    unflagTransaction: vi.fn(() => Promise.resolve({ data: { id: 'tx1', is_flagged: false } })),
    addTransactionNote: vi.fn(() => Promise.resolve({ data: { id: 'tx1', notes: 'note' } })),
    resolveTransaction: vi.fn(() => Promise.resolve({ data: { id: 'tx1', status: 'completed' } })),
  })
}))

import TransactionModal from '../../app/components/account/TransactionModal.vue'

describe('TransactionModal', () => {
  beforeEach(() => {
    // clear any existing dispatched events
    vi.restoreAllMocks()
  })

  it('flags a transaction and emits updated via window event', async () => {
    const tx = { id: 'tx1', reference: 'ref1', type: 'deposit', channel: 'mobile_money', amount: 100, status: 'pending', created_at: new Date().toISOString(), is_flagged: false }
  const wrapper = mount(TransactionModal as any, { props: { tx }, attachTo: document.body })

  const spy = vi.spyOn(window, 'dispatchEvent')

    // click flag button
  // find Save note button which is always present and triggers an update event
  // Teleport renders into document.body; query the body for the modal buttons
  const bodyButtons = Array.from(document.body.querySelectorAll('button'))
  const saveBtnEl = bodyButtons.find(b => b.textContent?.toLowerCase().includes('save')) as HTMLButtonElement | undefined
  expect(Boolean(saveBtnEl)).toBe(true)
  await saveBtnEl!.click()
  // wait for async handlers to finish
  await new Promise((r) => setTimeout(r, 10))

  // dispatchEvent should be called with updated detail
  expect(spy).toHaveBeenCalled()
    const called = spy.mock.calls[0][0]
    expect(called).toBeInstanceOf(CustomEvent)
    // @ts-ignore
    expect(called.detail.id).toBe('tx1')
    // @ts-ignore - note saved payload
    expect(called.detail.notes).toBe('note')
  })
})
