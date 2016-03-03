# ui5-restmodel
A "serverside" REST extension of the OpenUI5 JSONModel

Initialize your model as usual, but with a defined service URL, for instance:

    var oModel = new RESTModel();
    oModel.initServiceURL("http://jsonplaceholder.typicode.com/posts");

    this.getView().setModel(oModel);

You can CREATE:

    // HTTP POST to service url root, i.e. http://jsonplaceholder.typicode.com/posts
    oModel.create({
        title: 'foo',
        body: 'bar',
        userId: 1
    },
    function(oData) {
        // success
    },
    function(oError) {
        // error
    });

or UPDATE:

    // HTTP PUT to for instance http://jsonplaceholder.typicode.com/posts/1
    oModel.update(1, {
        title: 'foo',
        body: 'bar',
        userId: 1
    },
    function(oData) {
        // success
    },
    function(oError) {
        // error
    });

or DELETE:

    // HTTP DELETE to for instance http://jsonplaceholder.typicode.com/posts/1
    oModel.delete(1,
    function(oData) {
        // success
    },
    function(oError) {
        // error
    });

After a successful response, the model will simply be reloaded from the service URL -- It is therefore the responsibility of the serverside logic to update the data accordingly

All JSONModel methods can be applied as well
