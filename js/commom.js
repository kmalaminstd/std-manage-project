
import { auth } from "./firebase.config";

let pagePathName = location.pathname
let pageHost = location.host

let localhostHost = 'http://localhost:1234'
let liveHost = ""

// document.addEventListener('DOMContentLoaded', ()=>{
    
    
//     window.addEventListener('load', ()=>{
//         loadingBar.style.display = 'none'
//     })
// })

// console.log(location);
const unsubsribe = auth.onAuthStateChanged(user=>{
    if(!user && pagePathName === '/all-students.html'){
        location.href = `${localhostHost}/admin.html`  
    }

    if(!user && pagePathName === '/manage-teacher.html'){
        location.href = `${localhostHost}/admin.html`
    }

    if(!user && pagePathName === '/manage-std.html'){
        location.href = `${localhostHost}/admin.html`
    }
})


// preventing to authenticate user to enter page
// console.log(unsubsribe);

