import axios from "axios"

interface MakeNameModel {
  MakeId: string,
  MakeName: string,
  VehicleTypeId: number,
  VehicleTypeName: string
}

export const getMakesService =  async () => {
  try {
    const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')  
    const makeNameModels = response['data']['Results']

    const makeNames = getMakeNames(makeNameModels)

    return makeNames
  } catch {
    return [ { value: '', label: '' }]
  }
}

const getMakeNames = (makeNameModels: MakeNameModel[]) => {
  return makeNameModels.map((makeModel) => {
    const model = { value: makeModel.MakeName, label: makeModel.MakeName} 

    return model
  })
}