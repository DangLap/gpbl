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
          <div
            class="icon-reload"
            @click="btnReloadOnClick"
            title="Làm mới"
          ></div>
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
                <CheckBox></CheckBox>
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
                class="table__row"
                v-for="item in employeeList"
                :key="item.employeeId"
                @dblclick="rowEdit(item.employeeId)"
              >
                <CheckBoxRow></CheckBoxRow>
                <td class="id">{{ item.employeeCode }}</td>
                <td class="full-name">{{ item.fullName }}</td>
                <td class="gender">Nam</td>
                <td class="dob">01/12/2001</td>
                <td class="national-id">{{ item.nationalID }}</td>
                <td class="position">{{ item.position }}</td>
                <td class="department">{{ item.groupName }}</td>
                <td class="account">{{ item.bankAccount }}</td>
                <td class="bank">{{ item.bankName }}</td>
                <td class="bank-branch">{{ item.bankBranch }}</td>
                <td class="func_item">
                  <div class="edit-field">
                    <div class="btn-edit" @click="rowEdit(item.employeeId)">Sửa</div>
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
            <button class="btnPaging">
              <div id="btnPre" @click="btnPreOnClick"></div>
            </button>
            <button class="btnPaging">
              <div id="btnNext" @click="btnNextOnClick"></div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <PopupDetail
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
          <div class="button red" id="btnDelete" @click="deleteComfirm">Đồng ý</div>
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

    <div class="loading" id="loading" v-show="isLoading">
      <div class="loading__icon"></div>
      <div class="loading__text">Đang xử lý</div>
    </div>

    <div
      id="successToast"
      class="toast-message-container"
      style="display: none"
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

    <div
    v-show="isShowDeleteSuccessToast"
      class="toast-message-container"
    >
      <div class="toast-left">
        <div class="toast-icon"></div>
        <div class="toast-status">{{ Resource.toast.ToastTitle }}</div>
        <div class="toast-text">{{ Resource.toast.ToastDeleteSuccessText }}</div>
      </div>
      <div class="toast-right">
        <div class="undo-text">Hoàn tác</div>
        <div class="close-button"></div>
      </div>
    </div>
  </div>

  <div
    class="editbox"
    :style="{ top: coordinate.y + 'px', left: coordinate.x + 'px' }"
    v-show="isShowContextMenu"
  >
    <div class="editbox__item" @click="editBoxItemOnClick">Nhân bản</div>
    <div class="editbox__item" @click="openDialogDelete">Xóa</div>
    <div class="editbox__item" @click="editBoxItemOnClick">Ngưng sử dụng</div>
  </div>
</template>


<script>
import Resource from "@/Js/Resource";
import CheckBoxRow from "./Base/BaseCheckBoxRow.vue";
import CheckBox from "./Base/BaseCheckBox.vue";
import PopupDetail from "./PopupDetail.vue";
import axios from "axios";
export default {
  name: "TheMain",
  components: {
    PopupDetail,
    CheckBox,
    CheckBoxRow,
  },
  created() {
    this.renderData();
  },
  data() {
    return {
      Resource: Resource,
      isShowPopupDetail: false,
      employeeList: [],
      baseAPI: "https://localhost:7252/api/v1/Employees",
      employeeSelectedID: "",
      isFormAdd: true,
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
    };
  },
  methods: {
    /**
     * Sự kiện xóa và đóng form Xác nhận xóa
     */
     deleteComfirm(){
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
      setTimeout(this.setDeleteSuccessToastOff , 3000);
     },

     /**
      * Tắt toast xóa thành công
      */
     setDeleteSuccessToastOff(){
      this.isShowDeleteSuccessToast = false
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
        this.isDisablePre = true;
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
      if (this.pageNumber > this.totalPage) {
        this.isDisableNext = true;
      } else {
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
        this.isFormAdd = false;
        //Lập đẹp trai
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
      this.isFormAdd = true;
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
  },
};
</script>

<style>
@import url(../css/employee.css);
</style>