### ENVIRONMENT VARIABLES USED IN ENCRYPTION MODULE.

The list of environment variables used for the encryption-decryption module in our boilerplate

- **APPLY_ENCRYPTION:** This variable currently accepts only two values which is `0` and `1`. If this variable is set to `0` then the encyrption-decryption module will not be executed and if it is set to `1` the module is activated and we will get our request and response in encrypted format. 

- **IV:** This environment variable stands for Initialization Vector. The initialization vector is used in the `crypto.ts` file.

- **SECRET_KEY:** This environemt variable is again used in the `crypto.ts` file. The secret key is useful for creating a cipher code so it should be set accordingly.