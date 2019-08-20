<template>
  <div>
    <v-data-table
    class="table"
    :headers="headers"
    :items="result"
    :rows-per-page-items="[10, 25, 35]"
    >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.examCode }}</td>
      <td class="text-xs-left">{{ props.item.title }}</td>
      <td class="text-xs-left">{{ props.item.examType.title }}</td>
      <td class="text-xs-left">CBT</td>
      <td class="text-xs-left">{{ props.item.examGroup.title }}</td>
      <td class="text-xs-left">Expired</td>
      <td class="text-xs-left">

        <template v-slot:item.action="{ props.item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </template>
      </td>

    </template>
  </v-data-table>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">

        <v-card>
          <v-card-title>
            <span class="headline">Add Exam</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Legal first name*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Password*" type="password" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        result: [],
        dialog: false,
        headers: [
          {
            text: 'Exam Code',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Exam Title', value: 'calories' },
          { text: 'Exam Type', value: 'fat' },
          { text: 'Exam Format', value: 'carbs' },
          { text: 'Exam Group', value: 'protein' },
          { text: 'Exam Status', value: 'iron' },
          { text: 'Action', value: 'iron' },
        ],
      }
    },
    methods: {
        getExams() {
        this.$store.dispatch('exams').then((response) =>{
          console.log('Everything is awesome.');
          console.log(response.data);
          this.result = response.data.data.records;
          console.log(this.result)
        }).catch((error) => {
          console.warn('Not ola man :(');

        })
      },
      editItem (item) {
        this.editedIndex = this.result.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
    },
    mounted() {
      this.getExams()
    }
  }
</script>

