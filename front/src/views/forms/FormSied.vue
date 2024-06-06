<template>
  <div class="form">
    <CInputGroup class="mb-3">
    <CInputGroupText id="basic-addon1">Título</CInputGroupText>
      <CFormInput
        placeholder=""
        aria-label="Username"
        aria-describedby="basic-addon1"
        v-model="title"
      />
    </CInputGroup>
    <CInputGroup class="mb-4">
      <CInputGroupText>Descrição</CInputGroupText>
      <CFormTextarea aria-label="With textarea" v-model="description"></CFormTextarea>
    </CInputGroup>
    <div class="d-grid gap-2">
      <CButton color="primary" @click.prevent.stop="createPost">Postar</CButton>
    </div>
  </div>
  <div class="table">
    <div class="flex items-center justify-center card text-center mt-4" v-for="post in posts" :key="post.id">
      <span>{{ post.title }} </span>
      <button @click.prevent.stop="deletePost(post.id)">delete</button>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        title: "",
        description: "",
        posts: []
      }
    },
    created(){
      this.fetchData()
    },
    methods:{
      async fetchData(){
        try {
          const response = await fetch("http://localhost:3333/post")

          if(!response){
           console.error("Erro na reuisição: ", response) 
          }
          const data = await response.json()

          this.posts = data.posts

        } catch (error) {
          console.error("Erro no processo acima: ", error)
        }
      },
      async createPost(){
        const dataSend = {
           title: this.title,
           description: this.description,
        };

        try {
          const postSend = await fetch("http://localhost:3333/post", {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
              "Content-Type": "application/json",
              "Authorization": ""
            },
          })
          
          if(!postSend){
            console.error("Houve um erro na rquisição: ", postSend)
          }

          const postResponse = await postSend.json()

          console.log("O retorno final: ", postResponse)
          
          this.title = ""
          this.description = ""

          this.fetchData()
        } catch (error) {
          console.error("Erro na requisição: ", error)
        }
      },
      async deletePost(id){
          if(window.confirm("Tem a certeza que deseja eliminar? ")){
            try {
            const deletedRequest = await fetch(`http://localhost:3333/post/${id}`, {
              method: "DELETE"
            })

            await deletedRequest.json()

            alert("Registro eleiminado com sucesso")
            this.fetchData()

          } catch (error) {
            console.error("Erro ao eliminar")
          }
        }
      }
    }
  }
</script>
