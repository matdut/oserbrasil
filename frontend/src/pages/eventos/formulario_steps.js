import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import Pagina1 from './stepOne';
import Pagina2 from './stepTwo';
import Menu_evento from '../eventos/menu_evento';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Cadastro de evento', 'Cadastro de Translados', 'Finalizar'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <Formulario1
           activeStep={this.state.activeStep}
           prevActiveStep={this.state.prevActiveStep}
        />
      );
    case 1:
      return <Pagina2 />;
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const currentStep = 1;
  const nome = "teste";

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
        <Menu_evento />
     <br/>
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button 
                 disabled={activeStep === 0}
                 variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>   
  );
}

function Formulario1(props) {
    if (props.currentStep !== 2) {
      return null
    } 
 
    return(
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
    
          <Button onClick={this.handleBack}
                    className={classes.backButton}>
                       Cadastrar
          </Button>
        </form>
      </div>  
    );
  }