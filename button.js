let field_opened = false;
let timeout_check = false;
const regex_emailcheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const regex_messagecheck = /^\s+$/;

function buttonclick_() { // zeigt ein Popup
    $('#textfeld').show();
    $('#closeButton').show();
}

function closeButtonClick() { // schließt das Popup
    $('#textfeld').hide();
    $(".textfeld").hide();
    $(".inputField").hide();
    $('.closeButton').hide();
    $(".submitButton").hide();
}
let test = [{text: "Nice"}]
function buttonclick(id) {
    if (field_opened === false) { 
        field_opened = true;
        let data = {
            title: "Hallo Popup Welt",
            description: "Dies ist ein Test",
            date: id
        };
        
        let div = document.createElement('div'); 
        div.className = "textfeld";
        div.innerText = data.title + "\n" + data.description + "\n" + data.date;
        document.body.append(div); 
            
        let button = document.createElement('button'); // erstellt den schließ-button
        button.className = "closeButton";
        button.innerText = "Abbrechen";
        button.onclick = function() {
            field_opened = false;
            closeButtonClick(); 
            div.remove();
        } 
            
        let submit = document.createElement('button'); // erstellt den submit-button
        submit.onclick = function() {
            if (!regex_messagecheck.test(input_message.value) && regex_emailcheck.test(input_email.value) && input_message.value != '') {
                let input_sended = document.createElement('div');
                input_sended.className = "input_sended";
                input_sended.innerText = "Gesendet!";
                document.body.append(input_sended);    
                div.append(input_sended);
                input_message.value = '';
                input_email.value = '';
                timer();
                sended();
            }
            else {
                let input_error = document.createElement('div');
                input_error.className = "input_error";
                input_error.innerText = /*test[0].text*/"Bitte überprüfen Sie Ihre Angaben!";
                document.body.append(input_error);
                div.append(input_error);
                timer();
            }
        }
        submit.className = "submitButton";
        submit.innerText = "abschicken"
            
        let input_email = document.createElement('input'); // erstellt den input-button
        input_email.className = "inputField_email";
        input_email.placeholder = "email";
            
        let input_message = document.createElement('textarea');
        input_message.className = "inputField_message";
        input_message.placeholder = "Nachricht";
            
        div.appendChild(input_message);
        div.appendChild(input_email);
        div.append(submit);  
        div.append(button);  
    }
}

let interval = 1;

function timer() {
    if (timeout_check == false) {
        interval = setInterval(function() {reset(status);}, 3000);
        timeout_check = true;
    }   
}

function reset() {
    timeout_check = false;
    clearInterval(interval);
    $(".input_sended").hide();
    $(".input_error").hide();
}

function sended() {
    timeout_check = false;
    $(".input_error").hide();
    clearInterval(interval)
    timer();
}  