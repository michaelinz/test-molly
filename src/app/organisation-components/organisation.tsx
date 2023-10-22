"use client"; // This is a client component
import datas from '../../../public/data/organisation.json'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './styles.css'

export default function Organisation({ repo }: any) {

  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState('')
  const [searchErrorMessage, setSearchErrorMessage] = useState('')

  const handleSelect = (item: any) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item))
    } else {
      setSelected(selected => [...selected, item])
    }
  }
  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [],
    );
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [],
    );
  };

  const handleExpanded = (item: any) => {
    if (expanded.includes(item)) {
      setExpanded(expanded.filter((x) => x !== item))
    } else {
      setExpanded(expanded => [...expanded, item])
    }
  }

  const searchHandle = (event: any) => {
    if (event.key === 'Enter' || event.type === 'click') {
      if (!searchValue || searchValue.length < 2) {
        setSearchErrorMessage('Please enter at least 2 characters')
        return;
      }
      setSearchErrorMessage('')
      setSelected([])
      searchEmployee(datas, searchValue.toLowerCase())
    }
    setSearchValue(event.target.value)
  }

  function searchEmployee(data: any, searchTerm: string) {
    for (const employee of data) {
      if (employee.name.toLowerCase().includes(searchTerm) || employee.position.toLowerCase().includes(searchTerm)) {
        setSelected(selected => [...selected, employee.id])
      }
      if (employee.subordinates && employee.subordinates.length > 0) {
        searchEmployee(employee.subordinates, searchTerm);
      }
    }
  }


  function renderBox(person:any){
    return  <Box data-testid="boxes"  onClick={() => handleSelect(person.id)} sx={{
      margin: 'auto',
      width: 250,
      height: '5.1rem',
      border: '1px solid #bababa',
      '&:hover': {
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      },
    }}
      {...(selected.indexOf(person.id) !== -1) ? { bgcolor: 'primary.main' } : {}}
    >
      <div className="flex">
        {
          person.avatar && <img src={person.avatar} alt="" className="w-20 h-20 " />
        }
        <div className="m-auto">
          <b className={
            (person.position == 'CEO/President' ? 'text-rose-950': '' ) +
            (person.position == 'Vice President' ? 'text-red-500': '' ) + 
            (person.position == 'Director' ? 'text-blue-500': '' ) + 
            (person.position == 'Manager' ? 'text-violet-500': '' )
          } >
            {person.position}
          </b>
          <br />
          {person.name}
        </div>
      </div>
    </Box>
  }

  function renderTree(data: any) {
    return data.map((item: any, index: number) => (
      <div key={item.id} className="mt-10  ">
        <div className={' mx-auto text-center'}>
          {renderBox(item)}
          {
            item.subordinates && item.subordinates.length > 0 && <div className="">
              <KeyboardArrowDownIcon data-testid="keyboard-arrow-down"  onClick={() => handleExpanded(item.id)} className={expanded.includes(item.id) ? "hidden" : ''} />
              <KeyboardArrowUpIcon onClick={() => handleExpanded(item.id)} className={expanded.includes(item.id) ? "" : 'hidden'} />
            </div>
          }
        </div>
        {
          item.subordinates && item.subordinates.length > 0 && expanded.includes(item.id) && <div className="flex justify-around flex-wrap">{renderTree(item.subordinates)}</div>
        }

      </div>
    ))
  }


  return (
      <div className="mt-20" style={{minHeight:'30rem'}}>
        <div className="text-center	">Organisation chart</div>
        <div className="flex">
          <TextField id="search" error={searchErrorMessage ? true : false} onKeyDown={searchHandle} helperText={searchErrorMessage} label="Search for person" variant="filled" />
          <Button className="ms-5" onClick={searchHandle} variant="outlined">Search</Button>
        </div>
        <Box sx={{ mb: 1 }}>
          <Button onClick={handleExpandClick}>
            {expanded.length === 0 ? 'View all organisation' : 'Collapse all'}
          </Button>
          <Button onClick={handleSelectClick}>
            {selected.length === 0 ? 'Select all' : 'Unselect all'}
          </Button>
        </Box>

        <div className=" ">
          {renderTree(datas)}
        </div>
      </div>
  )
}
