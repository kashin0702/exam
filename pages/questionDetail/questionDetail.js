// pages/questionDetail/questionDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    stu_name: ''
  },
  examId: '',
  qId: '',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.examId = options.exam_id
    this.qId = options.question_id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    let queryData = {
      exam_id: this.examId,
      question_id: this.qId
    }
    app._get('client/teacher.question/detail',queryData, res => {
      // console.log(res);
      _this.setData({
        question: res.data.student_question,
        stu_name: res.data.student.realname
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})