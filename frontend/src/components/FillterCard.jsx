import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import React, { useEffect, useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { useDispatch } from 'react-redux'
import { setSearchQurey } from '@/redux/jobSlice'

const filterData = [
    {
        filtertype : "Location",
        array:["Chennai","Kolkata","Ahmedabad","Jaipur","Lucknow"]
    },
    {
        filtertype : "Industry",
        array:["Frontend Developer","Backend Developer","Fullstack Developer","Data Science"]
    },
    {
        filtertype : "Salary",
        array:["0-60k","60k-1.2lakh","1.2lakh to 3lakh","3lakh+"]
    },
]

function FillterCard() {

    const dispatch = useDispatch();

    const [selectedValue,setSelectedValue] = useState('');
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchQurey(selectedValue));
    },[selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-md shadow-2xl'>
        <h1 className='font-bold text-lg text-primary'>Job Filters</h1>
        <hr className='mt-3'/>
        <RadioGroup value={selectedValue} onValueChange = {changeHandler}>
            {
                filterData.map((data,index)=>(
                    <div key={data.filtertype} className="mb-4">
                        <h1 className='font-bold text-base text-accent mb-2'>{data.filtertype}</h1>
                        {
                            data.array.map((item,idx)=>{
                                const itemId = `r${index}-${idx}`
                                return(
                                    <div className='flex items-center space-x-2 m-2' key={itemId}>
                                        <RadioGroupItem id={itemId} value={item}/>
                                        <Label htmlFor={itemId} >{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FillterCard