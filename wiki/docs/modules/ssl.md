# SSL Configuration

An `SSL` certificate is a digital certificate that authenticates a website's identity and enables an encrypted connection. `SSL` stands for `Secure Sockets Layer`, a security protocol that creates an encrypted link between a web server and a web browser.
##### The Objective of SSL configuration is as follows:
-   The primary reason why SSL is used is to keep sensitive information sent across the Internet encrypted so that only the intended recipient can access it. 
-   In addition to encryption, a proper SSL certificate also provides authentication.
-   `SSL` is required for `PCI(Payment Card Industry)` compliance.

# Configuration
1. We will be generating the self signed certificate using [OpenSSL](https://help.ubuntu.com/community/OpenSSL)
2. First we have to check whether we have SSL installed in our system or not. If using Ubuntu then type the following below command in the terminal.
```bash
$ openssl
```
>The terminal should show the below output:

![SSL-Terminal](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/dev/wiki/images/terminal-ssl.png?raw=true)

3. If the terminal shows `command not found` then click on the link below for the installation.
[OpenSSL Installation](https://linuxtect.com/how-to-install-openssl-libraries-on-ubuntu-debian-mint/)

## Generating private SSL key
Step 1: First create a folder in src folder in the root directory and name it as cert.
> Path: <rootDir>/src/cert

To generate the private key we have to run the followig command inside the terminal in linux and command prompt in Windows.
```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```
Lets understand the parameters of the above command.
* **`req`**` : The req command primarily creates and processes certificate requests in PKCS#10 format. 

* **`-x509`** : Creates a X.509 Certificate.

* **`-newkey rsa:4096`** : Creates a new certificate request and 4096 bit RSA key. The default one is 2048 bits.

* **`-keyout key.pem`** : Specifies the filename to write the newly created private key to. You can specify any file name.

* **`-out`** : Specifies the filename to write the newly created certificate to. You can specify any file name.

* **`-days 365`** :The number of days to certify the certificate for. 3650 is ten years. You can use any positive integer. 

Once this command is executed in the terminal then we get the following output.
![SSL-Output](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/dev/wiki/images/ssl-command.png?raw=true).
It will ask us `PEM` pass phrase. This pass phrase should be a secret key that should be any string in an encrypted format. This pass phrase is mandatory for generation of certificate and the key. After the `pem` pass phrase is entered then the following screen should be shown.

![PEM-PASS](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/dev/wiki/images/pem-pass.png?raw=true)

>Once the above screen is show then check the directory : <rootDir>/src/cert, it will contain two files which represnts the key and the certificate.

## Usability
1. Since the SSL certificate is used for the whole NestJS application we have to include it into the ```bootstrap``` function in the main.ts file.
2. Once it is included there then it is available for the whole application.

>The output of the following is show below.

![Https-Output](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/https-support/wiki/images/https-output.PNG?raw=true)
