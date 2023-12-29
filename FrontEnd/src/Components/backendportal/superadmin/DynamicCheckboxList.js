import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useRef, useState } from 'react';

export default function DynamicCheckboxList({ fnUserList, functionSubmit, companyfunctionData, functionAlert }) {
  const [selectedUser, setSelectedUser] = useState(false);
  const [id, setId] = useState('');
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const autocompleteRef = useRef(null);
debugger;
  const initialCheckboxStates = companyfunctionData.map(item => ({
    ...item,
    checked: item.check === true,
    submenuList: item.submenuList ? item.submenuList.map(submenu => ({ ...submenu, checked: item.check === true })) : [],
  }));
  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);

  const prevCheckedIdsRef = useRef([]);
  const prevIdRef = useRef(null);

  // const handleChange = (index) => (event) => {
  //   const newCheckboxStates = [...checkboxStates];
  //   newCheckboxStates[index].checked = event.target.checked;

  //   // If menu item has submenus, also update their checked status
  //   if (newCheckboxStates[index].submenuList && newCheckboxStates[index].submenuList.length > 0) {
  //     newCheckboxStates[index].submenuList.forEach(submenu => {
  //       submenu.checked = event.target.checked;
  //     });
  //   }

  //   setCheckboxStates(newCheckboxStates);
  // };

  // const handleSubmenuChange = (menuIndex, submenuIndex) => (event) => {
  //   const newCheckboxStates = [...checkboxStates];
  //   newCheckboxStates[menuIndex].submenuList[submenuIndex].checked = event.target.checked;

  //   // If all submenus are checked, also check the main menu
  //   newCheckboxStates[menuIndex].checked = newCheckboxStates[menuIndex].submenuList.every(submenu => submenu.checked);

  //   setCheckboxStates(newCheckboxStates);
  // };
  const handleChange = (index) => (event) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index].checked = event.target.checked;

    // If menu item has submenus, also update their checked status
    if (newCheckboxStates[index].submenuList && newCheckboxStates[index].submenuList.length > 0) {
      newCheckboxStates[index].submenuList.forEach(submenu => {
        submenu.checked = event.target.checked;
      });
    }

    // If unchecking, check if all sibling submenus are unchecked to uncheck the main menu
    if (!event.target.checked && newCheckboxStates[index].submenuList) {
      if (newCheckboxStates[index].submenuList.every(submenu => !submenu.checked)) {
        newCheckboxStates[index].checked = false;
      }
    }

    setCheckboxStates(newCheckboxStates);
  };


  const handleSubmenuChange = (menuIndex, submenuIndex) => (event) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[menuIndex].submenuList[submenuIndex].checked = event.target.checked;
  
    // Check the main menu if any submenu is checked
    newCheckboxStates[menuIndex].checked = newCheckboxStates[menuIndex].submenuList.some(submenu => submenu.checked);
  
    // Set indeterminate if some submenus are checked but not all
    if (newCheckboxStates[menuIndex].submenuList.some(submenu => submenu.checked) && !newCheckboxStates[menuIndex].submenuList.every(submenu => submenu.checked)) {
      newCheckboxStates[menuIndex].indeterminate = true;
    } else {
      newCheckboxStates[menuIndex].indeterminate = false;
    }
  
    // If all submenus are unchecked, uncheck the main menu
    if (!newCheckboxStates[menuIndex].submenuList.some(submenu => submenu.checked)) {
      newCheckboxStates[menuIndex].checked = false;
    }
  
    setCheckboxStates(newCheckboxStates);
  };

  const handleSelectAllChange = (event) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates.forEach((checkbox) => {
      checkbox.checked = event.target.checked;

      // If menu item has submenus, also update their checked status
      if (checkbox.submenuList && checkbox.submenuList.length > 0) {
        checkbox.submenuList.forEach(submenu => {
          submenu.checked = event.target.checked;
        });
      }
    });
    setCheckboxStates(newCheckboxStates);
  };

  const internalHandleSubmit = () => {
    const checkedItems = checkboxStates.filter((checkbox) => checkbox.checked);
    const checkedIds = checkedItems.map((checkbox) => checkbox.id);
    debugger;

    // Extract selected submenu IDs
    const selectedSubmenuIds = checkedItems
      .filter((checkbox) => checkbox.submenuList && checkbox.submenuList.length > 0)
      .flatMap((checkbox) => checkbox.submenuList.filter((submenu) => submenu.checked).map((submenu) => submenu.id));

    const allCheckedIds = [...checkedIds, ...selectedSubmenuIds];
    if (selectedUser) {
      if (JSON.stringify(prevCheckedIdsRef.current) !== JSON.stringify(allCheckedIds) || prevIdRef.current !== id) {
        functionSubmit(checkedIds,selectedSubmenuIds, id);
        setSelectedUser(false);
        setId('');
        setAutocompleteValue(null);
        prevCheckedIdsRef.current = allCheckedIds;
        prevIdRef.current = id;
      } else {
        functionAlert('info', 'You have not made any changes. To update function access, make some changes.');
      }
    } else {
      functionAlert('info', 'Please select a user for function access.');
    }
  };

  // const getUserSelectedVal = (event, value) => {
  //   debugger;
  //   if (value && value.FunctionList && Array.isArray(value.FunctionList)) {
  //     const selectedFunctionIds = new Set(value.FunctionList);
  //     const newCheckboxStates = companyfunctionData.map(item => ({
  //       ...item,
  //       checked: selectedFunctionIds.has(item.id),
  //       submenuList: item.submenuList ? item.submenuList.map(submenu => ({
  //         ...submenu,
  //         checked: selectedFunctionIds.has(submenu.id),
  //       })) : [],
  //     }));
  //     setCheckboxStates(newCheckboxStates);
  //   } else {
  //     const newCheckboxStates = companyfunctionData.map(item => ({
  //       ...item,
  //       checked: false,
  //       submenuList: item.submenuList ? item.submenuList.map(submenu => ({
  //         ...submenu,
  //         checked: false,
  //       })) : [],
  //     }));
  //     setCheckboxStates(newCheckboxStates);
  //   }
  //   if (value && value.id) {
  //     setId(value.id);
  //     setSelectedUser(true);
  //     setAutocompleteValue(value);
  //   } else {
  //     setId('');
  //     setSelectedUser(false);
  //     setAutocompleteValue(null);
  //   }
  // };
  const getUserSelectedVal = (event, value) => {
    if (value && value.FunctionList && Array.isArray(value.FunctionList)) {
      const selectedFunctionIds = new Set(value.FunctionList.map(item => item._id));
      const selectedSubMenuIds = new Set(
        value.FunctionList.flatMap(item =>
          item.submenuList ? item.submenuList : []
        )
      );
  debugger;
      const newCheckboxStates = companyfunctionData.map(item => {
        let itemUpdated; 
        if(item.menuIndicator===2){
          itemUpdated = item.submenuList.map(subItem =>{
            console.log(subItem);
            const isChecked2 =  selectedSubMenuIds.has(subItem.id);
            console.log(subItem.id,subItem);
            return {
              ...subItem,
              checked: isChecked2,
            }
          })
         }
         if (itemUpdated && item.submenuList) {
          item.submenuList = itemUpdated;
        }
        const isChecked = selectedFunctionIds.has(item.id);
        
        return {
          ...item,
          checked: isChecked,
        };
      });
  
      setCheckboxStates(newCheckboxStates);
    } else {
      const newCheckboxStates = companyfunctionData.map(item => ({
        ...item,
        checked: false,
        submenuList: item.submenuList ? item.submenuList.map(submenu => ({
          ...submenu,
          checked: false,
        })) : [],
      }));
  
      setCheckboxStates(newCheckboxStates);
    }
  
    if (value && value.id) {
      setId(value.id);
      setSelectedUser(true);
      setAutocompleteValue(value);
    } else {
      setId('');
      setSelectedUser(false);
      setAutocompleteValue(null);
    }
  };
  
  console.log('checkboxStates',checkboxStates);
