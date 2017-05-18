
#!/bin/bash
#set -e

SLOPPY_APITOKEN=${SLOPPY_APITOKEN}

# install latest sloppy.io cli
curl -L https://files.sloppy.io/sloppy-`uname -s`-uname -m > /usr/local/bin/sloppy
chmod +x /usr/local/bin/sloppy

# deploy new image
echo "Deploying new image using the CLI"
sloppy change -img mattlindsay/rest-endpoint:$CI_COMMIT_ID rest-endpoint
