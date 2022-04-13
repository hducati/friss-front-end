import axios from "axios"

interface MakeNameModel {
  MakeId: string,
  MakeName: string,
  VehicleTypeId: number,
  VehicleTypeName: string
}

export const getMakesService =  async () => {
  const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')  
  const makeModels = response['data']['Results']

  const makeNames = getMakeNames(makeModels)

  return makeNames
}

const getMakeNames = (makeModels: MakeNameModel[]) => {
  return makeModels.map((makeModel) => {
    const model = { value: makeModel.MakeName, label: makeModel.MakeName} 

    return model
  })
}