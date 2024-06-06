import { Button, Table } from 'flowbite-react';

export const DeviceTable = ({ devices, onEditDevice, onDeleteDevice }) => {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {devices.map((device) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {device.id}
              </Table.Cell>
              <Table.Cell>{device.name}</Table.Cell>
              <Table.Cell>{device.status}</Table.Cell>
              <Table.Cell>{device.userId}</Table.Cell>
              <Table.Cell>
                <Button color="light" onClick={() => onEditDevice(device)}>Edit</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="failure" onClick={() => onDeleteDevice(device.id)}>Delete</Button>
              </Table.Cell>
            </Table.Row> 
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
