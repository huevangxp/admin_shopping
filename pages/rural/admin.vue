<template>
    <div>
        <!-- {{ items }} -->
        <h1 class="my-3">admin ຂອງທ້ອງຖີ່ມ <span class="primary--text" style="border-bottom: 1px solid #000;">{{ items[0]?.title }}</span></h1>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            loading="true"
        >

        <template #item.idx="{index}">
            <div>
                {{ index +1 }}
            </div>
        </template>

        <template #item.status="{item}">
            <div>
                <h4 v-if="item.status == '0'" class="primary--text">ເປິດໃຊ້ງານ</h4>
                <h4 v-else class="red--text">ປິດໃຊ້ງານ</h4>
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
                { text: "ຈັດການພະແນກ", value: "title" },
                { text: "ຊື່", value: "user_name" },
                { text: "ສິດ", value: "role" },
                { text: "ສະຖານະ", value: "status" },
                { text: "ວັນທີສ້າງ", value: "created_at" },
            ]

        }
    },
    mounted() {
        this.$axios.get(`/rarul_departmentOne/${this.id}`)
            .then((res) => {
                // console.log('++++++++++++>',res.data);
            this.items.push(res.data);
        })
    },
}
</script>