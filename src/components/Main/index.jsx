import React, {useState} from 'react'
import styles from "./Main.module.css"
import { useRef } from 'react'
// qeyd.bu obyekti yuxarida const initalform={}kimi de saxlamaq olar
export const Main = () => {
    const inputRef=useRef()
    const[message,setMessage]=useState("")

  const [data,setData]  =useState([])
const [form,setForm]=useState({
    fullName:"",
    age:"",
    position:"",
    salary:""
    })

const handleChange=(e)=>{
    const name=e.target.name
    const value=e.target.value
    const callback=(prevForm)=>{
        const newForm={...prevForm,[name]:value}
   return newForm
    }
setForm(callback)
}

 const handleSubmit=()=>{
    console.log("form",form);
// const newData=[...data]
// newData.unshift(form)
// setData(newData)
    setData(prevData=>[form,...prevData])

    setForm({ fullName:"",
    age:"",
    position:"",
    salary:""})
 }

 const handleRemoveList=(i)=>{
    console.log("i",i);
    const newData=data.filter((item,index)=>index !== i
)
setData(newData)
 }

//  const handleEdit=(i)=>{
//     const newData=data
//  }
// /////////////////////////////////////////////////////////////////////////////////////////////


const handleShare=()=>{
    console.log(inputRef);
    let value=inputRef.current.value
console.log("value",value);

inputRef.current.value=""
inputRef.current.focus()

}
//  console.log("data",data);

const disableBtn=!form.fullName?.trim() || !form.age?.trim() || !form.position?.trim() ||   !form.salary?.trim() 
  return (
    <div>
      <div className={styles.mainDiv}>
      <div className={styles.inputDiv}>
        <input type="text" name='fullName' value={form?.fullName} placeholder='fullName' onChange={handleChange}/>
        <input type="text" name='age' value={form?.age} placeholder='age' onChange={handleChange}/>
        <input type="text" name='position' value={form?.position} placeholder='position' onChange={handleChange}/>
        <input type="text" name='salary' value={form?.salary} placeholder='salary' onChange={handleChange}/>
       <button className={styles.addBtn} disabled={disableBtn} onClick={handleSubmit} >Add</button>
       <textarea ref={inputRef} onChange={(e)=>{ if (message.length < 50) {
      setMessage(e.target.value)} ;
    }} placeholder='write your message here' name="" id="" cols="30" rows="5"  disabled={message.length >= 50}></textarea>
     <span style={{ color: message.length >= 50 ? 'red' : 'black' }} >{message.length +"/"+50}</span>
       <button className={styles.shareBtn} onClick={handleShare}  disabled={message.trim() === ""} >Share</button>

        </div> 
<div className={styles.tableDiv}>
    <table>
        <thead>
            
            <tr>
            <th>fullName</th>
            <th>age</th>
            <th>position</th>
            <th>salary</th>


            </tr>
        </thead>
        <tbody>
        {
            data?.map((item,index)=>{
                return(
                    <tr key={"tr"+index}>
                    <td>{item.fullName}</td>
                    <td>{item.age}</td>
                    <td>{item.position}</td>
                    <td className={styles.delTd} >{item.salary} <button className={styles.delBtn} onClick={ ()=>{handleRemoveList(index)}} >del</button></td> 
                 
                    </tr>


                )
            })
        }    
          
        </tbody>
    </table>
</div>
      </div>
<div>
</div>
    </div>

  )
}

