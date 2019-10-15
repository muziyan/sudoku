//生成数独解决方案
import ToolKit from "./toolkit";

export class Generator {

    matrix:number[][];
    orders:number[][];

    constructor(){
        this.matrix = ToolKit.matrix.makeMatrix();
        this.orders = ToolKit.matrix.makeMatrix()
            .map( row => row.map((v,i)=> i))
            .map(row => ToolKit.matrix.shuffle(row));
    }

    generate(){
        while(!this.internalGenerate()){
            console.warn("try again");
        }
    }


    internalGenerate(){


        //TODO入口方法
        for (let n = 1; n <= 9; n++){
            if (!this.fillNumber(n)){
                return false
            }
        }

        return true;
    }

    private fillNumber(n:number){
        return this.fillRow(n,0)
    }

    private fillRow(n:number,rowIndex:number){
        if (rowIndex > 8){
            return true;
        }

        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];

        //TODO随机选择列
        for (let i  =  0; i < 9; i++){
            const colIndex = orders[i];
            //如果这个位置有值，跳过
            if (row[colIndex]){
                continue;
            }

            //检查这个位置是否可以填n
            if (!ToolKit.matrix.checkFillable(this.matrix,n,rowIndex,colIndex)){
                continue;
            }

            row[colIndex] = n;

            //去下一行填写n，如果没填进去，就继续寻当前航下一个位置
            if (!this.fillRow(n,rowIndex +1)){
                row[colIndex] = 0;
                continue;
            }

            return  true;
        }

        return false;
    }
}


export default Generator;