<template>
    <v-container>
        <v-text-field label="Name" v-model="value.name"/>
        <v-textarea label="Content" v-model="value.content"/>
        <v-combobox
            v-model="value.includeTags"
            chips
            clearable
            label="Include tags"
            multiple
            solo
        />
        <v-combobox
            v-model="value.excludeTags"
            chips
            clearable
            label="Exclude tags"
            multiple
            solo
        />
    </v-container>
</template>

<script>
export default {
    name: 'ResourceEditor',
    props: ['value']

}
</script>