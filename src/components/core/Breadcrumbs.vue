<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="">
          <v-breadcrumbs :items="items" class="breadcrumbs" divider="/">
            <template slot="item" slot-scope="props">
              <router-link :to="{ name: props.item.href }" class="link">{{ props.item.name }}</router-link>
            </template>
          </v-breadcrumbs>
        </v-card>
  </v-flex>
    </v-layout>
  
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },

  watch: {
    '$route' () {
      const vm = this;

      vm.updateBreadcrumbs();
    }
  },

  mounted() {
    const vm = this;

    vm.updateBreadcrumbs();
  },

  methods: {
    updateBreadcrumbs() {
      const vm = this;

      vm.items = vm.$route.meta.breadcrumb;
    }
  }
}
</script>

<style>
  .breadcrumbs .link {
    text-decoration: none;
    color: #333;
    font: bold 14px Sans-Serif;
    letter-spacing: -1px;
    white-space: nowrap;
    display: inline-block;
    position: relative;
  }

</style>
