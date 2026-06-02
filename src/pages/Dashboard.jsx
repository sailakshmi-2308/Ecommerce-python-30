import React from 'react'

export default function Dashboard() {

   const admin= JSON.parse(localStorage.getItem("admin"))
 console.log(admin)
   return (
    <div>
        <h1>Admin Dashboard</h1>
        <h2>Welsome: {admin?.adminemail}</h2>
        <h3>Admin ID:{admin?.adminid}</h3>
   <button>go to admin products</button>
    </div>
  )
}


// admin?.adminemail


// if(admin){
//     admin.adminemail
// }
// else{
//     undefined
// }