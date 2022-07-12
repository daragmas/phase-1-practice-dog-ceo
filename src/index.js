const imgDiv = document.getElementById('dog-image-container')
const breedsSelector = document.getElementById('breed-dropdown')
const breedList = document.getElementById('dog-breeds')


const getData = async (url) => {
    let req =  await fetch(url)
    return await req.json()
}

const makeBreedList = (breed) =>{
    let li = document.createElement('li')
    li.textContent = breed
    breedList.append(li)

}

window.addEventListener('DOMContentLoaded',async ()=>{
    let data = await getData('https://dog.ceo/api/breeds/image/random/4')
    data.message.forEach((image) => {
        let img = document.createElement('img')
        img.src = image
        imgDiv.append(img)
    });
    
    const allBreedsList = await getData('https://dog.ceo/api/breeds/list/all')
    for(const breed in allBreedsList.message) {makeBreedList(breed)}

    breedsSelector.addEventListener('change', () => {
        const filteredList = Object.keys(allBreedsList.message).filter(breed => breed.startsWith(breedsSelector.value))
        breedList.innerHTML=''
        filteredList.forEach((breed)=>makeBreedList(breed))

    })
})

