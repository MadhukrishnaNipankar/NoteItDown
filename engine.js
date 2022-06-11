console.log("Welcome to NoteItDown");

// if we already have some notes in our array , then show them 
displayNotes();
/*
If Save Note button is pressed, Then Add the Content of TextArea to localStorage
*/

let saveNoteBtn = document.getElementById("saveBtn");
saveNoteBtn.addEventListener("click", saveNoteFunction);





//The function which will be called when SaveNote Button is pressed
function saveNoteFunction(e) {
    console.log("button clicked");
    let addHeading = document.getElementById("addHeading");
    // console.log(addHeading);
    // Fetching and displaying notes from localStorage 


    if (addHeading.value == "") {

        let notificationBarHtml = `    
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
         <strong>Heading </strong>field cannot be empty!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
        let notification = document.getElementById("notification");
        notification.innerHTML = notificationBarHtml;
    }
    else if (document.getElementById("addTxt").value == "") {
        let notificationBarHtml = `    
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
         <strong>Notes </strong>field cannot be empty!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
        let notification = document.getElementById("notification");
        notification.innerHTML = notificationBarHtml;
    }
    else {


        let title = localStorage.getItem("Title");
        let titleArray;
        if (title == null) {
            titleArray = [];
        }
        else {
            titleArray = JSON.parse(title);
        }
        titleArray.push(addHeading.value);
        localStorage.setItem("Title", JSON.stringify(titleArray));



        // notification 
        let notificationBarHtml = `    
<div class="alert alert-success alert-dismissible fade show" role="alert">
     <strong>"${addHeading.value}"</strong>added successfully!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
        let notification = document.getElementById("notification");
        notification.innerHTML = notificationBarHtml;
        addHeading.value = " ";


        let addTxt = document.getElementById("addTxt");
        //  console.log(addTxt);

        // Fetching and displaying notes from localStorage 
        let notes = localStorage.getItem("notes");
        let notesArray;
        if (notes == null) {
            notesArray = [];
        }
        else {
            notesArray = JSON.parse(notes);
        }

        notesArray.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        addTxt.value = " ";

        //displaying the notes
        displayNotes();

    }



}




//function for reading data from local storage and displaying
function displayNotes() {

    //fetching heading from local storage
    let title = localStorage.getItem("Title");
    let titleArray;
    if (title == null) {
        titleArray = [];
    }
    else {
        titleArray = JSON.parse(title);
    }

    //fetching notes from local storage
    let notes = localStorage.getItem("notes");
    let notesArray;
    if (notes == null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }




    let html = "";
    for (var i = 0; i < notesArray.length; i++) {
        html += `
        <div class="card my-2 mx-2 notesCard" style="width: max-content">
        <div class="card-body">
          <h5 class="card-title">${titleArray[i]}</h5>
          <pre  class="card-text">${notesArray[i]}</pre>
          <button class="btn btn-primary" onclick="deleteNote(${i})" id="${i}">
              Delete
          </button>
        </div>   
      </div>      
       `;
    }



    let noteCardParent = document.getElementById("notes");
    if (notesArray.length != 0) {
        noteCardParent.innerHTML = html;
    }
    else {
        noteCardParent.innerHTML = `<div class="alert alert-primary" role="alert">
       Nothing to show ! Refer Above Section to Save Notes Here.
     </div>`;
    }

}


//function for deleting a note
function deleteNote(index) {

    //fetching heading from local storage
    let title = localStorage.getItem("Title");
    let titleArray;
    if (title == null) {
        titleArray = [];
    }
    else {
        titleArray = JSON.parse(title);
    }

    titleArray.splice(index, 1);
    localStorage.setItem("Title", JSON.stringify(titleArray));



    // fetching notes from local storage
    let notes = localStorage.getItem("notes");
    let notesArray;
    if (notes == null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }

    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    displayNotes();
    let notificationBarHtml = `    
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Note Deleted Successfully</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    let notification = document.getElementById("notification");
    notification.innerHTML = notificationBarHtml;



}


/*This is search Functionality*/

let search = document.getElementById("searchTxt");
search.addEventListener("input", searchFunction);

function searchFunction() {
    //  console.log("Input Event Fired");
    let inputValue = search.value;
    let noteCards = document.getElementsByClassName("notesCard");
    // console.log(noteCards);
    Array.from(noteCards).forEach(function (element) {
        if (element.innerHTML.toLowerCase().includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })


}


