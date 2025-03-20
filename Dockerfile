FROM ubuntu:22.04

# Set non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt update && apt install -y \
    curl \
    git \
    sudo \
    unzip \
    openjdk-17-jdk \
    build-essential \
    file \
    python3 \
    ca-certificates \
    gnupg

# Install Node.js 22.x
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt update && apt install -y nodejs

# Set JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Install Android SDK
ENV ANDROID_HOME=/opt/android-sdk
RUN mkdir -p ${ANDROID_HOME}

# Download and install Android SDK Command line tools
RUN curl -o cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip \
    && unzip cmdline-tools.zip -d ${ANDROID_HOME} \
    && rm cmdline-tools.zip \
    && mkdir -p ${ANDROID_HOME}/cmdline-tools/latest \
    && mv ${ANDROID_HOME}/cmdline-tools/* ${ANDROID_HOME}/cmdline-tools/latest/ 2>/dev/null || true

# Add Android SDK tools to PATH
ENV PATH=${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools/bin

# Accept Android SDK licenses
RUN mkdir -p ${ANDROID_HOME}/licenses \
    && echo "8933bad161af4178b1185d1a37fbf41ea5269c55" > ${ANDROID_HOME}/licenses/android-sdk-license \
    && echo "d56f5187479451eabf01fb78af6dfcb131a6481e" >> ${ANDROID_HOME}/licenses/android-sdk-license \
    && echo "24333f8a63b6825ea9c5514f83c2829b004d1fee" >> ${ANDROID_HOME}/licenses/android-sdk-license

# Install Android SDK packages
RUN sdkmanager --update && \
    sdkmanager "platform-tools" \
    "platforms;android-35" \
    "build-tools;35.0.0" \
    "ndk;26.1.10909125"

# Install Expo CLI and EAS CLI
RUN npm install -g expo-cli eas-cli@15.0.14

# Set permissions for SDK directory
RUN chmod -R 777 ${ANDROID_HOME}

# Set up a non-root user
RUN useradd -m expo && \
    echo "expo ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/expo

USER expo
WORKDIR /app

# Entrypoint
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["bash"]