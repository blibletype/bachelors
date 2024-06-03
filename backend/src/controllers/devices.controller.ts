import { StatusCodes } from 'http-status-codes';

import { CreateDeviceDTO } from '../types/device';
import { RequestHandler } from "../types/api";
import { HttpRequestError } from '../utils/error';
import devicesService from '../services/devices.service';

class DevicesController {
  public getAllDevices: RequestHandler = async(req, res, next) => {
    try {
      const devices = await devicesService.findAll();
      res.status(StatusCodes.OK).json(devices);
    } catch (error) {
      console.error(error);
      next(new HttpRequestError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch devices'));
    }
  }
  public createDevice: RequestHandler = async(req, res, next) => {
    try {
      const newDevice = req.body as CreateDeviceDTO;
      const device = await devicesService.insertOne(newDevice);
      res.status(StatusCodes.CREATED).json(device);
    } catch (error) {
      console.error(error);
      next(new HttpRequestError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create device'));
    }
  }
}

export default new DevicesController();
