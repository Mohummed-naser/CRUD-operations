var inpoutNameBook = document.getElementById('nameBook');
var inpoutUrlBook = document.getElementById('bookmarkURL');
//
var list = [];
if(localStorage.getItem('arrayList') != null) {
   list = JSON.parse(localStorage.getItem('arrayList')); 
   display();
}
//functionForAddItem
function addBook() {
    if(validationName() && ValidUrl()) {
        var data = {
        name : inpoutNameBook.value,
        url : inpoutUrlBook.value 
    }  
    list.push(data);
    localStorage.setItem('arrayList' , JSON.stringify(list));
    display();
    clear();
    } else {
        swal()//funSweetalert
    }
}
//functionForClearInput
function clear() {
    inpoutNameBook.value ='';
    inpoutUrlBook.value ='';
    inpoutUrlBook.classList.remove('is-valid')
    inpoutUrlBook.classList.remove('is-valid')
}
//functionForDisplayItem
function display() {    
    var box = '';
    for (var i = 0 ; i < list.length ; i++) {
        box += `
            <tr>
                <td>${[i+1]}</td>
                <td>${list[i].url}</td>
                <td><button onclick="visitLink()" type="button" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
                <td><button onclick="deleteItem(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button></td>
            </tr>
        `
    }
    document.getElementById('data').innerHTML = box;
}
// functionForDeleteItemFromTable
function deleteItem(index) {
    list.splice (index,1);
    localStorage.setItem('arrayList' , JSON.stringify(list));
    display();
}
/*
function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};
*/
function visitLink() {
    var url = inpoutUrlBook.value;
    window.open(url, "_blank");
    // if (url) {
    //     var finalUrl = url.includes("https://") ? url : "https://" + url;
    //     window.open(finalUrl, "_blank");
    // } else {
    //     alert("Please enter a valid URL.");
    // }
};
 //valid-inputNameBook
 function validationName() {
    var regex = /^[A-Z][a-z]{3,}$/;
    if(regex.test(inpoutNameBook.value)) {
        inpoutNameBook.classList.add('is-valid')
        inpoutNameBook.classList.remove('is-invalid')
        return true;
    } else {
        inpoutNameBook.classList.remove('is-valid')
        inpoutNameBook.classList.add('is-invalid')
        return false;
    }
 }
 //valid-inputLinkBook
function ValidUrl() {
    var regexLink = /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(\/\S*)?$/;
    if(regexLink.test(inpoutUrlBook.value)) {
        inpoutUrlBook.classList.add('is-valid')
        inpoutUrlBook.classList.remove('is-invalid')
        return true;
    } else {
        inpoutUrlBook.classList.remove('is-valid')
        inpoutUrlBook.classList.add('is-invalid')
        return false;
    }
 }
//funSweetalert
function swal() {
    Swal.fire({
    title: "Site Name or Url is not valid, Please follow the rules below :",
    text: "Site name must contain at least one uppercase letter 'Site URL must be a valid one'",
    icon: "question"
});
}
