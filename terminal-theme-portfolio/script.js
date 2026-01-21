const closeButton = document.querySelector('.b2');
// close the page function
closeButton.addEventListener('click', () => {
    let isConfirmed = confirm("You are closing the terminal.");
    if(isConfirmed){
        window.location.replace("https://google.com");
    }
});
// command checking and answering
const answer = (command) => {
    // adding elements
    const row = document.querySelector(".input").parentElement;
    const terminal = document.querySelector(".terminal");
    const newRow = document.createElement("div");
    const newSpanLeft = document.createElement("span");
    const newSpanRight = document.createElement("span");
    newRow.classList.add("row");
    newSpanRight.classList.add("text");
    newSpanLeft.classList.add("text");
    newSpanRight.textContent = command;
    newSpanLeft.textContent = "PS C:\\Users\\visitor>";
    terminal.insertBefore(newRow, row);
    newRow.append(newSpanLeft, newSpanRight);
    // create answer div
    const answerDiv = document.createElement("div");
    // SWITCH-CASE
    let inputFixed = command.trim().toLowerCase();
    switch (inputFixed) {
        case "help":
            answerDiv.classList.add("output-green");
            answerDiv.innerHTML = `Commands: <br> 
            'about' <br>
            'contact'<br>
            'projects'<br>
            'sudo rm -rf'
            `;
            break;
        case "about":
            answerDiv.classList.add("output-green");
            answerDiv.innerHTML = `Hi there, I'm Mümin!
             I'm studying Computer Engineering at Yalova University. And yes, I mostly do web developing.`;
            break;
        case "contact":
            answerDiv.classList.add("output-green");
            answerDiv.innerHTML = `<a class="links" href="https://instagram.com/" target="_blank">Instagram (Not added Yet)</a><br>
            <a class="links" href="https://x.com/" target="_blank">X (Not added Yet)</a><br>
            <a class="links" href="mailto:muminflz@gmail.com" target="_blank">E-Mail</a>
            `;
            break;
        case "projects": 
            answerDiv.classList.add("output-green");
            answerDiv.innerHTML = `For more projects: <a class="links" href="https://github.com/m6min/">Github</a>`
            break;
        case "sudo rm -rf":
            answerDiv.classList.add("output-red");
            answerDiv.innerHTML = `Permission denied: You are not the 'root' user. Nice try tho :)`;
            break; 
        default:
            answerDiv.classList.add("output-red");
            answerDiv.textContent = `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
            break;
    }
    terminal.insertBefore(answerDiv, row);
    window.scrollTo(0, document.body.scrollHeight);
}
let input = document.querySelector('.input');
input.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        const command = input.value;
        answer(command);
        input.value = '';
    }
});