function myFunction() {
    var itm = document.getElementById("jojo").lastChild;
    var cln = itm.cloneNode(true);
    document.getElementById("jojo").appendChild(cln);
}