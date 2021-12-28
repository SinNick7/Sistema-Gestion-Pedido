<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-data-table :headers="headers" :items="totalOrders" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>ORDERS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="500px">

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cliente"
                        label="Customer"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.estado"
                        label="Estado"
                      ></v-text-field>
                    </v-col>


                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<!--
    <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
-->
<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    snackbar: false,
    snackbarMessage: "",
    headers: [
      { text: "N°", value: "id" },
      { text: "Customer", value: "cliente" },
      { text: "Status", value: "estado" },
      { text: "Date", value: "fecha" },
      { text: "Total", value: "totalImpuesto" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    totalOrders: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      cliente: "",
      estado: "",
      totalImpuesto: "",
    },
    defaultItem: {
      id: "",
      cliente: "",
      estado: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("https://backend-sistema-pedidos.herokuapp.com/order/list").then((result) => {
        const ordersResponse = result.data;
        ordersResponse.map((order) => {
          this.totalOrders.push({
            id: order.id,
            estado: order.estado,
            cliente:  order.cliente,
            fecha: order.fecha,
            totalImpuesto: order.totalImpuesto,
          });
        });
      });
    },

    editItem(item) {
      console.log("edit")
      this.editedIndex = this.totalOrders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        const { id, clienteEdit, estadoEdit, fechaEdit, totalImpuestoEdit } = this.editedItem;
        const orderEdit = {
          cliente: clienteEdit,
          estado: estadoEdit,
          fecha: fechaEdit,
          totalImpuesto: totalImpuestoEdit,
        };
        axios
          .put("https://backend-sistema-pedidos.herokuapp.com/order/update" + id, orderEdit)
          .then((result) => {
            console.log("result", result);
            this.snackbarMessage = "Usuario actualizado correctamente";
            this.snackbar = true;
          })
          .catch(function(error) {
            console.log(error);
          });
        //Obtener en que posiicon del arreglo esta el usuario actualizaod
        const indexUserList = this.totalUsuarios.findIndex(
          (arr) => arr.id == id
        );
        //Eliminar ese usuario
        this.totalUsuarios.splice(indexUserList, 1);
        //Insertar el usuario editado al inicio
        this.totalUsuarios.unshift(this.editedItem);
      } else {
        //Crear usuario
      }

      this.close();
    },

  },
};
</script>

<style></style>
