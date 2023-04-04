<template>
  <div class="main">
    <div class="main-container">
      <div class="main__title">
        <div class="main__title-text">NHÂN VIÊN</div>
        <div class="button btn-add" @click="btnAddOnClick" id="btnAdd">
          Thêm mới nhân viên
        </div>
      </div>
      <div class="table__container">
        <div class="search-bar">
          <button
            class="options"
            :class="{ disable: isDisable }"
            :disabled="isDisable"
            @click="btnOptionMenuOnCLick"
          >
            <div class="option__text">Thực hiện hàng loạt</div>
            <div class="options_icon_chevron"></div>
            <div
              class="options__contextmenu"
              v-show="isShowOptionMenu"
              @mouseleave="closeOptionMenu"
            >
              <div
                class="options_contextmenu_item"
                @click="deleteMultipleOnClick"
              >
                Xóa nhiều
              </div>
              <div
                class="options_contextmenu_item"
                @click="btnExportListOnClick"
              >
                Xuất khẩu
              </div>
            </div>
          </button>
          <div
            class="iconExport"
            title="Xuất khẩu"
            @click="btnExportOnClick"
          ></div>
          <div class="btnReload" @click="btnReloadOnClick">
            <div class="icon-reload" title="Làm mới"></div>
          </div>

          <div class="search-textfield">
            <input
              type="text"
              placeholder="Tìm theo mã, tên nhân viên"
              class="input-text"
              title="Tìm theo mã, tên nhân viên"
              @keyup.enter="inputSearchOnChange"
              v-model="keyWord"
            />
            <div class="icon-search"></div>
          </div>
        </div>

        <div class="table-content">
          <table id="table">
            <thead>
              <tr class="title-row">
                <!-- <th class="checkbox-cell">
                  <div class="check-box" @click="checkboxOnClick" :class="{'active':isChecked}"></div>
                </th> -->
                <td class="checkbox-cell checkboxAll">
                  <CheckBoxRow
                    @click="checkboxAllOnClick"
                    :checkRow="ischeckAllParent"
                  ></CheckBoxRow>
                </td>
                <th class="id">MÃ NHÂN VIÊN</th>
                <th class="full-name">TÊN NHÂN VIÊN</th>
                <th class="gender">GIỚI TÍNH</th>
                <th class="dob">NGÀY SINH</th>
                <th class="national-id" title=" Số Chứng minh Nhân dân">
                  SỐ CMND
                </th>
                <th class="position">CHỨC DANH</th>
                <th class="department">TÊN ĐƠN VỊ</th>
                <th class="account">SỐ TÀI KHOẢN</th>
                <th class="bank">TÊN NGÂN HÀNG</th>
                <th class="bank-branch" title=" Chi nhánh Tài khoản Ngân hàng">
                  CHI NHÁNH TK NGÂN HÀNG
                </th>
                <th class="func">CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              <tr
                :class="{
                  isChooseRow: choosenItemArray.includes(item.employeeId),
                }"
                class="table__row"
                v-for="item in employeeList"
                :key="item.employeeId"
                @dblclick="rowEdit(item.employeeId)"
              >
                <td class="checkbox-cell fixedCol">
                  <CheckBoxRow
                    @click="checkboxRowOnClick(item.employeeId)"
                    
                    :checkRow="choosenItemArray.includes(item.employeeId)"
                  ></CheckBoxRow>
                </td>
                <td class="id fixedCol">{{ item.employeeCode }}</td>
                <td class="full-name fixedCol">{{ item.fullName }}</td>
                <td class="gender">{{ getGenderName(item.gender) }}</td>
                <td class="dob">{{ convertDateTime(item.dateOfBirth) }}</td>
                <td class="national-id">{{ item.nationalID }}</td>
                <td class="position">{{ item.position }}</td>
                <td class="department">
                  {{ getDepartmentName(item.departmentId) }}
                </td>
                <td class="account">{{ item.bankAccount }}</td>
                <td class="bank">{{ item.bankName }}</td>
                <td class="bank-branch">{{ item.bankBranch }}</td>
                <td class="func_item fixedCol">
                  <div class="edit-field">
                    <div class="btn-edit" @click="rowEdit(item.employeeId)">
                      Sửa
                    </div>
                    <div
                      class="edit-chevron"
                      id="chevronEdit"
                      @click="openContextMenu($event, item.employeeId)"
                    ></div>
                    <div
                      class="dropdown-region"
                      id="edit"
                      style="display: none"
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="paging-navigation">
          <div class="pagesize-text">
            Tổng số: <span id="pagesize">{{ totalCount }}</span> bản ghi
          </div>
          <div class="paging-right">
            <div class="pageSizeText">Số bản ghi/Trang</div>
            <div
              class="pagesize-dropdown paging-margin"
              @click="pagingChevronOnClick"
            >
              <div
                class="pagesize-dropdown__text"
                id="pageSize"
                style="cursor: pointer"
              >
                {{ pageSize }}
              </div>
              <div class="pagesize-dropdown__chevron" id="chevronPaging"></div>
              <div
                @mouseleave="closePagingMenu"
                class="dropdown-container"
                id="pagingDropdown"
                v-show="isShowPagingDropDown"
              >
                <div
                  class="dropdown__item"
                  id="twenty"
                  @click="pageSizeNumberOnClick(20)"
                >
                  20
                </div>
                <div
                  class="dropdown__item"
                  id="thirty"
                  @click="pageSizeNumberOnClick(30)"
                >
                  30
                </div>
                <div
                  class="dropdown__item"
                  id="fourty"
                  @click="pageSizeNumberOnClick(40)"
                >
                  40
                </div>
              </div>
            </div>
            <div class="current--page">
              <span>{{ pageNumber }}</span> - <span>{{ totalPage }}</span> Trang
            </div>
            <button class="btnPaging" :disabled="isDisablePre">
              <div
                id="btnPre"
                :class="{ disableBtnPre: isDisablePreBtn }"
                @click="btnPreOnClick"
              ></div>
            </button>
            <button class="btnPaging" :disabled="isDisableNextBtn">
              <div
                id="btnNext"
                :class="{ disableBtnNext: isDisableNextBtn }"
                @click="btnNextOnClick"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <PopupDetail
      @insertSuccess="showToastInsertSuccess"
      @updateSuccess="showToastUpdateSuccess"
      @CloseButtonOnClick="closeForm"
      v-if="isShowPopupDetail"
      :employeeSelectedRow="employeeSelectedID"
      :formMode="isFormAdd"
    ></PopupDetail>

    <div class="popup-warning" id="popupWarning" style="display: none">
      <div class="popup-warning__header">
        <div class="popup-warning__header__title">Xảy ra lỗi!</div>
        <div class="btn-close-popup" id="btnClosePopUp"></div>
      </div>
      <div class="popup-warning__body" id="requiredText">
        <div class="warning-icon"></div>
        <div class="warning-text">
          Bạn chưa nhập đủ thông tin vào các trường bắt buộc!
        </div>
      </div>
      <div
        class="popup-warning__body"
        id="expressionPhoneNum"
        style="display: none"
      >
        <div class="warning-icon"></div>
        <div class="warning-text">Số điện thoại không đúng định dạng!</div>
      </div>
      <div
        class="popup-warning__body"
        id="expressionEmail"
        style="display: none"
      >
        <div class="warning-icon"></div>
        <div class="warning-text">Email không đúng định dạng!</div>
      </div>
      <div class="popup-warning__footer">
        <div class="popup-group-btn">
          <div class="button red" id="btnCloseDialog">Đóng</div>
        </div>
      </div>
    </div>

    <div
      class="popup-warning"
      id="popupDeleteWarning"
      v-show="isShowDeleteDialog"
    >
      <div class="popup-warning__header">
        <div class="popup-warning__header__title">
          {{ Resource.dialog.DialogTitleDeleteForm }}
        </div>
        <div class="btn-close-popup" id="btnClosePopUp"></div>
      </div>
      <div class="popup-warning__body" id="requiredText">
        <div class="warning-icon"></div>
        <div class="warning-text">
          {{ Resource.dialog.DialogTextDeleteForm }}
        </div>
      </div>
      <div class="popup-warning__footer">
        <div class="popup-group-btn">
          <div class="button red" id="btnDelete" @click="deleteConfirm">
            Đồng ý
          </div>
          <div
            class="btn-second"
            id="btnCloseDialog"
            @click="btnCloseDeleteDialogOnClick"
          >
            Đóng
          </div>
        </div>
      </div>
    </div>

    <div
      class="popup-warning"
      id="popupDeleteMultipleWarning"
      v-show="isShowDeleteMultipleDialog"
    >
      <div class="popup-warning__header">
        <div class="popup-warning__header__title">
          {{ Resource.dialog.DialogTitleDeleteMultipleForm }}
        </div>
        <div
          class="btn-close-popup"
          id="btnClosePopUp"
          @click="btnCloseDeleteMultipleDialogOnClick"
        ></div>
      </div>
      <div class="popup-warning__body" id="requiredText">
        <div class="warning-icon"></div>
        <div class="warning-text">
          {{ Resource.dialog.DialogTextDeleteMultipleForm }}
        </div>
      </div>
      <div class="popup-warning__footer">
        <div class="popup-group-btn">
          <div class="button red" id="btnDelete" @click="deleteMultipleComfirm">
            Đồng ý
          </div>
          <div
            class="btn-second"
            id="btnCloseDialog"
            @click="btnCloseDeleteMultipleDialogOnClick"
          >
            Đóng
          </div>
        </div>
      </div>
    </div>

    <div class="loading" id="loading" v-show="isLoading">
      <div class="loading__icon"></div>
      <div class="loading__text">Đang xử lý</div>
    </div>

    <div
      id="successToast"
      class="toast-message-container"
      style="display: none"
      v-show="isShowSuccessToast"
    >
      <div class="toast-left">
        <div class="toast-icon"></div>
        <div class="toast-status">Thành công!</div>
        <div class="toast-text">Cất thành công.</div>
      </div>
      <div class="toast-right">
        <div class="undo-text">Hoàn tác</div>
        <div class="close-button"></div>
      </div>
    </div>

    <div v-show="isShowDeleteSuccessToast" class="toast-message-container">
      <div class="toast-left">
        <div class="toast-icon"></div>
        <div class="toast-status">{{ Resource.toast.ToastTitle }}</div>
        <div class="toast-text">
          {{ Resource.toast.ToastDeleteSuccessText }}
        </div>
      </div>
      <div class="toast-right">
        <div class="undo-text">Hoàn tác</div>
        <div class="close-button"></div>
      </div>
    </div>
    <div
      @mouseleave="editboxOnMouseLeave"
      class="editbox"
      :style="{ top: coordinate.y + 'px', left: coordinate.x + 'px' }"
      v-show="isShowContextMenu"
    >
      <div class="editbox__item" @click="duplicateRow">Nhân bản</div>
      <div class="editbox__item" @click="openDialogDelete">Xóa</div>
      <div class="editbox__item1 disable" @click="editBoxItemOnClick">
        Ngưng sử dụng
      </div>
    </div>
  </div>
