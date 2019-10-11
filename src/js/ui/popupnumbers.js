//处理弹出的操作面板

module.exports = class Popupnumbers {
    constructor($panel) {
        this._$panel = $panel.hide().removeClass("hidden");

        this._$panel.on("click","span", e =>{
            const $cell = this._$targetCell;
            let $span = $(e.target);
            if ($span.hasClass('mark1')){
                //回填样式
                if ($cell.hasClass("mark1")){
                    $cell.removeClass("mark1")
                }else{
                    $cell.removeClass("mark2")
                    $cell.addClass("mark1")
                }
            }else if ($span.hasClass('mark2')){
                //回填样式
                if ($cell.hasClass("mark2")){
                    $cell.removeClass("mark2")
                }else{
                    $cell.removeClass("mark1")
                    $cell.addClass("mark2")
                }
            }else if ($span.hasClass("empty")){
                 $cell.text(0)
                     .addClass("empty");
            }else{
                $cell.removeClass("empty")
                    .text($span.text());
            }
            this.hide();
        })
    }

    popup($cell) {
        this._$targetCell = $cell;

        let {left, top} = $cell.position();

        left = left > 300 ? 290 : left;

        this._$panel
            .css({
                left: `${left}px`,
                top: `${top}px`,
            })
            .show();
    }

    hide(){
        this._$panel.hide();
    }
};