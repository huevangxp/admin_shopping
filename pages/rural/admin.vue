<template>
    <div>
        <!-- {{ items }} -->
        <h1 class="my-10">admin ຂອງທ້ອງຖີ່ມ </h1>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="search"
              name="ຄົ້ນຫາ"
              label="ຄົ້ນຫາ"
              id="id"
              dense
              outlined
              append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="4"> </v-col>
          <v-col cols="4" class="d-flex justify-end">
            <v-btn class="mx-2" outlined color="primary" to="/rural/createAmin"
              >ເພີ່ມ admin</v-btn>
          </v-col>
        </v-row>
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