import { addDoc, arrayUnion, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db, studentColRef } from "./firebase.config";
import { Toastify } from "toastify-js"


// doms
const stdTable = document.querySelector('.student-list-table table')


const studentResFormElm = document.querySelector(".std-res-upd form")
const stdResSemElm = studentResFormElm.querySelector('#std-semester')
const stdResGpaElm = studentResFormElm.querySelector("#std-gpa")

const filterFormElm = document.querySelector('.filter-option form')
const deptFillElm = filterFormElm.querySelector('#dept-fil')
const shiftFillElm = filterFormElm.querySelector('#shift-fil')
const sessFillElm = filterFormElm.querySelector('#sess-fil')

const stdUpdForm = document.querySelector('.std-res-upd')
const stdFormClsBtnElm = document.querySelector('.close-icon')



stdFormClsBtnElm.addEventListener('click', ()=>{
    stdUpdForm.style.display = 'none'
})

// getting data form database
let slNo = 1

// onSnapshot(studentColRef, snapshot=>{
//         snapshot.docs.map(elm=>{
//             let info = elm.data()
            

//                 stdTable.insertAdjacentHTML("beforeend", `
//                     <td>${slNo++}.</td>
//                     <td>${info.studentName}</td>
//                     <td>${info.studentDept} technology</td>
//                     <td>${info.studentShift === "firstShift" && 'First Shift'|| info.studentShift === "secondShift" && 'Second Shift'}</td>
//                     <td>${info.studentRoll}</td>
//                     <td>${info.studentReg}</td>
//                     <td>${info.studentSessoin}</td>
//                     <td>${info.setudentDistrict}</td>
//                     <td><button class="${elm.id} updt-res"> Update Result</button> <button class="${elm.id} delt-std">Delete</button></td>
//                 `)
            
    
    
//         })
// })



// getting student unique id from btn
function getUniqueId(elm){
    return elm[0]
}

document.addEventListener('click', e=>{
    if(e.target.matches(".updt-res")){
        const id = getUniqueId(e.target.classList)
        document.querySelector('.std-res-upd').style.display = "block"

        getDocs(studentColRef).then((user)=>{
            user.docs.map(elm=>{
                if(elm.id === id){
                    let info = elm.data()
                    console.log(info);

                    studentResFormElm.querySelector('.headInfo').innerHTML = `
                        <h3>Student Roll: ${info.studentRoll}</h3>
                        <h3>Student Registration: ${info.studentReg}</h3>
                    `

                    studentResFormElm.addEventListener('submit', e=>{
                        e.preventDefault()
                    
                        const stdResSemVal = stdResSemElm.value
                        const stdResGpaVal = stdResGpaElm.value
                    
                        const updateRef = doc(studentColRef, id)
                        
                        if(stdResSemVal && stdResGpaVal){

                            updateDoc(updateRef, {
                                results: arrayUnion({
                                    semester: stdResSemVal,
                                    result: stdResGpaVal
                                })
                            }).then(()=>{
                                location.reload()
                                
                                studentResFormElm.reset()
                                studentResFormElm.style.display = "none"
                                
                            }).catch(err=>{
                                console.log(err);
                            })
                        }else{
                            alert("Something went wrong")
                        }

                    })
                }
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    if(e.target.matches(".delt-std")){
        const id = getUniqueId(e.target.classList)
        
        const docRef = doc(studentColRef, id)

        deleteDoc(docRef).then(()=>{
            Toastify({
                text: "Data Deleted Successfully",
                duration: 3000
            }).showToast()
            location.reload()
        }).catch(err=>{
            console.log(err.code);
            console.log(err.message);
        })

    }
})


// filter student 

filterFormElm.addEventListener('submit', e=>{
    e.preventDefault()
    
    let deptFilVal = deptFillElm.value
    let shiftFilVal = shiftFillElm.value
    let sessFillVal = sessFillElm.value

    // console.log(deptFilVal, shiftFilVal, sessFillVal);

    if(deptFilVal && shiftFilVal && sessFillVal){

        console.log(deptFilVal, shiftFilVal, sessFillVal);
        getDocs(studentColRef).then((snap)=>{

            if(document.querySelectorAll(".student-list-table table tbody tr")){
                document.querySelectorAll(".student-list-table table tbody tr").forEach(elm => elm.remove())
            }
            
            snap.docs.filter(elm =>{
                
                if(elm.data().studentShift === shiftFilVal && elm.data().studentSessoin === sessFillVal && elm.data().studentDept === deptFilVal){
                    let info = elm.data()
                    console.log(info);
                    



                   document.querySelector(".student-list-table table tbody").insertAdjacentHTML("beforeend", 
                   `
                   
                   <tr>
                        <td>${slNo++}.</td>
                        <td>${info.studentName}</td>
                        <td>${info.studentDept} technology</td>
                        <td>${info.studentShift === "firstShift" && 'First Shift'|| info.studentShift === "secondShift" && 'Second Shift'}</td>
                        <td>${info.studentRoll}</td>
                        <td>${info.studentReg}</td>
                        <td>${info.studentSessoin}</td>
                        <td>${info.setudentDistrict}</td>
                        <td><button class="${elm.id} updt-res"> Update Result</button> <button class="${elm.id} delt-std">Delete</button></td>
                   </tr>
                   `
                   )

                }
            })
        }).catch(err=>{
            console.log(err);
        })
    }else{
        alert("Something went wrong!!!")
    }
})