# integrator [![Build Status][ci-img]][ci]

[ci-img]:  https://travis-ci.org/Technomatix/integrator.svg
[ci]:      https://travis-ci.org/Technomatix/integrator

## Install

    npm i -g Technomatix/integrator

## Setup


Create file `~/.integrator/config`: 
```json
{
  "jira": {
    "protocol": "http",
    "host": "%host%",
    "basic_auth": {
      "username": "%username%",
      "password": "%host%"
    }
  },
  "desktime": {
    "APIkey": "%key%",
    "EmployeeId": "%employeeId%"
  }
}
```

## Use

    integrator