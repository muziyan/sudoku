"use strict";
//生成数独游戏
//1.生成完成的解决方案
//2.随机取出部分数据:按比例
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = __importDefault(require("./generator"));
class Sudoku {
    constructor() {
        //生成完成的解决方案
        const generator = new generator_1.default();
        generator.generate();
        this.solutionMatrix = generator.matrix;
        this.puzzleMatirx = [];
    }
    //随机去掉一部分数据
    make(level = 5) {
        // const shouldRid = Math.random() * 9 < level;
        //生成迷盘
        this.puzzleMatirx = this.solutionMatrix.map(row => row.map(cell => {
            return Math.random() * 9 < level ? 0 : cell;
        }));
    }
}
exports.Sudoku = Sudoku;
exports.default = Sudoku;
