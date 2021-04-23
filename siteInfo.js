//上线后修改 这个ENV的值就行了 一般为dev（本地调试） 或test（测试环境） 或 prod（生产环境）
//上线之前 修改下面三个常量 其他不用修改
const ENV = "test";
const VERSION = '1.0.2';
const UPTATE_TIME = '2019-9-27';
const UNIACID = '10001' //集团id
const WXAPP_ID = '10001' //具体门店id 
const NAME = '董鲜生扫码点餐'

let siteinfo = {}
if (ENV == 'prod') {
  siteinfo = {
    'api_root': 'https://mp3.minstech.cn/catering/php/web/',
    'version': VERSION,
  }
} else if (ENV == 'test') {
  siteinfo = {
    'api_root': 'http://mp2test.minstech.cn/ynd/php/',
    'version': "测试环境" + VERSION,
  }
}else if (ENV == 'test2') {
  siteinfo = {
    'api_root': 'http://10.131.3.57/mp2_2/ynd/php/',
    'version': "测试环境" + VERSION,
  }
 } else {
  siteinfo = {
    'api_root': 'http://catering.cn/',
    'version': "开发环境" + VERSION,
  }
}
siteinfo.update_time = UPTATE_TIME
siteinfo.uniacid = UNIACID

module.exports = siteinfo;
