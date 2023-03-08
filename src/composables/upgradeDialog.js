import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'

export function useUpgradeDialog() {
  const auth = useAuthStore()
  const route = useRoute()
  const router = useRouter()

  const closeDialogHandler = () => {
    auth.isUpgradeDialogRequested = false
    setTimeout(() => {
      if(Object.keys(route.query).length > 0) {
        router.replace({ query: null })
      }
    }, 100)
  }

  const goToPlanSelectionPage = () => {
    router.push({ name: 'plan-and-billings' })
    closeDialogHandler()
  }

  const showUpgradeDialogHandler = (type) => {
    auth.isUpgradeDialogRequested = true
    auth.upgradeDialogType = type
  }

  return {
    closeDialogHandler,
    goToPlanSelectionPage,
    showUpgradeDialogHandler,
  }
}
