import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

// mock Chart.js at top-level so Vite/Vitest can hoist properly
vi.mock('chart.js', () => {
  class MockChart {
    static register() {}
    data: any
    constructor() { this.data = { datasets: [{ data: [] }], labels: [] } }
    update() {}
  }
  return { Chart: MockChart, registerables: [] }
})

import BalanceChart from '../../app/components/account/BalanceChart.vue'

describe('BalanceChart', () => {
  it('renders canvas and updates with transactions', async () => {
    const txs = [
      { id: 't1', type: 'deposit', amount: 100, created_at: new Date().toISOString() },
      { id: 't2', type: 'withdrawal', amount: 30, created_at: new Date().toISOString() }
    ]
    // Provide a no-op getContext for canvas in jsdom
    // @ts-ignore
    HTMLCanvasElement.prototype.getContext = () => ({})
    const wrapper = mount(BalanceChart as any, { props: { transactions: txs } })
    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
  })
})
