---
title: "Tips, Tricks, and Things to Know"
---

## Known Issues

1. Some JavaScript carousels might have undesired behavior when placed inside a container set to `display: grid;`. The preview template uses this style, so you may need to create an alternate template to serve any components with carousels in them.

2. If the server is running when a new component config file is created, it may not update the server correctly, and you might need to restart the server in order to see the new configuration.