### ENVIRONMENT VARIABLES USED FOR THE EMAIL MODULE.

- For the implementation of the email module we have used the `node-mailer` package and inorder to set its basic configuration we have used the following variables.

- **EMAIL_HOST:** This should be a string and it should contain the address of the host from which the application will be sending the mail to the users.

- **EMAIL_PORT:** The port number of the `EMAIL_HOST` should be specified according to the requirment and it should be an integer.

- **USER_EMAIL:** This should be a string value and this is host mail from which the users will get the email.

- **USER_PASSWORD:** This is the password of the main user which should be known by admin only. This should not be shared or be visible in any context. It is beneficial that this variable should be present in hashed format.