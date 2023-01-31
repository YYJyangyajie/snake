 //游戏规则
 class Game {
     constructor(select, score) {
         this.map = document.querySelector(select)
         //获取记分牌
         this.score = document.querySelector(score)
         this.food = new Food(this.map)
         this.snake = new Snake(this.map)
         this.flag = true
         //准备一个级别
         this.level = 1
         //准备一个变量接受定时器返回值
         this.timer = 0
         //准备一个变量用作记分牌计数
         this.count = 0
         this.change()
     }
     start() {
         
         this.timer = setInterval(() => {
             //让蛇移动一次
             this.snake.move()
             //判断是不是吃到食物
             if (this.snake.isEat(this.food.x, this.food.y)) {
                 this.updataScore()
                 //蛇要加一节
                 this.snake.creOne()
                 //食物换个位置
                 this.food.changePos()
             }
             //  判断是不是死亡了
             if (this.snake.isDie()) {
                 window.alert('game over')
                 clearInterval(this.timer)
                 window.location.reload()
             }
         }, 300 - this.level * 50)
     }
     // 暂停
     pause() {
         clearInterval(this.timer)
     }
    
     //重新开始
     restart() {
         window.location.reload()
     }
     //修改方向
     change() {
         document.addEventListener('keydown', e => {
             e = e || window.event
             const code = e.keyCode || e.which
             switch (code) {
                 case 37:
                     this.snake.direction = 'left';
                     break
                 case 38:
                     this.snake.direction = 'top';
                     break
                 case 39:
                     this.snake.direction = 'right';
                     break
                 case 40:
                     this.snake.direction = 'bottom';
                     break
             }
         })
     }
     //更新记分牌
     updataScore() {
         //计数器++
         this.count++
         //根据count 数据书写input 的文本
         this.score.value = this.count * 90 + this.level * 10
         // 判断当吃到食物达到一定数量的时候level++
         if (this.count % 10 === 0) {
             this.level++
             this.pause()
             this.start()
         }
     }
 }