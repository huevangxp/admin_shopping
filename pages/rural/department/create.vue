<template>
    <v-container fluid>
        <v-card max-width="800" elevation="0" class="mx-auto">
            <v-card-title >
                ສ້າງພະແນກ
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field
                            label="ລະຫັດພະແນກ"
                            id="id"
                            dense
                            outlined
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field
                            label="ພະແນກ"
                            id="id"
                            dense
                            outlined
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" dark>cancel</v-btn>    
                <v-btn color="primary" dark>Create</v-btn>    
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name:'CreateDepartmentPage',
    data() {
            return {
                data:''
            }
        },
    }
</script>