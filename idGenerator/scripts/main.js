const customIdStructure = `    
                        <div class="mainOfCustomId">
                            <div class="optionDiv">
                                <p class="letterLabel">Use Letters</p>
                                <input type="checkbox" class="useLetter">
                            </div>
                            <div class="optionDiv useLowerCaseDiv">
                                <p class="letterLabel">Use Lower Case</p>
                                <input type="checkbox" class="useLowerCase useLetter">
                            </div>
                            <div class="optionDiv useUpperCaseDiv">
                                <p class="letterLabel">Use Upper Case</p>
                                <input type="checkbox" class="useUpperCase useLetter">
                            </div>
                            <div class="optionDiv useMixedCaseDiv">
                                <p class="letterLabel">Use Mixed Case</p>
                                <input type="checkbox" class="useMixedCase useLetter">
                            </div>
                            <div class="optionDiv">
                                <p class="letterLabel">Set Part Length</p>
                                <input type="number" class="partLength" placeholder="Unordered">
                            </div>
                            <div class="optionDiv">
                                <p class="letterLabel">ID Division</p>
                                <input type="number" class="idDivisionInput" placeholder="3" min="1" max="5" required />
                            </div>
                            <div class="optionDiv js-error-label">
                                <p>The number you've entered is greater than the max-number/limit. <br><span style="color: darkgray;">Number has been set to the default <span style="color:gray">(3).</p>
                            </div>
                            <div class="optionDiv">
                                <button class="generateButton">Generate</button>
                            </div>
                            <div class="optionDiv">
                                <p class="idText"></p>
                            </div>
                        </div>`;
let page = {
    customID: false,
    uuid: false
}

let customIdButton = document.querySelector('.customIdButton');
let uuidButton = document.querySelector('.uuidButton');

let mainDivCustomID = document.querySelector('.mainOfCustomId');

let mainDiv = document.querySelector('.main');

customIdButton.addEventListener('click', () => {
    page.customID = true;
    mainDivCustomID.classList.remove("hide");
    run();
});