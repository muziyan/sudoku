//检查数据解决方案

function checkArray(array:number[]):boolean[] {
    const length = array.length;
    const marks:boolean[] = new Array(length);
    marks.fill(true);

    for (let i = 0; i < length -  1; i++){

        if (!marks[i]){
            continue;
        }

        const v = array[i];
        //是否有效 0 => 无效 1-9 => 有效
        if (!v){
            marks[i] = false;
            continue;
        }

        //是否有重复：i + 1 ~ 9，是否和i位置的数据重复
        for (let j = i + 1; j < length; j++){
            if (v === array[j]){
                marks[i] = marks[j] = false;
            }
        }

    }

    return marks;
}

import ToolKit from "./toolkit";

//输入：matrix 用户完成的数独数据 9 * 9
//处理:对matrix 行 列宫 进行检查，并填写marks
//输出：检查是否成功 marks
export class Checker {
    private _matrix:number[][];
    private _matrixMarks:Boolean[][];
    private _success:Boolean = false;

    constructor(matrix:number[][]){
        this._matrix = matrix;
        this._matrixMarks = ToolKit.matrix.makeMatrix(true);
    }

    get matrixMarks():boolean[][]{
        // @ts-ignore
        return this._matrixMarks;
    }

    get isSuccess():boolean{
        // @ts-ignore
        return this._success;
    }


    public check():boolean{
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        //检测是否成功
        this._success = this._matrixMarks.every(row => row.every( mark => mark));
        // @ts-ignore
        return this._success;
    }

    private checkRows(){
        for (let rowIndex = 0; rowIndex < 9; rowIndex++){
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);

            for(let colIndex = 0; colIndex < marks.length; colIndex++){
                if (!marks[colIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    private checkCols(){
        for (let colIndex = 0; colIndex < 9; colIndex++){
            const cols = [];

            for (let rowIndex = 0; rowIndex < 9; rowIndex++){
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            const marks = checkArray(cols);
            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++){
                if (!marks[rowIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    private checkBoxes(){
        for (let boxIndex = 0;boxIndex < 9; boxIndex++){
            const boxes = ToolKit.box.getBoxCells(this._matrix,boxIndex);
            const marks = checkArray(boxes);

            for (let cellIndex = 0; cellIndex < 9; cellIndex++){
                if (!marks[cellIndex]){
                    let {rowIndex,colIndex} = ToolKit.box.convertFromBoxIndex(boxIndex,cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
}


export default Checker;