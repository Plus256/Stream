function formatDoc(sCmd, sValue) {
  document.execCommand(sCmd, false, sValue);
}

function saveShule(){
    var the_form=$("shule_cr_fm");
    the_form.elements["shule_body"].value=$("richtext_field").innerHTML;
    the_form.submit();
}