import React from 'react'
import {
  Col,
  Row,
  Label,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CustomInput
} from 'reactstrap'
import Select from 'react-select'

const PasosSalud = React.forwardRef((props, ref) => {
  const [form, setForm] = React.useState({
    rh: '',
    eps: '',
    medicinaPrepagada: '',
    enfermedades: [],
    vacunas: [],
    intervenciones: [],
    antecedentes: []
  })

  const handleCheckList = (e, list) => {
    const { name, checked } = e.target
    let newList = form[list]

    if (checked) {
      newList.push(name)
      setForm({ ...form, [list]: newList })
    } else {
      const index = newList.indexOf(name)
      newList.splice(index, 1)
      setForm({ ...form, [list]: newList })
    }
  }

  const handleSelect = e => {
    const { name, value } = e
    setForm({ ...form, [name]: value })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const isValidated = () => {
    return true
  }

  React.useImperativeHandle(ref, () => ({
    isValidated: () => isValidated(),
    state: form
  }))

  return (
    <>
      <h4 className='info-text'>
        Registre la ficha médica
      </h4>
      <Row>
        <Col sm={4}>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-vial' />
              </InputGroupText>
            </InputGroupAddon>
            <Select
              className='react-select'
              classNamePrefix='react-select'
              name='rh'
              onChange={handleSelect}
              options={[
                { label: 'Seleccione tipo de sangre', isDisabled: true },
                { name: 'rh', value: 'A+', label: 'A+' },
                { name: 'rh', value: 'A-', label: 'A-' },
                { name: 'rh', value: 'B+', label: 'B+' },
                { name: 'rh', value: 'B-', label: 'B-' },
                { name: 'rh', value: 'AB+', label: 'AB+' },
                { name: 'rh', value: 'AB-', label: 'AB-' },
                { name: 'rh', value: 'O+', label: 'O+' },
                { name: 'rh', value: 'O-', label: 'O-' }
              ]}
              placeholder='Tipo de sangre...'
            />
          </InputGroup>
        </Col>
        <Col sm={4}>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='far fa-hospital' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='eps'
              placeholder='EPS...'
              onChange={handleChange}
              value={form.eps}
            />
          </InputGroup>
        </Col>
        <Col sm={4}>
          <CustomInput
            className='mt-2'
            type='switch'
            id='medicinaPrepagada'
            name='medicinaPrepagada'
            label={`Medicina prepagada ${form.medicinaPrepagada ? '✔' : '✘'}`}
            onChange={e => setForm({ ...form, medicinaPrepagada: e.target.checked })}
          />
        </Col>
      </Row>
      {/* Vacunas */}
      <Row className='mx-auto mb-4'>
        <Label tag='h4' sm='12' className='text-center'>
          <i className='fas fa-syringe mr-1' />
          Vacunas recibidas
        </Label>
        <Col xs='6' sm='4'>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='covid' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Covid
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='difteria' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Difteria
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='fiebre Amarilla' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Fiebre Amarilla
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='hepatitis A y B' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Hepatitis A y B
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='neumococo' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Neumococo
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='paperas' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Paperas
            </Label>
          </FormGroup>
        </Col>
        <Col xs='6' sm='4'>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='pentavalente' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Pentavalente
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='polio' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Polio
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='rotavirus' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Rotavirus
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='rubeola' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Rubeola
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='sarampion' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Sarampion
            </Label>
          </FormGroup>
        </Col>
        <Col xs='6' sm='4'>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='tetano' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Tetano
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='tifoidea' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Tifoidea
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='tosferina' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Tosferina
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='tuberculosis' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Tuberculosis
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='vph' onClick={e => handleCheckList(e, 'vacunas')} />
              <span className='form-check-sign' />Vph
            </Label>
          </FormGroup>
        </Col>
      </Row>
      {/* Enfermedades */}
      <Row className='mx-auto mb-4'>
        <Label tag='h4' sm='12' className='text-center'>
          <i className='fas fa-heartbeat mr-1' />
          Enfermedades que padece o ha padecido</Label>
        <Col xs='6' sm='4'>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='paperas' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Paperas
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='afecciones de Nariz' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Afecciones de Nariz
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='afecciones de Oido' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Afecciones de Oido
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='afecciones de Ojo' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Afecciones de Ojo
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='asma' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Asma
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='bronquitis' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Bronquitis
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='colicos Biliares' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Colicos Biliares
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='colon Irritable' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Colon Irritable
            </Label>
          </FormGroup>
        </Col>
        <Col xs='6' sm='4'>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='convulsiones' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Convulsiones
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='dermatitis Atopica' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Dermatitis Atopica
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='desmayos' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Desmayos
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='diabetes' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Diabetes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='epilepsia' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Epilepsia
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='hepatitis A' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Hepatitis A
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='hepatitis B' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Hepatitis B
            </Label>
          </FormGroup>
        </Col>
        <Col xs='6' sm='4'>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='hipertension' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Hipertension
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='incontinencia Urinaria' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Incontinencia Urinaria
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='rinitis' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Rinitis
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='rubeola' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Rubeola
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='sinusitis' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Sinusitis
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='sonambulismo' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Sonambulismo
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name='varicela' onClick={e => handleCheckList(e, 'enfermedades')} />
              <span className='form-check-sign' />Varicela
            </Label>
          </FormGroup>
        </Col>
      </Row>
      {/* Intervenciones */}
      <Row className='mx-auto mb-4'>
        <Label tag='h4' sm='12' className='text-center'>
          <i className='fa fa-diagnoses mr-1' />
          Intervenciones quirúrgicas</Label>
        <Col className='text-center'>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='vesicula' onClick={e => handleCheckList(e, 'intervenciones')} />
              <span className='form-check-sign' />Vesicula
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='corazon' onClick={e => handleCheckList(e, 'intervenciones')} />
              <span className='form-check-sign' />Corazon
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='columna' onClick={e => handleCheckList(e, 'intervenciones')} />
              <span className='form-check-sign' />Columna
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='apendice' onClick={e => handleCheckList(e, 'intervenciones')} />
              <span className='form-check-sign' />Apendice
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='riñon' onClick={e => handleCheckList(e, 'intervenciones')} />
              <span className='form-check-sign' />Riñon
            </Label>
          </FormGroup>
        </Col>
      </Row>
      {/* Antecendentes de traumas */}
      <Row className='mx-auto mb-4'>
        <Label tag='h4' sm='12' className='text-center'>
          <i className='fa fa-bone mr-1' />
          Antecedentes de trauma</Label>
        <Col className='text-center'>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='esguinces' onClick={e => handleCheckList(e, 'antecedentes')} />
              <span className='form-check-sign' />Esguinces
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='fracturas' onClick={e => handleCheckList(e, 'antecedentes')} />
              <span className='form-check-sign' />Fracturas
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='luxaciones' onClick={e => handleCheckList(e, 'antecedentes')} />
              <span className='form-check-sign' />Luxaciones
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type='checkbox' name='choque anafilactico' onClick={e => handleCheckList(e, 'antecedentes')} />
              <span className='form-check-sign' />Choque Anafilactico
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </>
  )
})


export default PasosSalud
