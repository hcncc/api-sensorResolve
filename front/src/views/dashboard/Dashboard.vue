<template>
  <div class="card-wrapper">
    <div class="card-container">
      <div class="card" v-for="item in items" :key="item.id" :class="item.class">
        <img :src="item.image" alt="image" class="card-image" />
        <div class="card-content">
          <h2 class="card-title">{{ item.title }}</h2>
          <p class="card-description">{{ item.description }}</p>
          <ul class="card-details">
            <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
          </ul>
        </div>
      </div>
      <div class="card" v-for="item in items" :key="'repeat-' + item.id" :class="item.class">
        <img :src="item.image" alt="image" class="card-image" />
        <div class="card-content">
          <h2 class="card-title">{{ item.title }}</h2>
          <p class="card-description">{{ item.description }}</p>
          <ul class="card-details">
            <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <h3 class="section-title">Gases que Prejudicam a Transição de Energia</h3>
  <div class="carda">
    <img src="@/assets/images/avatars/br.jpg" alt="Imagem representativa dos gases" class="carda-imagee" />
    <div class="carda-content">
      <ul>
        <li>Dióxido de carbono (CO<sub>2</sub>)</li>
        <li>Metano (CH<sub>4</sub>)</li>
        <li>Óxidos de nitrogênio (NO<sub>x</sub>)</li>
        <li>Compostos Orgânicos Voláteis (COV)</li>
      </ul>
    </div>
  </div>


  <h3 class="section-title">Empresas</h3>
<div class="cardaa">
  <div class="cardaa-content">
    <ul>
      <li>Dióxido de carbono (CO<sub>2</sub>)</li>
      <li>Metano (CH<sub>4</sub>)</li>
      <li>Óxidos de nitrogênio (NO<sub>x</sub>)</li>
      <li>Compostos Orgânicos Voláteis (COV)</li>
    </ul>
  </div>
  <img src="@/assets/images/avatars/vc.jpg" alt="Imagem representativa dos gases" class="cardaa-imagee" />
</div>

</template>

<script>
import image1 from '@/assets/images/avatars/br.jpg';
import image2 from '@/assets/images/avatars/vc.jpg';
import image3 from '@/assets/images/avatars/vc.jpg';
import image4 from '@/assets/images/avatars/br.jpg';

export default {
  data() {
    return {
      items: [
        {
          id: 1,
          class: 'card-style-1',
          image: image1,
          title: 'Energia Solar Sustentável',
          description: 'Descubra os benefícios da energia solar e como ela pode ajudar a reduzir sua pegada de carbono.',
          details: [
            'Redução de custos energéticos',
            'Energia renovável e limpa',
            'Baixa manutenção'
          ]
        },
        {
          id: 2,
          class: 'card-style-1',
          image: image2,
          title: 'Monitoramento de Emissões em Tempo Real',
          description: 'Tecnologia avançada para monitorar e reduzir as emissões de gases em indústrias.',
          details: [
            'Dados precisos e em tempo real',
            'Alertas automáticos',
            'Compliance ambiental'
          ]
        },
        {
          id: 3,
          class: 'card-style-2',
          image: image3,
          title: 'Soluções de Eficiência Energética',
          description: 'Implementação de soluções para otimizar o uso de energia em diferentes setores.',
          details: [
            'Auditorias energéticas',
            'Tecnologias de ponta',
            'Sustentabilidade'
          ]
        },
        {
          id: 4,
          class: 'card-style-3',
          image: image4,
          title: 'Gestão de Resíduos Inteligente',
          description: 'Sistemas avançados para gestão eficiente de resíduos sólidos.',
          details: [
            'Reciclagem e reutilização',
            'Monitoramento em tempo real',
            'Soluções sustentáveis'
          ]
        },
      ]
    };
  }
};
</script>

<style scoped>
.card-wrapper {
  overflow: hidden;
  width: 100%;
}

.card-container {
  display: flex;
  animation: scroll 30s linear infinite;
}

.card {
  flex: 0 0 auto;
  width: 100%;
  max-width: 400px;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
  background-color: #fff;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.card-description {
  font-size: 1em;
  margin-bottom: 20px;
}

.card-details {
  list-style-type: none;
  padding: 0;
}

.card-details li {
  font-size: 0.9em;
  margin-bottom: 10px;
}

.card-details li:before {
  content: '✓';
  margin-right: 10px;
}

/* Estilo para o card tipo 1 */
.card-style-1 .card-title {
  color: #4CAF50;
}

.card-style-1 .card-details li:before {
  color: #4CAF50;
}

/* Estilo para o card tipo 2 */
.card-style-2 {
  background-color: #ffeb3b;
  border-color: #fbc02d;
}

.card-style-2 .card-title {
  color: #cddc39;
}

.card-style-2 .card-details li:before {
  color: #cddc39;
}

/* Estilo para o card tipo 3 */
.card-style-3 {
  background-color: #e3f2fd;
  border-color: #90caf9;
}

.card-style-3 .card-title {
  color: #2196f3;
}

.card-style-3 .card-details li:before {
  color: #2196f3;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Card Styles */
.carda{
  width: 100%;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 20px 20px rgba(11, 11, 136, 0.2); /* Adiciona uma sombra leve */
}


.carda-imagee {
  width: 50%; /* Ajustado para ocupar 50% da largura do card */
  height: 500px; /* Altura fixa ajustada */
  object-fit: cover;
  transition: transform 0.3s ease;
}

.carda-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.carda-content h3 {
  margin-top: 0;
  margin-bottom: 8px;
  text-align: center;
}

.carda-content ul {
  padding-left: 20px;
  margin: 0;
}

.carda-content li {
  margin-bottom: 8px;
}

.carda:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.carda:hover .carda-imagee {
  transform: scale(1.05);
}

.section-title {
  text-align: center;
  margin: 20px 0;
   margin-top: 10%;

}
/* '''''''''''''''''''''' */
.cardaa {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 16px;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 20px 20px rgba(11, 11, 136, 0.2);
  overflow: hidden;
}

.cardaa:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.cardaa:hover .cardaa-imagee {
  transform: scale(1.05);
}

.cardaa-imagee {
  border-radius: 100%;
  width: 40%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
  margin-left: 20px;
}

.cardaa-content ul {
  padding-left: 20px;
  margin: 0;
}

.cardaa-content li {
  margin-bottom: 8px;
}

</style>
