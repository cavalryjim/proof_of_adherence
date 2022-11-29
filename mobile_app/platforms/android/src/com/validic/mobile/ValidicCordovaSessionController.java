package com.validic.mobile;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.validic.common.Log;
import com.validic.mobile.Session;
import com.validic.mobile.SessionListener;
import com.validic.mobile.User;
import com.validic.mobile.record.Record;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.concurrent.ExecutorService;


public class ValidicCordovaSessionController extends ValidicCordovaController {

    private static final String EVENT_RECORD_SUBMITTED = "validicOnRecordSubmitted";
    private static final String EVENT_RECORD_SUBMIT_FAIL = "validicOnRecordSubmitFailed";

    public ValidicCordovaSessionController(CordovaPlugin plugin, Gson gson, Log log, ExecutorService threadPool) {
        super(plugin,gson, log, threadPool);
        Session.getInstance().setSessionListener(sessionListener);
    }

    @Override
    boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "startSession":
                startSession(args, callbackContext);
                return true;
            case "endSession":
                endSession(callbackContext);
                return true;
            case "setSessionListener":
                setSessionListener(callbackContext);
                return true;
            case "submitRecord":
                submitRecord(args, callbackContext);
                return true;
            case "submitRecords":
                submitRecords(args, callbackContext);
                return true;
            case "isSessionActive":
                isSessionActive(callbackContext);
                return true;
            case "getVersion":
                getVersion(callbackContext);
                return true;
        }
        return false;
    }

    private void startSession(final JSONArray args, final CallbackContext callbackContext) {
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    String userid = args.getString(0);
                    String orgId = args.getString(1);
                    String accessToken = args.getString(2);
                    User user = new User(orgId, userid, accessToken);
                    Session.getInstance().startSessionWithUser(user);
                    JSONObject payload = new JSONObject();
                    payload.put("user", new JSONObject(gson.toJson(user)));
                    callbackContext.success(payload);
                } catch (JSONException e) {
                    failCallback(callbackContext, e, false);
                }

            }
        });


    }

    private void endSession(CallbackContext callbackContext) {
        Session.getInstance().endSession();
        callbackContext.success();
    }

    private void setSessionListener(CallbackContext callbackContext) {
        sessionListenerCallback = callbackContext;
    }

    private void submitRecord(final JSONArray args, final CallbackContext callback) {
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Bitmap bitmap;
                    Record record = validateRecord(args.getJSONObject(0), callback);
                    if (record != null && args.length() > 1) {
                        byte[] encoded = Base64.decode(args.getString(1).getBytes(), 0);
                        bitmap = BitmapFactory.decodeByteArray(encoded, 0, encoded.length);
                        if (bitmap != null) {
                            Session.getInstance().submitRecord(record, bitmap);
                        } else {
                            Session.getInstance().submitRecord(record);
                        }
                        callback.success();
                    }
                } catch (JSONException e) {
                    failCallback(callback, e, false);
                }
            }
        });

    }

    private Record validateRecord(JSONObject jsonObject, CallbackContext callback) {
        try {
            return gson.fromJson(jsonObject.toString(), Record.class);
        } catch (JsonSyntaxException e) {
            JSONObject object = new JSONObject();
            try {
                object.put("error", "Invalid Record");
                callback.error(object);
            } catch (JSONException ex) {
                failCallback(callback, ex, false);
            }


        }
        return null;
    }

    private void submitRecords(final JSONArray args, final CallbackContext callbackContext) {
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONArray array = args.getJSONArray(0);
                    List<Record> records = validateRecords(array, callbackContext);
                    if (records != null) {
                        Session.getInstance().submitRecords(records);
                        callbackContext.success();
                    }
                } catch (JSONException e) {
                    failCallback(callbackContext, e, false);
                }
            }
        });

    }

    private List<Record> validateRecords(JSONArray jsonArray, CallbackContext callback) {
        try {
            return gson.fromJson(jsonArray.toString(), new TypeToken<List<Record>>() {
            }.getType());
        } catch (JsonSyntaxException e) {
            JSONObject object = new JSONObject();
            try {
                object.put("error", "Invalid Record");
                callback.error(object);
            } catch (JSONException ex) {
                failCallback(callback, ex, false);
            }
        }
        return null;
    }

    private void isSessionActive(CallbackContext callbackContext) {
        try {
            JSONObject obj = new JSONObject();
            obj.put("isActive", Session.getInstance().getUser() != null);
            callbackContext.success(obj);
        } catch (JSONException e) {
            failCallback(callbackContext, e, false);
        }
    }
    private void getVersion(CallbackContext callbackContext) {
        try {
            JSONObject object = new JSONObject();
            object.put("version", Session.libraryVersion());
            callbackContext.success(object);

        } catch (JSONException e) {
            failCallback(callbackContext, e, false);
        }
    }

    private CallbackContext sessionListenerCallback;
    private final SessionListener sessionListener = new SessionListener() {

        @Override
        public void didSubmitRecord(Record record) {
            if (sessionListenerCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("record", new JSONObject(gson.toJson(record)));
                    respondWithEvent(EVENT_RECORD_SUBMITTED, payload, null, sessionListenerCallback, true, true);
                } catch (JSONException e) {
                    log.e(e);
                }
            }
        }

        @Override
        public void didFailToSubmitRecord(Record record, Error error) {

            if (sessionListenerCallback != null) {
                try {
                    JSONObject payload = new JSONObject();
                    payload.put("record", new JSONObject(gson.toJson(record)));
                    respondWithEvent(EVENT_RECORD_SUBMIT_FAIL, payload, error, sessionListenerCallback, false, true);
                } catch (JSONException e) {
                    log.e(e);
                }
            }
        }
    };
}
