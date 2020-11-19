<template>
  <div class="info-hint">
    <v-icon >mdi-information</v-icon>
    <span>
      <slot />
    </span>
  </div>
</template>

<style scoped>
  .info-hint {
    color: grey;
  }

  .v-icon {
    top: -1px
  }
</style>