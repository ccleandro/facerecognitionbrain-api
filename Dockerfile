FROM node:12.13.1

WORKDIR /usr/src/facerecognitionbrain-api

COPY ./ ./

RUN npm install

CMD ["bin/bash"]