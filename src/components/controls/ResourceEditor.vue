<template>
    <v-container>
        <v-text-field label="Name" v-model="value.name"/>
        <v-textarea label="Content" v-model="value.content"/>
        
    </v-container>
</template>

<script>
export default {
    name: 'ResourceEditor',
    props: ['value']

}
</script>