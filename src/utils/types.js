export default {
  interactionTypes: {
    'single-choice-input': "Single choice input",
    'multiple-choice-input': "Multiple choice input",
    'stimulus': 'Stimulus'
  },
  typeName(id) {
    return this.interactionTypes[id]
  }
}