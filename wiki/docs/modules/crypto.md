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


### [What is the main difference between a key, an IV and a nonce?](https://crypto.stackexchange.com/questions/3965/what-is-the-main-difference-between-a-key-an-iv-and-a-nonce)

A key, in the context of symmetric cryptography, is something you keep secret. Anyone who knows your key (or can guess it) can decrypt any data you've encrypted with it (or forge any authentication codes you've calculated with it, etc.).

An IV or initialization vector is, in its broadest sense, just the initial value used to start some iterated process. The term is used in a couple of different contexts and implies different security requirements in each of them.

A nonce, in the broad sense, is just "a number used only once". The only thing generally demanded of a nonce is that it should never be used twice (within the relevant scope, such as encryption with a particular key). The unique IVs used for block cipher encryption qualify as nonces, but various other cryptographic schemes make use of nonces as well.

### [Why does the Signal protocol use AES/CBC instead of AES/GCM?](https://crypto.stackexchange.com/questions/68163/why-does-the-signal-protocol-use-aes-cbc-instead-of-aes-gcm)
### [AES-GCM Disadvantage](https://crypto.stackexchange.com/questions/18420/aes-gcm-disadvantage)
### [Why would I ever use AES-256-CBC if AES-256-GCM is more secure?]( https://security.stackexchange.com/questions/184305/why-would-i-ever-use-aes-256-cbc-if-aes-256-gcm-is-more-secure)### [How to choose an Authenticated Encryption mode](https://blog.cryptographyengineering.com/2012/05/19/how-to-choose-authenticated-encryption/)
### [Node.js - AES Encryption/Decryption with AES-256-GCM using random Initialization Vector + Salt](https://gist.github.com/AndiDittrich/4629e7db04819244e843)

### Encryption algorithms should be used with secure mode and padding scheme

- Encryption operation mode and the padding scheme should be chosen appropriately to guarantee data confidentiality, integrity and authenticity:
    - For block cipher encryption algorithms (like AES):
        - The GCM (Galois Counter Mode) mode which works internally with zero/no padding scheme, is recommended, as it is designed to provide both data authenticity (integrity) and confidentiality. Other similar modes are CCM, CWC, EAX, IAPM and OCB.
        - The CBC (Cipher Block Chaining) mode by itself provides only data confidentiality, it’s recommended to use it along with Message Authentication Code or similar to achieve data authenticity (integrity) too and thus to prevent padding oracle attacks.
        - The ECB (Electronic Codebook) mode doesn’t provide serious message confidentiality: under a given key any given plaintext block always gets encrypted to the same ciphertext block. This mode should not be used.
        - For RSA encryption algorithm, the recommended padding scheme is OAEP.

- Noncompliant Code Example
    - Noncompliant: CBC with PKCS5/7 (set by default) is vulnerable to oracle padding attacks

    `crypto.createCipheriv("AES-128-CBC", key, iv);`

    - Noncompliant: ECB doesn't provide serious message confidentiality

    `crypto.createCipheriv("AES-128-ECB", key, "");`

- Compliant Solution

`crypto.createCipheriv("AES-256-GCM", key, iv);`

### Test

[https://www.devglan.com/online-tools/aes-encryption-decryption](https://www.devglan.com/online-tools/aes-encryption-decryption)