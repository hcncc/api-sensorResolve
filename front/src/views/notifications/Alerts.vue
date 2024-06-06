<template>
  <div id="app">
    <header>
      <h1>Sistema de Monitoramento de Emissão</h1>
    </header>
    <main>
      <div v-if="alert" class="alert">
        <strong>Alerta!</strong> Alta emissão de gases detectada.
      </div>
      <div class="emission-data">
        <h2>Dados de Emissão</h2>
        <table>
          <thead>
            <tr>
              <th>Gás</th>
              <th>Nível de emissão</th>
              <th>Limite</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, gas) in emissions" :key="gas">
              <td>{{ gas }}</td>
              <td :class="{'high': value > threshold[gas]}">{{ value }}</td>
              <td>{{ threshold[gas] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="simulateData">Simular dados</button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      emissions: {
        CO2: 0,
        NOx: 0,
        SOx: 0,
      },
      alert: false,
      threshold: {
        CO2: 100,
        NOx: 50,
        SOx: 30,
      },
    };
  },
  methods: {
    simulateData() {
      // Simulando dados aleatórios de emissões
      this.emissions.CO2 = Math.floor(Math.random() * 200);
      this.emissions.NOx = Math.floor(Math.random() * 100);
      this.emissions.SOx = Math.floor(Math.random() * 60);
      
      // Verificar se algum valor ultrapassa o limite
      this.checkAlerts();
    },
    checkAlerts() {
      this.alert = false;
      for (const gas in this.emissions) {
        if (this.emissions[gas] > this.threshold[gas]) {
          this.alert = true;
          break;
        }
      }
    },
  },
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
}

header {
  background-color: #4CAF50;
  color: white;
  padding: 20px 0;
  text-align: center;
  font-size: 24px;
}

main {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

.alert {
  color: red;
  background-color: #ffdddd;
  border: 1px solid #f5c6cb;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 18px;
}

.emission-data {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 18px;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #0a0505;
  font-weight: bold;
}

.high {
  color: red;
  font-weight: bold;
}

button {
  padding: 15px 30px;
  font-size: 18px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
