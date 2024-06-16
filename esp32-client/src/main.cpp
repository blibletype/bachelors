#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "EmonLib.h"

const char* ssid = "Numb_Digger_2G";
const char* password = "14881488";
const char* serverName = "http://localhost:3000/test";

EnergyMonitor energyMonitor;  

const int analogInPin = 34;
const float calibration = 1.0;
const float Vrms = 220;

// put function declarations here:
int myFunction(int, int);

void setup() {
  Serial.begin(9600);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");

  energyMonitor.current(analogInPin, calibration);
}

void loop() {
  double Irms = energyMonitor.calcIrms(1480);

  Serial.print(Irms * Vrms);
  Serial.print(" ");
  Serial.println(Irms);
  delay(500);
}

// put function definitions here:
int myFunction(int x, int y) {
  return x + y;
}