// jQuery - плагин, добавляет в input разделение разрядов и фильтрацию вводимого (float) на лету
// Автор: Кузнецов Павел Сергеевич, 19.09.2013



// Пример использования:
// $('#myInputId').floatDigits();



var Digits = {
    
    keyCheck: function (e, input){
var dotIndex = input.val().indexOf('.') == -1 ? 1 : input.val().indexOf('.');
var pos = dotIndex - Digits.doGetCaretPosition(input.get(0));

// Get a new value
var str = input.val() ;//+ '' + String.fromCharCode(c);

str = str.replace(/[^0-9\-.]/g , '');

// Dots
str = str.replace(',', '.');
str = str.replace(/ /g, '');

str = Digits.digest(str + '');


input.val(str);
Digits.setCaretPosition(input.get(0), input.val().indexOf('.') - pos);
return false;

 
},

doGetCaretPosition: function  (ctrl) {
    var CaretPos = 0;	// IE Support
    if (document.selection) {
        ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
        // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
},
setCaretPosition: function (ctrl, pos){
    if(ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
},

digest: function (data){
    var integer = data.split('.')[0];
    var div     = data.split('.')[1] || '00';
    integer = integer.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    return integer+'.'+div;
}

};

jQuery.fn.floatDigits = function () {
    $(this).keyup(function (e) { return Digits.keyCheck(e, $(this)); });
    $(this).mouseup(function (e) { return Digits.keyCheck(e, $(this)); });
}