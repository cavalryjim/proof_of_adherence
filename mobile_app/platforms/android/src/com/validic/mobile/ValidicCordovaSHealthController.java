package com.validic.mobile;

import android.content.pm.PackageManager;

import com.google.gson.Gson;
import com.validic.common.Log;
import com.validic.mobile.record.Record;
import com.validic.mobile.shealth.SHealthError;
import com.validic.mobile.shealth.SHealthManager;
import com.validic.mobile.shealth.SHealthSubscription;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutorService;

public class ValidicCordovaSHealthController extends ValidicCordovaController {

    private static final String EVENT_SHEALTH_ERROR = "validicOnSHealthError";
    private static final String EVENT_SHEALTH_RECORDS = "validicOnSHealthRecords";
    private static final String EVENT_SHEALTH_PERMISSIONS = "validicOnSHealthPermissions";
    private static final String EVENT_SHEALTH_HISTORY = "validicOnSHealthHistory";

    private CallbackContext sHealthCallback;

    public ValidicCordovaSHealthController(CordovaPlugin plugin, Gson gson, Log log, ExecutorService threadPool) {
        super(plugin, gson, log, threadPool);
        SHealthManager.getInstance().setSHealthListener(sHealthListener);
        if (checkSHealthInstalled() && checkSHealthJar()) {
            SHealthManager.getInstance().observeCurrentSubscriptions();
        }
    }

