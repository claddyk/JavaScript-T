# HCX JavaScript SDK
What is it?
The HCX SDK(Software Development Kit) is a set of libraries, code samples, and documentation using which developers can create their own softweare applications that interact with the HCX platform.

What is HCX?
It is a platform designed to streamline and secure the exchange of claims data between payors, providers.
Various operations such ass sending and receiving data, encryption and decryption of data, validation of payloads can be performed.

## HCX SDK Initialization

To begin working with the HCX SDK, we need to initialize the HCXIntegrator object with the configuration settings.

```javascript
const config = {
  participantCode: "your-participant-code", // Unique identifier provided by HCX
  protocolBasePath: "protocol-base-path", // Base path of the HCX instance to access Protocol APIs
  authBasePath: "auth-base-path", // Base path for authentication
  username: "your-username", // Username of the integrator
  password: "your-password", // Password of the integrator
  encryptionPrivateKey: "your-private-key", // Private key used for encryption
  igUrl: "ig-url" // IG URL
};
```
`protocolBasePath`: Basically this is the URL prefix from where all the protocol related API operations are accessed from.

`authBasePath`: This is similar to the `protocolBasePath`, but specifically refers to the part of the URL where the authentication APIs are hosted.

`const hcxIntegrator = new HCXIntegrator(config);`

The configuration object allows the SDK to handle authentication and data security protocols, ensuring communication with the HCX platform is secure.

## Outgoing Methods

Outgoing methods in the HCX SDK will handle the preparation and dispatch of data to the HCX platform.

`validatePayload`: This function validates the payload according to HCX specifications. It accepts a JWE (JSON Web Encryption) payload, an operation, and an error object. It returns a boolean to indicate if the payload validation passed.
```javascript
const jwePayload = "your-payload"; // JSON Web Encryption payload
const operation = "your-operation"; // The operation to be performed
const error = {}; // An object to capture any errors

const isValid = hcxIntegrator.validatePayload(jwePayload, operation, error);
```

`create_headers`: A method used to create the necessary headers for the payload. This varies based on the type of outgoing request call. It requires several parameters and returns an object that can be used as a header in your request. We have 2 types of outgoing request. One is where directly create a new outgoing request.(Here we create action headers). In the other type of outgoing request, we generally respond to the outgoing request. (Here we will create `on_action` headers.)

```javascript
const recipientCode = "recipient-code";
const apiCallId = "api-call-id";
const correlationId = "correlation-id";(optional)
const actionJwe = "action-jwe";(optional)
const onActionStatus = "on-action-status";

headers = hcxIntegrator.create_headers(senderCode, recipientCode, apiCallId, correlationId, actionJwe, onActionStatus);
```

`encrypt_payload`: Encrypts the FHIR payload using the recipient's public certificate. FHIR is a standard for health care data exchange.
```javascript
const fhirPayload = "fhir-payload"; // FHIR payload
const encryptedPayload = hcxIntegrator.encrypt_payload(headers, fhirPayload); // Encrypted FHIR payload
```
`searchRegistry`: It interacts with the HCX registry. You provide a search field and a search value, and it returns an object with the registry fields in it.
```javascript
const searchField = "search-field";
const searchValue = "search-value";
const registryResults = hcxIntegrator.searchRegistry(searchField, searchValue);
```
`initializeHCXCall`: This function initiates an HCX API call. It generates a token, adds it to the call, and sends the request.
```javascript
const response = hcxIntegrator.initializeHCXCall(encryptedPayload, operation);
```
## Incoming Methods

Incoming methods handle incoming requests from the HCX platform.

`validateRequest`: This function validates the incoming request as per the HCX protocol. It returns a boolean indicating whether the request is valid.
```javascript
const isValidRequest = hcxIntegrator.validateRequest(jwePayload, operation, error);
```
`decryptPayload`: Decrypts the received payload.
```javascript
const decryptedPayload = hcxIntegrator.decryptPayload(jwePayload);
```
`validatePayload`: Validates the decrypted payload.
```javascript
const isValidPayload = hcxIntegrator.validatePayload(fhirPayload, operation, error);
```
`sendResponse`: Sends the response back to the HCX gateway. This could be a success response if there were no errors or an error response.
```javascript
const output = {}; // Output to send back
hcxIntegrator.sendResponse(error, output);
```
`process`: Orchestrates the entire process of handling an incoming request, including validation, decryption, payload validation, and response sending.
```javascript
const processOutput = hcxIntegrator.process(jwePayload, operation);
```
## HcxOperations

This class encapsulates the available operations that can be performed. These are defined as static strings, representing different endpoints.

```javascript
const operation = HcxOperations.COVERAGE_ELIGIBILITY_CHECK;
```
Overall, the HCX SDK for JavaScript provides a powerful interface for working with the HCX platform, enabling developers to handle complex healthcare data exchanges with relative ease.
