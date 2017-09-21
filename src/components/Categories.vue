<template>
  <b-container>
    <b-row>
      <b-col sm-6>
        <span class="display-4">Categories</span>
      </b-col>
      <b-col sm-6 class="mt-3">
        <b-button-group class="float-right"  @click.stop="add">
          <b-btn variant="primary"><icon name="plus"></icon></b-btn>
          <b-btn variant="primary">Add Category</b-btn>
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
       <h4 class="my-1 py-1" slot="modal-header" v-if="!this.model.id">Add new category</h4>
       <h4 class="my-1 py-1" slot="modal-header" v-if="this.model.id">Edit category</h4>
       <b-form  @submit.stop.prevent="handleSubmit">
          <b-form-group            
              label="category:" label-for="categoryInput"
          >
            <b-form-input
              type="text" v-model="model.name" required
              placeholder="Enter category name"
            >
          </b-form-input>
          <b-form-checkbox v-model="model.active">
            Active
          </b-form-checkbox>
        </b-form-group>
       </b-form>
    </b-modal>
  </b-container>
</template>

<script>

const model = { id: null, name: '', active: true }
const items = [ model ]

export default {
  name: 'categories',
  data () {
    return {
      items,
      model,
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
      filter: null
    }
  },
  methods: {
    add () {
      this.clearData()
      this.$root.$emit('show::modal', 'modalEdit')
    },
    edit (item, index, button) {
      this.model = {...item}
      this.$root.$emit('show::modal', 'modalEdit', button)
    },
    remove (item, index, button) {
      if (item.id) {
        this.$http.delete(`category/${item.id}`)
            .then(response => {
              this.getItems()
            }, error => {
              console.log(error)
            })
      }
    },
    clearData () {
      this.model = model
    },
    getItems () {
      this.$http.get('category')
        .then(response => {
          this.items = response.data.data
        }, error => {
          console.log('error', error)
        })
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    handleSubmit () {
      if (this.isValidModel()) {
        if (!this.model.id) {
          this.$http.post('category', { ...this.model })
            .then(response => {
              this.getItems()
            }, error => {
              console.log(error)
            })
        } else {
          this.$http.put(`category/${this.model.id}`, { ...this.model })
            .then(response => {
              this.getItems()
            }, error => {
              console.log(error)
            })
        }
      } else {
        console.log('invalid')
      }
    },
    isValidModel () {
      return (this.model.name.length > 3)
    }
  },
  created: function () {
    this.getItems()
  }
}
</script>

<style scoped>
.container {
  background-color: #e3f2fd;
}
</style>
