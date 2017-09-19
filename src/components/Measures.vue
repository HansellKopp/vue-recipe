<template>
  <b-container>
    <b-row>
      <b-col sm-6>
        <span class="display-4">Measures</span>
      </b-col>
      <b-col sm-6 class="mt-3">
        <b-button-group class="float-right">
          <b-btn variant="primary"><icon name="plus"></icon></b-btn> 
          <b-btn variant="primary" @click.stop="add">Add Measure</b-btn>
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
        <b-btn size="sm" variant="danger"  @click.stop="remove(row.item,row.index,$event.target)">
          <icon name="trash"></icon>
        </b-btn>
        </template>
      </b-table>        
      </b-col>
    </b-row>
    <b-modal
      id="modalEdit"
      @ok="handleSubmit"
    >
       <h4 class="my-1 py-1" slot="modal-header" v-if="this.modelData.id=''">Add new measure</h4>
       <b-form  @submit.stop.prevent="handleSubmit">
          <b-form-group            
              label="Measure:" label-for="measureInput"
          >
            <b-form-input id="measureInput"
              type="text" v-model="modelData.name" required
              placeholder="Enter measure name"
            >
          </b-form-input>
        </b-form-group>
       </b-form>
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
      modelData: { id: '', name: '', active: true }
    }
  },
  methods: {
    add () {
      this.clearData()
      this.$root.$emit('show::modal', 'modalEdit')
    },
    edit (item, index, button) {
      this.modelData = item
      this.$root.$emit('show::modal', 'modalEdit', button)
    },
    remove (item, index, button) {
      if (index >= 0) {
        this.items.splice(index, 1)
      }
    },
    clearData () {
      this.modelData = { id: '', name: '', active: true }
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    handleSubmit () {
      if (!this.isValidModelData()) {
        const itemIndex = this.items.findIndex(s => s.id === this.modelData.id)
        if (itemIndex >= 0) {
          this.items[itemIndex] = this.modelData
        } else {
          this.items.push(this.modelData)
        }
      }
    },
    isValidModelData () {
      return this.modelData.name.length > 3
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #e3f2fd;
}
</style>
