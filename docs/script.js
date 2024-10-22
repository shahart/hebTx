function hebTx() {
    const eng = "qwertyuiop[]\asdfghjkl;'zxcvbnm,./'";
    const heb = "/'קראטוןםפ][\שדגכעיחלךף,זסבהנמצתץ.'";

    var input = document.getElementById("text").value;
    var output = "";
    for (i = 0; i < input.length; ++ i) {
        var idx = heb.indexOf(input[i]);
        output += (idx >= 0 ? eng.charAt(idx) : input[i]);
    }
    document.getElementById("result").innerHTML = 
        "Now copy this: <b>" + output + "</b>";
}
