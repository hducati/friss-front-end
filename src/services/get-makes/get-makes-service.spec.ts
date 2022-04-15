import axios from "axios";
import MockAdapter from 'axios-mock-adapter'

import { getMakesService } from "./get-makes-service";

const response = [
  {
    MakeId: '1',
    MakeName: 'abc',
    VehicleTypeId: 'C',
    VehicleTypeName: 'fake-type'
  },
  {
    MakeId: '2',
    MakeName: 'bcd',
    VehicleTypeId: 'C',
    VehicleTypeName: 'fake-type'
  }
]

describe('GetMakesService', () => {
  it("should return values from API", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .reply(200, { Results: response })
  
    const service = await getMakesService();

    expect(service.length).toBe(2)
  })

  it("should return empty when API is not available", async () => {
    const mock = new MockAdapter(axios)
    const empty = ''
    mock.onGet('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .reply(400)
  
    const service = await getMakesService()

    expect(service[0]['value']).toBe(empty)
    expect(service[0]['label']).toBe(empty)
  })
})