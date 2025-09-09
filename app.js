const inputText = document.querySelector("#input-text");
const outputText = document.querySelector("#output-text");
const btn = document.querySelector("#trans-btn");




const getLanguageList = async () => {
    const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8fd61c192emshb1fac7beb8b6214p14172bjsn2d3ae8bb6896',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result["data"]["languages"][101]);
        showOnWebpage(result["data"]["languages"]);
    } catch (error) {
        console.error(error);
    }
}


const getTranslate = async (source , target) => {
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '8fd61c192emshb1fac7beb8b6214p14172bjsn2d3ae8bb6896',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: `${source}`,
            target_language: `${target}`,
            text: `${inputText.value}`
        })
    };

    try {
        const response = await fetch(url, options);
        console.log(response.status);
        if (response.ok) {
            const result = await response.json();
            console.log(result["status"]);
            outputText.textContent = `${result["data"]["translatedText"]}`
        }
    } catch (error) {
        console.error(error);
    }
}


const showOnWebpage = (array) => {
    const fromId = document.querySelector("#from");
    const toId = document.querySelector("#to");
    for(let i=0; i<array.length; i++) {
        const fromOption = document.createElement("option");
        fromOption.setAttribute("value", `${array[i]["code"]}`);
        fromOption.innerText = `${array[i]["name"]}`;
        fromId.append(fromOption);

        const toOption = document.createElement("option");
        toOption.setAttribute("value", `${array[i]["code"]}`);

        toOption.innerText = `${array[i]["name"]}`;
        toId.append(toOption);

        if(array[i]["code"] === "en") {
            fromOption.defaultSelected = true;
        }
        
    }
}

btn.addEventListener("click", () => {
    const fromId = document.querySelector("#from");
    const toId = document.querySelector("#to");
    if (inputText.value != "") {
        console.log(fromId.value, toId.value);
        getTranslate(fromId.value, toId.value);
    }
})

getLanguageList();


