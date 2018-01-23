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

const checkVals = (username, password, button)=> {
    enableButton(button);
    if($(username).val() === '' || $(password).val()=== '') {
        console.log('missing input');
        disableButton(button);
    } else {
        console.log('good to go!');
    }
}


// main process
// ------------------------------------------------------------------------------------------------------- 



$('.loginBtn').on('click', ()=> {
    checkVals('.usernameField', '.passwordField', '.loginBtn');
});


});
