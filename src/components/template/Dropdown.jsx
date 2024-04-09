import React from 'react'

const Dropdown = ({title,options,funct}) => {
  return (
    <div className='select'>
        <select onChange={funct} defaultValue='0' name="format" id="format">
            <option value="0" disabled>
                {title}
            </option>
            {options.map((v,index)=><option key={index}  value={v} >{v.toUpperCase()}</option>)}
        </select>
    </div>
  )
}

export default Dropdown