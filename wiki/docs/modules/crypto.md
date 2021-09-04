# Encryption-Decryption

Encryption-Decryption module is present in the Boiler Plate. We have used the [crypto](https://nodejs.org/api/crypto.html) library in order to implement the encryption decryption functionality.

The objective of Encryption-Decryption module

1) This module would support sending the requests to the server from the user in encrypted form and also encryptingthe reponses that the user will receive from the server.
2) We need to provide a flag variable which tells us whether we need to encrypt the data or not in the .env file.
3) Also we need to define the constants such as which algorithm to be used for encryption in the crypto.ts file.
4) Currently we are using aes-256-cbc algorithm for encryption and decryption.

# Configuration

To start the encryption-decryption service we need to set the APPLY_ENCRYPTION variable to 1 in the .env file.
```
APPLY_ENCRYPTION=
```

We can also set these constants according to our preference in the crypto.ts file.
```
const inputEncoding= 
const outputEncoding= 
const salt= 
const algorithm= 
const password= 
```
## Usability
Since we require to encrypt the request and responses of the application, Encryption-Decryption service is being included in the core module.