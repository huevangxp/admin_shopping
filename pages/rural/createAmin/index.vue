<template>
    <div>
        huevang {{ userId }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: this.$cookies.get('userId'),
        }
    },

}
</script>