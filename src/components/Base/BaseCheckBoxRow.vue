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
            this.isChecked = newData;
        }
      },
      methods: {
          checkboxOnClick(){
              this.isChecked = !this.isChecked;
          }
      },
  }
  </script>