import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StyledCard from '../components/StyledCard'
import { deleteBrand, getBrands } from '../store/brands'
import BrandModal from '../components/Modals/BrandModal'
import { uiActions } from '../store/ui'

const Brands = () => {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  const closeModal = () => {
    setOpen(false)
    setEdit(false)
  }
  const openModal = () => {
    setOpen(true)
  }

  const brands = useSelector((state) => state.brands.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBrands())
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteBrand(id))
  }

  const handleEdit = (brand) => {
    setEdit(true)
    setOpen(true)
    dispatch(uiActions.setModalData(brand))
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography variant="h5" component="h1" color="inherit" noWrap>
          Brands
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Brand
        </Button>
      </Stack>

      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {brands.map((brand) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={brand.id}>
              <StyledCard
                item={brand}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <BrandModal open={open} closeModal={closeModal} edit={edit} />
    </Box>
  )
}

export default Brands