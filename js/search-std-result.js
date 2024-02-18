import { getDoc, getDocs } from "firebase/firestore"
import { studentColRef } from "./firebase.config"

// doms
const searchFormElm = document.querySelector('.srch-std-res')
const stdRollElm = searchFormElm.querySelector('#rollNo')
const stdRegElm = searchFormElm.querySelector('#regNo')
const stdSessElm = searchFormElm.querySelector('#session')
const stdResOutputElm = document.querySelector('.std-res')


// getting form value
const gettingValue = (roll, reg, sess)=>{
    let rollVal = roll.value
    let regVal = reg.value
    let sessVal = sess.value

    return{
        rollVal,
        regVal,
        sessVal
    }
}

// submitting form
searchFormElm.addEventListener('submit', e=>{
    e.preventDefault()
    const {rollVal, regVal, sessVal} = gettingValue(stdRollElm, stdRegElm, stdSessElm)

    getDocs(studentColRef).then(snapshot=>{
        snapshot.docs.map(elm =>{
            let info = elm.data()
            if(Number(info.studentRoll) === Number(rollVal) && Number(info.studentReg) === Number(regVal) && info.studentSessoin === sessVal){
                stdResOutputElm.innerHTML = `
<div class="res">
 <h3>Student Result</h3>
    <table>
        <tr>
            <th>Name:</th>
            <td>${info.studentName}</td>
        </tr>
        <tr>
            <th>Roll:</th>
            <td>${info.studentRoll}</td>
        </tr>
        <tr>
            <th>Registration:</th>
            <td>${info.studentReg}</td>
        </tr>
        <tr>
            <th>Session:</th>
            <td>${info.studentSessoin}</td>
        </tr>
    </table>
</div>
`
                console.log();
                info.results && info.results.map((e)=>{
                    document.querySelector('.std-res table').insertAdjacentHTML('beforeend', `
                                <tr>
                                <th>Semester:</th>
                                <td>${e.semester}</td>
                            </tr>
                            <tr>
                                <th>Result:</th>
                                <td>${e.result}</td>
                            </tr>
                                `)
                })

            }
        })

    }).catch(err=>{
        console.log(err);
    })
})

// stdResOutputElm.innerHTML = `
// <h3 style="color: red">Student Result Not Found</h3>
// `

// info.results.map(e =>{
//     document.querySelector('.std-res table').insertAdjacentHTML('beforeend', `
//     <tr>
//     <th>Semester:</th>
//     <td>${e.semester}</td>
// </tr>
// <tr>
//     <th>Result:</th>
//     <td>${e.result}</td>
// </tr>
//     `)
// })

// console.log(elm.data());
// stdResOutputElm.innerHTML = `
// <div class="res">
//  <h3>Student Result</h3>
//     <table>
//         <tr>
//             <th>Name:</th>
//             <td>${info.studentName}</td>
//         </tr>
//         <tr>
//             <th>Roll:</th>
//             <td>${info.studentRoll}</td>
//         </tr>
//         <tr>
//             <th>Registration:</th>
//             <td>${info.studentReg}</td>
//         </tr>
//         <tr>
//             <th>Session:</th>
//             <td>${info.studentSessoin}</td>
//         </tr>
//     </table>
// </div>
// `