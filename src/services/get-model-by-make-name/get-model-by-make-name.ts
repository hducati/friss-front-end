import axios from "axios"

interface ModelName {
  Make_ID: string,
  Make_Name: string,
  Model_ID: number,
  Model_Name: string
}

export const getModelByMakeName =  async (makeName: string) => {
  try {
    const response = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${makeName.toLowerCase()}?format=json`
    )  
    const makeModels = response['data']['Results']
  
    const modelNames = getModelNames(makeModels)
  
    return modelNames
  } catch {
    return [ { value: '', label: '' }]
  }
}

const getModelNames = (makeModels: ModelName[]) => {
  return makeModels.map((makeModel) => {
    const model = { value: makeModel.Model_Name, label: makeModel.Model_Name} 

    return model
  })
}