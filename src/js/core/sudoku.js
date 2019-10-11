//生成数独游戏
//1.生成完成的解决方案
//2.随机取出部分数据:按比例

const Generator = require("./generator");

module.exports = class Sudoku {
    constructor(){
        //生成完成的解决方案
        const generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    //随机去掉一部分数据
    make(level = 5){
        // const shouldRid = Math.random() * 9 < level;
        //生成迷盘
        this.puzzleMatirx = this.solutionMatrix.map(row => row.map( cell => {
            return Math.random() * 9 < level ? 0 : cell;
        }))

    }
};