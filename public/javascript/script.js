$(document).ready(()=>{

    $(".button-collapse").sideNav();
    $('.modal').modal();
    
// Global Variables
// ------------------------------------------------------------------------------------------------------- 


// functions
// ------------------------------------------------------------------------------------------------------- 

const disableButton = (button)=> {
    $(button).attr('type','button');
}

const enableButton = (button)=> {
    $(button).attr('type', 'submit');
}

const checkVals = (username, password)=> {
    disableButton('.loginBtn');
    console.log($(username).val());
    if($(username).val() === '' || $(password).val()=== '') {
        console.log('missing input');
    } else {
        console.log('good to go!');
        enableButton('.loginBtn');
    }
}


// main process
// ------------------------------------------------------------------------------------------------------- 



$('.loginBtn').on('click', ()=> {
    checkVals('.usernameField', '.passwordField');
});


});
