const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    "info": {
    "title": "SwingNotesAPI",
    "description": "Design your personalized notebook utilizing the Swing Notes API.",
    "version": "1.0.0",
    "contact": {
      "name": "Marcus Widén",
      "email": "hellowiden@gmail.com"
    }
  },
    "host": "localhost:3000",
    "basePath": "/api",
    "schemes": ["http"],
    "securityDefinitions": {
      "BearerAuth": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header",
        "description": "Use Bearer token to authenticate requests.\\nFormat should look like `Bearer 'TOKEN HERE'`"
      }
    },
    "paths": {
      "/user/signup": {
        "post": {
          "description": "Create an user",
          "tags": ["User"],
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "anton"
                  },
                  "password": {
                    "type": "string",
                    "example": "secret"
                  }
                }
              },
              "required": true
            }
          ],
          "responses": {
            "201": {
              "description": "Ok",
              "schema": {
                "type": "object",
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "anton"
                  },
                  "password": {
                    "type": "string",
                    "example": "$2a$10$hchaYFVbqUFrt/DBtJ9AAOj2Xe4SRbloA04PM1atkgcrEn8g/Am22"
                  },
                  "_id": {
                    "type": "string",
                    "example": "662b4d091d56eb6312a82adf"
                  },
                  "createdAt": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-04-26T06:38:17.678Z"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "409": {
              "description": "User already exists",
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "User already exists"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/user/login": {
        "post": {
          "description": "Log in with created user",
          "tags": ["User"],
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "anton"
                  },
                  "password": {
                    "example": "anton"
                  }
                }
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "type": "object",
                "properties": {
                  "token": {
                    "type": "string",
                    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not found",
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Username not found"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/notes": {
        "get": {
          "description": "Get an array with notes",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "tags": ["Notes"],
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "662b4bd91d56eb6312a82adb"
                    },
                    "title": {
                      "type": "string",
                      "example": "Title"
                    },
                    "text": {
                      "type": "string",
                      "example": "Note"
                    },
                    "createdBy": {
                      "type": "string",
                      "example": "662b4a211d56eb6312a82ace"
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "example": "2024-04-26T06:38:17.678Z"
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "example": "2024-04-26T06:38:17.678Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Authentication token missing",
                    "x-collapse-content": true
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "post": {
          "description": "",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "tags": ["Notes"],
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "example": "Creation"
                  },
                  "text": {
                    "example": "Write your note here"
                  }
                }
              },
              "required": true
            }
          ],
          "responses": {
            "201": {
              "description": "Created",
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Creation"
                  },
                  "text": {
                    "type": "string",
                    "example": "Write your note here"
                  },
                  "createdBy": {
                    "type": "string",
                    "example": "662a28ca1811938186234e41"
                  },
                  "_id": {
                    "type": "string",
                    "example": "662b50375c3bf740f01c0ca6"
                  },
                  "createdAt": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-04-26T06:56:55.825Z"
                  },
                  "updatedAt": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-04-26T06:56:55.825Z"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized",
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Authentication token missing",
                    "x-collapse-content": true
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "put": {
          "description": "",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "tags": ["Notes"],
          "parameters": [
            {
              "name": "id",
              "in": "query",
              "type": "string"
            },
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "example": "You can use both"
                  },
                  "text": {
                    "example": "or only one of these"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Ok",
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "You can use both"
                  },
                  "text": {
                    "type": "string",
                    "example": "This is the old notetext"
                  },
                  "createdBy": {
                    "type": "string",
                    "example": "662a28ca1811938186234e41"
                  },
                  "_id": {
                    "type": "string",
                    "example": "662b50375c3bf740f01c0ca6"
                  },
                  "createdAt": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-04-26T06:56:55.825Z"
                  },
                  "updatedAt": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2024-04-26T07:20:40.124Z"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized",
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Authentication token missing",
                    "x-collapse-content": true
                  }
                }
              }
            },
            "404": {
              "description": "Not found",
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "No note found matching UserID and ID.",
                    "x-collapse-content": true
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "description": "",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "tags": ["Notes"],
          "parameters": [
            {
              "name": "id",
              "in": "query",
              "type": "string"
            }
          ],
          "responses": {
            "204": {
              "description": "Ok, no content"
            },
            "401": {
              "description": "Unauthorized",
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Authentication token missing",
                    "x-collapse-content": true
                  }
                }
              }
            },
            "404": {
              "description": "Not found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/notes/search": {
        "get": {
          "description": "",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "tags": ["Notes"],
          "parameters": [
            {
              "name": "title",
              "in": "query",
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "662b4bd91d56eb6312a82adb"
                    },
                    "title": {
                      "type": "string",
                      "example": "Title"
                    },
                    "text": {
                      "type": "string",
                      "example": "Note"
                    },
                    "createdBy": {
                      "type": "string",
                      "example": "662b4a211d56eb6312a82ace"
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "example": "2024-04-26T06:38:17.678Z"
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "example": "2024-04-26T06:38:17.678Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "schema": {
                "type": "object",
                "properties": {
                  "error": {
                    "type": "string",
                    "example": "Authentication token missing",
                    "x-collapse-content": true
                  }
                }
              }
            },
            "404": {
              "description": "Not found",
              "schema": {
                "type": "object",
                "properties": {
                  "result": {
                    "type": "string",
                    "example": "No notes found"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      }
    }
  },
  apis: ['./routes.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
