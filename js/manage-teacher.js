// imports
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage, teacherColRef } from "./firebase.config"
import { v4 as uuid} from "uuid"
import { addDoc, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore"
import Toastify from 'toastify-js'


// doms

const formElm = document.querySelector('.add-teacher-form form')
const teacherNameElm = formElm.querySelector('#teacherName')
const teacherPostElm = formElm.querySelector('#teacherPost')
const contactNoElm = formElm.querySelector('#contactNo')
const emailElm = formElm.querySelector('#email')
const techElm = formElm.querySelector('#technology')
const imageElm = formElm.querySelector('#image')

const teacherTable = document.querySelector('.manage-teacher-list table')


// getting all value from form
function getFormValue(name, post, cont, email, tech, img){
    let teacherNameVal = name.value;
    let teacherPostVal = post.value;
    let contactVal = cont.value;
    let emailVal = email.value;
    let techVal = tech.value;
    let imageVal = img.files[0];

    return{
        teacherNameVal,
        teacherPostVal,
        contactVal,
        emailVal,
        techVal,
        imageVal
    }
}

// submitting data to database
function formSubmitToDatabase(name, post, cont, email, tech, image){

    const bucketRef = ref(storage, `teacherImg/${uuid()+image.name}`)

    uploadBytes(bucketRef, image).then(snapshot=>{
        getDownloadURL(snapshot.ref)
        .then(url=>{
            addDoc(teacherColRef, {
        
                    name,
                    post,
                    contactNo: cont,
                    email,
                    imageUrl: url,
                    technology: tech,
                    uniqueId: uuid()
                
            }).then(()=>{
                Toastify({
                    text: "Teacher Information Added Successfully",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast()
                formElm.reset()
                location.reload()
            }).catch(err=>{
                console.log(err.code);
                console.log(err.message);
            })
        }).catch((err)=>{
            console.log(err.code);
            console.log(err.message);
        })
    }).catch(err=>{
        console.log(err.code);
        console.log(err.message);
    })



}

// submitting form
formElm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const {teacherNameVal, teacherPostVal, contactVal, emailVal, techVal, imageVal} = getFormValue(teacherNameElm, teacherPostElm, contactNoElm, emailElm, techElm, imageElm)

    if(teacherNameVal, teacherPostVal, contactVal, emailVal, techVal, imageVal){

        formSubmitToDatabase(teacherNameVal, teacherPostVal, contactVal, emailVal, techVal, imageVal)
    }else{
        alert('Invalid Form Field')
    }

})

let slNo = 1

onSnapshot(teacherColRef, snapshot=>{
    if(snapshot){
        snapshot.docs.map(elm =>{
            let info = elm.data()

            teacherTable.insertAdjacentHTML('beforeend', `
                <tr>
                <td>${slNo++}</td>
                <td>${info.name}</td>
                <td>${info.post}</td>
                <td>${info.contactNo}</td>
                <td>${info.email}</td>
                <td><button class="${elm.id} tec-dlt">Delete</button></td>

                </tr>
            `)
                    })
    }
})

const getId = (elm)=>{
    return elm.target.classList[0]
}

document.addEventListener('click', e=>{
    if(e.target.matches('.tec-dlt')){
        
        let id = getId(e)
        let deleteDocRef = doc(teacherColRef, id)
        deleteDoc(deleteDocRef).then(()=>{
            location.reload()
            Toastify({
                text: "Deleted",duration: 3000
            }).showToast()
        }).catch(err=>{
            console.log(err);
        })
    }
})

