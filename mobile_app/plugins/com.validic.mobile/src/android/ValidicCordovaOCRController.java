package com.validic.mobile;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Base64;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.validic.common.Log;
import com.validic.mobile.ocr.OCRPeripheral;
import com.validic.mobile.ocr.ValidicOCRActivity;
import com.validic.mobile.record.Record;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.List;
import java.util.concurrent.ExecutorService;

public class ValidicCordovaOCRController extends ValidicCordovaController {

    private CallbackContext ocrCallback;

    public ValidicCordovaOCRController(CordovaPlugin plugin, Gson gson, Log log, ExecutorService threadPool) {
        super(plugin, gson, log, threadPool);
    }

    @Override
    boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "OCR_getSupportedPeripherals":
                getSupportedOCRPeripherals(callbackContext);
                return true;
            case "OCR_getPeripheral":
                getOCRPeripheral(args, callbackContext);
                return true;
            case "OCR_getPeripheralsOfType":
                getOCRPeripheralsByType(args, callbackContext);
                break;
            case "OCR_read":
                readOCR(args, callbackContext);
                return true;
        }
        return false;
    }

    private void getSupportedOCRPeripherals(CallbackContext callbackContext) {
        try {
            JSONObject object = new JSONObject();
            object.put("peripherals", new JSONArray(gson.toJson(OCRPeripheral.getSupportedPeripherals(), new
                    TypeToken<List<OCRPeripheral>>() {
            }.getType())));
            callbackContext.success(object);
        } catch (JSONException e) {
            failCallback(callbackContext, e, false);
        }
    }

    private void getOCRPeripheral(JSONArray args, CallbackContext callbackContext) {
        try {
            int id = args.getInt(0);
            JSONObject object = new JSONObject();
            OCRPeripheral ocr = OCRPeripheral.getPeripheralForID(id);
            if (ocr != null) {
                object.put("peripheral", new JSONObject(gson.toJson(ocr)));
                callbackContext.success(object);
            } else {
                object.put("peripheralID", id);
                object.put("error", "Peripheral not found");
                callbackContext.error(object);
            }
        } catch (JSONException e) {
            failCallback(callbackContext, e, false);
        }
    }

    private void getOCRPeripheralsByType(JSONArray args, CallbackContext callbackContext) {
        JSONObject object = new JSONObject();
        try {
            int typeValue = args.getInt(0);
            Peripheral.PeripheralType type = Peripheral.PeripheralType.values()[typeValue];
            object.put("peripherals", new JSONArray(gson.toJson(OCRPeripheral.getPeripheralsForType(type), new
                    TypeToken<List<OCRPeripheral>>() {
            }.getType())));
            object.put("type", typeValue);
            callbackContext.success(object);
        } catch (Exception e) {
            failCallback(callbackContext, e, false);
        }
    }

    private void readOCR(final JSONArray args, final CallbackContext callbackContext) {
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final int i = args.getInt(0);
                    OCRPeripheral ocr = OCRPeripheral.getPeripheralForID(i);
                    if (ocr == null) {
                        JSONObject object = new JSONObject();
                        object.put("peripheralID", i);
                        object.put("error", "Peripheral not found");
                        callbackContext.error(object);
                    } else {
                        Intent intent = new Intent(plugin.cordova.getActivity(), ValidicOCRActivity.class);
                        intent.putExtra(ValidicOCRActivity.PERIPHERAL_ID, i);
                        File f = new File(plugin.cordova.getActivity().getFilesDir(), "validic_image.png");
                        intent.putExtra(ValidicOCRActivity.IMAGE_PATH, f.getPath());
                        ocrCallback = callbackContext;
                        plugin.cordova.startActivityForResult(plugin, intent, ValidicOCRActivity.ACTION_READ_OCR);
                    }
                } catch (JSONException e) {
                    failCallback(callbackContext, e, false);
                }
            }
        });

    }

    public void onOCRActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == ValidicOCRActivity.ACTION_READ_OCR) {
            if (resultCode == Activity.RESULT_OK && ocrCallback != null) {
                OCRPeripheral peripheral = (OCRPeripheral) intent.getSerializableExtra("peripheral");
                Record record = (Record) intent.getSerializableExtra("record");
                String uri = intent.getStringExtra("image");
                try {
                    JSONObject object = new JSONObject();
                    object.put("peripheralID", peripheral.getPeripheralID());
                    object.put("record", new JSONObject(gson.toJson(record)));
                    if (uri != null) {
                        byte[] image = getImageBytes(uri);
                        object.put("image", new String(Base64.encode(image, Base64.NO_WRAP)));
                    }
                    ocrCallback.success(object);
                    ocrCallback = null;
                } catch (Exception e) {
                    log.e(e);
                    JSONObject object = new JSONObject();
                    try {
                        object.put("peripheralID", peripheral.getPeripheralID());
                        object.put("error", e.getMessage());
                    } catch (JSONException e1) {
                        log.e(e);
                    }
                    ocrCallback.error(object);
                    ocrCallback = null;
                }
            }
        }
    }

    private byte[] getImageBytes(String uri) {
        RandomAccessFile f = null;
        byte[] b = new byte[0];
        try {
            f = new RandomAccessFile(uri, "r");
            b = new byte[(int) f.length()];
            f.read(b);
        } catch (IOException e) {
            e.printStackTrace();
            log.e(e);
        } finally {
            try {
                if (f != null) {
                    f.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return b;
    }

    public void restoreStateForActivity(Bundle state, CallbackContext callbackContext) {
        ocrCallback = callbackContext;
    }
}