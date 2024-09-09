
import TextField from "@mui/material/TextField";
import { Autocomplete, Paper } from "@mui/material";


export default function AutoCompleteDropDown(props:any) {
  

  return (
    <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={props?.option}
  sx={{ width: 200 }}
  renderInput={(params) => <TextField {...params} label={props.placeholder} />}
  onChange={props.onChange}
/>
  );
}