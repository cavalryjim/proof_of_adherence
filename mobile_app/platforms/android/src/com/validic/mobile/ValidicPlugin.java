// This file is part of the Validic Mobile library Cordova plugin Version 1.3.0
//
// Copyright 2016 Motivation Science Inc., All Rights Reserved
// This software is supplied to you by Motivation Science, Inc. (operating as "Validic") under terms of your
// contract with Validic.  This software may not be shared or redistributed, in part or as a whole, except
// as explicitly stated by contract with Validic.  This software is provided by Validic on an "as is" basis.  
// Validic makes no warranties, express or implied, including without limitation the implied warranties of 
// non-infringement, merchantability and fitness for a particular purpose, regarding this Validic software 
// or its use and operation alone or in combination with your products.  In no event shall Validic be liable 
// for any special, indirect, incidental or consequential damages (including, but not limited to, procurement 
// of substitute goods for services; loss of use, data or profits; or business interruption) arising in any 
// way out of the use, reproduction, modification and/or distribution of the Validic software, however caused 
// and whether under theory of contract, tort (including negligence), strict liability or otherwise, even if 
// Validic has been advised of the possibility of such damage. 

package com.validic.mobile;


import android.content.Intent;
import android.os.Bundle;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.validic.common.Log;
import com.validic.mobile.ble.BluetoothPeripheral;
import com.validic.mobile.ocr.OCRPeripheral;
import com.validic.mobile.Peripheral;
import com.validic.mobile.record.Record;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


public class ValidicPlugin extends CordovaPlugin {

    private Log log = new Log(true);
    private ValidicCordovaSessionController sessionController;
    private ValidicCordovaBluetoothController bluetoothController;
    private ValidicCordovaSHealthController sHealthController;
    private ValidicCordovaOCRController ocrController;


    private Gson gson = new GsonBuilder()
            .registerTypeAdapter(Peripheral.class, new PeriperheralTypeAdapter())
            .registerTypeAdapter(Record.class, new RecordTypeDeserializeAdapter())
            .create();

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        com.validic.mobile.ValidicMobile.getInstance().initialize(cordova.getActivity().getApplicationContext());

        ExecutorService threadPool = Executors.newSingleThreadExecutor();
        sessionController = new ValidicCordovaSessionController(this, gson, log, threadPool);
        bluetoothController = new ValidicCordovaBluetoothController(this, gson, log, threadPool);
        sHealthController = new ValidicCordovaSHealthController(this, gson, log, threadPool);
        ocrController = new ValidicCordovaOCRController(this, gson, log, threadPool);
    }


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        boolean handled = sessionController.execute(action, args, callbackContext)
                || bluetoothController.execute(action, args, callbackContext)
                || ocrController.execute(action, args, callbackContext)
                || sHealthController.execute(action, args, callbackContext);

        if (!handled && action.equals("isHealthKitAvailable")) {
            isHealthKitAvailable(callbackContext);
            return true;
        }
        return handled;
    }

    private void isHealthKitAvailable(CallbackContext callbackContext) throws JSONException {
        JSONObject object = new JSONObject();
        object.put("isAvailable", false);
        callbackContext.success(object);
    }

    @Override
    public void onRestoreStateForActivityResult(Bundle state, CallbackContext callbackContext) {
        super.onRestoreStateForActivityResult(state, callbackContext);
        ocrController.restoreStateForActivity(state, callbackContext);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        ocrController.onOCRActivityResult(requestCode, resultCode, intent);
    }

    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException {
        super.onRequestPermissionResult(requestCode, permissions, grantResults);
        bluetoothController.onPermissionResult(requestCode, permissions, grantResults);
    }

    private class PeriperheralTypeAdapter implements JsonDeserializer<Peripheral> {
        @Override
        public Peripheral deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
            JsonObject obj = json.getAsJsonObject();
            Peripheral.ConnectionType connectionType = Peripheral.ConnectionType.valueOf(obj.get("connectionType").getAsString());
            switch (connectionType) {

                case BT:
                    return context.deserialize(json, BluetoothPeripheral.class);

                case OCR:
                    return context.deserialize(json, OCRPeripheral.class);

                default:
                    throw new JsonParseException("Could not parse Peripheral");
            }

        }
    }

    private class RecordTypeDeserializeAdapter implements JsonDeserializer<Record> {

        @Override
        public Record deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
            JsonObject object = json.getAsJsonObject();
            Record.RecordType recordType = gson.fromJson(object.get("recordType"), Record.RecordType.class);
            return context.deserialize(json, recordType.getRecordClass());

        }
    }
}
