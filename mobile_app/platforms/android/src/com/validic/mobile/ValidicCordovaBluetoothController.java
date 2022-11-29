package com.validic.mobile;

import android.Manifest;
import android.content.pm.PackageManager;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.validic.common.Log;
import com.validic.mobile.ble.BluetoothPeripheral;
import com.validic.mobile.ble.BluetoothPeripheralController;
import com.validic.mobile.ble.BluetoothPeripheralControllerListener;
import com.validic.mobile.ble.PassiveBluetoothManager;
import com.validic.mobile.record.Record;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutorService;

public class ValidicCordovaBluetoothController extends ValidicCordovaController {
    private static final int REQUEST_PAIR_BLUETOOTH = 34;
    private static final int REQUEST_READ_BLUETOOTH = 35;

    private static final String EVENT_PAIR_START = "validicOnPairingStarted";
    private static final String EVENT_PAIR_SUCCESS = "validicOnPairSuccessful";
    private static final String EVENT_PAIR_FAIL = "validicOnPairFailed";
    private static final String EVENT_READY_TO_READ = "validicOnReadyToRead";
    private static final String EVENT_READ_SUCCESS = "validicOnReadSuccessful";
    private static final String EVENT_READ_FAIL = "validicOnReadFailed";
    private static final String EVENT_READ_CANCEL = "validicOnReadCancelled";

    private static final String EVENT_PASSIVE_READ_SUCCESS = "validicOnBluetoothPassiveDidRead";
    private static final String EVENT_PASSIVE_READ_FAIL = "validicOnBluetoothPassiveDidFail";
    private static final String EVENT_PASSIVE_READY_TO_READ = "validicOnBluetoothPassiveIsReadyToRead";
    private static final String EVENT_PASSIVE_READ_CANCEL = "validicOnBluetoothPassiveDidCancel";


    private BluetoothPeripheralController bluetoothPeripheralController;
    private CallbackContext cordovaPairCallback;
    private CallbackContext cordovaReadCallback;

    private BluetoothPeripheral currentPeripheral;
    private CallbackContext backgroundBluetoothCallback;

    public ValidicCordovaBluetoothController(CordovaPlugin plugin, Gson gson, Log log, ExecutorService threadPool) {
        super(plugin, gson, log, threadPool);
        bluetoothPeripheralController = new BluetoothPeripheralController();
        PassiveBluetoothManager.getInstance().setBluetoothListener(backgroundListener);
        PassiveBluetoothManager.getInstance().setPassivePeripherals(PassiveBluetoothManager.getInstance().getPassivePeripherals());

    }

