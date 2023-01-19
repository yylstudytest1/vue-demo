// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Global from './pages/global.vue'
import splitPane from 'vue-splitpane'
import Axios from "axios"
//将axios挂载到原型上
Vue.prototype.$axios = Axios;

/*****全局引入vue-video-player,安装vue-video-player可以直接使用低版本的video.js，建议直接安装高版本video.js效果更好****/
// require('video.js/dist/video-js.css');
// require('vue-video-player/src/custom-theme.css');
// import VideoPlayer from 'vue-video-player'
// //增加hls支持
// import 'videojs-contrib-hls';
// Vue.use(VideoPlayer);


Vue.component('split-pane', splitPane);

Vue.config.productionTip = false
Vue.prototype.GLOBAL = Global;


Vue.use(ElementUI);
Vue.use(VueResource);

/**********************************axios拦截器添加token*******************************/
Axios.interceptors.request.use(config => {
  if (localStorage.token) { //判断token是否存在
    config.headers.token = localStorage.token;  //将token设置成请求头
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

/****************************全局函数-start************************/
Vue.prototype.dateFormatDay = function(date){
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate()< 10 ? '0' + date.getDate() : date.getDate() + '';
  return Y+M+D;
};
//date类型转“yy_mm_dd_hh_mm_ss”
Vue.prototype.dateFormatyyyymmddhhmmssWithUnderline = function(date){
  let Y = date.getFullYear() + '_';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '_';
  let D = date.getDate()< 10 ? '0' + date.getDate() : date.getDate() + '';
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + '_';
  let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + '_';
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y+M+D + '_' + hh + mm + ss;
};
Vue.prototype.showSuccessMsg = function(msg) {
  this.$message({
    message: msg,
    type: 'success'
  });
};
Vue.prototype.showFailMsg = function(msg) {
  this.$message.error(msg);
};
Vue.prototype.showNotifyError = function(msg) {
  this.$notify.error({
    title: '错误',
    message: msg,
    duration: 0,
    offset: 100
  });
};
Vue.prototype.showAlertMsg = function(type, title, msg){
  this.$alert(msg, title, {
    confirmButtonText: '知道了',
    type:type,
    callback: action => {
    }
  });
};
//深拷贝,适用于对象，数组，时间，函数等类型
Vue.prototype.deepClone = function(obj,hash=new WeakMap()){
  //如果是null 或者undefined 我就不进行拷贝操作
  if(obj==null) return obj;
  if(obj instanceof Date) return new Date(obj);
  if(obj instanceof RegExp) return new RegExp(obj);
  //可能是对象 或者普通的值 如果是函数的话，是不需要深拷贝的  因为函数是用来调用的，不需要再拷贝一个新的函数
  if(typeof obj!=='object') return obj;
  // 是对象的话就要进行深拷贝 [] {} Object.prototype.toString.call(obj)==[object Array]?[]:{}
  if(hash.get(obj)) return hash.get(obj);

  let cloneObj=new obj.constructor;
  hash.set(obj,cloneObj);
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      //实现一个递归拷贝
      cloneObj[key]=this.deepClone(obj[key],hash);
    }
  }
  return cloneObj;
};
//对象数组按对象属性排序
Vue.prototype.sortByKey = function(type,arr,key){
  if (type == 'smallToBig'){
    return arr.sort(function (a, b) {
      let x = a[key]
      let y = b[key]
      return ((x < y) ? -1 : (x > y) ? 1 : 0)
    })
  }else if (type == 'bigToSmall'){
    return arr.sort(function (a, b) {
      let x = a[key]
      let y = b[key]
      return ((x > y) ? -1 : (x < y) ? 1 : 0)
    })
  }else {
    return '';
  }
};
//数组转','分割字符串
Vue.prototype.arrToStringWithComma = function(arr){
  let strTemp = '';
  for (let i = 0; i < arr.length; i++){
    strTemp += arr[i];
    strTemp += ',';
  }
  if (strTemp.length != ''){
    strTemp = strTemp.substring(0, strTemp.length - 1);
  }
  return strTemp;
};
//对象数组删除与一对象某属性相同的值
//例：参数：[{key:1},{key:2}], {key:1}, 'key'     得到[{key:2}]
Vue.prototype.deleteArrItemByObjKey = function(arr, obj, key){
  arr.forEach((item, index) => {
    if (item[key] === obj[key]) {
      delete arr[index]
    }
  });
  arr = arr.filter(function (val) {
    return val
  });
  return arr;
};
/****************************全局函数-end************************/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
