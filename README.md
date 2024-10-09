# CMAF-HAM-UI

This project is a proof of concept demonstrating how, by using CMAF-HAM, it is possible to create a small service to visualize presentations and export them in HLS or DASH.

Currently, the CMAF-HAM-UI tool only works with unencrypted VOD MPDs.

*For a more complete example with HLS and DASH see the CMAF-HAM-Conversion example https://github.com/streaming-video-technology-alliance/common-media-library/tree/main/samples/cmaf-ham-conversion*

## Live example 

A live example can be found in this site: http://cmaf-ham-ui.s3-website-us-east-1.amazonaws.com/

Use this MPDs to test the live example:
* https://cmaf-ham-ui.s3.amazonaws.com/samples/manifest-sample-1.mpd
* https://cmaf-ham-ui.s3.amazonaws.com/samples/manifest-sample-2.mpd
* https://cmaf-ham-ui.s3.amazonaws.com/samples/manifest-sample-3.mpd
* https://cmaf-ham-ui.s3.amazonaws.com/samples/manifest-sample-4.mpd

## About CMAF-HAM

HLS and DASH stand as the predominant video streaming technologies currently. Consequently, users often encounter challenges such as converting between HLS and DASH, manipulating manifests, and programmatically understanding manifest structures.

The Common Media Application Format (CMAF) for segmented media (ISO/IEC 23000-19) addresses these challenges by defining a universal format based on ISOBMFF. Additionally, it introduces the Hypothetical Application Model, a framework illustrating the practical usage of CMAF segments and fragments in streaming applications. This project is inspired by the principles outlined in the CMAF standard and the [Hypothetical Application Model] (Hypothetical Application Model).

The CMAF-HAM Library is part of the [SVTA Common Media Library](https://github.com/streaming-video-technology-alliance/common-media-library/tree/main/lib/src/cmaf/ham)

## Development and Build

* Use `npm run dev` to start a dev enviroment
* Use `npm run build` to build the project


