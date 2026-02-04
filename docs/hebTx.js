function hebTx(input) {
    var eng = "qwertyuiop[]\asdfghjkl;'zxcvbnm,./'";
    var heb = "/'קראטוןםפ][\שדגכעיחלךף,זסבהנמצתץ.'";
    var output = '';
    var transFound = false;
    for (var i = 0; i < input.length; ++i) {
        var idx = heb.indexOf(input[i]);
        output += idx >= 0 ? eng.charAt(idx) : input[i];
        transFound = transFound || idx >= 0;
    }
    if (! transFound) {
        output = '';
        for (var i = 0; i < input.length; ++i) {
            var idx = eng.indexOf(input[i].toLowerCase());
            output += idx >= 0 ? heb.charAt(idx) : input[i];
        }     
    }
    return output;
}
// was in comment:

if (typeof module !== 'undefined') module.exports = hebTx; // On node.js, use exports
else if (window) window.hebTx = hebTx; // In browser, use window
else console.error('Unknown environment');