//生成九宫格
import Sudoku from "../core/sudoku";
import Checker from "../core/checker";
import Popupnumbers from "./popupnumbers";

export class Grid {

    private _$container : JQuery;

    constructor(container:JQuery) {
        this._$container = container;
    }

    build() {
        const sudoku = new Sudoku();
        sudoku.make();

        const win = sudoku.solutionMatrix;
        console.log(win);
        const matrix = sudoku.puzzleMatirx;

        const rowGroupClasses = ['row_g_top', "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

        const $cells = matrix.map(rowValues => rowValues
            .map((cellValue, colIndex) => {
                return $("<span>")
                    .addClass(colGroupClasses[colIndex % 3])
                    .addClass(cellValue ? "fixed" : "empty")
                    .text(cellValue);
            }));


        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div class='row'>")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);
    }

    layout() {
        const width = $("span:first", this._$container).width();
        $("span", this._$container)
            .height(`${width}`)
            .css({
                "line-height": `${width}px`,
                "font-size": `${width} < 32` ? `${width} / 2` : ""
            })
    }

    /*
    * 检查用户解密的结果,成功则进行提示,失败显示错误位置的标记
    * */
    check() {
        //获取需要检查的数据
        const data = this._$container.children()
            .map((rowIndex, div) => {
                return $(div).children()
                    .map((colIndex, span) => parseInt($(span).text()) || 0);
            })
            .toArray()
            .map($data => $data.toArray());

        const checker = new Checker(data);

        if (checker.check()){
            return true;
        }

        //检查不成功,进行标记
        const marks = checker.matrixMarks;

        this._$container.children()
            .each((rowIndex,div) =>{
                $(div).children().each((colIndex,span)=>{
                    const $span = $(span);
                    if ($span.is('.fixed') || marks[rowIndex][colIndex]){
                        $span.removeClass("error");
                    }else{
                        $span.addClass("error");
                    }
                })
            })

    }

    /*
    * 充值当前迷盘的初始装填
    * */
    reset() {
        this._$container.find("span:not('.fixed')")
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0)
    }

    /*
    * 清楚错误标记
    * */
    clear() {
        this._$container.find("span.error")
            .removeClass("error");
    }

    /*
    *重建新的迷盘
    * */
    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }

    bindPopup(popupNumbers:Popupnumbers) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if(!$cell.is(".fixed")) popupNumbers.popup($cell);
        })
    }
}

export default Grid;


