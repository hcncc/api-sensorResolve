<template>
  
    <h1>Graficos de Monitoramento de Gás</h1>
    <div class="card-container">
      <div class="card" v-for="data in sensorData" :key="data.id" :style="{ backgroundColor: color1 }">
        <h2>Emissão de Gases</h2>
        <p>Empresa: N'Gola </p>
        <ul>
          <li>Monóxido de Carbono (CO): {{data.coLevel}}</li>
          <li>Dióxido de Carbono (CO2): {{ data.co2Level }}</li>
          <li>Metano (CH4): {{ data.ch4Level }}</li>
          <li>PM 2.5: {{ data.pm25Level }}</li>
          <li>PM 10: {{ data.pm10Level }}</li>    
          <li>Amônia (NH3): {{ data.nh3Level }}</li>    
          <li>Dióxido de Nitrogênio (NO2): {{ data.nh3Level }}</li>    
          <li>Ozônio (O3): {{ data.ozoneLevel }}</li>    
        </ul>
      </div>
  </div>
</template>

<script >
import {
  CChartLineExample,
  CChartDoughnutExample,
  CChartRadarExample,
  CChartPieExample,
  CChartPolarAreaExample,
} from './index.js'

export default {
  data() {
    return {
      sensorData: []
    }
  },
  created() {
    setInterval(() => {
      this.fetchSensor();
    }, 5000);
  },
  methods: {
    async fetchSensor() {
      try {
        const response = await fetch("http://localhost:3333/sensor/1");
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        const data = await response.json();
        this.sensorData = data.sensorDatas

      } catch (error) {
        console.error("Erro na requisição: ", error);
      }
    },
  }
}

</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: row; 
  justify-content: space-around; 
  flex-wrap: wrap; 
}

.card {
  width: 3300px;
  height: auto;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  color: rgb(7, 1, 1);
  margin-left: -20px;
}

ul li{
  text-decoration: none;
}

h2{
  font-size: 20px;
}
h1{
  font-size: 30px;
}
</style>
