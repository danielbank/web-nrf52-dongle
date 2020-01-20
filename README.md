# Workshop on Web Bluetooth, Web USB, LitElement and Zephyr

## Slide Deck

This project was created as a workshop for [AIoT DevFest](https://www.aiotdevfest.org/). The [slide deck](docs/webusb-webbluetooth.pdf) is included in this repo in the `/docs` folder. It's a fork of the [same workshop](https://github.com/larsgk/web-nrf52-dongle) that [Lars Knudsen](https://twitter.com/denladeside) gave at the 2019 IoT DevFest.

## Making a future proof IoT project by leveraging great technologies

IoT can be really hard, there are plenty of hardware options out there, with a multitude of OSes to choose from - and that is not even thinking about how to get data to and from the device!

In this workshop, we have decided to use the Nordic Semiconductor nRF52840 Dongle (PCA10059), which supports both Bluetooth and USB. Nordic is a market leader in Bluetooth products and even have new products that work with cellular (eg. LTE) as well. The Nordic hardware is relatively cheap (different price points), super stable and has really good support.

The nRF52840 Dongle (PCA10059) connects directly to a USB port for DFU flashing and operation. It contains the flagship nRF52 chip and allows development of fairly advanced projects.

As the OS, we will use the RTOS Zephyr, a new OS that aims at becoming the Linux for IoT. Zephyr is not the default OS on nRF52840, but it is supported and will be the OS of choice for all future Nordic products. Zephyr works across a wide range of devices from different manufacturers.

A IoT product is unfortunately not worth much without a companion application, so we will be building one too - using modern web technology such as Web Bluetooth and we will be creating the user interface using mostly vanilla HTML, CSS, JavaScript, with a bit of help from the awesome LitElement project.

## Firmware

-   Based on Zephyr
-   Built for the Nordic nRF52840 Dongle (PCA10059)
-   Uses BLE GATT and WebUSB for communication
-   Pass through messages between BLE/GATT and USB
-   If first byte in message (either way) is a 0x01, the next 3 bytes will set RGB LED ([0x01, r, g, b]) instead

# Workshop Milestones

## 1. Flash the NRF Dongle with Firmware

### Zero Environment Setup

-   Daniel can do the flashing step for you if you would rather not set up Python 3 and the nrfutil utility. You miss nothing except watching a loading bar on your terminal as the release package gets flashed to the dongle.

### Mac Environment Setup

-   Install PyEnv using Brew:

```sh
brew update
brew install pyenv
```

-   Install Python 3.7:

```sh
pyenv install 3.7.4
```

-   Install virtualenvwrapper for PyEnv:

```sh
brew install pyenv-virtualenvwrapper
```

-   Update your `.bash_profile` or `.zshrc` or what have you:

```sh
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi
export PYENV_VIRTUALENVWRAPPER_PREFER_PYVENV="true"
pyenv virtualenvwrapper
pyenv global 3.7.4
```

-   Make a new Python VirtualEnv for this workshop:

```sh
mkvirtualenv nrf
workon nrf
```

-   Install the nrfutil utility:

```sh
pip install nrfutil
```

### Windows Environment Setup

-   [Windows Subsystem for Linux Installation Guide for Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

-   Follow similar steps as the Mac section for setting up Python 3.

### Flashing the Dongle

-   Download the release zip: https://github.com/larsgk/web-nrf52-dongle/releases

-   Put the device into bootloader mode by pressing the teeny tiny button on the side of the component next to the obvious button (near the N logo in Nordic). It will flash red. (**See Daniel for finding the button, it's sneaky**)

-   Mac: Find the Dongle's device address, look for the odd one out:

```sh
ls -lha /dev/tty*
```

-   Windows: Find the Dongle's device address. See [Use USB-Serial adapters via Windows Subsystem for Linux](https://www.scivision.dev/usb-tty-windows-subsystem-for-linux/) for more info:

```sh
/dev/ttyS<COM PORT #>
```

-   Flash the device:

```sh
nrfutil dfu serial -pkg pkg.zip -p /dev/tty.usbmodemE12DB15768271
```

## 2. Play with the Online Demo App

-   Verify your dongle's functionality via the online demo app: https://larsgk.github.io/web-nrf52-dongle

-   Messages sent via the USB channel are received on the Bluetooth channel and vice versa.

-   The LED color can be set by either USB or Bluetooth

## 3. Serve the Web_Test Demo App

-   The Web Test demo is the simplest app to run because it does not have a build step, it is a single HTML file. **NOTE**: Even though it is a single HTML file, it still needs to be served locally. You cannot just open the index.html with Chrome and expect it to work. Use whatever tech you find easiest for serving a web app locally.

-   Alternative #1: Use [http-server](https://www.npmjs.com/package/http-server):

```sh
cd web_test
npx http-server .
```

-   Alternative #2: Use [Polymer-CLI](https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-cli):

```sh
cd web_test
npm install -g polymer-cli
polymer serve --open
```

## 4. Build and Serve the Web_App Demo App

-   Build the Demo App:

```sh
cd web_app
npm run build
```

-   Run the Demo App:

```sh
npm run serve:prpl-server
```

## 5. Let's Get Fancy

-   Make your own app using Web USB & Web Bluetooth!

-   For inspiration, I made a face expression matching app using [face-api.js](https://github.com/justadudewhohacks/face-api.js):

```sh
cd face_app
npx http-server .
```

# Links

## LitElement

The web app demo is based on LitElement: https://lit-element.polymer-project.org/ (Note: the 2.0.0-rc is used at the moment, we will swap to 2.0.0 once released).

## Zephyr RTOS

https://docs.zephyrproject.org/latest/getting_started/getting_started.html

## nrfutil

Follow these instructions to install nrfutil: https://github.com/NordicSemiconductor/pc-nrfutil

## Build and Flash

Follow instructions here: https://docs.zephyrproject.org/latest/boards/arm/nrf52840_pca10059/doc/nrf52840_pca10059.html

## Face-Api.js

Face expression demo source from here: https://github.com/justadudewhohacks/face-api.js
