import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import {string,object,number} from 'yup';
import FormikControl from './productManagement/FormikControl';
import { useDispatch ,useSelector} from 'react-redux';
import { createOrder } from '../actions/cartActions';

export interface CheckOutStepperProps{
  total:number,
  cartItems:string,
  user_name:string,
  user_email:string,
  /*
   *total Actual amount with tax function 
   * 
  */
}

export default function CheckOutStepper(props:CheckOutStepperProps) {
    const dispatch=useDispatch();
    
    const validationSchemaLogin=object({
        name:string().required("Required !"),
        email:string().email("Invalid email address").required("Required !"),      
    });
    const validationSchemaAddress=object({
        line1:string().required("Required !"),
        line2:string().required("Required !"),
        city:string().required("Required !"),
        postal_code:number().typeError("postal code must be a number")
        .required("Required !"),
        country:string().required("Required"),
        state:string().required("Required")  
    });
    const validationPaymentMethod=object({
        payment_method:string().required("Payment method is required")
    })
    const payment_options=[
      {key:"Stripe",value:"Stripe"},
      {key:"Cash On Delivery",value:"cash On Delivery"}
    ]

    
    
  return (
      <CardContent>
        <FormikStepper
          initialValues={{
            name:props.user_name || "",
            email:props.user_email || "",
            line1:"",
            line2:"",
            city:"",
            postal_code:"",
            state:"",
            country:"",
            payment_method:""
          }}
          onSubmit={(values) => {
            const {line1,line2,city,postal_code,state,country,name,email,payment_method}=values
            const address=`${line1} ${line2} ${city} ${postal_code} ${state} ${country}`;
            const cartOrderItems=JSON.parse(props.cartItems);
            const order={
              o_customer_name:name,
              o_customer_email:email,
              o_shipping_addr:address,
              o_total:props.total,
              o_cartItems:cartOrderItems,
              o_payment_method:payment_method
            }
              console.log(order);
              dispatch(createOrder(order))

          }}
        >

                <FormikStep label="Personal Details"
                    validationSchema={validationSchemaLogin}
                >
                <Box paddingBottom={2}>
                <Field name="name" fullWidth component={TextField} label="Enter your name" />
                </Box>
                <Box paddingBottom={2}>
                <Field name="email" fullWidth component={TextField} label="Enter your email"/>
                </Box>
                </FormikStep>

                <FormikStep label="Shipping Address"
                validationSchema={validationSchemaAddress}
                >     
                <Box paddingBottom={2}>
                <Field name="line1" fullWidth component={TextField} label="Enter your address line 1"/>
                </Box>
                <Box paddingBottom={2}>
                <Field name="line2" fullWidth component={TextField} label="Enter your address line 2"/>
                </Box>

                <Box paddingBottom={2}>
                <Field name="city" component={TextField} label="Enter your city"/>
                </Box>
                <Box paddingBottom={2}>
                <Field name="postal_code" component={TextField} label="Enter your postal code"/>
                </Box>
                <Box paddingBottom={2}>
                <Field name="state"  component={TextField} label="Enter your state"/>
                </Box>
                <Box paddingBottom={2}>
                <Field name="country"  component={TextField} label="Enter your country"/>
                </Box>
                </FormikStep>

                <FormikStep label="Payment Method"
                validationSchema={validationPaymentMethod}>
                  <Box>
                     
                  <FormikControl
                  control="radio"
                  name="payment_method"
                  label="Select payment method"
                  options={payment_options}
                  
                  />
                    </Box>
                </FormikStep>
        </FormikStepper>
        
      </CardContent>
    
  );
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  className="mt-2 shadow-lg"
                  style={{borderRadius:"1.3rem",outline:"none",outlineColor:"none",border:"none",fontFamily:"'Times New Roman' Times sanserif"}}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              {!isLastStep() &&
              <Button
              className="mt-2 shadow"
              style={{borderRadius:"1.3rem",outline:"none",outlineColor:"none",border:"none",fontFamily:"'Times New Roman' Times sanserif"}}
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => setStep((s) => s + 1)}
            >
              {isSubmitting ? 'Submitting' : isLastStep() ? 'Place Order' : 'Next'}
            </Button>
              }
              {isLastStep() && <Button
                className="mt-2 shadow"
                style={{borderRadius:"1.3rem",outline:"none",outlineColor:"none",border:"none",fontFamily:"'Times New Roman' Times sanserif"}}
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="secondary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() && "Place Order"}
              </Button>}

            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}