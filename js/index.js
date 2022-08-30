const loadPhone = async () => {
    loaderFunc(true);
    const getInput = document.getElementById('exampleFormControlInput');
    const getValueInput = getInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${getValueInput}`
    // console.log(key);
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data)


}

const displayPhone = phones => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ' '
    if (phones.length > 10) {
        phones = phones.slice(0, 10)
        const showAll = document.getElementById('show-all')
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    const noPhone = document.getElementById('no-phone-found')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = ` 
            <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <h3 class = "card-title">${phone.phone_name}</h3>
                
                <button onclick="loadPhonedeatils('${phone.slug}')"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
                </div>
            
        </div>`
        phoneContainer.appendChild(phoneDiv);
        loaderFunc(false)
    });



}

// const inputFieldele = () =>{

// //  console.log(getValueInput);
// // return getValueInput;

// // }
// document.getElementById("btn-search").addEventListener("click",loadPhone)


document.getElementById('btn-show-all').addEventListener('click', function () {


    loaderFunc(true);
    const getInput = document.getElementById('exampleFormControlInput');
    const getValueInput = getInput.value;
})


// loadPhone();\


const loaderFunc = (state) => {

    const loaderEle = document.getElementById("loader")
    if (state) {
        loaderEle.classList.remove("d-none")
    }
    else {
        loaderEle.classList.add("d-none")
    }
}


const loadPhonedeatils = async id => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`

    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)


}

 const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDtails = document.getElementById('phone-details')

    phoneDtails.innerHTML = `
    <p>Release date : ${ phone.releaseDate ? phone.releaseDate : "no release date found" } </p>
    <p>storage  : ${ phone.mainFeatures ? phone.mainFeatures.storage : "no storage " } </p>
    <h3> others : ${phone.others ? phone.others.Bluetooth : 'No bluetooth'}
    
    `

 }

// loadPhone('apple');