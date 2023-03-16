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
              <div class="lap_label">Đơn vị</div>
              <input
                type="text"
                id="txtDepartment"
                tabindex="3"
                class="lap_input-info"
                v-model="employee.department"
                :class="{ 'input--red': isErrorTxtDepartment }"
                :title="tooltipDepartment"
                @blur="inputTxtDepartmentOnBlur"
              />
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
                  />
                  <label for="male">Nam</label>
                </div>
                <div class="lap_radio-contain">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    class="lap_radio"
                  />
                  <label for="female">Nữ</label>
                </div>
                <div class="lap_radio-contain">
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    class="lap_radio"
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
                tabindex="7"
                id="nationID"
                type="text"
                class="lap_input-info"
              />
            </div>
            <div class="lap_input-field lap_flex-1">
              <div class="lap_label">Ngày cấp</div>
              <input
                type="date"
                tabindex="8"
                class="lap_input-info"
                style="text-transform: uppercase"
                v-model="employee.grantedDate"
              />
            </div>
          </div>
          <div class="lap_popup-row">
            <div class="lap_input-field lap_flex-1">
              <div class="lap_label">Nơi cấp</div>
              <input
                type="text"
                tabindex="9"
                class="lap_input-info"
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
                tabindex="10"
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
                tabindex="11"
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
                tabindex="12"
                class="lap_input-info"
                v-model="employee.fixedNumber"
                :class="{ 'input--red': isErrorTxtFixedNumber }"
                :title="tooltipFixedNumber"
              />
            </div>
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label">Email</div>
              <input
                type="text"
                tabindex="13"
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
                tabindex="14"
                class="lap_input-info"
                v-model="employee.bankAccount"
              />
            </div>
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label">Tên ngân hàng</div>
              <input
                type="text"
                tabindex="15"
                class="lap_input-info"
                v-model="employee.bankName"
              />
            </div>
            <div class="lap_input-field lap_flex-2">
              <div class="lap_label">Chi nhánh</div>
              <input
                type="text"
                tabindex="16"
                class="lap_input-info"
                v-model="employee.bankbranch"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="lap_popup__footer">
        <div class="btn-second" tabindex="19" id="btnClose2">Hủy</div>
        <div class="lap_group-btn-right">
          <div
            class="btn-second tabindex2"
            tabindex="17"
            id="btnSave"
            @click="btnSaveOnClick"
          >
            Cất
          </div>
          <div class="button" tabindex="18">Cất và Thêm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PopupDetail",
  props: ["employeeSelectedRow", "formMode"],

  data() {
    return {
      employee: {},
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
    };
  },

  created() {
    if (this.formMode) {
      this.getNewCode();
      this.formTitle = "Thêm mới nhân viên";
    } else {
      this.formTitle = "Sửa thông tin nhân viên";
    }
    this.employee = this.employeeSelectedRow;
    this.employee.employeeCode = this.employee.officerCode;
    // this.employee.department = this.employee.storageRoomName;
  },

  mounted() {
    this.$el.querySelector("input").focus();
  },

  methods: {
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
    getNewCode() {
      axios
        .get("http://localhost:38703/api/Officers/newCode")
        .then((response) => {
          console.log(response.data);
          this.employee.employeeCode = response.data;
          this.employee.officerCode = response.data;
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
     * Sự kiện khi click vào nút đóng form
     * author: Đặng Thế Lập
     */
    btnClosePopupDetailOnClick() {
      this.$emit("CloseButtonOnClick");
    },

    /**
     * Sự kiện khi nhấn vào nút cất
     * author: Đặng Thế Lập
     */
    btnSaveOnClick() {
      /**
       * Lấy ra dữ liệu ở các ô input:
       */

      let employeeCode = this.employee.employeeCode;
      let fullName = this.employee.fullName;
      let department = this.employee.department;
      let email = this.employee.email;
      let phoneNumber = this.employee.phoneNumber;
      let fixedNum = this.employee.fixedNumber;

      // this.employeeInsert.officerCode = this.employeeCode;
      // this.employeeInsert.fullName = this.fullName;
      // this.employeeInsert.email = this.email;
      // this.employeeInsert.phoneNumber = this.phoneNumber;

      let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
      let phoneNumberRegex = /[0-9]{10}/;

      if (employeeCode == undefined) {
        this.isErrorTxtEmployeeCode = true;
        this.tooltipEmployeeCode = "Bạn chưa nhập Mã nhân viên!";
        this.isShowPopUpWaring = true;
      }

      if (fullName == undefined) {
        this.isErrorTxtFullName = true;
        this.tooltipFullName = "Bạn chưa nhập họ và tên!";
        this.isShowPopUpWaring = true;
      }

      if (department == undefined) {
        this.isErrorTxtDepartment = true;
        this.tooltipDepartment = "Bạn chưa nhập Đơn vị!";
        this.isShowPopUpWaring = true;
      }

      if (!emailRegex.test(email) && email) {
        this.isErrorTxtEmail = true;
        this.tooltipEmail = "Bạn nhập sai định dạng Email!";
        this.isShowPopUpWaring = true;
      }

      if (!phoneNumberRegex.test(phoneNumber) && phoneNumber) {
        this.isErrorTxtPhoneNumber = true;
        this.tooltipPhoneNumber = "Bạn nhập sai định dạng Số điện thoại!";
        this.isShowPopUpWaring = true;
      }

      if (!phoneNumberRegex.test(fixedNum) && fixedNum) {
        this.isErrorTxtFixedNumber = true;
        this.tooltipFixedNumber =
          "Bạn nhập sai định dạng Số điện thoại cố định!";
        this.isShowPopUpWaring = true;
      }
      console.log(this.employeeInsert);
      //Nếu validate không bị lỗi thì gọi đến api:
      if (!this.isShowPopUpWaring) {
        console.log(this.employee);
        //Nếu là thêm mới thì sẽ gọi đến api thêm mới:
        if (this.formMode == true) {
          axios
            .post("http://localhost:38703/api/Officers", this.employee)
            .then((response) => {
              console.log(response);
              this.successText = "Thêm mới thành công";
            })
            .catch((error) => {
              console.log(error);
            });
        }
        //Hoặc gọi đến api sửa:
        else {
          axios
            .put(
              "http://localhost:38703/api/Officers/" + this.employee.officerID,
              this.employeeInsert
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
};
</script>

<style>
@import url(../css/employee.css);
</style>