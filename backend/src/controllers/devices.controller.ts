import { StatusCodes } from 'http-status-codes';

import { CreateDeviceDTO } from '../types/device';
import { RequestHandler } from '../types/api';
import { HttpRequestError } from '../utils/error';
import devicesService from '../services/devices.service';
import devicesDataService from '../services/devices-data.service';

class DevicesController {
  public getAllDevices: RequestHandler = async (req, res, next) => {
    try {
      const devices = await devicesService.findAll();
      res.status(StatusCodes.OK).json(devices);
    } catch (error) {
      console.error(error);
      next(
        new HttpRequestError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to fetch devices'
        )
      );
    }
  };

  public createDevice: RequestHandler = async (req, res, next) => {
    try {
      const newDevice = req.body as CreateDeviceDTO;
      const device = await devicesService.insertOne(newDevice);
      res.status(StatusCodes.CREATED).json(device);
    } catch (error) {
      console.error(error);
      next(
        new HttpRequestError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to create device'
        )
      );
    }
  };

  public updateDevice: RequestHandler = async (req, res, next) => {
    try {
      const deviceId = req.params.id;
      const updatedDevice = req.body as CreateDeviceDTO;
      const device = await devicesService.updateOneById(
        deviceId,
        updatedDevice
      );
      res.status(StatusCodes.OK).json(device);
    } catch (error) {
      console.error(error);
      next(
        new HttpRequestError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to update device'
        )
      );
    }
  };

  public deleteDevice: RequestHandler = async (req, res, next) => {
    try {
      const deviceId = req.params.id;
      await devicesService.deleteOneById(deviceId);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      next(
        new HttpRequestError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to delete device'
        )
      );
    }
  };

  public createDeviceData: RequestHandler = async (req, res, next) => {
    try {
      const deviceId = req.params.id;
      const newDeviceData = req.body;
      const deviceData = await devicesDataService.insertOne({ deviceId, ...newDeviceData });
      res.status(StatusCodes.CREATED).json(deviceData);
    } catch (error) {
      console.error(error);
      next(
        new HttpRequestError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to create device data'
        )
      );
    }
  };

  public getDeviceData: RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const start = new Date(req.query.start as string);
      const end = new Date(req.query.end as string);

      console.log('start', start);
      console.log('end', end);
      console.log('userId', userId);
      
      const deviceData = await devicesDataService.findAllInRangeByUserId(
        userId,
        start,
        end
      );

      res.status(StatusCodes.OK).json(deviceData);
    } catch (error) {
      console.error(error);
      next(
        new HttpRequestError(
          StatusCodes.NOT_FOUND,
          'Failed to fetch device data'
        )
      );
    }
  };
}

export default new DevicesController();
