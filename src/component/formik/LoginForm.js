import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import { Box, Button } from '@mui/material'

function LoginForm () {
  
  const initialValues = {
    name: '',
    password: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required'),
    password: Yup.string().required('Required')
  })

  const onSubmit = values => {
    console.log('Form data', values)
  }

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
          <Form>
          <Box sx={{ margin: '1rem 0' }}>
            <FormikControl
              control='muiInput'
              type='name'
              label='name'
              name='name'
            />
            </Box>
            <Box sx={{ margin: '1rem 0' }}>
            <FormikControl
              control='muiInput'
              type='password'
              label='Password'
              name='password'
            />
 </Box>

            <Button type='submit' disabled={!formik.isValid}>Submit</Button>
          </Form>
        )
      }}
    </Formik>
   
  )
}

export default LoginForm