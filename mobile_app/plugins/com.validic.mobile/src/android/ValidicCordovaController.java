package com.validic.mobile;

import com.google.gson.Gson;
import com.validic.common.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.ExecutorService;

/**
 * Base Controller Class for each Validic Mobile component. Each Controller has a reference
 * to the plugin the plugin will call execute() to see if the controllers handle the given
 * action. If the controller does handle it, execute will return true otherwise false.
 */
abstract class ValidicCordovaController {

    protected final CordovaPlugin plugin;
    protected final Gson gson;
    protected final Log log;
    protected final ExecutorService threadPool;

    /**
     * Constructor
     *
     * @param plugin     - Instance of the ValidicMobile Plugin
     * @param gson       - GSON instance for JSON marshalling
     * @param log        - Logger
     * @param threadPool - The plugin makes use of a thread pool of size 1
     */
    public ValidicCordovaController(CordovaPlugin plugin, Gson gson, Log log, ExecutorService threadPool) {
        this.plugin = plugin;
        this.gson = gson;
        this.log = log;
        this.threadPool = threadPool;

    }

    /**
     * The Validic Mobile plugin will call execute on each instance of ValidicCordovaController to handle
     * execution of actions. Return true if the instance handles the action requested by the plugin.
     * Otherwise return false.
     *
     * @param action          - Action requested to be handled
     * @param args            - Arguments for the the requested action
     * @param callbackContext - Callback for action
     * @return boolean - Return true if the current controller handles requested action. Otherwise false
     * @throws JSONException - JSON exception that is passed up to the ValidicMobile plugin
     */
    abstract boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException;

    /**
     * General fail callback that simply returns an error message in a JSON object
     *
     * @param callbackContext - Callback to fail
     * @param e               - Exception to be reported
     * @param keepCallback    - Indicates whether the callback should be kept so it can be called again later
     */
    protected void failCallback(CallbackContext callbackContext, Exception e, boolean keepCallback) {
        JSONObject object = new JSONObject();
        try {
            object.put("error", e.getMessage());
        } catch (JSONException e1) {
            log.e(e);
        }
        PluginResult result = new PluginResult(PluginResult.Status.ERROR, object);
        result.setKeepCallback(keepCallback);
        callbackContext.sendPluginResult(result);
    }

    /**
     * General callback for when an Event needs to be fired by cordova. Each Event has a name and a
     * JSON payload.
     *
     * @param eventName       - Name of the event to fire
     * @param payload         - JSON payload for the event
     * @param e               - Exception message to be included in the payload
     * @param callbackContext - Callback to respond to
     * @param isSuccess       - Indicates whether the callback should call onSuccess or onError
     * @param keepCallback    - Indeication whether the callback should be kept so it can be called again later
     */
    protected void respondWithEvent(String eventName, JSONObject payload, Throwable e, final CallbackContext callbackContext, boolean
            isSuccess, final boolean keepCallback) {

        try {
            JSONObject object = new JSONObject();
            if (eventName != null) {
                object.put("event", eventName);
            }
            if (payload == null) {
                payload = new JSONObject();
            }
            if (e != null) {
                payload.put("error", e.getMessage());
            }
            object.put("payload", payload);
            final PluginResult result;
            if (isSuccess) {
                result = new PluginResult(PluginResult.Status.OK, object);
            } else {
                result = new PluginResult(PluginResult.Status.ERROR, object);
            }
            if (callbackContext != null) {
                threadPool.execute(new Runnable() {
                    @Override
                    public void run() {
                        result.setKeepCallback(keepCallback);
                        callbackContext.sendPluginResult(result);
                    }
                });
            } else {
                log.d("Callback is null, not firing event " + eventName);

            }
        } catch (JSONException e1) {
            log.e(e1);
        }

    }
}
