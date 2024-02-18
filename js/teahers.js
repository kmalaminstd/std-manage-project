// images are hosted in imgbb website

import { getDocs } from "firebase/firestore"
import { teacherColRef } from "./firebase.config"

const teachers = [
    {
        id: 1,
        name: "Engr. Shamsul Alam",
        post: "Chief Instructor",
        technology: "Computer Science and Technology",
        contact: "01711577545",
        email: "s.alamreal786@gmail.com",
        image: "https://i.ibb.co/GpKP603/2023-11-21-04-26-0911d0ec2fac1b11afbade649f830378.jpg"
    },
    {
        id: 2,
        name: "Santosh Kumar Karmakar",
        post: "Chief Instructor",
        technology: "Computer Science and Technology",
        contact: "01714518188",
        email: "santoshkarmaker33@gmail.com",
        image: "https://i.ibb.co/Fx2HkPD/2023-11-19-10-21-606cbaea257e59c20d5a3eafe7480e45.jpg"
    },
    {
        id: 3,
        name: "Rezaul Karim",
        post: "Instructor",
        technology: "Computer Science and Technology",
        contact: "01705432297",
        email: "karimmpi1985@gmail.com",
        image: "https://i.ibb.co/ypqsY8Q/2023-11-21-05-07-3739560b3fa46bb91eac1f2fe471add2.jpg"
    },
    {
        id: 4,
        name: "Engr. Jannatul Ferdousi",
        post: "Instructor",
        technology: "Computer Science and Technology",
        contact: "01716836939",
        email: "shilpiduet@gmail.com",
        image: "https://i.ibb.co/jTJKR5p/2023-11-21-04-56-c41b1b83e5460e89566ca101d30e1907.jpg"
    },

]


getDocs(teacherColRef).
then((snapshot)=>{
    
    snapshot.docs.forEach(elm =>{
        let info = elm.data()
        document.querySelector('.all-teachers').insertAdjacentHTML("beforeend",`
            <div class="info-box">
            <div class="image-container">
                <img class="person-image" src="${info.imageUrl}" alt="Person's Image">
            </div>
            <div class="info-container">
                <h2>${info.name}</h2>
                <p>Post: ${info.post}</p>
                <p>Contact No: ${info.contactNo}</p>
                <p>Email: ${info.email}</p>
                <p>Technology: ${info.post}</p>
            </div>
            </div>
        `)
    })
}).catch(err=>{
    console.log(err);
})
