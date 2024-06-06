<template>
  <div>
    <section class="demand-report">
      <h2>Relatório sob Demanda</h2>
      <div class="form-group">
        <label for="startDate">Data de Início:</label>
        <input type="date" id="startDate" v-model="startDate">
      </div>
      <div class="form-group">
        <label for="endDate">Data de Fim:</label>
        <input type="date" id="endDate" v-model="endDate">
      </div>
      <div class="form-group">
        <label for="gasType">Tipo de Gás:</label>
        <select id="gasType" v-model="selectedGas">
          <option value="CO2">CO2</option>
          <option value="NOx">NOx</option>
          <option value="SOx">SOx</option>
        </select>
      </div>
      <button @click="generateReport">Gerar Relatório</button>
    </section>

    <section class="alert-report">
      <h2>Relatório em Resposta a Alertas</h2>
      <button @click="generateAlertReport">Simular Alerta de CO2</button>
    </section>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 v-if="reportGenerated">Relatório Gerado em Resposta a Alerta</h2>
        <h2 v-else>Relatório Gerado</h2>
        <p v-if="reportGenerated">Data de Início: {{ startDate }}</p>
        <p v-if="reportGenerated">Data de Fim: {{ endDate }}</p>
        <p v-if="reportGenerated">Tipo de Gás: {{ selectedGas }}</p>
        <p v-if="alertGenerated">Data e Hora: {{ alertDateTime }}</p>
        <p v-if="alertGenerated">Nível de Emissão: {{ alertLevel }}</p>
        <p v-if="alertGenerated">Localização: {{ alertLocation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      selectedGas: 'CO2',
      reportGenerated: false,
      alertGenerated: false,
      alertDateTime: '',
      alertLevel: '',
      alertLocation: '',
      showModal: false
    };
  },
  methods: {
    generateReport() {
      this.reportGenerated = true;
      this.showModal = true;
    },
    generateAlertReport() {
      this.alertGenerated = true;
      this.alertDateTime = new Date().toLocaleString();
      this.alertLevel = 'Alto';
      this.alertLocation = 'Localização X';
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.demand-report, .alert-report {
  max-width: 4400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #130c0c;
}

.form-group {
  margin-bottom: 10px;
  width: 70%;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #130e0e;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  border-radius: 5px;
  position: relative;
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
</style>
