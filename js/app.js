const input = document.getElementById("search")
input.addEventListener("input", (event) => {
    // event.target.value <-- yra inputo tekstas
    // jei sauksim search, funkcijojs viduje visada appendinsim
    // prie galo. todel nauju rezultatai bus visada gale, o seni
    // rezultatai neissivalys.

    // isvalyti senus rezultatus.
    document.getElementById("jokes-container").innerHTML = '';

    // kviesti api ir sukurti naujus articles.
    search(event.target.value)
})

// issaukiam api ir grazinam rezultata
const search = (text) => {
    fetch(`https://api.chucknorris.io/jokes/search?query=${text}`)
        .then(response => response.json())
        .then(data => {
            if (data.total == 0) {
                document.getElementById("jokes-container").innerHTML = 'Nieko nerasta';
                return;
            }
            // data yra rezultatas
            // cia data atrodo {total: 326, result: Array(326)}
            data.result.forEach(element => {
                // element yra Array elementas
                drawArticle(element.value)
            });
        })
        .catch(error => {
            document.getElementById("jokes-container").innerHTML = 'Nieko nerasta';
        })
}

const drawArticle = (joke) => {
    // sukonstruojam joke article
    const article = document.createElement('article');
    article.style.backgroundColor = generateRandomColor();

    const p = document.createElement('p');
    p.className = "joke-text";
    p.textContent = joke;
    article.appendChild(p);

    // idedam joke article box i jokes-containeri
    let jokesContainer = document.getElementById("jokes-container");
    jokesContainer.appendChild(article);
}

// sugeneruoja atsitiktine spalva rgb(x,x,x);
const generateRandomColor = () => {
    return `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
