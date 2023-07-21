<template>
  <div>
    <h1 class="my-10">ລາຍງານຂອງກົມ</h1>
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
      <v-col cols="4">
        <download-excel
          class="download"
          :header="e_headers"
          worksheet="ລາຍງານ"
          :fetch="download"
          :name="title"
          :before-finish="finishDownload"
        >
          <v-btn color="primary" dark>
            <v-icon left small>mdi-download</v-icon>
            ດາວໂຫຼດ Excel
          </v-btn>
        </download-excel>
      </v-col>
    </v-row>
    <v-data-table
      :headers="dessertHeaders"
      :items="dataDO.rows"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      class="elevation-1"
      :search="search"
    >
      <template #item.idx="{ index }">
        <div>
          <p>{{ index + 1 }}</p>
        </div>
      </template>
      <template #item.created_at="{ item }">
        <div>
          {{ $moment(item).format("DD/MM/YYYY") }}
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      search: "",
      singleExpand: false,
      role: this.$cookies.get("role"),
      title: this.$cookies.get("title"),
      id: this.$cookies.get("userId"),
      dataDO:{},
      search: "",

      dessertHeaders: [
        {
          text: "ລ/ດ",
          align: "start",
          sortable: false,
          value: "idx",
        },
        { text: "ຊື່ກົມ", value: "department_organization_title" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
      ],
      e_headers: "ລາຍງານລາຍຈ່າຍ",
      title:
        "ລາຍງານກົມຂອງສູນກາງ" +
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10) +
        ".xls",
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  mounted() {
    this.getData();
  },
  computed: {},
  methods: {
    async getData() {
      await this.$axios
        .get(`/department-organizations/${this.id}`)
        .then((res) => {
          // console.log(res.data);
          this.dataDO = res?.data
        });
    },

    download() {
      try {
        var list = [],
          index = 0;
        for (let i = 0; i < this.departmentDO.rows.length; i++) {
          var el = this.departmentDO.rows[i];
          index = parseInt(i) + 1;
          var obj = {
            idx: index,
            title: el.department_organization_title,
            date: this.$moment(el.created_at).format("DD/MM/YYYY"),
          };
          list.push(obj);
        }
        return list;
      } catch (error) {
        console.log(error);
      }
    },
    finishDownload() {
      this.$toast.success("download data to excel success...");
    },
  },
};
</script>
