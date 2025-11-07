import { ref, type Ref } from 'vue'

export function useTextDirection(options?: { initialValue?: 'ltr' | 'rtl' }): Ref<'ltr' | 'rtl'> {
  const direction = ref<'ltr' | 'rtl'>(options?.initialValue || 'ltr')
  return direction
}
