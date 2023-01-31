//蛇的类
/* 
    属性
        范围元素
        方向：默认向右
        蛇：是一个数组数据类型
            【头，身体，身体，身体】
    方法：
        1.创建一节蛇
        2.创建一条初始化的蛇
        3.蛇移动一步
        4.吃到食物
        5.判定死亡
*/
class Snake {
    constructor(select) {
        //范围元素
        this.map = select
        //方向
        this.direction = 'bottom'
        //蛇
        this.snake = []
        //初始化的时候直接创建一条蛇
        this.creSnake()
    }
    // 创建一节蛇
    /* 
        问题1：蛇在什么位置
            当你没有蛇，需要创建，调用多次 创建 方法
            当你吃的食物，需要调用一次 创建 方法

            没有头：你应该把这一节放在哪里（0，0）
            有头：把这一节放在哪 根据方向决定放在哪一边
                right：left += 20 top不动
                left: left -=20 top不动
                bottom: top +=20 left不动
                top: top-=20 left不动
    */
    creOne() {
        // 1.决定新的一节应该出现的位置
        const head = this.snake[0]
        //如果有蛇头，head就是 头
        // 如果没有蛇头，head就是undefined
        const pos = {
            left: 0,
            top: 0
        }
        if (head) {
            //修改一下pos内的left 和 top
            //根据目前头的位置和方向 去修改left 和 top
            switch (this.direction) {
                case 'right':
                    pos.left = head.offsetLeft + 30
                    pos.top = head.offsetTop
                    break
                case 'left':
                    pos.left = head.offsetLeft - 30
                    pos.top = head.offsetTop
                    break
                case 'bottom':
                    pos.left = head.offsetLeft
                    pos.top = head.offsetTop + 30
                    break
                case 'top':
                    pos.left = head.offsetLeft
                    pos.top = head.offsetTop - 30
                    break
            }

        }
        //创建一个新的头，放在 map内部
        const div = document.createElement('div')
        div.className = 'head'

        div.style.left = pos.left + 'px'
        div.style.top = pos.top + 'px'
        this.map.appendChild(div)
        this.snake.unshift(div)
        //把head变成身体，把类名换成body
        //判断如果有头，才替换
        if (head) head.className = 'body'
    }
    // 2.创建一条蛇
    creSnake() {
        for (let i = 0; i < 5; i++) {
            this.creOne()
        }
    }
    // 3.移动一步
    //删除最后一个
    // 添加一个新的头
    move() {
        //从数组删除最后一个
        const body = this.snake.pop()
        //从页面删除最后一个
        body.remove()
        //创建一个新的内容
        this.creOne()

    }
    //判定是否吃到食物
    /* 
    如果吃到食物，返回true
    如果没吃到食物，返回false
    需要食物的坐标和头的坐标
    */
    isEat(foodX, foodY) {
        //拿到当前的头
        const head = this.snake[0]
        // 拿到头的坐标
        const x = head.offsetLeft
        const y = head.offsetTop
        if (x === foodX && y === foodY) {
            
            return true
        } else {
            return false
        }
    }
    // 5.判定是否死亡
    isDie() {
        //拿到当前的头
        const head = this.snake[0]
        // 拿到头的坐标
        const x = head.offsetLeft
        const y = head.offsetTop
        //判定撞墙
        if (x < 0 ||
            y < 0 ||
            x >= this.map.clientWidth ||
            y >= this.map.clientHeight) {
            return true
        } else {
            //判断是不是和某一个body的坐标重合
            const tmp = this.snake.slice(1)
            let flag = false
            tmp.forEach(item => {
                if (x === item.offsetLeft && y === item.offsetTop) {
                    flag = true
                }
            })
            return flag
        }
        
    }
}