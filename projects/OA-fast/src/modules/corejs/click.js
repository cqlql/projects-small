/*
 * click
 * pc+移动端都适用。 对移动端有优化
 * 兼容性：ie9+
 * */
/* eslint-disable */
export default function click (elem, fn) {

  /* function getAndroidVersion() {
      let v;
      let r = navigator.userAgent.match(/Android (\d.\d)/);
      v = r && r[1];

      getAndroidVersion = function () {
          return v;
      };

      return v;
  } */

  // if ((getAndroidVersion() && getAndroidVersion() < 4.4) || /iPad|iPhone/.test(navigator.userAgent)) {
  // 鉴于华为手机的奇葩性质，Android 7 依然click高亮。。。
  if (/Android|iPad|iPhone/.test(navigator.userAgent)) {
    click = function (elem, fn) {
      let touchcancel

      elem.addEventListener('touchend', touchend, true)
      elem.addEventListener('touchstart', touchstart, true)
      elem.addEventListener('touchmove', touchmove, true)

      function touchend (e) {
        if (touchcancel) return
        fn.call(this, e)
      }

      function touchstart () {
        touchcancel = false
      }

      function touchmove () {
        touchcancel = true
      }

      return function () {
        elem.removeEventListener('touchend', touchend)
        elem.removeEventListener('touchstart', touchstart)
        elem.removeEventListener('touchmove', touchmove)
      }
    }

  }
  else {
    click = function (elem, fn) {
      elem.addEventListener('click', fn)
      return function () {
        elem.removeEventListener('click', fn)
      }
    }
  }

  click(elem, fn)
}
