# waterfall-sinanews
### 懒加载原理

先设置图片的data-set属性（当然也可以是其他任意的，只要不会发送http请求就行了，作用就是为了存取值）值为其图片路径，由于不是src，所以不会发送http请求。 然后计算出页面scrollTop的高度和浏览器的高度之和， 如果图片举例页面顶端的坐标Y（相对于整个页面，而不是浏览器窗口）小于前两者之和，就说明图片就要显示出来了（合适的时机，当然也可以是其他情况），这时候再将 data-set 属性替换为 src 属性即可。

Q：如何判断浏览器滚动到最底部?

scrollTop为滚动条在Y轴上的滚动距离。

clientHeight为内容可视区域的高度。

scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。

从这个三个属性的介绍就可以看出来，滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight。

[懒加载预览地址](https://yomaris.github.io/waterfall-sinanews/LazyLoad.html)

### easy-waterfall 实现一个简易的瀑布流布局

1.瀑布流布局要求要进行布置的元素等宽，然后计算元素的宽度与浏览器宽度之比，得到需要布置的列数
2.创建一个数组，长度为列数，里面的值为已布置元素的总高度（最开始为0）
3.然后将未布置的元素依次布置到高度最小的那一列，就得到了瀑布流布局。

[简易瀑布流布局预览地址](https://yomaris.github.io/waterfall-sinanews/easy-waterfall.html)

### waterfall-sinanews

[瀑布流新闻网站预览地址](https://yomaris.github.io/waterfall-sinanews/waterfall-sinanews.html)

#### 实现思路
1.获取page=1 的10条数据
2.把10条数据拼装成DOM放到页面
3.使用瀑布流去摆放DOM的位置
4.page++
当lead出现在眼前的时候
1.获取page的10条数据
2.把10条数据拼装成DOM放到页面
3.使用瀑布流去摆放DOM的位置
4.page++
