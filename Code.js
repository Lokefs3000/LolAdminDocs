var TextColor = "rgb(204, 204, 204)";
var BackgroundColor = "rgb(37, 37, 37)";
var SelectionColor = "rgb(255, 255, 255)";
var SelectionBackgroundColor = "rgb(11, 90, 175)";
var OperatorColor = "rgb(204, 204, 204)";
var NumberColor = "rgb(255, 198, 0)";
var StringColor = "rgb(173, 241, 149)";
var CommentColor = "rgb(102, 102, 102)";
var KeywordColor = "rgb(248, 109, 124)";
var LocalPropertyColor = "rgb(97, 161, 241)";
var NilColor = "rgb(255, 198, 0)";
var BoolColor = "rgb(255, 198, 0)";
var FunctionColor = "rgb(248, 109, 124)";
var LocalColor = "rgb(248, 109, 124)";
var SelfColor = "rgb(255, 198, 0)";

function LoadCode(Id) {
    var Item = document.getElementById(Id);
    var ItemText = Item.innerHTML;
    var Lines = ItemText.split("\n");

    var EndingText = "";

    for (var i = 0; i < Lines.length; i++) {
        var Line = Lines[i];
        
        Line = Line.replace("local", "<span style='color:" + LocalColor + "'>local</span>");
        Line = Line.replace("return", "<span style='color:" + LocalColor + "'>return</span>");
        
        if (Line.trim().startsWith("--[["))
            Line = "<span style='color:" + CommentColor + "'>" + Line;
        else if (Line.trim().endsWith("]]"))
            Line = Line + "</span>";
        else if (Line.trim().startsWith("--"))
            Line = "<span style='color:" + CommentColor + "'>" + Line + "</span>";
        else if (Line.trim().includes('"')) {
            var LineString = Line.trim().indexOf('"', 1);
            Line = Line.trim().substring(0, LineString) + "<span style='color:" + StringColor + "'>" + Line.trim().substring(LineString) + "</span>";
            while(Line.trim()[LineString] != '"') {
                LineString++;
            };
            var Org = Line.trim().substring(LineString);
            Org = Org.substring(0, Org.lastIndexOf('"')) + '"' + "</span>";
            var TempLine = Line.trim().substring(0, LineString);
            Line = TempLine + Org + ",";
        }
        else if (Line.trim().includes('.')) {
            var LineString = Line.trim().indexOf('.', 1);
            Line = Line.trim().substring(0, LineString) + "<span style='color:" + LocalPropertyColor + "'>" + Line.trim().substring(LineString) + "</span>";
            while(Line.trim()[LineString] != ' ') {
                LineString++;
            };
            var Org = Line.trim().substring(LineString);
            Org = Org.substring(0, Org.lastIndexOf(' ') - 2) + "</span>";
            var TempLine = Line.trim().substring(0, LineString);
            Line = TempLine + Org + " = {";
        }

        EndingText += Line + "<br>";
    }

    Item.innerHTML = EndingText;
}