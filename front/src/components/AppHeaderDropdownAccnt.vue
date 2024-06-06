<script setup>
import avatar from '@/assets/images/avatars/8.jpg'

const itemsCount = 42
</script>

<template>
  
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >  </CDropdownHeader>
        Conta
     
      <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Menssagem
        <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
      
      </CDropdownItem>
      <CDropdownItem> <CIcon icon="cil-lock-locked" /> Sair</CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
