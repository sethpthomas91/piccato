# PIC-CAT_O

<!-- ABOUT THE PROJECT -->
## About The Project

Have you ever wondered what you would look like as a cat? Have you also had the desire to make that image into an NFT that you exclusively give to me? Well you have come to the right place. Pic-Cat-O, sounds similar to Picasso, is a web application that leverages machine learning to generate cat photos from user submitted headshots. It then allows the user to either save those locally or generate the photo and leverage the Etherium blockchain to mint a brand new NFT.

This is a project that was created by Scott Plunkett, a senior crafter at 8th Light, as a way for me to learn before I went off to work for my first client. It started on 18 July 2022 and will end on 29 July 2022.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- BUILD STATUS -->
## Current Build Status

[![Node.js CI](https://github.com/sethpthomas91/piccato/actions/workflows/tests.yml/badge.svg)](https://github.com/sethpthomas91/piccato/actions/workflows/tests.yml)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Built With -->
### Built With

* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [NFTPort](https://www.nftport.xyz/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

[Node 18.6.0](https://nodejs.org/en/download/current/)

You will need to generate an NFTPort API Key and Ethereum wallet ID in order to generate your own NFTs. Follow the instructions under Easy Minting here:
https://docs.nftport.xyz/docs/nftport/ZG9jOjE3NDI3MDc3-minting-quickstart#easy-minting


### Installation

1 Clone the repo
   ```sh
git@github.com:sethpthomas91/piccato.git
   ```

2 Navigate to the new directory
   ```sh
cd piccato/
   ```

3 Install the dependencies
   ```sh
npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Running the application

1 Navigate to the project directory if you are not there already.
   ```sh
cd piccato/
   ```

2 Copy and paste the following object in your new file:

```
const localConfig = {
    NFTPORT_KEY: 'SECRET KEY FROM NFT PORT GOES HERE',
    WALLET_ADDRESS: 'WALLET ADDRESS GOES HERE'
};
export default localConfig;
```

3 Change the values in the object with your own secret keys that you generated in the installation section.

4 Start the application
   ```sh
npm run dev
   ```

5 View the application on your favorite browser
```sh
http://localhost:3000
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Testing

1 Navigate to the root directory and run
   ```sh
npm test
   ```
<p align="right">(<a href="#top">back to top</a>)</p>

## Reflections


<!-- ACKNOWLEDGMENTS -->
## Contributors

* [sethpthomas91](https://github.com/sethpthomas91)
* [sethpthomas91](https://github.com/sethpthomas91)

<p align="right">(<a href="#top">back to top</a>)</p>
