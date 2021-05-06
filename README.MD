Device manager service exercise

Web service to manage data entities that represent devices that go on cranes.

Prerequisites:
NodeJS(express)-version .12.13.1
Linux Ubuntu

Installation steps:

1. install node & npm globally (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. clone code from github: run 'git clone https://github.com/israeltu/device_manager.git'
3. run "cd device_manager"
4. run 'npm i' to install all dependencies.
5. a default .env (@root) , values can be replaced as necessary.
6. start server by running 'npm start'.

important:
Supported cranes are configured in src/resources/cranes.json (can be edited)

testing scenarios:
src/tests/testing_documentation

Server routes:

GET /health

Returns nothing, always succeeds.

GET /devices

Returns an array of all non-deleted devices.

GET /devices/deleted

Returns an array of all deleted devices.

POST /devices

Creates a new device. The properties of the device are the query parameters.
● If a device with the same id or s_n already exists, the operation should fail (status 409).
● If a property is missing the operation should fail

GET /devices/{id}

Returns a device that matches the id in the path.
If the device is deleted the operation should fail (status 404).

DELETE /devices/{id}

Marks a single device as deleted.
If the device is deleted the operation is considered a success.
