<template>
  <Sidebar></Sidebar>
  <TheHeader></TheHeader>
  <TheMain></TheMain>
</template>

<script>
import TheHeader from "../src/components/TheHeader.vue"
import Sidebar from "../src/components/TheSidebar.vue"
import TheMain from "../src/components/TheMain.vue"
export default {
  name: 'App',
  components: {
    TheHeader, Sidebar, TheMain,
  }
}
</script>

<style>
</style>
