
function hebTx(input) {
    const eng = "qwertyuiop[]\asdfghjkl;'zxcvbnm,./'";
    const heb = "/'קראטוןםפ][\שדגכעיחלךף,זסבהנמצתץ.'";
    var output = "";
    for (i = 0; i < input.length; ++ i) {
        var idx = heb.indexOf(input[i]);
        output += (idx >= 0 ? eng.charAt(idx) : input[i]);
    }
    return output;
}

if (typeof module !== 'undefined') module.exports = hebTx; // On node.js, use exports
else if (window) window.hebTx = hebTx; // In browser, use window
else console.error('Unknown environment');
