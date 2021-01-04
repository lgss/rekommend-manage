import ChoiceEditor from '@/components/controls/ChoiceEditor';
import TextBlockEditor from '@/components/controls/TextBlockEditor';

export const interactionTypes = {
  'single-choice-input': "Single choice input",
  'multiple-choice-input': "Multiple choice input",
  'stimulus': 'Stimulus'
}

export const components = {
  'single-choice-input': ChoiceEditor,
  'multiple-choice-input': ChoiceEditor,
  'stimulus': TextBlockEditor,
}

export const interactionIcons = {
  'single-choice-input': "mdi-format-list-checks",
  'multiple-choice-input': "mdi-format-list-checks",
  'stimulus': 'mdi-format-float-left'
}

export function itemTypeName(id) {return interactionTypes[id]}

export function itemIcon(id) {return interactionIcons[id]}
