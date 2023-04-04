<template>
      <div
        class="check-box"
        @click="checkboxOnClick"
        :class="{ active: isChecked }"
      ></div>
  </template>
  <style scoped>
  @import url(../../css/employee.css);
  </style>
  
  <script>
  export default {
      name: "BaseCheckBox",
      props:["checkRow"],
      data() {
          return {
              isChecked: false,
          }
      },
      watch:{
        checkRow: function(newData){
            console.log(newData);
            this.isChecked = newData;
        }
      },
      mounted() {
        this.isChecked = this.checkRow
      },
      methods: {
          checkboxOnClick(){
              this.isChecked = !this.isChecked;
          }
      },
  }
  </script>