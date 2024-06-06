<template>
  <div>
    <h1>Lista das Empresas</h1>
    <button @click="showModal = true" class="add-button"> <i class="fas fa-plus"></i></button>
    <div v-if="enterprises.length === 0">
      <p>Nenhuma empresa encontrada.</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Tipo</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(enterprise, index) in enterprises" :key="index">
            <td>{{ enterprise.name }}</td>
            <td>{{ enterprise.email }}</td>
            <td>{{ enterprise.phoneNumber }}</td>
            <td>{{ enterprise.industryType }}</td>
            <td>{{ enterprise.address }}</td>
            <td>
              <button @click="deleteEnterprise(enterprise.id, index)" class="delete-button"> <i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal" :class="{ 'show-modal': showModal }">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Adicionar Empresa</h2>
        <form @submit.prevent="addEnterprise">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" v-model="newEnterprise.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="newEnterprise.email" required>
          </div>
          <div class="form-group">
            <label for="phoneNumber">Telefone:</label>
            <input type="tel" id="phoneNumber" v-model="newEnterprise.phoneNumber" required>
          </div>
          <div class="form-group">
            <label for="industryType">Tipo de Empresa:</label>
            <input type="text" id="industryType" v-model="newEnterprise.industryType" required>
          </div>
          <div class="form-group">
            <label for="address">Endereço:</label>
            <input type="text" id="address" v-model="newEnterprise.address" required>
          </div>
          <button type="submit" class="submit-button">Adicionar</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      enterprises: [],
      showModal: false,
      newEnterprise: {
        name: '',
        email: '',
        phoneNumber: '',
        industryType: '',
        address: ''
      }
    };
  },
  created() {
    this.fetchEnterprises();
  },
  methods: {
    async fetchEnterprises() {
      try {
        const response = await fetch("http://localhost:3333/enterprises");
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        const data = await response.json();
        this.enterprises = data.enterprises;
      } catch (error) {
        console.error("Erro na requisição: ", error);
      }
    },
    async addEnterprise() {
      try {
        const response = await fetch("http://localhost:3333/enterprises", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newEnterprise)
        });
        if (!response.ok) {
          throw new Error("Erro ao adicionar empresa");
        }
        const newEnterprise = await response.json();
        this.enterprises.push(newEnterprise);
        this.showModal = false;
        this.resetForm();
      } catch (error) {
        console.error("Erro ao adicionar empresa: ", error);
      }
    },
    async deleteEnterprise(id, index) {
      try {
        const response = await fetch(`http://localhost:3333/enterprises/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error("Erro ao deletar empresa");
        }
        this.enterprises.splice(index, 1);
      } catch (error) {
        console.error("Erro ao deletar empresa: ", error);
      }
    },
    resetForm() {
      this.newEnterprise = {
        name: '',
        email: '',
        phoneNumber: '',
        industryType: '',
        address: ''
      };
    }
  }
};
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.modal {
  display: none; 
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); 
}

.show-modal {
  display: block; 
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  border-radius: 5px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.submit-button:hover {
  background-color: #218838;
}

.add-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 15px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #e74c3c;
}

h1 {
  text-align: center;
}
</style>
