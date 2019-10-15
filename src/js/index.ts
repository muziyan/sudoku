import Grid from "./ui/grid";
import Popupnumbers from "./ui/popupnumbers";

const grid = new Grid($("#container"));

grid.build();
grid.layout();

const popupnumbers = new Popupnumbers($("#popupNumbers"));
grid.bindPopup(popupnumbers);

$("#check").on("click",e=>{
    if (grid.check()) {
        alert("成功!")
        grid.rebuild();
    }
})
$("#reset").on("click",e=>{
    grid.reset();
})
$("#clear").on("click",e=>{
    grid.clear();
})
$("#rebuild").on("click",e=>{
    grid.rebuild();
})
