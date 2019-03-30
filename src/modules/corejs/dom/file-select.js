let fileElem = null
function getInputFile (options) {
  let { accept, capture } = options
  let file = document.createElement('input')
  file.type = 'file'
  if (accept) file.accept = accept
  if (capture) file.capture = capture

  // 移动端 file 元素必须加到页面中，否则不会触发 onchange 事件
  // 弹出的文件选择框，如果不选文件就不会删除元素，造成页面可能出现很多 input file。目前解决方案：目前只能如果没有删，就利用起来，这样最多也只会添加一个 input file 了
  file.style.display = 'none'
  document.body.appendChild(file)
  fileElem = file
  // setTimeout(() => file.remove(), 60000) // 固定1分钟后删除，好像不靠谱
  return file
}

function removeFileElem () {
  fileElem && fileElem.remove()
  fileElem = null
}

const fileSelect = {
  file (options = {}) {
    return new Promise((resolve, reject) => {
      let { sizeLimit } = options
      let inputFile = getInputFile(options)
      inputFile.onchange = () => {
        let f = inputFile.files[0]

        // 大小限制
        if (sizeLimit && f.size > sizeLimit * 1024 * 1024) {
          let err = new Error(`文件须小于${sizeLimit}M`)
          reject(err)
          return
        }

        resolve(f)
        removeFileElem()
      }
      inputFile.focus = function () {
        console.log('focus')
      }
      inputFile.blur = function () {
        console.log('blur')
      }
      inputFile.click()
    })
  },
  fileReadAsDataURL (file) {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader()
      // 文件读取 完后触发
      fileReader.onload = function (e) {
        resolve(e.target.result)
      }
      // 文件读取为 DataURL，base64
      fileReader.readAsDataURL(file)
    })
  },
  camera (options = { }) {
    return new Promise((resolve, reject) => {
      options.capture = 'camera'
      if (!options.accept) {
        options.accept = 'image/*'
      }
      let inputFile = getInputFile(options)
      inputFile.onchange = () => {
        let f = inputFile.files[0]
        resolve(f)
        removeFileElem()
      }
      inputFile.click()
    })
  }
}

export default fileSelect
