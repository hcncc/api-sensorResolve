<template>
  <div class="wrapper min-vh-100 d-flex flex-column align-items-center justify-content-center background-image">
    <h1 class="system-title">Bem Vindo</h1>
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Faça login na sua conta</p>

                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Usuário"
                      autocomplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Senha"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <router-link to="/dashboard">
                        <CButton color="primary" class="px-4">
                          Entrar
                        </CButton>
                      </router-link>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Esqueceu sua senha?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>SensorResolve</h2>
                  <p>Monitore a qualidade do ar, tome posições positivas com os dados  e mantenha-se seguro</p>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.background-image {
  background-image: url('/nb.jpg'); 
  background-size: cover;
  background-position: center;
}

.system-title {
  font-size: 3em;
  color: rgb(0, 51, 102); 
  font-weight: bold;
  margin-bottom: 20px;
  transition: color 0.3s ease, text-shadow 0.3s ease; 
}

.system-title:hover {
  color: rgb(0, 153, 204); /* Tom mais claro de azul, representando ar puro e frescor */
  text-shadow: 2px 2px 5px rgba(153, 204, 255, 0.5); /* Sombra suave com cor complementar */
  cursor: pointer; /* Indicando que o elemento é interativo */
}


</style>
