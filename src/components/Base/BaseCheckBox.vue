<template>
  <th class="checkbox-cell">
    <div
      class="check-box"
      @click="checkboxOnClick"
      :class="{ active: isChecked }"
    ></div>
  </th>
</template>
<style scoped>
@import url(../../css/employee.css);
</style>

<script>
export default {
    name: "BaseCheckBox",
    data() {
        return {
            isChecked: false,
        }
    },
    methods: {
        checkboxOnClick(){
            this.isChecked = !this.isChecked;
        }
    },
}
</script>