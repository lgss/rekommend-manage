import store from '@/store'
export const savePopup = (success) => {
  if (success)
  store.dispatch('doSnackbar', {text: "Changes saved successfully", colour: "success", icon: 'mdi-check-circle'})
  else
    store.dispatch('doSnackbar', {text: "Changes have not been saved", colour: "error", icon: 'mdi-alert-circle'})
}

export const deletePopup = (success) => {
  if (Number.isInteger(success))
    success = [200, 201, 204].includes(success)
    
  if (success)
  store.dispatch('doSnackbar', {text: "Item deleted successfully", colour: "success", icon: 'mdi-check-circle'})
  else
    store.dispatch('doSnackbar', {text: "Item couldn't be deleted", colour: "error", icon: 'mdi-alert-circle'})
}