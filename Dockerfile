# Node.js 20 LTS versiyonu (Angular 20 ve Ionic 8 için)
FROM node:20-alpine

# Çalışma dizini
WORKDIR /app

# Gerekli sistem paketleri
RUN apk add --no-cache git python3 make g++

# Ionic CLI, Capacitor CLI ve Angular CLI global kurulumu
RUN npm install -g @ionic/cli@latest @angular/cli@20 @capacitor/cli@7

# Port açma
EXPOSE 8100 35729

# Default komut
CMD ["/bin/sh"]