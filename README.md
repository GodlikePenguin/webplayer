# webplayer
A web server which serves local files akin to a media player, and includes an alternate route for a remote to be controlled via a phone.

## Usage:
**Native**:
- Set the WEBPLAYER_ROOT environment variable to the location on your machine which contains the media to serve
    - Optionally set the PORT environment variable
    - Optionally set the DISPLAY_IP_ADDR environment variable with the IP address the server runs on. Natively this should be acquired by the application by itself
- Start the server with npm run run (genius command)

---
**Docker**:
- Run the command `docker run --rm -e "WEBPLAYER_ROOT=<location of media inside container" -e "DISPLAY_IP_ADDR=<ip addr of host machine>" -v "<local media location>:<location of media inside container>" -p 3000:3000 edwarddobson/webplayer:0.1.0`
    - Note that the second half of the `-v` option must be the same as the WEBPLAYER_ROOT environment variable
