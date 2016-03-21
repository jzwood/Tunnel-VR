# Tunnel-Escape-VR

[Tunnel Escape][thegame] is a simple immersive vr experience geared towards Oculus Rift
but viewable with Google Cardboard and on desktop.

[![Bloody passage screenshot](img/screenshot_blood.png)][thegame]

[thegame]: http://jzwood.github.io/tunnel-vr-copy/

# Instructions

- The objective is to reach the surface...alive.

- There are only two sources of control in this game. Head orientation which will
change camera orientation and forward movement.

- Pressing "q" will move camera forward only if there is not a wall in the way.

## Options

- For simple graphics add simplegraphics=true to the querystring, e.g. localhost:8000/?simplegraphics=true
- For a different end game scenario add 'ending=' plus one of 4 options, 1 through 4, to
the querystring e.g.localhost:8000/?ending=2.
- Separate querystring parameters with '&'

## Oculus

- Make sure to download the [Oculus SDK][osdk], then
Connect your Oculus to your computer (preferable
not OS X as Oculus has discontinued support) and make sure your screen
configurations are right (change system display settings to
change. Google for more info).
- Use the RiftConfigUtil tool to make sure your
Oculus device is working properly on your computer.
- To run the game in Oculus, download a [firefox nightly][ffn] build and install the
[Mozilla WebVR Plus plug-in][mp].
- Finally, Host the directory with
your favorite local server on [Firefox Nightly][ffn].
- The index.html file should automatically display and the screen should
track headset motion. Click the VR bottom on the bottom right to
put screen into Full/stereoscopic mode and enjoy.

[ffn]: https://nightly.mozilla.org/
[mp]: https://addons.mozilla.org/en-US/firefox/addon/mozilla-webvr-enabler/
[osdk]: https://developer.oculus.com/downloads/

## Google Cardboard

- Without a bluetooth keyboard the experience is demo-able but not fully
  available using Google Cardboard.
- to Demo, simply navigate to url on phone and use with Cardboard. (If running locally
  this can be done using localhost and ngrok.)
