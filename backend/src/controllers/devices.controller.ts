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
  };

  public createDevice: RequestHandler = async(req, res, next) => {
    try {
      const newDevice = req.body as CreateDeviceDTO;
      const device = await devicesService.insertOne(newDevice);
      res.status(StatusCodes.CREATED).json(device);
    } catch (error) {
      console.error(error);
      next(new HttpRequestError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create device'));
    }
  };

  public updateDevice: RequestHandler = async(req, res, next) => {
    try {
      const deviceId = req.params.id;
      const updatedDevice = req.body as CreateDeviceDTO;
      const device = await devicesService.updateOneById(deviceId, updatedDevice);
      res.status(StatusCodes.OK).json(device);
    } catch (error) {
      console.error(error);
      next(new HttpRequestError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update device'));
    }
  };

  public deleteDevice: RequestHandler = async(req, res, next) => {
    try {
      const deviceId = req.params.id;
      await devicesService.deleteOneById(deviceId);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      next(new HttpRequestError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete device'));
    }
  };
}

export default new DevicesController();
