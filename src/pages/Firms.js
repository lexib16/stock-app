import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
  } from '@mui/material'
  import { useEffect, useState } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { deleteFirm, getFirms } from '../store/firms'
  import StyledCard from '../components/StyledCard'
  import FirmModal from '../components/Modals/FirmModal'
  import { uiActions } from '../store/ui'
  import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
  import MapIcon from '@mui/icons-material/Map'
  import MapView from '../components/MapView'
  import { geocode } from '../Geocode'
  
  const Firms = () => {
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [view, setView] = useState('card')
    const [selected, setSelected] = useState(null)
  
    const closeModal = () => {
      setOpen(false)
      setEdit(false)
    }
  
    const openModal = () => {
      setOpen(true)
    }
  
    const dispatch = useDispatch()
    const firms = useSelector((state) => state.firm.data)
  
    useEffect(() => {
      dispatch(getFirms())
    }, [])
  
    const [lat, setLat] = useState(38.92)
    const [lng, setLng] = useState(-77.22)
    const getGeocode = async (address) => {
      const { lat, lng } = await geocode(address)
      setLat(lat)
      setLng(lng)
    }
  
    useEffect(() => {
      if (firms?.[selected]?.address) getGeocode(firms[selected].address)
    }, [selected])
  
    const handleDelete = (id) => {
      dispatch(deleteFirm(id))
    }
  
    const handleEdit = (firm) => {
      setEdit(true)
      setOpen(true)
      dispatch(uiActions.setModalData(firm))
    }
  
    return (
      <Box>
        <Stack direction="row" justifyContent="space-between" p={5}>
          <Typography variant="h5" component="h1" color="inherit" noWrap>
            Firms
          </Typography>
          <Button variant="contained" onClick={() => openModal()}>
            New Firm
          </Button>
        </Stack>
  
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" pb={1}>
            <Box flexGrow={1} />
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(e, newView) => setView(newView)}
              sx={{ bgColor: 'white' }}
              sixe="small"
            >
              <ToggleButton value="card">
                <ViewCarouselIcon />
              </ToggleButton>
              <ToggleButton value="map">
                <MapIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
  
          {view === 'card' && (
            <Grid container spacing={2}>
              {firms.map((firm) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                  key={firm.id}
                  onClick={() => {
                    setSelected(firm.id)
                  }}
                >
                  <StyledCard
                    item={firm}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    selected={selected}
                  />
                </Grid>
              ))}
            </Grid>
          )}
  
          {view === 'map' && <MapView lat={lat} lng={lng} />}
        </Container>
  
        <FirmModal open={open} edit={edit} closeModal={closeModal} />
      </Box>
    )
  }
  
  export default Firms