"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* 宫坐标系工具
* */
//工具集
const boxToolkit = {
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    },
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }
};
/*
* 矩阵
* */
class matrixToolkit {
    static makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    }
    static makeMatrix(v = 0) {
        return Array.from({ length: 9 }, () => this.makeRow(v));
    }
    /*
    * Fisher-Yates 洗牌算法
    * */
    static shuffle(array) {
        const endIndex = array.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    /*
    * TODO 检查指定位置是否可以填
    * */
    static checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const col = this.makeRow().map((v, i) => matrix[i][colIndex]);
        const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || col[i] === n || box[i] === n)
                return false;
        }
        return true;
    }
}
class Toolkit {
    /*
    * 矩阵和数据相关的工具
    * */
    static get matrix() {
        return matrixToolkit;
    }
    /*
    * 宫坐标系的相关工具
    * */
    static get box() {
        return boxToolkit;
    }
}
exports.Toolkit = Toolkit;
exports.default = Toolkit;
