# Search Project

A full-stack search application built with **Node.js**, **Express**, **MongoDB**, and **React**. This project demonstrates basic search functionality using a non-optimized regex query, along with endpoints for editing and deleting items. The frontend provides an interface for real-time searching and displays results from the backend API.

## Table of Contents

- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [API Reference](#API-Reference)

## Features

- **Search Functionality:** 
  - Search for items using a regex-based query.
- **Item Management:**
  - **Edit:** Update an existing item.
  - **Delete:** Remove an item.


## Installation & Setup

Install my-project with npm

```bash
 git clone https://github.com/tharusha-dilhara/MERN-stack-performance-optimization-guide.git
```



## Running the Project

```bash
 cd MERN-stack-performance-optimization-guide

```

```bash
 docker-compose up --build

```


    
## API Reference

#### Search items by name using a regex query.

```http
  GET /api/search?q=keyword
```

#### Update an item by its _id

```http
  PUT /api/item/:id
```

| Type     | Description                       |
| :------- | :-------------------------------- |
| `string` | **Required**. Item's MongoDB ID   |
| `object` | **Required**. Updated item data   |

#### Delete an item by its _id

```http
  DELETE  /api/item/:id
```

| Type     | Description                       |
| :------- | :-------------------------------- |
| `string` | **Required**. Item's MongoDB ID |