</template>


<script>
import Resource from "@/Js/Resource";
import CheckBoxRow from "./Base/BaseCheckBoxRow.vue";
// import CheckBox from "./Base/BaseCheckBox.vue";
import PopupDetail from "./PopupDetail.vue";
import axios from "axios";
export default {
  name: "TheMain",
  components: {
    PopupDetail,
    // CheckBox,
    CheckBoxRow,
  },
  created() {
    this.renderData();
    this.renderDepartment();
    this.isDisablePre = true;
    this.isDisablePreBtn = true;
  },
  data() {
    return {
      Resource: Resource,
      isShowPopupDetail: false,
      employeeList: [],
      baseAPI: "https://localhost:7252/api/v1/Employees",
      employeeSelectedID: "",
      isFormAdd: "",
      isShowPagingDropDown: false,
      pageSize: 20,
      pageNumber: 1,
      isDisablePre: false,
      isDisableNext: false,
      totalPage: 1,
      totalCount: 0,
      isLoading: false,
      keyWord: "",
      isChecked: false,
      isShowContextMenu: false,
      coordinate: { y: -1000, x: -2000 },
      isShowDeleteDialog: false,
      selectedDeleteEmployeeID: "",
      isShowDeleteSuccessToast: false,
      isShowSuccessToast: false,
      departments: [],
      choosenItemArray: [],
      ischeckAll: false,
      ischeckRow: false,
      choosenRowColor: false,
      ischeckAllParent: false,
      isShowOptionMenu: false,
      isDisable: true,
      isShowDeleteMultipleDialog: false,
      isDisablePreBtn: false,
      isDisableNextBtn: false,
    };
  },
  watch: {
    pageNumber: function (newValue) {
      if (newValue == 1) {
        this.isDisablePre = true;
        this.isDisablePreBtn = true;
      } else {
        this.isDisablePre = false;
        this.isDisablePreBtn = false;
      }
      if (newValue == this.pageSize - 1) {
        this.isDisableNextBtn = true;
        this.isDisableNext = true;
      } else {
        this.isDisableNextBtn = false;
        this.isDisableNext = false;
      }
    },
  },
  methods: {
    /**
     * Sự kiện click vào nút xuất khẩu theo danh sách đã chọn
     */
    btnExportListOnClick() {
      axios
        .post(
          `https://localhost:7252/api/v1/Employees/export-excel-selected-list?employeeIdList`,
          this.choosenItemArray.join(),
          {
            headers: { "Content-Type": "application/json" },
            responseType: "blob",
          }
        )
        .then((response) => {
          console.log(response);
          const url = URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `employeeList.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Sự kiện gọi api xóa nhiều
     */
    deleteMultipleComfirm() {
      axios
        .post(
          `https://localhost:7252/api/v1/Employees/deleteMultiple?employeeString=${this.choosenItemArray.join()}`
        )
        .then((response) => {
          console.log(response);
          this.renderData();
        })
        .catch((error) => {
          console.log(error);
        });
      this.isShowDeleteMultipleDialog = false;
      this.isShowDeleteSuccessToast = true;
      setTimeout(this.setDeleteSuccessToastOff, 3000);
    },

    /**
     * Sự kiện khi click vào nút xóa nhiều
     */
    deleteMultipleOnClick() {
      this.isShowDeleteMultipleDialog = true;
    },

    btnCloseDeleteMultipleDialogOnClick() {
      this.isShowDeleteMultipleDialog = false;
    },

    closePagingMenu() {
      this.isShowPagingDropDown = false;
    },

    editboxOnMouseLeave() {
      this.isShowContextMenu = false;
    },

    /**
     * Sự kiện mở ra option menu
     */
    btnOptionMenuOnCLick() {
      this.isShowOptionMenu = !this.isShowOptionMenu;
      console.log(1);
    },

    /**
     * Sự kiện đóng optionMenu
     */
    closeOptionMenu() {
      this.isShowOptionMenu = false;
    },

    /**
     * Sự kiện khi click vào nút xuất khẩu
     */
    btnExportOnClick() {
      axios
        .get(
          `https://localhost:7252/api/v1/Employees/export-excel?keyWord=${this.keyWord}&pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`,
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response);
          const url = URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `employee.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //test
    checkboxAllOnClick() {
      // this.ischeckAllParent = !this.ischeckAllParent;
      this.ischeckAll = !this.ischeckAll;
      if (this.ischeckAll == true) {
        this.choosenItemArray = [];
        for (const idItem of this.employeeList) {
          this.choosenItemArray.push(idItem.employeeId);
        }
      } else {
        this.choosenItemArray = [];
      }
      if (this.choosenItemArray.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
      console.log(this.choosenItemArray);
    },

    /**
     * click vào checkbox sẽ truyền id của dòng đó vào trong mảng được chọn
     * @param {id}
     */
    checkboxRowOnClick(id) {
      if (this.choosenItemArray.includes(id)) {
        this.choosenItemArray = this.choosenItemArray.filter(
          (item) => item != id
        );
      } else {
        this.choosenItemArray.push(id);
      }
      console.log(this.choosenItemArray.join());
      if (this.choosenItemArray.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
      if (this.choosenItemArray.length == this.pageSize) {
        this.ischeckAllParent = true;
      } else {
        this.ischeckAllParent = false;
      }
    },

    /**
     * Cũng là show toast nhưng là sửa thành công
     */
    showToastUpdateSuccess() {
      this.isShowSuccessToast = true;
      setTimeout(() => {
        this.isShowSuccessToast = false;
      }, 3000);
      this.renderData();
    },

    /**
     * Show toast thêm mới thành công
     */
    showToastInsertSuccess() {
      this.isShowSuccessToast = true;
      setTimeout(() => {
        this.isShowSuccessToast = false;
      }, 3000);
      this.renderData();
    },

    /**
     * Sự kiện xóa và đóng form Xác nhận xóa
     */
    deleteConfirm() {
      axios
        .delete(
          `https://localhost:7252/api/v1/Employees/${this.selectedDeleteEmployeeID}`
        )
        .then((response) => {
          console.log(response);
          this.renderData();
        })
        .catch((error) => {
          console.log(error);
        });
      this.isShowDeleteDialog = false;
      this.isShowDeleteSuccessToast = true;
      setTimeout(this.setDeleteSuccessToastOff, 3000);
    },

    /**
     * Tắt toast xóa thành công
     */
    setDeleteSuccessToastOff() {
      this.isShowDeleteSuccessToast = false;
    },

    /**
     * Sự kiện mở dialog xóa
     */
    openDialogDelete() {
      this.isShowDeleteDialog = true;
      this.isShowContextMenu = false;
    },

    /**
     * Sự kiện Đóng dialog xóa
     * author: DTLap (09/03)
     */

    btnCloseDeleteDialogOnClick() {
      this.isShowDeleteDialog = false;
      this.selectedDeleteEmployeeID = "";
    },

    /**
     * Sự kiện khi click vào item trong context Menu
     * author: DTLap (09/03)
     */
    editBoxItemOnClick() {
      this.isShowContextMenu = false;
    },

    /**
     * Sự kiện mở ra context menu:
     * author: DTLap (09/03)
     */
    openContextMenu(e, Id) {
      let { x, y } = e.target.getBoundingClientRect();
      this.isShowContextMenu = true;
      this.coordinate.x = x - 90;
      this.coordinate.y = y + 10;
      this.selectedDeleteEmployeeID = Id;
    },

    /**
     * Sự kiện khi click vào checkbox
     * author:DTLap(02/03)
     */
    checkboxOnClick() {
      this.isChecked = !this.isChecked;
    },

    /**
     * Sự kiện tìm kiếm nhân viên theo mã, tên
     * author: DTlap (02/03)
     */
    inputSearchOnChange() {
      this.isLoading = true;
      axios
        .get(
          `https://localhost:7252/api/v1/Employees?keyWord=${this.keyWord}&pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
        )
        .then((response) => {
          console.log(response);
          this.employeeList = response.data.data;
          console.log(this.employeeList);
          this.totalPage = Math.ceil(response.data.totalRecord / this.pageSize);
          this.totalCount = response.data.totalRecord;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Tải lại trang
     * author: DTLap(02/03)
     */
    btnReloadOnClick() {
      this.pageNumber = 1;
      this.renderData();
      this.keyWord = "";
    },

    /**
     * Chuyển đến trang trước:
     * author: DTLap (02/03)
     */
    btnPreOnClick() {
      if (this.pageNumber == 1) {
        console.log();
      } else {
        this.pageNumber -= 1;
        this.renderData();
      }
      console.log(this.pageNumber);
    },
    /**
     * chuyển đến trang sau
     * author: DTLap (02/03)
     */
    btnNextOnClick() {
      if (this.pageNumber == this.totalPage) {
        this.isDisableNextBtn = true;
      } else {
        this.isDisableNextBtn = false;
        this.pageNumber += 1;
        this.renderData();
      }
      console.log(this.pageNumber);
    },

    /**
     * Sự kiện mở paging dropdown
     * author: DTLap (02/03)
     */
    pagingChevronOnClick() {
      this.isShowPagingDropDown = !this.isShowPagingDropDown;
    },

    /**
     * Sự kiện gán kích cỡ trang
     * author: DTLap (02/03)
     */
    pageSizeNumberOnClick(number) {
      this.pageSize = number;
      this.renderData();
      this.isShowPagingDropDown = false;
      this.isShowPagingDropDown = false;
    },

    /**
     * Sự kiện lấy data từ api
     ** author: DTLap (01/03)
     *
     */
    renderData() {
      this.isLoading = true;
      axios
        .get(
          `https://localhost:7252/api/v1/Employees?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
        )
        .then((response) => {
          console.log(response);
          this.employeeList = response.data.data;
          console.log(this.employeeList);
          this.totalPage = Math.ceil(response.data.totalRecord / this.pageSize);
          this.totalCount = response.data.totalRecord;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Sự kiện khi doubleclick vào một dòng sẽ truyền dữ liệu của dòng đó vè form
     ** author: DTLap (01/03)
     *
     */
    rowEdit(itemID) {
      try {
        this.isShowPopupDetail = true;
        this.employeeSelectedID = itemID;
        this.isFormAdd = "Edit";
        //Lập đẹp trai
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiên khi nhấn nút nhân bản sẽ truyền id vào form
     */
    duplicateRow() {
      try {
        this.isShowPopupDetail = true;
        this.employeeSelectedID = this.selectedDeleteEmployeeID;
        console.log(this.employeeSelectedID);
        this.isShowContextMenu = false;
        this.isFormAdd = "Dupplicate";
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện ấn nút thêm mới sẽ hiện form chi tiết nhân viên
     ** author: DTLap (01/03)
     *0
     */
    btnAddOnClick() {
      this.isShowPopupDetail = true;
      this.isFormAdd = "Add";
    },

    /**
     * Sự kiện đóng form thêm mới
     ** author: DTLap (01/03)
     *
     */
    closeForm() {
      this.isShowPopupDetail = false;
      this.employeeSelected = {};
    },

    /**
     * lấy dữ liệu tất cả phòng ban
     */
    renderDepartment() {
      axios
        .get(`https://localhost:7252/api/Departments`)
        .then((response) => {
          console.log(response.data);
          this.departments = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * chuyển đổi ngày tháng về đúng định dạng
     */
    convertDateTime(i) {
      let granted = new Date(i);
      let day = granted.getDate();
      let month = granted.getMonth() + 1;
      let year = granted.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      let format = day + "/" + month + "/" + year;
      return format;
    },

    /**
     * Hiển thị tê phòng ban
     * @param {id phòng ban} id
     */
    getDepartmentName(id) {
      let name = this.departments.filter((item) => item.DepartmentId == id)[0]
        ?.DepartmentName;
      return name;
    },

    /**
     * Hiển thị text giới tính
     * @param {int giới tính} i
     */
    getGenderName(i) {
      if (i == 0) {
        return "Nam";
      }
      if (i == 1) {
        return "Nữ";
      }
      if (i == 2) {
        return "Khác";
      }
    },
  },
};
</script>

<style>
@import url(../css/employee.css);
.checkboxAll {
  background-color: #f5f5f5;
}

.isChooseRow {
  background-color: #e7f5ec !important;
}

.fixedCol {
  background-color: #fff;
}

.isChooseRow .fixedCol {
  background-color: #e7f5ec;
}

.btnExport {
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #cecece;
}

.iconExport {
  background: url("../assets/img/Sprites.64af8f61.svg") no-repeat -705px -202px;
  width: 23px;
  height: 20px;
  margin-right: 16px;
  cursor: pointer;
}

.iconExport:hover {
  background: url("../assets/img/Sprites.64af8f61.svg") no-repeat -705px -258px;
  width: 23px;
  height: 20px;
}

.btnReload {
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 9px;
  border-radius: 4px;
}

.disable {
  color: #cecece;
  
}

/* .disable:hover {
  background-color: #fff;
  color: #cecece;
} */

.options {
  height: 36px;
  box-sizing: border-box;
  border: 2px solid #babec5;
  border-radius: 50px;
  position: absolute;
  left: 0px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  cursor: pointer;
  background-color: #fff;
}
.option__text {
  font-size: 14px;
  color: #616161;
  margin-right: 16px;
}

.options_icon_chevron {
  background: url("../assets/img/Sprites.64af8f61.svg") no-repeat -1756px -317px;
  width: 8px;
  height: 5px;
  padding-right: 16px;
}

.options__contextmenu {
  position: absolute;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  top: 38px;
  left: 0px;
  z-index: 99;
  background-color: #fff;
  box-shadow: 5px 5px 5px rgb(238, 237, 237);
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.options_contextmenu_item {
  padding-left: 8px;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #616161;
  cursor: pointer;
}

.options_contextmenu_item:hover {
  background-color: #e0e0e0;
  color: #01ab72;
}

.disable {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.disableBtnPre {
  background: url("../assets/img/Sprites.64af8f61.svg") no-repeat -36px -409px !important;
  width: 8px;
  height: 14px;
}

.disableBtnNext {
  background: url("../assets/img/Sprites.64af8f61.svg") no-repeat -84px -409px !important;
  width: 8px;
  height: 14px;
}

.editbox__item1 {
  height: 32px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  font-size: 12px;
}
</style>