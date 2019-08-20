<template>
   <v-layout align-center>
   <v-flex>
      <v-window
         v-model="window"
         class="elevation-1"
         vertical
         style="border:1px solid gray"
         >
         <v-window-item>
            <v-toolbar color="green darken-2 white--text" height="50px">
               <h4>Search Eligibility</h4>
            </v-toolbar>
            <v-container>
               <v-layout row wrap mb-0>
                  <v-flex sm3>
                     <v-text-field
                        label="Candidate ID"
                        outline
                        v-model="candidate_id"
                        ></v-text-field>
                  </v-flex>
                  <v-flex sm3>
                     <v-text-field
                        label="First/Middle Name"
                        outline
                        v-model="first_name"
                        ></v-text-field>
                  </v-flex>
                  <v-flex sm3>
                     <v-text-field
                     v-model="last_name"
                        label="Last Name"
                        outline
                        ></v-text-field>
                  </v-flex>
                  <v-flex sm3>
                     <v-select
                        v-model="exam"
                        :items="items"
                        label="Exam"
                        outline
                        ></v-select>
                  </v-flex>
               </v-layout>
               <v-layout row wrap mt-0>
                  <v-flex sm3 >
                     <v-select
                        v-model="status"
                        :items="status"
                        label="Eligibility Status"
                        outline
                        ></v-select>
                  </v-flex>
                  <v-flex sm3>
                     <v-select
                        v-model="jurisdiction"
                        :items="items"
                        label="Select Jurisdictions"
                        outline
                        ></v-select>
                  </v-flex>
                  <v-flex sm3>
                     <v-text-field
                        label="outline"
                        outline
                        ></v-text-field>
                  </v-flex>
                  <v-flex sm3>
                     <v-text-field
                        label="outline"
                        outline
                        ></v-text-field>
                  </v-flex>
               </v-layout>
               <v-layout row>
                   <v-flex>
                  <v-btn outline color="green">Clear</v-btn>
                  <v-btn outline color="green">Search</v-btn>
                   </v-flex>
               </v-layout>
            </v-container>
         </v-window-item>
      </v-window>
   </v-flex>
</v-layout>
</template>
<script>
  export default {
    data: () => ({
      length: 3,
      window: 0,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      status: ['Used', 'Vaild', 'Expired','All'],
      candidate_id: '',
      jurisdiction: '',
      first_name: '',
      last_name: '',
      exam: '',

    }),
    methods: {
      getEligibility: function () {
         var params = {
         }
        this.$store.dispatch('eligibilities',params).then((response) => {
        console.log('Everything is awesome.');
        vm.$router.push({ name: 'Dashboard' });
      }).catch((error) => {
        console.warn('Not ola man :(');
        vm.error = true;
        vm.result = "Email or Password is incorrect.";
        vm.showResult = true;

      })
      }
    },
    mounted(){
       this.getEligibility()
   }
  }
</script>