    @Override
    boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case "setSHealthListener":
                setListener(callbackContext);
                return true;
            case "isSHealthAvailable":
                isSHealthAvailable(callbackContext);
                return true;
            case "observeSHealthSubscriptions":
                observeSHealthSubscriptions();
                return true;
            case "addSHealthSubscriptions":
                addSHealthSubscriptions(args);
                return true;
            case "removeSHealthSubscriptions":
                removeSHealthSubscriptions(args);
                return true;
            case "addSHealthSubscriptionSets":
                addSHealthSubscriptionSets(args);
                return true;
            case "removeSHealthSubscriptionSets":
                removeSHealthSubscriptionSets(args);
                return true;
            case "fetchHistory":
                fetchHistory(args);
                return true;
            case "getSubscriptionDataTypes":
                getSubscriptionDataTypes(args, callbackContext);
                return true;
        }
        return false;
    }

    private final SHealthManager.SHealthListener sHealthListener = new SHealthManager.SHealthListener() {

        @Override
        public void onError(SHealthError sHealthError) {
            JSONObject object = new JSONObject();
            if (sHealthError != null && sHealthCallback != null) {
                try {
                    object.put("sHealthError", sHealthError.toString());
                } catch (JSONException e) {
                    //do nothing if it cant add it 
                }
                respondWithEvent(EVENT_SHEALTH_ERROR, object, new RuntimeException(sHealthError.toString()), sHealthCallback, false, true);
            }
        }

        @Override
        public void onPermissionChange(String[] acceptedArray, String[] deniedArray) {
            JSONObject object = new JSONObject();
            JSONArray accepted = new JSONArray();
            JSONArray denied = new JSONArray();
            if (acceptedArray != null) {
                for (String s : acceptedArray) {
                    accepted.put(s);
                }
            }
            if (deniedArray != null) {
                for (String s2 : deniedArray) {
                    denied.put(s2);
                }
            }
            try {
                object.put("accepted", accepted);
                object.put("denied", denied);
                respondWithEvent(EVENT_SHEALTH_PERMISSIONS, object, null, sHealthCallback, true, true);
            } catch (JSONException e) {
                respondWithEvent(null, null, e, sHealthCallback, false, true);
            }

        }

        @Override
        public void onRecords(Map<Record.RecordType, Integer> summary) {
            JSONObject object = new JSONObject();
            try {
                for (Record.RecordType r : summary.keySet()) {
                    object.put(r.getTypeName(), summary.get(r));
                }
                respondWithEvent(EVENT_SHEALTH_RECORDS, object, null, sHealthCallback, true, true);
            } catch (JSONException e) {
                failCallback(sHealthCallback, e, true);
            }
        }

        @Override
        public void onHistoricalPull(Map<Record.RecordType, Integer> summary) {
            JSONObject object = new JSONObject();
            try {
                for (Record.RecordType r : summary.keySet()) {
                    object.put(r.getTypeName(), summary.get(r));
                }
                respondWithEvent(EVENT_SHEALTH_HISTORY, object, null, sHealthCallback, true, true);
            } catch (JSONException e) {
                failCallback(sHealthCallback, e, true);
            }
        }
    };

    public boolean checkSHealthInstalled() {
        PackageManager packageManager = plugin.cordova.getActivity().getPackageManager();
        try {
            packageManager.getPackageInfo("com.sec.android.app.shealth", PackageManager.GET_ACTIVITIES);
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
        return true;
    }

    public boolean checkSHealthJar() {
        try {
            Class.forName("com.samsung.android.sdk.healthdata.HealthPermissionManager");
            return true;
        } catch (ClassNotFoundException e) {
            return false;
        }
    }

    private void isSHealthAvailable(CallbackContext callbackContext) throws JSONException {
        if (checkAndHandleSHealth(callbackContext)) {
            JSONObject object = new JSONObject();
            object.put("isAvailable", true);
            callbackContext.success(object);
        }
    }

    private void observeSHealthSubscriptions() {
        if (checkAndHandleSHealth(sHealthCallback)) {
            try {
                SHealthManager.getInstance().observeCurrentSubscriptions();
            } catch (Exception e) {
                failCallback(sHealthCallback, e, true);
            }
        }
    }

    private void addSHealthSubscriptions(JSONArray args) {
        if (checkAndHandleSHealth(sHealthCallback)) {
            try {
                JSONArray array = args.getJSONArray(0);
                ArrayList<String> requested = new ArrayList<String>();
                for (int i = 0; i < array.length(); i++) {
                    String s = array.getString(i);
                    requested.add(s);
                }
                if (requested.size() > 0) {
                    SHealthManager.getInstance().addSubscriptionsForDataTypes(requested.toArray(new String[requested.size()]));

                } else {
                    respondWithEvent(EVENT_SHEALTH_ERROR, null, new IllegalArgumentException("Could not find SHealth permissions for " +
                            "subscriptions"), sHealthCallback, false, true);
                }
            } catch (JSONException e) {
                failCallback(sHealthCallback, e, true);
            }
        }
    }

    private void removeSHealthSubscriptions(JSONArray args) {
        if (checkAndHandleSHealth(sHealthCallback)) {
            try {
                JSONArray array = args.getJSONArray(0);
                ArrayList<String> requested = new ArrayList<String>();
                for (int i = 0; i < array.length(); i++) {
                    String s = array.getString(i);
                    requested.add(s);
                }
                if (requested.size() > 0) {
                    SHealthManager.getInstance().removeSubscriptionsForDataTypes(requested.toArray(new String[requested.size()]));

                } else {
                    respondWithEvent(EVENT_SHEALTH_ERROR, null, new IllegalArgumentException("Could not find SHealth permissions for " +
                            "subscription"), sHealthCallback, false, true);
                }
            } catch (Exception e) {
                failCallback(sHealthCallback, e, true);
            }
        }
    }

    private void addSHealthSubscriptionSets(JSONArray args) {
        if (checkAndHandleSHealth(sHealthCallback)) {
            try {
                JSONArray array = args.getJSONArray(0);
                List<String> allPermissions = new ArrayList<String>();
                for (int i = 0; i < array.length(); i++) {
                    SHealthSubscription.SHealthSubscriptionSet set = SHealthSubscription.SHealthSubscriptionSet.values()[array.getInt(i)];
                    if (set != null) {
                        String[] permissions = SHealthSubscription.permissionStringsForSubscriptionSet(set);
                        if (permissions.length > 0) {
                            allPermissions.addAll(Arrays.asList(permissions));
                        }
                    }
                }
                SHealthManager.getInstance().addSubscriptionsForDataTypes(allPermissions.toArray(new String[allPermissions.size()]));
            } catch (ArrayIndexOutOfBoundsException ex) {
                respondWithEvent(EVENT_SHEALTH_ERROR, null, new IllegalArgumentException("Could not find SHealth permissions for " +
                        "subscription set", ex), sHealthCallback, false, true);

            } catch (Exception e) {
                failCallback(sHealthCallback, e, true);
            }
        }
    }

    private void removeSHealthSubscriptionSets(JSONArray args) {
        if (checkAndHandleSHealth(sHealthCallback)) {
            try {
                JSONArray array = args.getJSONArray(0);
                List<String> allPermissions = new ArrayList<String>();
                for (int i = 0; i < array.length(); i++) {
                    SHealthSubscription.SHealthSubscriptionSet set = SHealthSubscription.SHealthSubscriptionSet.values()[array.getInt(i)];
                    if (set != null) {
                        String[] permissions = SHealthSubscription.permissionStringsForSubscriptionSet(set);
                        if (permissions.length > 0) {
                            allPermissions.addAll(Arrays.asList(permissions));
                        }
                    }
                }
                SHealthManager.getInstance().removeSubscriptionsForDataTypes(allPermissions.toArray(new String[allPermissions.size()]));
            } catch (ArrayIndexOutOfBoundsException ex) {
                respondWithEvent(EVENT_SHEALTH_ERROR, null, new IllegalArgumentException("Could not find SHealth permissions for " +
                        "subscription set", ex), sHealthCallback, false, true);
            } catch (JSONException e) {
                failCallback(sHealthCallback, e, false);
            }
        }
    }

    private void getSubscriptionDataTypes(JSONArray args, CallbackContext callbackContext) {
        if (checkAndHandleSHealth(callbackContext)) {
            try {
                SHealthSubscription.SHealthSubscriptionSet set = SHealthSubscription.SHealthSubscriptionSet.values()[args.getInt(0)];
                String[] permissions = SHealthSubscription.permissionStringsForSubscriptionSet(set);
                JSONObject object = new JSONObject();
                object.put("dataTypes", new JSONArray(permissions));
                callbackContext.success(object);
            } catch (ArrayIndexOutOfBoundsException ex) {
                respondWithEvent(EVENT_SHEALTH_ERROR, null, new IllegalArgumentException("Could not find SHealth permissions for " +
                        "subscription set", ex), sHealthCallback, false, true);
                failCallback(callbackContext, ex, false); // have to fail here as well because it has it's own listener
            } catch (JSONException e) {
                failCallback(callbackContext, e, false);
            }
        }
    }

    private void fetchHistory(JSONArray args) {
        if (checkAndHandleSHealth(sHealthCallback)) {
            try {
                JSONArray array = args.getJSONArray(0);
                Set<SHealthSubscription.SHealthHistoricalSet> dataTypes = new HashSet<>();
                for (int i = 0; i < array.length(); i++) {
                    SHealthSubscription.SHealthHistoricalSet set = SHealthSubscription.SHealthHistoricalSet.valueOf(array.getString(i));
                    dataTypes.add(set);
                }
                SHealthManager.getInstance().fetchHistoricalSets(dataTypes);
            } catch (JSONException e) {
                failCallback(sHealthCallback, e, true);
            } catch (IllegalArgumentException iae) {
                respondWithEvent(EVENT_SHEALTH_ERROR, null, iae, sHealthCallback, false, true);
            }
        }
    }


    private void setListener(CallbackContext callbackContext) {
        this.sHealthCallback = callbackContext;
    }

    private boolean checkAndHandleSHealth(CallbackContext callbackContext) {
        JSONObject object = new JSONObject();
        try {
            if (!checkSHealthInstalled()) {
                object.put("isAvailable", false);
                object.put("error", "SHealth app is not installed on this device");
                callbackContext.success(object);
                return false;
            } else if (!checkSHealthJar()) {
                object.put("isAvailable", false);
                object.put("error", "SHealth jar cannot be found on classpath");
                callbackContext.success(object);
            }

        } catch (JSONException e) {
            log.e(e);
            return false;
        }
        return true;
    }
}