debugger;
  // const checkboxList = [
  //   <FormControlLabel
  //     key="selectAll"
  //     label="Select All"
  //     control={<Checkbox checked={checkboxStates.every((checkbox) => checkbox.checked)} onChange={handleSelectAllChange} />}
  //   />,
  //   <br key="lineBreak" />,
  //   ...checkboxStates.map((checkbox, menuIndex) => (
  //     <React.Fragment key={`menu-${menuIndex}`}>
  //       <FormControlLabel
  //         key={menuIndex}
  //         label={`${checkbox.name}`}
  //         control={<Checkbox checked={checkbox.checked} onChange={handleChange(menuIndex)} />}
  //       />
  //       <br key={`lineBreak-${menuIndex}`} />

  //       {checkbox.menuIndicator === 2 && checkbox.submenuList && checkbox.submenuList.length > 0 && (
  //         <React.Fragment>
  //           {checkbox.submenuList.map((submenu, submenuIndex) => (
  //             <>
  //             <FormControlLabel
  //               key={`submenu-${menuIndex}-${submenuIndex}`}
  //               label={`${submenu.name}`}
  //               control={<Checkbox checked={submenu.checked} onChange={handleSubmenuChange(menuIndex, submenuIndex)} />}
  //             />
  //             <br key={`lineBreak-submenu-${menuIndex}-${submenuIndex}`} />
  //             </>
  //           ))}
  //         </React.Fragment>
  //       )}
  //     </React.Fragment>
  //   )),
  // ];
  const checkboxList = [
    <FormControlLabel
      key="selectAll"
      label="Select All"
      control={<Checkbox checked={checkboxStates.every((checkbox) => checkbox.checked)} onChange={handleSelectAllChange} />}
    />,
    <br key="lineBreak" />,
    ...checkboxStates.map((checkbox, menuIndex) => (
      <React.Fragment key={`menu-${menuIndex}`}>
        <FormControlLabel
          key={menuIndex}
          label={`${checkbox.name}`}
          control={
            <Checkbox
              checked={checkbox.checked}
              onChange={handleChange(menuIndex)}
              indeterminate={
                checkbox.submenuList &&
                checkbox.submenuList.length > 0 &&
                checkbox.submenuList.some((submenu) => submenu.checked) &&
                !checkbox.submenuList.every((submenu) => submenu.checked)
              }
            />
          }
        />
        <br key={`lineBreak-${menuIndex}`} />
  
        {checkbox.menuIndicator === 2 && checkbox.submenuList && checkbox.submenuList.length > 0 && (
          <Grid container spacing={2} sx={{ marginLeft: '1cm' }}>
            {checkbox.submenuList.map((submenu, submenuIndex) => (
              <Grid item key={`submenu-${menuIndex}-${submenuIndex}`} sx={{ marginRight: '1cm' }}>
                <FormControlLabel
                  label={`${submenu.name}`}
                  control={<Checkbox checked={submenu.checked} onChange={handleSubmenuChange(menuIndex, submenuIndex)} />}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </React.Fragment>
    )),
  ];
  

  return (
    <div style={{ minHeight: '10cm', width: '100%' }}>
      <Grid container spacing={2} sx={{ margin: 'auto' }}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Autocomplete
            ref={autocompleteRef}
            disablePortal
            id="combo-box-demo"
            options={fnUserList}
            getOptionLabel={(option) => option.label}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Select User" />}
            onChange={getUserSelectedVal}
            value={autocompleteValue}
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          <Button variant="contained" color="primary" onClick={internalHandleSubmit}>
            Your Button
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        {selectedUser && checkboxList}
      </Grid>
    </div>
  );
}
