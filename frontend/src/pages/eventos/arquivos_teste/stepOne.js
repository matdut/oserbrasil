import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  //const nome1 = this.setActiveStep(1);  

  const handleBack = (event) => {
    this.props.nextStep();
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="container">   
    <form className={classes.root} noValidate autoComplete="off">
    
      <div className="form-row">          
         <div className="form-group col-md-4">       
            <TextField
                id="standard-basic"
                label="Número de ordem *"
                style={{ margin: 0 }}
                placeholder=""
                helperText=""           
                margin="normal"
              />
          </div>
          <div className="form-group col-md-4">       
            <TextField
                  id="standard-basic"
                  label="Nome Evento *"
                  style={{ margin: 0 }}
                  placeholder=""
                  helperText=""           
                  margin="normal"
                />
          </div>   
          <div className="form-group col-md-4">       
            <TextField
                  id="standard-basic"
                  label="Data do Evento *"
                  style={{ margin: 0 }}
                  placeholder=""
                  helperText=""           
                  margin="normal"
                />
          </div>   
      </div>     
      <div className="form-row">          
         <div className="form-group col-md-4">       
            <TextField
                id="standard-basic"
                label="CPF/CNPJ *"
                style={{ margin: 0 }}
                placeholder=""
                helperText=""           
                margin="normal"
              />
          </div>
          <div className="form-group col-md-4">       
            <TextField
                  id="standard-basic"
                  label="Nome *"
                  style={{ margin: 0 }}
                  placeholder=""
                  helperText=""           
                  margin="normal"
                />
          </div>   
          <div className="form-group col-md-4">      
          <InputLabel id="demo-simple-select-label">Tipo de Transporte</InputLabel> 
           <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={1}>EXECUTIVO</MenuItem>
              <MenuItem value={2}>VAN</MenuItem>              
           </Select>
          </div>   
      </div>     

      <Button onClick={handleBack}
              className={classes.backButton}>
          Cadastrar
      </Button>
    </form>
    </div>
  );
}