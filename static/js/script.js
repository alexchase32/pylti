const exercises = [
    { sentence: "The cat jumped very high", words: ["cat", "jumped", "The", "high", "very"] },
    { sentence: "She enjoys reading books", words: ["She", "enjoys", "reading", "books"] },
    { sentence: "The sun rises in the east", words: ["The", "sun", "rises", "in", "the", "east"] }
];
let currentExerciseIndex = 0;
let score = 0;

function loadExercise(index) {
    const exercise = exercises[index];
    const dropzone = document.getElementById('dropzone');
    const wordsContainer = document.getElementById('words');

    dropzone.innerHTML = '';
    wordsContainer.innerHTML = '';

    exercise.words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.innerText = word;
        wordDiv.classList.add('word');
        wordDiv.setAttribute('draggable', 'true');
        wordDiv.addEventListener('dragstart', dragStart);
        wordsContainer.appendChild(wordDiv);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.innerText);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const text = e.dataTransfer.getData('text');
    const droppedWord = document.createElement('div');
    droppedWord.innerText = text;
    droppedWord.classList.add('word');
    droppedWord.setAttribute('draggable', 'true');
    droppedWord.addEventListener('dragstart', dragStart);
    e.target.appendChild(droppedWord);
}

function checkAnswer() {
    const exercise = exercises[currentExerciseIndex];
    const userAnswer = Array.from(document.getElementById('dropzone').children).map(child => child.innerText);

    if (exercise.sentence === userAnswer.join(' ')) {
        score += 20;
        alert('Correct!');
        currentExerciseIndex++;
        if (currentExerciseIndex < exercises.length) {
            loadExercise(currentExerciseIndex);
        } else {
            alert('Congratulations! You completed all exercises.');
        }
    } else {
        alert('Incorrect. Try again!');
    }

    document.getElementById('score').innerText = score;

    if (score >= 100) {
        alert('Congratulations! You reached the maximum score.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadExercise(currentExerciseIndex);
    document.getElementById('dropzone').addEventListener('dragover', dragOver);
    document.getElementById('dropzone').addEventListener('drop', drop);
});
