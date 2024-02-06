import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
} from '@mui/material'
import style from '../../styles/modal'
import {Form, Field, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui'
import { useEffect } from 'react'
import { getBrands } from '../../store/brands'
import { getProducts } from '../../store/products'
import { getFirms } from '../../store/firms'
import { createPurchase, editPurchase } from '../../store/purchases'


const PurchaseModal = ({ open, closeModal, edit }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getProducts())
        dispatch(getFirms())
    }, [])
    
    const brands = useSelector((state) => state.brands.data)
    const products =useSelector ((state) => state.products.data)
    const firms = useSelector ((state) => state.firm.data)
    const modalData = useSelector((state) => state.ui.modalDaata)

    const initialValues = edit 
    ? modalData
    : { brand_id: '', product_id: '', firm_id: '', quantity: '',price: '' }

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false)
        if (edit)
        dispatch(editPurchase({...values, quantity: Number(values.quantity) }))
    else
    dispatch(createPurchase({ ...values, quantity: Number(values.quantity)}))
    actions.resetForm()
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
                            <FormControl sx={{ width: '100%', mb: 2 }}>
                                <InputLabel>Firm</InputLabel>
                                <Field as={Select} name='firm_id' label="Firm" required>
                                    {firms.map((firm) => (
                                        <MenuItem key={firm.id} value={firm.id}>
                                            {firm.name}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </FormControl>
                            <FormControl sx={{ width: '100%', mb: 2 }}>
                                <InputLabel>Brand</InputLabel>
                                <Field as={Select} name="brand_id" lable="Brand" required>
                                    {brands.map((brand) => (
                                        <MenuItem key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </MenuItem>
                                   ))}
                                </Field>
                            </FormControl>
                            <FormControl sx= {{ width: '100%', md: 2 }}>
                                <InputLabel>Products</InputLabel>
                                <Field as={Select} name="product_id" lable="Product" required>
                                    {products.map((product) => (
                                        <MenuItem key={product.id} value={product.id}>
                                            {product.anme}
                                        </MenuItem>

                                    ))}
                                </Field>
                            </FormControl>
                            <Field
                            as={TextField}
                            type="text"
                            name="quantity"
                            variant= "outlined"
                            label= "Quantity"
                            required
                            fullWidth
                            sx={{ mb: 2 }}
                            />
                            <Field
                            as={TextField}
                            type="text"
                            name= "price"
                            variant="outlined"
                            label="Price"
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                            />

                            <Stack direction="row" justifyContent="space-between">
                                <Button type="submit" variant="contained" size="large">
                                    {edit ? 'Update Purchase': 'Add New Purchase'}
                                </Button>
                                <Button
                                type='button'
                                variant='contained'
                                size='large'
                                color='error'
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

export default PurchaseModal