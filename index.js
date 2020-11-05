var el = document.getElementById('app');
var oBigPicBox = el.getElementsByClassName('big-pic-box')[0];
var oBigPic = oBigPicBox.getElementsByClassName('big-pic')[0];
var oMove = el.getElementsByClassName('move')[0];
var oShowBigPic = el.getElementsByClassName('show-big-pic')[0];
var oSmallPicList = el.getElementsByClassName('small-pic');
var oActiveSmallPic = oSmallPicList[0];

var bigPicBoxWidth = 600;
var bigPicBoxHeight = 600;
var moveWidth = 200;
var moveHeight = 200;
var maxLeft = bigPicBoxWidth - moveWidth; // 设置放大镜最大left值，为（600-200）
var maxTop = bigPicBoxHeight - moveHeight; // 设置放大镜最大top值，为（600-200）

function init () {
  handleBigPicMove();
  handleBigPicLeave();
  handleSmallPic();
}

function handleBigPicMove () {
// 让小方块移动
  oBigPicBox.onmousemove = function (e) {
    // e.clientX 为当前鼠标点到屏幕左边的距离
    // e.clientY 为当前鼠标点到屏幕上边的距离
    // oBigPicBox.offsetLeft 为该元素的left值
    // oBigPicBox.offsetTop 为该元素的top值
    var left = e.clientX - oBigPicBox.offsetLeft - moveWidth / 2;
    var top = e.clientY - oBigPicBox.offsetTop - moveHeight / 2;
    
    // 判断临界值
    left = left < 0 ? 0 : left; // 如果left值小于0，则设置left为0
    left = left > maxLeft ? maxLeft : left; // 如果left值大于maxLeft，则设置left为maxLeft
    top = top < 0  ? 0 : top; // 如果top值小于0，则设置top值为0
    top = top > maxTop ? maxTop : top; // 如果top值大于maxTop，则设置left为maxTop
    
    oMove.style.display = 'block'; // 设置让移动小方块显示
    oMove.style.left = left + 'px';
    oMove.style.top = top + 'px';

    oShowBigPic.style.display = 'block'; // 设置让移动小方块显示
    oShowBigPic.style.backgroundPositionX = -(left * 3 ) + 'px';
    oShowBigPic.style.backgroundPositionY = -(top * 3 ) + 'px';
  }
}

function handleBigPicLeave () {
  oBigPicBox.onmouseleave = function (e) {
    oMove.style.display = 'none';
    oShowBigPic.style.display = 'none';
  }
}

function handleSmallPic () {
  var smallPicLength = oSmallPicList.length;

  for(var i = 0; i < smallPicLength; i ++) {

    (function (i) {
      var oSmallPic = oSmallPicList[i]; // 获取到第i个small-pic元素
      var oImg = oSmallPic.getElementsByTagName('img')[0];  // 获取small-pic元素下的img元素
      var src = oImg.getAttribute('src'); // 获取到img元素的src

      oSmallPic.onclick = function () {
        oBigPic.setAttribute('src', src); // 给大图元素的属性src设置为img元素的src
        oShowBigPic.style.backgroundImage = "url('" + src + "')";
        oSmallPic.classList.add('active');  // 给被点击的small-pic元素添加class active
        oActiveSmallPic.classList.remove('active'); // 移除原来的被点击元素的class active
        oActiveSmallPic = oSmallPic;
      }
    })(i)
  }
}

init();