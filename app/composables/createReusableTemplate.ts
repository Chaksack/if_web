import { defineComponent, h, type VNode, Fragment } from 'vue'

export function createReusableTemplate<T = any>(): [
  DefineComponent: (props: T) => VNode,
  ReuseComponent: () => VNode
] {
  let template: VNode | null = null

  const DefineComponent = defineComponent({
    setup(_, { slots }) {
      return () => {
        template = slots.default?.()[0] || null
        return h(Fragment, {})
      }
    }
  })

  const ReuseComponent = defineComponent({
    setup() {
      return () => template ? h(Fragment, {}, [template]) : null
    }
  })

  return [DefineComponent as any, ReuseComponent as any]
}
