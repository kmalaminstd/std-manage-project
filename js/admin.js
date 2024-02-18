// importts

import { auth } from "./firebase.config"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"

// select doms

const logOutBtnElm = document.querySelector(".admin-login-area .sign-out-btn")


// logOutBtnElm && console.log(logOutBtnElm);
// 




auth.onAuthStateChanged(user=>{
    if(user){
        if(!document.querySelector('.loadBar')){
            document.querySelector('.admin-login-area').innerHTML = `<button class="sign-out-btn">
            Log Out
            </button>`
        }
        
    }else{
        // formElm.style.display = "block"
        document.querySelector('.admin-login-area').innerHTML = `
        <form class="adm">
            <h3>Admin Login</h3>
            <table>
                <tr>
                    <th>Email:</th>
                    <td><input type="email" class="admin-email" required></td>
                </tr>
                <tr>
                    <th>Password:</th>
                    <td class="password-container">
                        <input type="password" class="admin-pass" id="password" required>
                        
                    </td>
                </tr>

                <tr>
                    <td colspan="2">
                        <button>Login</button>
                    </td>
                </tr>
            </table>
         </form>
        `
    }
})

document.addEventListener('submit', e=>{
    if(e.target.matches(".adm")){
        e.preventDefault()
        let formElm = document.querySelector('.adm')
        let emailVal = document.querySelector('.admin-email').value
        let passVal = document.querySelector('.admin-pass').value

        signInWithEmailAndPassword(auth, emailVal, passVal).then((user)=>{
            formElm.reset()
            formElm.style.display = "none"
            document.querySelector('.sign-out-btn').style.display = 'block'
        }).catch(err=>{
            console.log(err.code);
            console.log(err.message);
        })
    }
})




document.addEventListener('click', (e)=>{
    if(e.target.matches(".sign-out-btn")){
        signOut(auth).then(()=>{
            document.querySelector('.sign-out-btn').style.display = 'none'
            document.querySelector('.adm').style.display = 'block'
        }).catch(err=>{
            console.log(err.code);
            console.log(err.message);
        })
    }
})
