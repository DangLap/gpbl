<template>
  <div class="mcombobox">
    <input
      type="text"
      class="combobox__input"
      v-model="textInput"
      @keydown="inputOnKeyDown"
      :tabindex="propTabIndex"
      @input="isShowData = true"
    />
    <button class="combobox__button" @click="btShowDataOnClick"></button>
    <div class="combobox__data" v-show="isShowData">
      <a
        v-for="(item, index) in dataArray"
        :key="index"
        class="combobox__data-item"
        :class="{ 'combobox__data-item--selected': index == indexSelected }"
        @click="onSelectedDataItem(item)"
        v-show="isShowDataItem"
        >{{ propText ? item[propText] : item }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MCombobox",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Boolean, Number, Array],
      default: null,
      required: false,
    },
    error:{
      type: Boolean,
      default: false,
      required: false,
    },

    api: {
      type: String,
      default: null,
      required: false,
    },
    data: {
      type: Array,
      default: null,
      required: false,
    },
    propText: {
      type: String,
      default: null,
      required: false,
    },
    propValue: {
      type: String,
      default: null,
      required: false,
    },
    propTabIndex: {
      type: Number,
      default: null,
      required: false,
    },
    valueDefault: {
      type: String,
      default: null,
      required: false,
    },
  },
  async created() {
    console.log("shshhshs");
    if (this.api) {
      var res = await fetch(this.api);
      let resJson = await res.json();
      this.dataArray = resJson;
      this.rootData = resJson;
    } else if (this.data) {
      this.dataArray = this.data;
      this.rootData = this.data;
    }
  },
 
  watch: {
    data: function (newData) {
      this.dataArray = newData;
    },
    textInput: function (newText) {
      this.dataArray = this.rootData.filter((item) =>
        item[this.propText].includes(newText)
      );
      // this.isShowData = true;
    },
    valueDefault: async function(val) {
      console.log("123213")
      if (this.api) {
      var res = await fetch(this.api);
      let resJson = await res.json();
      this.dataArray = resJson;
      this.rootData = resJson;
    } else if (this.data) {
      this.dataArray = this.data;
      this.rootData = this.data;
    }
      let value='';
      this.dataArray.forEach(item=>{
          if(item[this.propValue] == val) {
          value = item[this.propText];
          }
      })
      console.log(this.dataArray)
      console.log(value)
      this.textInput = value;
      console.log(this.propValue);
      //Update dữ liệu ra component bên ngoài
      this.$emit("update:modelValue", val);
    }
  },
  data() {
    return {
      isShowData: false,
      dataArray: [],
      textInput: "",
      rootData: [],
      indexSelected: null,
      isShowDataItem: true,
    };
  },
  methods: {
    /**
     * Lựa chọn item trong combobox-data khi nhấn phím lên, xuống, enter
     */
    inputOnKeyDown() {
      const keyCode = event.code;
      console.log(keyCode);
      switch (keyCode) {
        case "ArrowDown":
          //Set item đầu tiên hoặc item kế tiếp phía dưới
          this.isShowData = true;
          if (
            this.indexSelected == null ||
            this.indexSelected == this.dataArray.length - 1
          ) {
            this.indexSelected = 0;
          } else {
            this.indexSelected++;
          }
          break;
        case "ArrowUp":
          this.isShowData = true;
          //Set item cuối cùng hoặc item phía trên
          if (!this.indexSelected) {
            this.indexSelected = this.dataArray.length - 1;
          } else {
            this.indexSelected--;
          }
          break;
        case "Enter":
          this.onSelectedDataItem(this.dataArray[this.indexSelected]);
        
          //Thực hiện chọn item
          break;

        default:
          break;
      }
    },

    /**
     * Chọn vào data item sẽ hiện text vào ô input
     */
    onSelectedDataItem(item) {
      //hiển thị text của item vừa chọn lên input
      this.textInput = this.propText ? item[this.propText] : item;
      const value = this.propValue ? item[this.propValue] : item;
      console.log(this.propValue);
      //Update dữ liệu ra component bên ngoài
      this.$emit("update:modelValue", value);

      //Đóng hiển thị data
      this.isShowData = !this.isShowData;
      // this.isShowDataItem = false;
    },

    inputData(item) {
      this.textInput = this.propText ? item[this.propText] : item;
      const value = this.propValue ? item[this.propValue] : item;
      console.log(this.propValue);
      //Update dữ liệu ra component bên ngoài
      this.$emit("update:modelValue", value);
    },
    /**
     * Ẩn hiện các data item
     * author: DTLap
     */
    btShowDataOnClick() {
      this.isShowData = !this.isShowData;
      this.textInput = "";
    },
  },
};
</script>

<style scoped>
@import url(./mcombobox.css);
</style>