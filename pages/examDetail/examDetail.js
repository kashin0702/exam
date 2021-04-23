// pages/examDetail/examDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examName: '',
    questions: []
  },
    examId: '',

  goQuestionDetail(e){
    let _this = this
    let q_id = e.currentTarget.dataset.qid
    wx.navigateTo({
      url: '/pages/questionDetail/questionDetail?exam_id='+_this.examId+'&question_id=' + q_id,
    })
  },

  onLoad: function (options) {
    let _this = this
    _this.examId = options.exam_id
    app._get('client/teacher.exam/detail',{exam_id: _this.examId},res => {
      // console.log(res);
      this.setData({
        examName: res.data.exam.name,
        questions: res.data.question
      })
    })
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