/*global sap*/

(function () {
    'use strict';

    sap.ui.model.json.JSONModel.extend("nl.qualiture.rest.custom.RESTModel", {

        _serviceURL : null,

        initServiceURL : function(sURL) {
            this._serviceURL = sURL;

            this.loadData(this._serviceURL);
        },

        create : function(oData, fnSuccess, fnError) {
            var sType = "POST";

            this._fireRequestSent(sType);
            this._performRequest(null, fnSuccess, fnError, oData, sType);
        },

        update : function(sId, oData, fnSuccess, fnError) {
            var sType = "PUT";

            this._fireRequestSent(sType);
            this._performRequest(sId, fnSuccess, fnError, oData, sType);
        },

        delete : function(sId, fnSuccess, fnError) {
            var sType = "DELETE";

            this._fireRequestSent(sType);
            this._performRequest(sId, fnSuccess, fnError, null, sType);
        },

        _fireRequestSent : function(sType, sURL) {
            this.fireRequestSent({
                url   : sURL,
                type  : sType,
                async : true,
                info  : "cache=false;bMerge=" + this.bMerge
            });
        },

        _performRequest : function(sId, fnSuccess, fnError, oData, sType) {
            var that = this,
                sURL = sId ? this._serviceURL + "/" + sId : this._serviceURL,
                oAjax = {
                    method      : sType,
                    contentType : "application/json",
                    dataType    : "json"
                };

            if (sType !== "DELETE") {
                oAjax.data = JSON.stringify(oData);
            }

            $.ajax(sURL, oAjax
            ).done(function(responseData) {
                //queue item successfully sent/updated to NetWeaver CE
                that.loadData(that._serviceURL);
                that.fireRequestCompleted({url : sURL, type : sType, async : true, info : "cache=false;bMerge=" + that.bMerge});

                if (typeof fnSuccess === 'function') {
                    fnSuccess(oData);
                }
            }).fail(function(XMLHttpRequest, textStatus) {
                jQuery.sap.log.fatal("The following problem occurred: " + textStatus, XMLHttpRequest.responseText + "," + XMLHttpRequest.status + "," + XMLHttpRequest.statusText);
                that.fireRequestCompleted({url : sURL, type : sType, async : true, info : "cache=false;bMerge=" + that.bMerge});
                that.fireRequestFailed({message : textStatus, statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText});

                if (typeof fnError === 'function') {
                    fnError({message : textStatus, statusCode : XMLHttpRequest.status, statusText : XMLHttpRequest.statusText, responseText : XMLHttpRequest.responseText});
                }
            });
        }
    });
}());
