<template>
  <div>
    <canvas ref="canvas" class="w-full h-40"></canvas>
    <div class="text-sm text-gray-500 mt-2">Balance history (recent)</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue'
import { Chart, type ChartConfiguration, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps<{ transactions: any[] }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

function buildDataset(transactions: any[]) {
  const tx = (transactions || []).slice().reverse()
  const labels = tx.map((t, i) => new Date(t.created_at || Date.now()).toLocaleDateString())
  const balances: number[] = []
  let acc = 0
  for (const t of tx) {
    const amt = Number(t.amount || 0)
    if (t.type === 'deposit' || t.type === 'loan_disbursement') acc += amt
    else if (t.type === 'withdrawal' || t.type === 'loan_repayment') acc -= amt
    else acc += amt
    balances.push(Math.round(acc * 100) / 100)
  }

  return { labels, balances }
}

onMounted(() => {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  const { labels, balances } = buildDataset(props.transactions)
  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Balance',
          data: balances,
          borderColor: '#0ea5a4',
          backgroundColor: 'rgba(14,165,164,0.12)',
          tension: 0.25,
          fill: true,
          pointRadius: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
      scales: { x: { display: false }, y: { display: true } },
    },
  }

  chart = new Chart(ctx, config)
})

watch(() => props.transactions, (newVal) => {
  if (!chart) return
  const { labels, balances } = buildDataset(newVal)
  chart.data.labels = labels as any
  ;(chart.data.datasets[0].data as any) = balances
  chart.update()
})
</script>

<style scoped>
canvas { width: 100% !important; height: 160px !important; }
</style>
