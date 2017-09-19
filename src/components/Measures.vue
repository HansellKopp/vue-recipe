<template>
  <b-container>
    <b-row>
      <b-col sm-6>
        <span class="display-4">Measures</span>
      </b-col>
      <b-col sm-6 class="mt-3">
        <b-button-group class="float-right">
          <b-btn variant="primary"><icon name="plus"></icon></b-btn> 
          <b-btn variant="primary">Add Measure</b-btn>
        </b-button-group>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col sm-8 class="mt-2">
        <b-input-group>
          <b-input-group-addon><icon name="filter"></icon></b-input-group-addon>    
          <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>    
        </b-input-group>
      </b-col>
      <b-col sm-4 class="mt-2">
          <b-pagination
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            class="float-right"
          />
      </b-col>
    </b-row>
    <b-row>
      
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-table striped hover show-empty responsive
           :items="items"
           :fields="fields"
           :current-page="currentPage"
           :per-page="perPage"
           :filter="filter"
           :sort-by.sync="sortBy"
           :sort-desc.sync="sortDesc"
           @filtered="onFiltered"
        >
        <template slot="name" scope="row">{{row.value}}</template>
        <template slot="active" scope="row">{{row.value?'Yes':'No'}}</template>
        <template slot="actions" scope="row">
        <b-btn size="sm" variant="success" @click.stop="edit(row.item,row.index,$event.target)">
          <icon name="pencil"></icon>
        </b-btn>
        <b-btn size="sm" variant="danger" @click.stop="delete(row.item,row.index,$event.target)">
          <icon name="trash"></icon>
        </b-btn>
        </template>
      </b-table>        
      </b-col>
    </b-row>
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
        name: { label: 'name', sortable: true },
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
    delete (item, index, button) {
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

<style scoped>
.container {
  background-color: #e3f2fd;
}
</style>
