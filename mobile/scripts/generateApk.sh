set -eux

cd android
./gradlew assembleRelease
cd ..

echo "Build will be at android/app/build/outputs/apk/app-release.apk"

