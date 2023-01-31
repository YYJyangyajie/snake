//食物类
/* 
属性：
    范围元素
    x:表示食物的坐标
    y:表示食物的y坐标
方法：
    能在地图范围内随机给 食物 设置一个坐标点
*/

 class Food {

    constructor(select) {
        this.map = select
        this.food = document.createElement('div')
        this.food.className = 'food'
        this.map.appendChild(this.food)

        this.x = 0
        this.y = 0
        this.changePos()
    }

    //随机位置
    changePos() {
        //1.拿到this.map的尺寸
        const map_w = this.map.clientWidth
        const map_y = this.map.clientHeight
        //2.计算一行和一列能放多少个
        const row_num = map_w / 30 - 1
        const col_num = map_y / 30 - 1
        //3.计算出你放在哪个位置
        // 0~row_num的随机整数
        const pos_x=randomNum(row_num)
        const pos_y=randomNum(col_num)
        //计算第几个的坐标位置
        this.x=pos_x*30
        this.y=pos_y*30
        //修改食物的坐标
        this.food.style.left=this.x+'px'
        this.food.style.top=this.y+'px'



    }
}