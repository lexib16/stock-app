import { Box, Button, Modal, Stack, TextField } from '@mui/material'
import style from '../../styles/modal'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui'
import { createFirms,editFirm} from '../../store/firms'


const FirmsModal = ({ open, closeModal, edit }) => {
  const dispatch = useDispatch()

  let modalData = useSelector((state) => state.ui.modalData)

  const initialValues = edit
    ? modalData
    : { name: '', image: '', phone: '', address: '' }

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)
    if (edit) dispatch(editFirm(values))
    else dispatch(createFirms(values))
    actions.resetForms()
    closeModal()
  }

  const handleClose = () => {
    dispatch(uiActions.setModalData({}))
    closeModal()
  }

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Stack spacing={4}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                as={TextField}
                type="text"
                name="name"
                variant="outlined"
                label="Firms Name"
                required
                fullWidth
                sx={{ mb: 2 }}
              ></Field>
              <Field
                as={TextField}
                type="text"
                name="image"
                variant="outlined"
                label="Image Url"
                required
                fullWidth
                sx={{ mb: 2 }}
              ></Field>
              <Field
                as={TextField}
                type="text"
                name="phone number"
                variant="outlined"
                label="Phone Number"
                required
                fullWidth
                sx={{ mb: 2 }}
              ></Field>
              <Field
                as={TextField}
                type="text"
                name="address"
                variant="outlined"
                label="Firms Address"
                required
                fullWidth
                sx={{ mb: 2 }}
              ></Field>

              <Stack direction="row" justifyContent="space-between">
                <Button type="submit" variant="contained" sixe="large">
                  {edit ? 'Update Firm' : 'Add New Firm'}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Box>
    </Modal>
  )
}

export default FirmsModal