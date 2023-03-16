<template>
    <div class="popup-warning" id="popupWarning">
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
      <div class="popup-warning__body" id="requiredText">
        <div class="warning-icon"></div>
        <div class="warning-text">
          Số điện thoại sai định dạng!
        </div>
      </div>
      <div class="popup-warning__body" id="requiredText">
        <div class="warning-icon"></div>
        <div class="warning-text">
          Email sai định dạng!
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
</template>

<style>
@import url(../css/employee.css);
</style>

<script>
export default {
    name: "popUpWaring",
}
</script>