    @Override
    boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "BLE_getSupportedPeripherals":
                getSupportedBluetoothPeripherals(callbackContext);
                return true;
            case "BLE_getPeripheralsOfType":
                getBluetoothPeripheralsByType(args, callbackContext);
                return true;
            case "BLE_getPeripheral":
                getBluetoothPeripheral(args, callbackContext);
                return true;
            case "BLE_pair":
                pairBluetooth(args, callbackContext);
                return true;
            case "BLE_read":
                readBluetooth(args, callbackContext);
                return true;
            case "BLE_cancel":
                cancelBluetooth();
                return true;
            case "BLE_inProgress":
                isBluetoothInProgress(callbackContext);
                return true;
            case "BLE_setPassiveReadPeripheralIDs":
                setBackgroundBluetoothPeripherals(args);
                return true;
            case "BLE_getPassiveReadPeripheralIDs":
                getBackgroundBluetoothPeripherals(callbackContext);
                return true;
            case "BLE_setBluetoothPassiveListener":
                setBackgroundBluetoothCallback(callbackContext);
                return true;
        }
        return false;
    }

    private final BluetoothPeripheralControllerListener bluetoothPairingListener = new BluetoothPeripheralControllerListener() {
        @Override
        public void onPeripheralDiscovered(BluetoothPeripheralController validicBluetoothPeripheralController,
                                           BluetoothPeripheral peripheral) {
            if (cordovaPairCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("peripheralID", peripheral.getPeripheralID());
                    respondWithEvent(EVENT_PAIR_START, payload, null, cordovaPairCallback, true, true);
                } catch (JSONException e) {
                    log.e(e);
                }
            }
        }

        @Override
        public boolean onSuccess(BluetoothPeripheralController validicBluetoothPeripheralController, BluetoothPeripheral
                peripheral, List<Record> list) {
            if (cordovaPairCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("peripheralID", peripheral.getPeripheralID());
                    respondWithEvent(EVENT_PAIR_SUCCESS, payload, null, cordovaPairCallback, true, false);

                } catch (JSONException e) {
                    log.e(e);
                }
                cordovaPairCallback = null;
            }
            //don't submit records during pairing
            return false;
        }

        @Override
        public void onFail(BluetoothPeripheralController validicBluetoothPeripheralController, BluetoothPeripheral
                peripheral, BluetoothPeripheralController.BluetoothError error) {
            if (cordovaPairCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("peripheralID", peripheral.getPeripheralID());
                    respondWithEvent(EVENT_PAIR_FAIL, payload, new RuntimeException(error.getMessage()), cordovaPairCallback,
                            false, false);
                } catch (JSONException e) {
                    log.e(e);
                }
                cordovaPairCallback = null;
            }
        }
    };

    private final BluetoothPeripheralControllerListener bluetoothReadCallback = new BluetoothPeripheralControllerListener() {
        @Override
        public void onPeripheralDiscovered(BluetoothPeripheralController validicBluetoothPeripheralController,
                                           BluetoothPeripheral peripheral) {
            if (cordovaReadCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("peripheralID", peripheral.getPeripheralID());
                    respondWithEvent(EVENT_READY_TO_READ, payload, null, cordovaReadCallback, true, true);
                } catch (JSONException e) {
                    log.e(e);
                }
            }
        }

        @Override
        public boolean onSuccess(BluetoothPeripheralController validicBluetoothPeripheralController, BluetoothPeripheral
                peripheral, List<Record> records) {
            if (cordovaReadCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    if (!records.isEmpty()) {
                        payload.put("records", new JSONArray(gson.toJson(records.toArray(), records.get(0).getRecordType()
                                .getRecordArrayClass())));
                        payload.put("peripheralID", peripheral.getPeripheralID());
                        respondWithEvent(EVENT_READ_SUCCESS, payload, null, cordovaReadCallback, true, false);
                    }
                } catch (JSONException e) {
                    log.e(e);
                }
                cordovaReadCallback = null;
            }
            return false;
        }

        @Override
        public void onFail(BluetoothPeripheralController validicBluetoothPeripheralController, BluetoothPeripheral
                peripheral, BluetoothPeripheralController.BluetoothError error) {
            if (cordovaReadCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("peripheralID", peripheral.getPeripheralID());
                    if (error == BluetoothPeripheralController.BluetoothError.Cancelled) {
                        respondWithEvent(EVENT_READ_CANCEL, payload, null, backgroundBluetoothCallback, false, true);
                    } else {
                        respondWithEvent(EVENT_READ_FAIL, payload, new RuntimeException(error.getMessage()), cordovaReadCallback, false,
                                false);
                    }
                } catch (JSONException e) {
                    log.e(e);
                }
                cordovaReadCallback = null;
            }
        }
    };

    private final PassiveBluetoothManager.BluetoothListener backgroundListener = new PassiveBluetoothManager.BluetoothListener() {

        @Override
        public void onSuccess(BluetoothPeripheral peripheral, List<Record> records) {
            try {
                JSONObject payload = new JSONObject();
                if (!records.isEmpty()) {
                    payload.put("records", new JSONArray(gson.toJson(records.toArray(), records.get(0).getRecordType()
                            .getRecordArrayClass())));
                    payload.put("peripheralID", peripheral.getPeripheralID());
                    respondWithEvent(EVENT_PASSIVE_READ_SUCCESS, payload, null, backgroundBluetoothCallback, true, true);
                }
            } catch (JSONException e) {
                log.e(e);
            }
        }

        @Override
        public void onFail(BluetoothPeripheral peripheral, BluetoothPeripheralController.BluetoothError error) {
            if (backgroundBluetoothCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("peripheralID", peripheral.getPeripheralID());
                    if (error == BluetoothPeripheralController.BluetoothError.Cancelled) {
                        respondWithEvent(EVENT_PASSIVE_READ_CANCEL, payload, null, backgroundBluetoothCallback, false, true);
                    } else {
                        respondWithEvent(EVENT_PASSIVE_READ_FAIL, payload, new RuntimeException(error.getMessage()),
                                backgroundBluetoothCallback, false, true);
                    }
                } catch (JSONException e) {
                    log.e(e);
                }
            }
        }


        @Override
        public void onPeripheralDiscovered(BluetoothPeripheral peripheral) {
            if (backgroundBluetoothCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("peripheralID", peripheral.getPeripheralID());
                    respondWithEvent(EVENT_PASSIVE_READY_TO_READ, payload, null, backgroundBluetoothCallback, true, true);
                } catch (JSONException e) {
                    log.e(e);
                }
            }
        }

        @Override
        public void onBackgroundScanStart(Set<BluetoothPeripheral> set) {

        }

        @Override
        public void onBackgroundScanStop() {

        }
    };

    private void getSupportedBluetoothPeripherals(CallbackContext callbackContext) {
        JSONObject object = new JSONObject();
        try {
            object.put("peripherals", new JSONArray(gson.toJson(BluetoothPeripheral.getSupportedPeripherals(),
                    new TypeToken<List<BluetoothPeripheral>>() {
                    }.getType())));
            callbackContext.success(object);
        } catch (JSONException e) {
            failCallback(callbackContext, e, false);
        }
    }

    private void getBluetoothPeripheralsByType(JSONArray args, CallbackContext callbackContext) {
        JSONObject object = new JSONObject();
        try {
            int typeValue = args.getInt(0);
            Peripheral.PeripheralType type = Peripheral.PeripheralType.values()[typeValue];

            object.put("peripherals", new JSONArray(gson.toJson(BluetoothPeripheral.getPeripheralsForType(type),
                    new TypeToken<List<BluetoothPeripheral>>() {
                    }.getType())));
            object.put("type", typeValue);
            callbackContext.success(object);
        } catch (Exception e) {
            failCallback(callbackContext, e, false);
        }
    }

    private void getBluetoothPeripheral(JSONArray args, CallbackContext callbackContext) {
        int id = 0;
        try {
            id = args.getInt(0);

            JSONObject object = new JSONObject();
            BluetoothPeripheral p = BluetoothPeripheral.getPeripheralForID(id);
            if (p != null) {
                object.put("peripheral", new JSONObject(gson.toJson(p)));
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

    private void pairBluetooth(final JSONArray args, final CallbackContext callbackContext) {
        try {
            int id = args.getInt(0);
            final BluetoothPeripheral peripheral = BluetoothPeripheral.getPeripheralForID(id);
            if (peripheral == null) {
                JSONObject object = new JSONObject();
                object.put("peripheralID", id);
                respondWithEvent(EVENT_PAIR_FAIL, object, new IllegalArgumentException("Peripheral with id " + id + " not found"),
                        callbackContext, false, true);
            } else {
                pairBluetooth(peripheral, callbackContext);
            }
        } catch (JSONException e) {
            failCallback(callbackContext, e, false);
        }

    }

    private void readBluetooth(final JSONArray args, final CallbackContext callbackContext) {
        try {
            int id = args.getInt(0);
            final BluetoothPeripheral peripheral = BluetoothPeripheral.getPeripheralForID(id);
            if (peripheral == null) {
                JSONObject object = new JSONObject();
                object.put("peripheralID", id);
                respondWithEvent(EVENT_READ_FAIL, object, new IllegalArgumentException("Peripheral with id " + id + " not found"),
                        callbackContext, false, true);
            } else {
                readBluetooth(peripheral, callbackContext);
            }
        } catch (JSONException e) {
            failCallback(callbackContext, e, false);
        }
    }

    private void pairBluetooth(final BluetoothPeripheral peripheral, CallbackContext callbackContext) {
        currentPeripheral = peripheral;
        cordovaPairCallback = callbackContext;
        if (plugin.cordova.hasPermission(Manifest.permission.ACCESS_COARSE_LOCATION) || plugin.cordova.hasPermission(Manifest.permission
                .ACCESS_FINE_LOCATION)) {
            threadPool.execute(new Runnable() {
                @Override
                public void run() {
                    bluetoothPeripheralController.pairPeripheral(peripheral, bluetoothPairingListener);
                }
            });

        } else {
            plugin.cordova.requestPermission(plugin, REQUEST_PAIR_BLUETOOTH, Manifest.permission.ACCESS_COARSE_LOCATION);
        }
    }

    private void readBluetooth(final BluetoothPeripheral peripheral, CallbackContext callbackContext) {
        currentPeripheral = peripheral;
        cordovaReadCallback = callbackContext;
        if (plugin.cordova.hasPermission(Manifest.permission.ACCESS_COARSE_LOCATION) || plugin.cordova.hasPermission(Manifest.permission
                .ACCESS_FINE_LOCATION)) {
            threadPool.execute(new Runnable() {
                @Override
                public void run() {
                    bluetoothPeripheralController.readFromPeripheral(peripheral, bluetoothReadCallback);
                }
            });

        } else {
            plugin.cordova.requestPermission(plugin, REQUEST_READ_BLUETOOTH, Manifest.permission.ACCESS_COARSE_LOCATION);
        }
    }

    private void setBackgroundBluetoothCallback(CallbackContext context) {
        backgroundBluetoothCallback = context;
    }

    private void setBackgroundBluetoothPeripherals(JSONArray args) {
        try {
            JSONArray array = args.getJSONArray(0);
            Set<BluetoothPeripheral> peripherals = new HashSet<>();
            for (int i = 0; i < array.length(); i++) {
                peripherals.add(BluetoothPeripheral.getPeripheralForID(array.getInt(i)));
            }
            PassiveBluetoothManager.getInstance().setPassivePeripherals(peripherals);

        } catch (JSONException e) {
            e.printStackTrace();
            failCallback(backgroundBluetoothCallback, e, true);
        }

    }

    private void getBackgroundBluetoothPeripherals(CallbackContext callbackContext) {
        JSONArray array = new JSONArray();
        for (BluetoothPeripheral p : PassiveBluetoothManager.getInstance().getPassivePeripherals()) {
            array.put(p.getPeripheralID());
        }
        JSONObject object = new JSONObject();
        try {
            object.put("peripheralIDs", array);
            callbackContext.success(object);
        } catch (JSONException e) {
            e.printStackTrace();
            failCallback(callbackContext, e, false);
        }
        callbackContext.success(array);
    }

    private void cancelBluetooth() {
        if (bluetoothPeripheralController.operationInProgress()) {
            bluetoothPeripheralController.cancel();
        }
    }

    private void isBluetoothInProgress(CallbackContext callbackContext) {
        try {
            JSONObject object = new JSONObject();
            object.put("inProgress", bluetoothPeripheralController.operationInProgress());
            callbackContext.success(object);
        } catch (JSONException e) {
            failCallback(callbackContext, e, false);
        }
    }

    public void onPermissionResult(int requestCode, String[] permissions, int[] grantResults) {
        for (int r : grantResults) {
            if (r == PackageManager.PERMISSION_DENIED) {
                if (requestCode == REQUEST_PAIR_BLUETOOTH) {
                    respondWithEvent(EVENT_PAIR_FAIL, null, new RuntimeException("Must enable location permissions"),
                            cordovaPairCallback, false, false);
                    cordovaPairCallback = null;
                } else if (requestCode == REQUEST_READ_BLUETOOTH) {
                    respondWithEvent(EVENT_READ_FAIL, null, new RuntimeException("Must enable location permissions"),
                            cordovaReadCallback, false, false);
                    cordovaReadCallback = null;
                }

                currentPeripheral = null;
                return;
            }
        }
        switch (requestCode) {
            case REQUEST_PAIR_BLUETOOTH:
                pairBluetooth(currentPeripheral, cordovaPairCallback);
                break;
            case REQUEST_READ_BLUETOOTH:
                readBluetooth(currentPeripheral, cordovaPairCallback);
                break;
        }
    }
}