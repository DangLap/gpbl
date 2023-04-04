<template>
  <div class="lap_popup-container" id="form">
    <div class="lap_popup-form">
      <div class="lap_popup__header">
        <div class="title">{{ formTitle }}</div>
        <div class="lap_popup__header__group-btn">
          <div
            @click="btnClosePopupDetailOnClick"
            class="lap_btn-close"
            id="btnClose"
            style="cursor: pointer"
          ></div>
        </div>
      </div>
      <div class="lap_popup__body">
        <div class="lap_popup-group-left">
          <div class="lap_popup-row">
            <div class="lap_input-field lap_employeeCode">
              <div class="lap_label">Mã <span class="required">*</span></div>
              <input
                type="text"
                tabindex="1"
                class="lap_input-info input-required"
                id="txtEmployeeCode"
                ref="txtInputEmployeeCode"
                v-model="employee.employeeCode"
                :class="{ 'input--red': isErrorTxtEmployeeCode }"
                :title="tooltipEmployeeCode"
                @blur="inputTxtEmployeeCodeOnBlur"
              />
            </div>
            <div class="lap_input-field lap_flex-1">
              <div class="lap_label">Tên <span class="required">*</span></div>
              <input
                type="text"
                tabindex="2"
                id="txtFullName"
                class="lap_input-info input-required"
                v-model="employee.fullName"
                :class="{ 'input--red': isErrorTxtFullName }"
                :title="tooltipFullName"
                @blur="inputTxtFullNameOnBlur"
              />
            </div>
          </div>
          <div class="lap_popup-row">
            <div class="lap_input-field lap_flex-1">
              <div class="lap_label">
                Đơn vị <span class="required">*</span>
              </div>
              <!-- <input
                type="text"
                id="txtDepartment"
                tabindex="3"
                class="lap_input-info"
                v-model="employee.departmentId"
                :class="{ 'input--red': isErrorTxtDepartment }"
                :title="tooltipDepartment"
                @blur="inputTxtDepartmentOnBlur"
              /> -->
              <MCombobox
                :error="isErrorTxtDepartment"
                :valueDefault="employee.departmentId"
                :propTabIndex="3"
                :data="[]"
                api="https://localhost:7252/api/Departments"
                propText="DepartmentName"
                propValue="DepartmentId"
                v-model="employee.departmentId"
              >
              </MCombobox>
            </div>
          </div>
          <div class="lap_popup-row">
            <div class="lap_input-field lap_flex-1">
              <div class="lap_label">Chức danh</div>
              <input
                type="text"
                id="txPosition"
                tabindex="4"
                class="lap_input-info"
                v-model="employee.position"
              />
            </div>
          </div>
        </div>
        <div class="lap_popup-group-right">
          <div class="lap_popup-row">
            <div class="lap_input-field dob-input">
              <div class="lap_label">Ngày sinh</div>
              <input
                type="date"
                id="dateOfBirth"
                tabindex="5"
                class="lap_input-info"
                style="text-transform: uppercase"
                :value="convertDateTime(employee.dateOfBirth)"
                @change="dobOnChange($event)"
              />
            </div>
            <div class="lap_input-field flex-1">
              <div class="lap_label">Giới tính</div>
              <div class="lap_input-info lap_gender_radio">
                <div class="lap_radio-contain">
                  <input
                    type="radio"
                    tabindex="6"
                    name="gender"
                    id="male"
                    class="lap_radio"
                    :value=0
                    v-model="employee.gender"
                  />
                  <label for="male">Nam</label>
                </div>
                <div class="lap_radio-contain">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    class="lap_radio"
                    :value=1
                    v-model="employee.gender"
                    tabindex="7"
                  />
                  <label for="female">Nữ</label>
                </div>
                <div class="lap_radio-contain">
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    class="lap_radio"
                    :value=2
                    tabindex="8"
                    v-model="employee.gender"
                  />
                  <label for="other">Khác</label>
                </div>
              </div>
            </div>
          </div>
          <div class="lap_popup-row">
            <div class="lap_input-field lap_national-id">
              <div class="lap_label" title="Số Chứng minh Nhân Dân">
                Số CMND
              </div>
              <input
                tabindex="9"
                id="nationID"
                type="text"
                class="lap_input-info"
                v-model="employee.nationalID"
              />
            </div>
            <div class="lap_input-field lap_flex-1">
              <div class="lap_label">Ngày cấp</div>
              <input
                type="date"
                tabindex="10"
                class="lap_input-info"
                style="text-transform: uppercase"
                :value="convertDateTime(employee.grantedDate)"
              />
            </div>
          </div>
          <div class="lap_popup-row">
            <div class="lap_input-field lap_flex-1">
              <div class="lap_label">Nơi cấp</div>
              <input
                type="text"
                tabindex="11"
                class="lap_input-info"
                v-model="employee.grantedPlace"
              />
            </div>
          </div>
        </div>
        <div class="lap_popup-group_bottom">
          <div class="lap_popup-row">
            <div class="lap_input-field lap_flex-1">
              <div class="lap_label">Địa chỉ</div>
              <input
                type="text"
                tabindex="12"
                class="lap_input-info"
                v-model="employee.address"
              />
            </div>
          </div>
          <div class="lap_popup-row">
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label" title="Điện thoại di dộng">ĐT di động</div>
              <input
                type="text"
                tabindex="13"
                id="txtPhoneNum"
                class="lap_input-info"
                v-model="employee.phoneNumber"
                :class="{ 'input--red': isErrorTxtPhoneNumber }"
                :title="tooltipPhoneNumber"
              />
            </div>
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label" title="Điện thoại cố định">ĐT cố định</div>
              <input
                type="text"
                tabindex="14"
                class="lap_input-info"
                v-model="employee.fax"
                :class="{ 'input--red': isErrorTxtFixedNumber }"
                :title="tooltipFixedNumber"
              />
            </div>
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label">Email</div>
              <input
                type="text"
                tabindex="15"
                id="txtEmail"
                class="lap_input-info"
                v-model="employee.email"
                :class="{ 'input--red': isErrorTxtEmail }"
                :title="tooltipEmail"
              />
            </div>
          </div>
          <div class="lap_popup-row">
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label">Tài khoản ngân hàng</div>
              <input
                type="text"
                tabindex="16"
                class="lap_input-info"
                v-model="employee.bankAccount"
              />
            </div>
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label">Tên ngân hàng</div>
              <input
                type="text"
                tabindex="17"
                class="lap_input-info"
                v-model="employee.bankName"
              />
            </div>
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label">Chi nhánh</div>
              <input
                type="text"
                tabindex="18"
                class="lap_input-info"
                v-model="employee.bankBranch"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="lap_popup__footer">
        <div
          class="btn-second"
          tabindex="21"
          id="btnClose2"
          @click="btnClosePopupDetailOnClick"
        >
          Hủy
        </div>
        <div class="lap_group-btn-right">
          <div
            class="btn-second tabindex2"
            tabindex="19"
            id="btnSave"
            @click="btnSaveOnClick"
          >
            Cất
          </div>
          <div
            class="button"
            tabindex="20"
            @click="btnSaveAndNewOnClick"
            v-if="isShowAddAndnewButton"
          >
            Cất và Thêm
          </div>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------------------- -->
    <div
      class="popup-warning"
      id="popupDeleteWarning"
      v-show="isShowOnChangeDialog"
    >
      <div class="popup-warning__header">
        <div class="popup-warning__header__title">
          {{ Resource.dialog.DialogTitleFormChange }}
        </div>
        <div class="btn-close-popup" id="btnClosePopUp"></div>
      </div>
      <div class="popup-warning__body" id="requiredText">
        <div class="warning-icon"></div>
        <div class="warning-text">
          {{ Resource.dialog.DialogTextFormChange }}
        </div>
      </div>
      <div class="popup-warning__footer">
        <div class="popup-group-btn">
          <div
            class="btn-second"
            id="btnCloseDialog"
            @click="btnCloseDialogOnClick"
          >
            Đóng
          </div>
          <div class="btn-second" @click="closePopUp">Không lưu</div>
          <div class="button" id="btnDelete" @click="btnSaveOnClick">Lưu</div>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------------------------------- -->
    <div class="popup-warning" v-if="isShowValidateWarning">
      <div class="popup-warning__header">
        <div class="popup-warning__header__title">Cảnh báo</div>
        <div
          class="btn-close-popup"
          id="btnClosePopUp"
          @click="btnCloseDeleteMultipleDialogOnClick"
        ></div>
      </div>
      <div
        class="popup-warning__body warning"
        id="requiredText"
        v-if="isErrorTxtFullName"
      >
        <div class="warning-icon"></div>
        <div class="warning-text">Bạn chưa nhập Họ và Tên</div>
      </div>
      <div
        class="popup-warning__body warning"
        id="requiredText"
        v-if="isErrorTxtDepartment"
      >
        <div class="warning-icon"></div>
        <div class="warning-text">Bạn chưa nhập Tên đơn vị</div>
      </div>
      <div
        class="popup-warning__body warning"
        id="requiredText"
        v-if="isErrorTxtPhoneNumber"
      >
        <div class="warning-icon"></div>
        <div class="warning-text">
          Bạn nhập sai định dạng số điện thoại di động
        </div>
      </div>
      <div
        class="popup-warning__body warning"
        id="requiredText"
        v-if="isErrorTxtFixedNumber"
      >
        <div class="warning-icon"></div>
        <div class="warning-text">
          Bạn nhập sai định dạng số điện thoại cố định
        </div>
      </div>
      <div
        class="popup-warning__body warning"
        id="requiredText"
        v-if="isErrorTxtEmail"
      >
        <div class="warning-icon"></div>
        <div class="warning-text">Bạn nhập sai định dạng Email</div>
      </div>
      <div class="popup-warning__footer">
        <div class="popup-group-btn">
          <div
            class="btn-second"
            id="btnCloseDialog"
            @click="btnCloseValidatePopup"
          >
            Đóng
          </div>
        </div>
      </div>
    </div>

    <!-- --------------------------pop-up__response---------------------------------------- -->
    <div class="popup-warning" v-if="isShowPopupResponse">
      <div class="popup-warning__header">
        <div class="popup-warning__header__title">Cảnh báo</div>
        <div
          class="btn-close-popup"
          id="btnClosePopUp"
          @click="btnClosePopupResponseOnClick"
        ></div>
      </div>
      <div class="popup-warning__body warning" id="requiredText">
        <div class="warning-icon"></div>
        <div class="warning-text">
          {{ popupResponse }}
        </div>
      </div>
      <div class="popup-warning__footer">
        <div class="popup-group-btn">
          <div
            class="btn-second"
            id="btnCloseDialog"
            @click="btnClosePopupResponseOnClick"
          >
            Đóng
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Resource from "@/Js/Resource";
export default {
  components: {},
  name: "PopupDetail",
  props: ["employeeSelectedRow", "formMode"],

  data() {
    return {
      popupResponse: "",
      isShowPopupResponse: false,
      employee: {
        gender: 2,
      },
      isErrorTxtEmployeeCode: false,
      isErrorTxtFullName: false,
      isErrorTxtDepartment: false,
      isErrorTxtPhoneNumber: false,
      isErrorTxtFixedNumber: false,
      isErrorTxtEmail: false,
      tooltipFullName: "",
      tooltipEmployeeCode: "",
      tooltipDepartment: "",
      tooltipEmail: "",
      tooltipPhoneNumber: "",
      tooltipFixedNumber: "",
      newCode: "",
      formTitle: "",
      employeeInsert: {},
      isShowPopUpWaring: false,
      newEmployeeCode: "",
      isShowAddAndnewButton: true,
      oldValueString: "",
      isShowOnChangeDialog: false,
      Resource: Resource,
      isShowValidateWarning: false,
      turnGreen: false,
      dateOfBirthInput: null,
    };
  },

  async created() {
    if (this.formMode == "Add") {
      this.getNewCode();
      this.formTitle = "Thêm mới nhân viên";
    } else if (this.formMode == "Edit") {
      this.formTitle = "Sửa thông tin nhân viên";
      this.getEmployeeInfomation();
      this.isShowAddAndnewButton = false;
    } else if (this.formMode == "Dupplicate") {
      await this.getEmployeeInfomation();
      await this.getNewCode();
      this.formTitle = "Nhân bản thông tin nhân viên";
      this.isShowAddAndnewButton = false;
    }
    console.log(this.employeeSelectedRow);
    // this.employee.employeeCode = this.employee.employeeCode;
    // this.employee.department = this.employee.storageRoomName;
  },
  // watch: {
  //   employee: {
  //     handler: function (newInfoEmployee) {
  //       console.log("Dữ liệu của employee đã thay đổi:", newInfoEmployee.departmentId);
  //     },
  //     deep: true
  //   }
  // },
  beforeUpdate() {
    if (this.formMode == "Dupplicate") {
      this.isShowAddAndnewButton = false;
    }
  },

  watch: {
    dateOfBirthInput: function (newValue) {
      console.log(newValue);
    }
  },

  mounted() {
    this.$el.querySelector("input").focus();
    if (this.formMode == "Add" || this.formMode == "Dupplicate") {
      this.getNewCode();
      this.isShowAddAndnewButton = true;
    }
  },

  methods: {
    dobOnChange(event){
      this.employee.dateOfBirth = this.convertDateTime(event.target.value);
      console.log(this.employee.dateOfBirth);
    },

    /**
     * Sự kiện đóng popup cảnh báo
     */
    btnCloseDialogOnClick() {
      this.isShowOnChangeDialog = false;
    },

    /**
     * Sự kiện khi bấm nút cất và thêm mới
     */
    async btnSaveAndNewOnClick() {
      if (this.formMode == "Add") {
        await axios
          .post("https://localhost:7252/api/v1/Employees", this.employee)
          .then((response) => {
            console.log(response);
            this.$emit("insertSuccess");
            this.getNewCode();
            this.$el.querySelector("input").focus();
          })
          .catch(async (error) => {
              // console.log(error);
              // console.log(error.response.data.userMsg);
              // this.popupResponse = (await (error)).response.data.userMsg;
              // this.isShowPopupResponse = true;
              const promiseA = new Promise((resolve) => {
                resolve(error);
              });
              promiseA
                .then((data) => {
                  this.popupResponse = data.response.data.userMsg;
                  console.log(data.response.data.userMsg);
                })
                .then(() => {
                  this.isShowPopupResponse = true;
                  console.log("hello", this.popupResponse);
                });
            });
      }
    },

    /**
     * Đóng pop up validate
     */
    btnCloseValidatePopup() {
      this.isShowValidateWarning = false;
    },

    /**
     * chuyển đổi ngày tháng về đúng định dạng
     */
    convertDateTime(i) {
      if (i) {
        let dob = i.substring(0,10);
        return dob;
      }
    },
    /**
     * Sự kiện lấy thông tin nhân viên được chọn để hiển thị lên trang form
     */
    getEmployeeInfomation() {
      axios
        .get(
          `https://localhost:7252/api/v1/Employees/${this.employeeSelectedRow}`
        )
        .then((response) => {
          this.employee = response.data;
          this.oldValueString = JSON.stringify(response.data);
          // let dob = new Date(this.employee.dateOfBirth)
          //   .toISOString()
          //   .substring(0, 10);
          // this.employee.dateOfBirth = dob;

          // let formatGrantedDate = new Date(this.employee.grantedDate)
          //   .toISOString()
          //   .substring(0, 10);
          // this.employee.grantedDate = formatGrantedDate;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Sự kiện khi blur trường input mã nhân viên
     * author: DTLap (01/03)
     */
    inputTxtEmployeeCodeOnBlur() {
      let employeeCode = this.employee.employeeCode;
      if (employeeCode == undefined) {
        this.isErrorTxtEmployeeCode = true;
        this.tooltipEmployeeCode = "Bạn chưa nhập Mã nhân viên!";
      } else {
        this.isErrorTxtEmployeeCode = false;
        this.tooltipEmployeeCode = "";
      }
    },

    /**
     * Sự kiện lấy mã nhân viên mới:
     * author: Đặng Thế Lập (02/03)
     */
    async getNewCode() {
      await axios
        .get("https://localhost:7252/api/v1/Employees/new-code")
        .then((response) => {
          console.log(response.data);
          this.employee.employeeCode = response.data;
          this.newEmployeeCode = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Sự kiện khi blur trường input họ và tên
     ** author: DTLap (01/03)
     */
    inputTxtFullNameOnBlur() {
      let fullName = this.employee.fullName;
      if (fullName == undefined) {
        this.isErrorTxtFullName = true;
        this.tooltipFullName = "Bạn chưa nhập Họ và tên!";
      } else {
        this.isErrorTxtFullName = false;
        this.tooltipFullName = "";
        console.log(123);
      }
    },

    /**
     * Sự kiện khi blur trường input đơn vị
     ** author: DTLap (01/03)
     *
     */
    inputTxtDepartmentOnBlur() {
      let department = this.employee.department;
      if (department == undefined) {
        this.isErrorTxtDepartment = true;
        this.tooltipDepartment = "Bạn chưa nhập Tên đơn vị!";
      } else {
        this.isErrorTxtDepartment = false;
        this.tooltipDepartment = "";
        console.log(123);
      }
    },

    /**
     * Sự kiện đóng popup
     */
    btnClosePopupResponseOnClick() {
      this.isShowPopupResponse = false;
      console.log(this.popupResponse);
    },

    /**
     * Sự kiện khi click vào nút đóng form
     * author: Đặng Thế Lập
     */
    btnClosePopupDetailOnClick() {
      if (this.oldValueString != JSON.stringify(this.employee)) {
        this.isShowOnChangeDialog = true;
      } else {
        this.closePopUp();
      }
      //Testttttcajscbkadbcjabvkjsbvkdabv kusbksbkjabsnlidnildjv isd sdj dslinkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
      // console.log(this.employee.grantedDate);
    },

    //Đóng popup
    closePopUp() {
      this.$emit("CloseButtonOnClick");
      this.isShowOnChangeDialog = false;
    },

    /**
     * Sự kiện khi nhấn vào nút cất
     * author: Đặng Thế Lập
     */
    async btnSaveOnClick() {
      this.validate();
      console.log(this.employeeInsert);
      //Nếu validate không bị lỗi thì gọi đến api:
      if (!this.isShowValidateWarning) {
        //Nếu là thêm mới thì sẽ gọi đến api thêm mới:
        if (this.formMode == "Add") {
          await axios
            .post("https://localhost:7252/api/v1/Employees", this.employee)
            .then((response) => {
              console.log(response);
              this.successText = "Thêm mới thành công";
              this.$emit("insertSuccess");
              this.$emit("CloseButtonOnClick");
            })
            .catch(async (error) => {
              // console.log(error);
              // console.log(error.response.data.userMsg);
              // this.popupResponse = (await (error)).response.data.userMsg;
              // this.isShowPopupResponse = true;
              const promiseA = new Promise((resolve) => {
                resolve(error);
              });
              promiseA
                .then((data) => {
                  this.popupResponse = data.response.data.userMsg;
                  console.log(data.response.data.userMsg);
                })
                .then(() => {
                  this.isShowPopupResponse = true;
                  console.log("hello", this.popupResponse);
                });
            });
        }
        //Hoặc gọi đến api sửa:
        else if (this.formMode == "Edit") {
          console.log(this.employee);
          axios
            .put("https://localhost:7252/api/v1/Employees", this.employee)
            .then((response) => {
              console.log(response);
              this.successText = "Sửa thành công";
              this.$emit("CloseButtonOnClick");
              this.$emit("updateSuccess");
              this.employee = [];
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(this.employee);
          // let employeeC = {
          //   ...this.employee,
          //   dateOfBirth: this.dateOfBirth ? this.dateOfBirth : null,
          // };
          axios
            .post("https://localhost:7252/api/v1/Employees", this.employee)
            .then((response) => {
              console.log(response);
              this.successText = "Thêm mới thành công";
              this.$emit("insertSuccess");
              this.$emit("CloseButtonOnClick");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },

    validate(){
    //Đóng pop up
    this.isShowOnChangeDialog = false;
      let employeeCode = this.employee.employeeCode;
      let fullName = this.employee.fullName;
      let department = this.employee.departmentId;
      let email = this.employee.email;
      let phoneNumber = this.employee.phoneNumber;
      let fixedNum = this.employee.fixedNumber;

      //format dữ liệu ngày tháng
      // let granted = new Date(this.employee.grantedDate);
      // let day = granted.getDate();
      // let month = granted.getMonth() + 1;
      // let year = granted.getFullYear();
      // if (day < 10) {
      //   day = "0" + day;
      // }
      // if (month < 10) {
      //   month = `0${month}`;
      // }
      // let format4 = day + "-" + month + "-" + year;
      // this.employee.grantedDate = format4;

      // this.employeeInsert.officerCode = this.employeeCode;
      // this.employeeInsert.fullName = this.fullName;
      // this.employeeInsert.email = this.email;
      // this.employeeInsert.phoneNumber = this.phoneNumber;

      let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
      let phoneNumberRegex = /[0-9]{10}/;

      if (employeeCode == undefined) {
        this.isErrorTxtEmployeeCode = true;
        this.tooltipEmployeeCode = "Bạn chưa nhập Mã nhân viên!";
        this.isShowValidateWarning = true;
      }

      if (fullName == undefined) {
        this.isErrorTxtFullName = true;
        this.tooltipFullName = "Bạn chưa nhập họ và tên!";
        this.isShowValidateWarning = true;
      }

      if (department == undefined) {
        this.isErrorTxtDepartment = true;
        this.tooltipDepartment = "Bạn chưa nhập Đơn vị!";
        this.isShowValidateWarning = true;
      }

      if (!emailRegex.test(email) && email) {
        this.isErrorTxtEmail = true;
        this.tooltipEmail = "Bạn nhập sai định dạng Email!";
        this.isShowValidateWarning = true;
      }

      if (!phoneNumberRegex.test(phoneNumber) && phoneNumber) {
        this.isErrorTxtPhoneNumber = true;
        this.tooltipPhoneNumber = "Bạn nhập sai định dạng Số điện thoại!";
        this.isShowValidateWarning = true;
      }

      if (!phoneNumberRegex.test(fixedNum) && fixedNum) {
        this.isErrorTxtFixedNumber = true;
        this.tooltipFixedNumber =
          "Bạn nhập sai định dạng Số điện thoại cố định!";
        this.isShowValidateWarning = true;
      }
  },

  },

};
</script>

<style>
@import url(../css/employee.css);
.warning {
  margin-bottom: 16px !important;
}
</style>