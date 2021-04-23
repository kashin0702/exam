//首页接口入参 1.correct_status 2.page 
const App = getApp()
const util = require('../../utils/util')
Page({
  data: {
    userInfo: {},
    tabList: ['待批改', '批改中', '已完成'],
    currentPageList: [],  //当前选中列表数据
    currentIndex: 0,  //当前tab索引
  },
  //非渲染层数据 
  pageList: {
    '10': { list: [] }, //待批改
    '15': { list: [] }, //批改中
    '20': { list: [] }  //已完成
  },
  status: '10',     //10,15,20 分频参数
  page: 1,
  total: '',       //总数据条数
  per_page: '',   //每页几条，后端返回
  idx: 0,  //点击的索引

  tabClick(e) {   //把index传过来 根据点击的索引切换不同的列表数据
    let _this = this
    // console.log(e);
    _this.idx = e.currentTarget.dataset.idx
    this.setData({
      currentIndex: _this.idx
    })
    switch (_this.idx) {
      case 0:
        this.status = '10'
        this.setData({
          currentPageList: this.pageList[this.status].list
        })
        break;
      case 1:
        this.status = '15'
        this.setData({
          currentPageList: this.pageList[this.status].list
        })
        break;
      case 2:
        this.status = '20'
        this.setData({
          currentPageList: this.pageList[this.status].list
        })
        break;
    }
  },

  getPages(status) {
    let _this = this
    let pageData = {
      correct_status: status,
      page: this.page
    }
    App._get('client/teacher.exam/lists', pageData, res => {
      let list = res.data.data           //试卷列表
      _this.total = res.data.total       //总条数
      _this.per_page = res.data.per_page //每页几条
      list.forEach(item => {
        // 格式化数组内的时间
        item.start_time = util.formatData(item.start_time, 'yyyy-MM-dd hh:mm')
        item.end_time = util.formatData(item.end_time, 'hh:mm')
      })
      _this.pageList[status].list = list //保存到总数据对象内

    })
  },
  //滚动到底部触发的函数
  getBottomPages() {
    let totalPage = Math.ceil(this.total / this.per_page) //总共有几页
    let _this = this
    //1.当前页小于总页数 加载下一页
    if (_this.page < totalPage) {
      _this.page += 1  //页码加一
      let oldList = _this.data.currentPageList  //获取原数据
      let pageData = {
        correct_status: _this.status,
        page: _this.page
      }
      app._get('client/teacher.exam/lists', { pageData }, res => {
        let list = res.data.data
        list.forEach(item => {
          // 格式化数组内的时间
          item.start_time = util.formatData(item.start_time, 'yyyy-MM-dd hh:mm')
          item.end_time = util.formatData(item.end_time, 'hh:mm')
        })
        // let tempList = 'this.data.pageList[' + _this.status + '].list'
        _this.setData({
          currentPageList: [...oldList, ...list]  //拼接数组
        })
      })
    } else { //2.当前页大于总页数，没有下一页数据了 显示toast
      wx.showToast({
        title: '没有下一页了',
        icon: 'none'
      })
    }

  },
  //去试卷详情页
  goDetail(e) {
    let ex_id = e.currentTarget.dataset.examid
    wx.navigateTo({
      url: '/pages/examDetail/examDetail?exam_id=' + ex_id
    })
  },
  onShow: function () {
    //拿到总数据
    this.getPages('10')
    this.getPages('15')
    this.getPages('20')
    //渲染初始数据
    this.setData({
      currentPageList: this.pageList[this.status].list
    })
  },

  onReachBottom: function () {
    this.getBottomPages()  //滚动到底部时触发
  },

  onLoad: function () {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
})
