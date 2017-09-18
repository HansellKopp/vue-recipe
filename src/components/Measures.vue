<template>
  <b-container class="gray mt-4">
    <b-row>
      <b-col sm="6">
        <span class="display-4">Measures</span>
      </b-col>
      <b-col sm="6" class="mt-2 mb-2">
        <b-input-group>
          <b-input-group-addon>Filter</b-input-group-addon>    
          <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>    
          <b-input-group-button slot="right">
            <b-btn variant="outline-info">Apply</b-btn>
          </b-input-group-button>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-input-group>
          <b-input-group-addon>New Measure</b-input-group-addon>    
          <b-form-input v-model="filter" placeholder="Add new"></b-form-input>    
          <b-input-group-button slot="right">
            <b-btn variant="outline-info">Submit</b-btn>
          </b-input-group-button>
        </b-input-group>
    </b-row>
      <div class="row">
          <b-table striped hover show-empty
           :items="items"
           :fields="fields"
           :current-page="currentPage"
           :per-page="perPage"
           :filter="filter"
           :sort-by.sync="sortBy"
           :sort-desc.sync="sortDesc"
           @filtered="onFiltered"
          >
          <template slot="name" scope="row">{{row.value.first}} {{row.value.last}}</template>
          <template slot="active" scope="row">{{row.value?'Yes':'No'}}</template>
          <template slot="actions" scope="row">
            <b-btn size="sm" @click.stop="view(row.item,row.index,$event.target)">view</b-btn>
            <b-btn size="sm" @click.stop="edit(row.item,row.index,$event.target)">edit</b-btn>
          </template>
        </b-table>        
      </div>
      <b-modal id="modal1" @hide="resetModal" ok-only>
        <h4 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.index }}</h4>
        <pre>{{ modalDetails.data }}</pre>
      </b-modal>
  </b-container>
</template>

<script>
// -- http://localhost:3000/measure
import items from './data'

export default {
  name: 'measures',
  data () {
    return {
      items,
      fields: {
        id: { label: 'id', sortable: true },
        description: { label: 'Description', sortable: true },
        active: { label: 'is Active', sortable: true },
        actions: { label: 'Actions' }
      },
      currentPage: 1,
      perPage: 12,
      totalRows: items.length,
      sortBy: 'description',
      sortDesc: false,
      filter: null,
      modalDetails: { index: '', data: '' }
    }
  },
  methods: {
    view (item, index, button) {
      this.modalDetails.data = JSON.stringify(item, null, 2)
      this.modalDetails.index = index
      this.$root.$emit('show::modal', 'modal1', button)
    },
    edit (item, index, button) {
      this.modalDetails.data = JSON.stringify(item, null, 2)
      this.modalDetails.index = index
      this.$root.$emit('show::modal', 'modal1', button)
    },
    resetModal () {
      this.modalDetails.data = ''
      this.modalDetails.index = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style >
.gray {
  background-color: #bbdefb;
}
</style>
