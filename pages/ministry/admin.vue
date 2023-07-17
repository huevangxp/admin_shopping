<template>
    <div>
        <!-- {{ items }} -->
        <h1 class="my-3">admin ຂອງທ້ອງຖີ່ມ <span class="primary--text" style="border-bottom: 1px solid #000;">{{ items[0]?.ministry_title }}</span></h1>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            pagination.sync="pagination"
            loading="true"
        >

        <template #item.idx="{index}">
            <div>
                {{ index+1 }}
            </div>
        </template>

        <template #item.created_at="{item}">
            <div>
                {{ $moment(item.created_at).format('DD/MM/YYYY') }}
            </div>
        </template>
            
        </v-data-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$cookies.get('userId'),
            items:[],
            headers: [
                { text: "ລຳດັບ", value: "idx" },
                { text: "ຊື່", value: "user_name" },
                { text: "ສິດ", value: "role" },
                { text: "ວັນທີສ້າງ", value: "created_at" },
            ]

        }
    },
    mounted() {
        this.$axios.get(`/ministry/${this.id}`)
            .then((res) => {
                // console.log('--------->',res.data);
            this.items.push(res.data);
        })
    },
}
</script>