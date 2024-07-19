import { useEffect, useState  } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMedicineContext } from "../hooks/useMedicineContext";   
import Navbar from "../components/Navbar";
import PharmacistHeader from "../components/PharmacistHeader";
import AdminHeader from "../components/AdminHeader";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const SaleReport = () => {
    const { user } = useAuthContext();
    const { medicine, dispatch } = useMedicineContext();

    const [report, setReport] = useState([]);

    const [error, setError] = useState(null)
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [name, setName] = useState("");

    const [sum, setSum] = useState(0);

    const [type, setType] = useState("month");

    const handleChange = (event) => {
        setName(event.target.value);
      };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    
      function createData(MedicineID, Name, Date, Quantity, Price, OrderID) {
        return { MedicineID, Name, Date, Quantity, Price, OrderID };
      }



    

    const fetchMedicine = async () => {
        const med = {name:""};
        const response = await fetch('/pharmacist/filterMedicineName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(med),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(!response.ok){
            console.log(data.error);
        }
        if(response.ok){
            dispatch({type: 'SET_MEDICINE', payload: data});
        }
    }

    const generateReport = async (e) => {
        e.preventDefault();
        const input = {month};
        const response = await fetch('/pharmacist/saleReportMonth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(!response.ok){
            console.log(data.error);
            setError(data.error)
        }
        if(response.ok){
            console.log(data)
            setReport(data);
            setError(null)
            calculateSum(data);
        }
    }

    const generateReportDate = async (e) => {
        e.preventDefault();
        const input = {day, month, year};
        const response = await fetch('/pharmacist/saleReportDate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(!response.ok){
            console.log(data.error);
            setError(data.error);
            
        }
        if(response.ok){
            console.log(data)
            setReport(data);
            setError(null)
            calculateSum(data);
        }
    }

    const generateReportName = async (e) => {
        e.preventDefault();
        const input = {month, name};
        const response = await fetch('/pharmacist/saleReportName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(!response.ok){
            console.log(data.error);
            setError(data.error);
        }
        if(response.ok){
            console.log(data)
            setError(null)
            setReport(data);
            calculateSum(data);
        }
    }

    function calculateSum(data) {
        var sum = 0;
        data.forEach((row) => {
            sum += row.quantity * row.price;
        })
        setSum(sum);
    }




    useEffect(() => { 
        fetchMedicine()
    }, [dispatch, report,sum]);

    

    return (
        <div className="home">
            

            {user && user.user.pharmacist? <PharmacistHeader /> : null}
            {user && !user.user.patient && !user.user.pharmacist && !user.user.doctor? <AdminHeader /> : null}
                <div className='home-header'>
                <Navbar />
                </div>


            

            <div className="profile-main">
                <div className="workouts">
                    <div className="user-details">
                        <h2>Select Report Generation Options:</h2>
                        <button onClick={(e) => setType("month")}>Month</button>
                        <button onClick={(e) => setType("date")}>Date</button>
                        <button onClick={(e) => setType("name")}>Name</button>
                        <br></br>
                        <br></br>
                        {type == "month"?<Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '10ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                        <TextField InputProps={{inputProps: { max: 12, min: 1 }}} value= {month} onChange={(e) => setMonth(e.target.value)} type="number" label="Month" variant="filled" />
                        <br></br>
                        <button onClick={(e) => generateReport(e)}>Generate Report</button>
                        </Box>:null}

                        {type == "date"?<Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '10ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                        <TextField InputProps={{inputProps: { max: 31, min: 1 }}} value= {day} onChange={(e) => setDay(e.target.value)} type="number" label="Day" variant="filled" />
                        <TextField InputProps={{inputProps: { max: 12, min: 1 }}} value= {month} onChange={(e) => setMonth(e.target.value)} type="number" label="Month" variant="filled" />
                        <TextField value= {year} onChange={(e) => setYear(e.target.value)} type="number" label="Year" variant="filled" />
                        <br></br>
                        <button onClick={(e) => generateReportDate(e)}>Generate Report</button>
                        </Box>:null}
                        

                        { type == "name"?<Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '10ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <TextField InputProps={{inputProps: { max: 12, min: 1 }}} value= {month} onChange={(e) => setMonth(e.target.value)} type="number" label="Month" variant="filled" />

                                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} >
                                    <InputLabel >Medicine Name</InputLabel>
                                    <Select
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    label="Medicine Name"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {medicine && medicine.map((med) => (
                                        <MenuItem value={med.name}>{med.name}</MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                        <br></br>
                        <button onClick={(e) => generateReportName(e)}>Generate Report</button>
                        </Box>:null}

                        {error && <div className="error">{error}</div>}

                        
                    </div>
                    <h2 className="special-text"> Sales Report</h2>
                    <br></br>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700, maxWidth: 1200 }} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">MedicineID </StyledTableCell>
                                    <StyledTableCell align="left">Name</StyledTableCell>
                                    <StyledTableCell align="left">Date</StyledTableCell>
                                    <StyledTableCell align="left">Quantity</StyledTableCell>
                                    <StyledTableCell align="left">Price</StyledTableCell>
                                    <StyledTableCell align="left">OrderID</StyledTableCell>
                                    <StyledTableCell align="left">Total Cost</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {report && report.map((row) => (
                                    <StyledTableRow key={row.name}>
                                    <StyledTableCell align="left" scope="row">
                                        {row.medicineID}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.medicineName}</StyledTableCell>
                                    <StyledTableCell align="left">{row.date}</StyledTableCell>
                                    <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                                    <StyledTableCell align="left">{row.orderID}</StyledTableCell>
                                    <StyledTableCell align="left">{row.quantity * row.price}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                {report&& <StyledTableRow key={1.5}>
                                    <StyledTableCell align="left" scope="row"></StyledTableCell>
                                    <StyledTableCell align="left"></StyledTableCell>
                                    <StyledTableCell align="left"></StyledTableCell>
                                    <StyledTableCell align="left"></StyledTableCell>
                                    <StyledTableCell align="left"></StyledTableCell>
                                    <StyledTableCell align="left"></StyledTableCell>
                                    <StyledTableCell align="left">Total: {sum}</StyledTableCell>
                                    </StyledTableRow>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                </div>
            </div>
            
        </div>
    )
}
export default SaleReport;