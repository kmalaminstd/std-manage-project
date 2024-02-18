import { v4 as uuid} from "uuid"
import Toastify from 'toastify-js'
// doms

import { addDoc } from "firebase/firestore"
import { studentColRef } from "./firebase.config"

const formElm = document.querySelector('.manage-std form')
const stdNameElm = formElm.querySelector('#studentName')
const departElm = formElm.querySelector('#department')
const shiftElm = formElm.querySelector('#shift')
const rollElm = formElm.querySelector('#rollNo')
const regElm = formElm.querySelector('#regNo')
const sessionElm = formElm.querySelector('#session')
const distElm = formElm.querySelector("#district")


// getting form value
function formValue(name, shift, roll, reg, sess, dist, dept){
    let nameVal = name.value
    let shiftVal = shift.value
    let rollVal = roll.value
    let regVal = reg.value
    let sessVal = sess.value
    let distVal = dist.value
    let departVal = dept.value 
    
    return{
        nameVal, shiftVal, rollVal, regVal, sessVal, distVal, departVal
    }
}

// submitting to database
function submitToDatabase(name, shift, roll, reg, sess, dist, depart){


    addDoc(studentColRef, {
        studentName: name,
        studentRoll: roll,
        studentShift: shift,
        studentReg: reg,
        studentSessoin: sess, 
        setudentDistrict: dist,
        studentDept: depart,
        uniqueValue: uuid()
    }).then(()=>{
        Toastify({
            text: 'Student Information added successfully',
            duration: 3000
        }).showToast()
        formElm.reset()
    }).catch((err)=>{
        console.log(err.code);
        console.log(err.message);
    })

}

// submit form
formElm.addEventListener("submit", e=>{
    e.preventDefault()

    const {nameVal, shiftVal, rollVal, regVal, sessVal, distVal, departVal} = formValue(stdNameElm, shiftElm, rollElm, regElm, sessionElm, distElm, departElm)

    submitToDatabase(nameVal, shiftVal, rollVal, regVal, sessVal, distVal, departVal)

})