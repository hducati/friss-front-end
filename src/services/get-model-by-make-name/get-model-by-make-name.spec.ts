import axios from "axios";
import MockAdapter from 'axios-mock-adapter'

import { getModelByMakeName } from "./get-model-by-make-name";

const response = [
  {
    Make_ID: '1',
    Make_Name: 'abc',
    Model_ID: '4',
    Model_Name: 'fake-model1'
  },
  {
    Make_ID: '2',
    Make_Name: 'bcd',
    Model_ID: '5',
    Model_Name: 'fake-model2'
  }
]

describe('GetModelByMakeName', () => {
  it("should return values from API", async () => {
    const mock = new MockAdapter(axios);
    const fakeMakeName = 'fakeMakeName'
    mock.onGet(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/fakemakename?format=json`)
      .reply(200, { Results: response })
  
    const service = await getModelByMakeName(fakeMakeName);

    expect(service.length).toBe(2)
  })

  it("should return empty when API is not available", async () => {
    const mock = new MockAdapter(axios);
    const fakeMakeName = 'fakeMakeName'
    const empty = ''
    mock.onGet(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/fakemakename?format=json`)
      .reply(400)
  
    const service = await getModelByMakeName(fakeMakeName)

    expect(service[0]['value']).toBe(empty)
    expect(service[0]['label']).toBe(empty)
  })
})