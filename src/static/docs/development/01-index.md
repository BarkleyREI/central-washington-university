---
title: Fractal Pattern Library
---

# Important info about this section

This section of the documentation, under "Development", is meant to assist with building the library itself. It contains information about the configuration of Fractal, plus tips on how to create new components or use Fractal features.

This section is removed automatically by a standard build of the project and should never appear in the `web/` directory. 

## About this library

This is a pattern library built with Fractal.

What Fractal takes care of:

- Component markup
- Context data
- Documentation
- Organization
- Pattern library's theme/markup/styles

What Fractal does not do:

- Static asset building
- Optimization of assets like images
- Association of script or scss to components

This project pulls in various 4.0.0 generator npm scripts to take care of:

- ejs compilation
- scss compilation
- postcss processing
- image optimization
