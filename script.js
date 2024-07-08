const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionaryArea = document.querySelector('.dictionary-app');

// Function to fetch dictionary data
async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();
    return data[0];
}

// Event listener for the button
btn.addEventListener('click', fetchCreateCard);

// Function to fetch data and create the card
async function fetchCreateCard() {
    const data = await dictionaryFn(input.value);
    console.log(data);

    let partOfSpeechArray = [];
    for (let i = 0; i < data.meanings.length; i++) {
        partOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    dictionaryArea.innerHTML = `
    <div class="card">
        <div class="property">
            <span>Word:</span> 
            <span>${data.word}</span>  
        </div> 
        <div class="property">
            <span>Phonetics:</span>
            <span>${data.phonetic || ''}</span>  
        </div> 
        <div class="property">
            <span>
                <audio controls src="${data.phonetics[0]?.audio || ''}"></audio>
            </span>   
        </div> 
        <div class="property">
            <span>Definition:</span>
            <span>${data.meanings[0].definitions[0].definition}</span>   
        </div>
        <div class="property">
            <span>Example:</span>
            <span>${data.meanings[0].definitions[0].example || 'No example available'}</span>
        </div>
        <div class="property">
            <span>Parts of Speech:</span>
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
    </div>`;
}
