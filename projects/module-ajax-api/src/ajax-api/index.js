
import ajax, { ajaxLogin } from './ajax'

const api = {
  token: '',
  // userId: '',
  // userName: '',
  async login () {
    if (this.token) return
    let info = await ajaxLogin.post('/comm/v1/campustoken', {
      'campus_id_str': '5255421148254165520',
      'no': 'sd001',
      'password': '123456',
      'role': 2
    }

    )
    ajax.token = this.token = info.token
  },
  async getRandomQues (id) {
    await this.login()
    let data = await ajax.get('/pi/v1/exams/do?exam_id=' + id)
    return data.data
  },
  async getExams (userId) {
    await this.login()
    let data = await ajax.get('/pi/v1/exams/list?start=0&size=16&user_id=' + userId)
    return data.data
  }
}

export default api
